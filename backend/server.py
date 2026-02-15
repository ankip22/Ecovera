from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import bcrypt
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'ecovera-sourcing-secret-key-2024')
JWT_ALGORITHM = "HS256"

# Create the main app
app = FastAPI(title="Ecovera Sourcing API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

security = HTTPBearer()

# ==================== MODELS ====================

# User Models
class UserBase(BaseModel):
    email: EmailStr
    company_name: str
    contact_person: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    model_config = ConfigDict(extra="ignore")
    id: str
    created_at: str

class UserInDB(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    password_hash: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Contact Form Models
class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str

class ContactForm(ContactFormCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "new"

# Quote Request Models
class QuoteRequestCreate(BaseModel):
    company_name: str
    contact_person: str
    email: EmailStr
    phone: str
    product_category: str
    product_description: str
    quantity: str
    target_price: Optional[str] = None
    delivery_timeline: str
    quality_requirements: Optional[str] = None
    additional_notes: Optional[str] = None

class QuoteRequest(QuoteRequestCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "pending"

# Order Models
class OrderCreate(BaseModel):
    product_name: str
    quantity: int
    unit_price: float
    supplier_id: Optional[str] = None
    notes: Optional[str] = None

class OrderUpdate(BaseModel):
    product_name: Optional[str] = None
    quantity: Optional[int] = None
    unit_price: Optional[float] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    product_name: str
    quantity: int
    unit_price: float
    total_price: float
    supplier_id: Optional[str] = None
    status: str = "pending"
    notes: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Supplier Models
class SupplierCreate(BaseModel):
    name: str
    contact_person: str
    email: EmailStr
    phone: str
    address: Optional[str] = None
    product_categories: List[str] = []
    rating: Optional[float] = None
    notes: Optional[str] = None

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    product_categories: Optional[List[str]] = None
    rating: Optional[float] = None
    notes: Optional[str] = None
    status: Optional[str] = None

class Supplier(SupplierCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    status: str = "active"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Testimonial Models
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    client_name: str
    company: str
    role: str
    content: str
    rating: int
    image_url: Optional[str] = None

# FAQ Models
class FAQ(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    question: str
    answer: str
    category: str

# ==================== HELPER FUNCTIONS ====================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))

def create_token(user_id: str, email: str) -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc).timestamp() + 86400 * 7  # 7 days
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ==================== AUTH ROUTES ====================

@api_router.post("/auth/register", response_model=dict)
async def register(user: UserCreate):
    # Check if user exists
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_obj = UserInDB(
        email=user.email,
        company_name=user.company_name,
        contact_person=user.contact_person,
        phone=user.phone,
        password_hash=hash_password(user.password)
    )
    
    await db.users.insert_one(user_obj.model_dump())
    token = create_token(user_obj.id, user_obj.email)
    
    return {
        "token": token,
        "user": {
            "id": user_obj.id,
            "email": user_obj.email,
            "company_name": user_obj.company_name,
            "contact_person": user_obj.contact_person,
            "phone": user_obj.phone,
            "created_at": user_obj.created_at
        }
    }

@api_router.post("/auth/login", response_model=dict)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user["id"], user["email"])
    
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "company_name": user["company_name"],
            "contact_person": user["contact_person"],
            "phone": user.get("phone"),
            "created_at": user["created_at"]
        }
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        company_name=current_user["company_name"],
        contact_person=current_user["contact_person"],
        phone=current_user.get("phone"),
        created_at=current_user["created_at"]
    )

# ==================== CONTACT ROUTES ====================

@api_router.post("/contact", response_model=ContactForm)
async def submit_contact(form: ContactFormCreate):
    contact = ContactForm(**form.model_dump())
    await db.contacts.insert_one(contact.model_dump())
    return contact

@api_router.get("/contact", response_model=List[ContactForm])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

# ==================== QUOTE REQUEST ROUTES ====================

@api_router.post("/quotes", response_model=QuoteRequest)
async def submit_quote_request(quote: QuoteRequestCreate):
    quote_obj = QuoteRequest(**quote.model_dump())
    await db.quotes.insert_one(quote_obj.model_dump())
    return quote_obj

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quote_requests(current_user: dict = Depends(get_current_user)):
    quotes = await db.quotes.find({"email": current_user["email"]}, {"_id": 0}).to_list(1000)
    return quotes

# ==================== ORDER ROUTES ====================

@api_router.post("/orders", response_model=Order)
async def create_order(order: OrderCreate, current_user: dict = Depends(get_current_user)):
    order_obj = Order(
        user_id=current_user["id"],
        product_name=order.product_name,
        quantity=order.quantity,
        unit_price=order.unit_price,
        total_price=order.quantity * order.unit_price,
        supplier_id=order.supplier_id,
        notes=order.notes
    )
    await db.orders.insert_one(order_obj.model_dump())
    return order_obj

@api_router.get("/orders", response_model=List[Order])
async def get_orders(current_user: dict = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user["id"]}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@api_router.patch("/orders/{order_id}", response_model=Order)
async def update_order(order_id: str, update: OrderUpdate, current_user: dict = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user["id"]})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    if "quantity" in update_data or "unit_price" in update_data:
        qty = update_data.get("quantity", order["quantity"])
        price = update_data.get("unit_price", order["unit_price"])
        update_data["total_price"] = qty * price
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.orders.update_one({"id": order_id}, {"$set": update_data})
    updated = await db.orders.find_one({"id": order_id}, {"_id": 0})
    return updated

@api_router.delete("/orders/{order_id}")
async def delete_order(order_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.orders.delete_one({"id": order_id, "user_id": current_user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order deleted successfully"}

# ==================== SUPPLIER ROUTES ====================

@api_router.post("/suppliers", response_model=Supplier)
async def create_supplier(supplier: SupplierCreate, current_user: dict = Depends(get_current_user)):
    supplier_obj = Supplier(
        user_id=current_user["id"],
        **supplier.model_dump()
    )
    await db.suppliers.insert_one(supplier_obj.model_dump())
    return supplier_obj

@api_router.get("/suppliers", response_model=List[Supplier])
async def get_suppliers(current_user: dict = Depends(get_current_user)):
    suppliers = await db.suppliers.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    return suppliers

@api_router.get("/suppliers/{supplier_id}", response_model=Supplier)
async def get_supplier(supplier_id: str, current_user: dict = Depends(get_current_user)):
    supplier = await db.suppliers.find_one({"id": supplier_id, "user_id": current_user["id"]}, {"_id": 0})
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@api_router.patch("/suppliers/{supplier_id}", response_model=Supplier)
async def update_supplier(supplier_id: str, update: SupplierUpdate, current_user: dict = Depends(get_current_user)):
    supplier = await db.suppliers.find_one({"id": supplier_id, "user_id": current_user["id"]})
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    await db.suppliers.update_one({"id": supplier_id}, {"$set": update_data})
    updated = await db.suppliers.find_one({"id": supplier_id}, {"_id": 0})
    return updated

@api_router.delete("/suppliers/{supplier_id}")
async def delete_supplier(supplier_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.suppliers.delete_one({"id": supplier_id, "user_id": current_user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return {"message": "Supplier deleted successfully"}

# ==================== TESTIMONIALS ROUTES ====================

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    # Return static testimonials for now
    testimonials = [
        Testimonial(
            id="1",
            client_name="Rajesh Kumar",
            company="TechMart India",
            role="Procurement Head",
            content="Ecovera Sourcing transformed our supply chain efficiency. Their quality control measures are exceptional, and we've seen a 40% reduction in defect rates since partnering with them.",
            rating=5,
            image_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        ),
        Testimonial(
            id="2",
            client_name="Priya Sharma",
            company="HomeStyle Living",
            role="CEO",
            content="The customized product development service exceeded our expectations. Ecovera helped us launch our private label line in record time with impeccable quality standards.",
            rating=5,
            image_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        ),
        Testimonial(
            id="3",
            client_name="Amit Patel",
            company="Global Exports Ltd",
            role="Operations Director",
            content="Their supplier network across India is remarkable. We've consolidated our vendor base from 50+ to just 15 highly reliable suppliers, all vetted by Ecovera.",
            rating=5,
            image_url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        )
    ]
    return testimonials

# ==================== FAQ ROUTES ====================

@api_router.get("/faqs", response_model=List[FAQ])
async def get_faqs():
    # Return static FAQs for now
    faqs = [
        FAQ(
            id="1",
            question="What industries do you serve?",
            answer="We serve a wide range of industries including consumer goods, electronics, textiles, home furnishings, automotive parts, packaging, and more. Our flexible approach allows us to adapt to various sector-specific requirements.",
            category="General"
        ),
        FAQ(
            id="2",
            question="How do you ensure product quality?",
            answer="We implement a rigorous 5-stage quality control process: pre-production inspection, in-process monitoring, pre-shipment inspection, loading supervision, and post-delivery audit. Each stage is documented and reported to our clients.",
            category="Quality"
        ),
        FAQ(
            id="3",
            question="What is your minimum order quantity (MOQ)?",
            answer="MOQ varies by product category and supplier. However, we work with manufacturers who accommodate both small trial orders and large-scale production runs. Contact us with your requirements for specific MOQ information.",
            category="Orders"
        ),
        FAQ(
            id="4",
            question="How long does the sourcing process take?",
            answer="Typical sourcing timelines range from 2-4 weeks for supplier identification and 4-8 weeks for sample development. Production lead times vary by product complexity, usually 30-60 days after order confirmation.",
            category="Process"
        ),
        FAQ(
            id="5",
            question="Do you handle customs and logistics?",
            answer="Yes, we provide end-to-end supply chain management including documentation, customs clearance coordination, freight forwarding, and last-mile delivery arrangements. We work with trusted logistics partners globally.",
            category="Logistics"
        ),
        FAQ(
            id="6",
            question="Can you help with product design and development?",
            answer="Absolutely! Our product development team can assist with concept refinement, technical specifications, material selection, prototype development, and design-for-manufacturing optimization.",
            category="Services"
        )
    ]
    return faqs

# ==================== STATS ROUTES ====================

@api_router.get("/stats")
async def get_public_stats():
    return {
        "suppliers": 500,
        "products_delivered": 10000,
        "clients_served": 200,
        "countries": 15,
        "years_experience": 10,
        "quality_rate": 99.5
    }

# ==================== DASHBOARD STATS ====================

@api_router.get("/dashboard/stats")
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    orders_count = await db.orders.count_documents({"user_id": current_user["id"]})
    suppliers_count = await db.suppliers.count_documents({"user_id": current_user["id"]})
    
    # Get orders value
    orders = await db.orders.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    total_value = sum(order.get("total_price", 0) for order in orders)
    
    # Count by status
    pending_orders = await db.orders.count_documents({"user_id": current_user["id"], "status": "pending"})
    completed_orders = await db.orders.count_documents({"user_id": current_user["id"], "status": "completed"})
    
    return {
        "total_orders": orders_count,
        "total_suppliers": suppliers_count,
        "total_value": total_value,
        "pending_orders": pending_orders,
        "completed_orders": completed_orders
    }

# ==================== ROOT ROUTE ====================

@api_router.get("/")
async def root():
    return {"message": "Ecovera Sourcing API", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
