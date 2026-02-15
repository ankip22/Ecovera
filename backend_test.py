import requests
import sys
import json
from datetime import datetime

class EcoveraAPITester:
    def __init__(self, base_url="https://sourcingxperts.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if not success:
                details += f", Expected: {expected_status}"
                try:
                    error_data = response.json()
                    details += f", Response: {error_data}"
                except:
                    details += f", Response: {response.text[:200]}"

            self.log_test(name, success, details)
            
            if success:
                try:
                    return response.json()
                except:
                    return {}
            return None

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return None

    def test_public_endpoints(self):
        """Test public endpoints that don't require authentication"""
        print("\n🔍 Testing Public Endpoints...")
        
        # Test stats endpoint
        stats = self.run_test("Get Public Stats", "GET", "stats", 200)
        if stats:
            required_fields = ['suppliers', 'products_delivered', 'clients_served', 'countries', 'years_experience', 'quality_rate']
            missing_fields = [field for field in required_fields if field not in stats]
            if missing_fields:
                self.log_test("Stats Fields Validation", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Stats Fields Validation", True)

        # Test testimonials endpoint
        testimonials = self.run_test("Get Testimonials", "GET", "testimonials", 200)
        if testimonials and isinstance(testimonials, list) and len(testimonials) > 0:
            testimonial = testimonials[0]
            required_fields = ['id', 'client_name', 'company', 'role', 'content', 'rating']
            missing_fields = [field for field in required_fields if field not in testimonial]
            if missing_fields:
                self.log_test("Testimonials Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Testimonials Structure", True)

        # Test FAQs endpoint
        faqs = self.run_test("Get FAQs", "GET", "faqs", 200)
        if faqs and isinstance(faqs, list) and len(faqs) > 0:
            faq = faqs[0]
            required_fields = ['id', 'question', 'answer', 'category']
            missing_fields = [field for field in required_fields if field not in faq]
            if missing_fields:
                self.log_test("FAQs Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("FAQs Structure", True)

    def test_contact_form(self):
        """Test contact form submission"""
        print("\n📧 Testing Contact Form...")
        
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+91 9876543210",
            "company": "Test Company",
            "message": "This is a test message from automated testing."
        }
        
        result = self.run_test("Submit Contact Form", "POST", "contact", 200, contact_data)
        if result:
            required_fields = ['id', 'name', 'email', 'message', 'created_at', 'status']
            missing_fields = [field for field in required_fields if field not in result]
            if missing_fields:
                self.log_test("Contact Response Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Contact Response Structure", True)

    def test_quote_request(self):
        """Test quote request submission"""
        print("\n💰 Testing Quote Request...")
        
        quote_data = {
            "company_name": "Test Company Ltd",
            "contact_person": "John Doe",
            "email": "john@testcompany.com",
            "phone": "+91 9876543210",
            "product_category": "Consumer Electronics",
            "product_description": "High-quality wireless headphones with noise cancellation",
            "quantity": "1000 units",
            "target_price": "$50-70 USD",
            "delivery_timeline": "Standard (2-4 weeks)",
            "quality_requirements": "CE certification required",
            "additional_notes": "This is a test quote request"
        }
        
        result = self.run_test("Submit Quote Request", "POST", "quotes", 200, quote_data)
        if result:
            required_fields = ['id', 'company_name', 'contact_person', 'email', 'product_category', 'created_at', 'status']
            missing_fields = [field for field in required_fields if field not in result]
            if missing_fields:
                self.log_test("Quote Response Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Quote Response Structure", True)

    def test_user_registration(self):
        """Test user registration"""
        print("\n👤 Testing User Registration...")
        
        timestamp = datetime.now().strftime('%H%M%S')
        user_data = {
            "email": f"testuser{timestamp}@example.com",
            "password": "testpass123",
            "company_name": "Test Company Ltd",
            "contact_person": "Test User",
            "phone": "+91 9876543210"
        }
        
        result = self.run_test("User Registration", "POST", "auth/register", 200, user_data)
        if result and 'token' in result and 'user' in result:
            self.token = result['token']
            self.user_id = result['user']['id']
            self.log_test("Registration Token Received", True)
            
            # Validate user data structure
            user = result['user']
            required_fields = ['id', 'email', 'company_name', 'contact_person', 'created_at']
            missing_fields = [field for field in required_fields if field not in user]
            if missing_fields:
                self.log_test("User Data Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("User Data Structure", True)
        else:
            self.log_test("Registration Token Received", False, "No token in response")

    def test_user_login(self):
        """Test user login with existing credentials"""
        print("\n🔐 Testing User Login...")
        
        if not self.token:
            self.log_test("Login Test Skipped", False, "No registered user available")
            return
            
        # Get user info first to get email
        me_result = self.run_test("Get Current User", "GET", "auth/me", 200)
        if not me_result:
            self.log_test("Login Test Skipped", False, "Cannot get user info")
            return
            
        login_data = {
            "email": me_result['email'],
            "password": "testpass123"
        }
        
        # Clear token to test fresh login
        old_token = self.token
        self.token = None
        
        result = self.run_test("User Login", "POST", "auth/login", 200, login_data)
        if result and 'token' in result:
            self.token = result['token']
            self.log_test("Login Token Received", True)
        else:
            self.token = old_token  # Restore old token
            self.log_test("Login Token Received", False, "No token in response")

    def test_dashboard_stats(self):
        """Test dashboard stats (requires authentication)"""
        print("\n📊 Testing Dashboard Stats...")
        
        if not self.token:
            self.log_test("Dashboard Stats Test Skipped", False, "No authentication token")
            return
            
        result = self.run_test("Get Dashboard Stats", "GET", "dashboard/stats", 200)
        if result:
            required_fields = ['total_orders', 'total_suppliers', 'total_value', 'pending_orders', 'completed_orders']
            missing_fields = [field for field in required_fields if field not in result]
            if missing_fields:
                self.log_test("Dashboard Stats Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Dashboard Stats Structure", True)

    def test_orders_crud(self):
        """Test Orders CRUD operations"""
        print("\n📦 Testing Orders CRUD...")
        
        if not self.token:
            self.log_test("Orders CRUD Test Skipped", False, "No authentication token")
            return

        # Create Order
        order_data = {
            "product_name": "Test Product",
            "quantity": 100,
            "unit_price": 25.50,
            "notes": "Test order from automated testing"
        }
        
        created_order = self.run_test("Create Order", "POST", "orders", 200, order_data)
        if not created_order:
            self.log_test("Orders CRUD Test Failed", False, "Could not create order")
            return
            
        order_id = created_order.get('id')
        if not order_id:
            self.log_test("Order ID Missing", False, "No ID in created order")
            return
            
        self.log_test("Order Created Successfully", True)

        # Get Orders List
        orders_list = self.run_test("Get Orders List", "GET", "orders", 200)
        if orders_list and isinstance(orders_list, list):
            self.log_test("Get Orders List", True)
        else:
            self.log_test("Get Orders List", False, "Invalid response format")

        # Get Single Order
        single_order = self.run_test("Get Single Order", "GET", f"orders/{order_id}", 200)
        if single_order and single_order.get('id') == order_id:
            self.log_test("Get Single Order", True)
        else:
            self.log_test("Get Single Order", False, "Order not found or ID mismatch")

        # Update Order
        update_data = {
            "quantity": 150,
            "status": "processing"
        }
        updated_order = self.run_test("Update Order", "PATCH", f"orders/{order_id}", 200, update_data)
        if updated_order and updated_order.get('quantity') == 150:
            self.log_test("Update Order", True)
        else:
            self.log_test("Update Order", False, "Order not updated correctly")

        # Delete Order
        delete_result = self.run_test("Delete Order", "DELETE", f"orders/{order_id}", 200)
        if delete_result:
            self.log_test("Delete Order", True)
        else:
            self.log_test("Delete Order", False, "Order not deleted")

    def test_suppliers_crud(self):
        """Test Suppliers CRUD operations"""
        print("\n🏭 Testing Suppliers CRUD...")
        
        if not self.token:
            self.log_test("Suppliers CRUD Test Skipped", False, "No authentication token")
            return

        # Create Supplier
        supplier_data = {
            "name": "Test Supplier Co.",
            "contact_person": "Jane Smith",
            "email": "jane@testsupplier.com",
            "phone": "+91 9876543210",
            "address": "Mumbai, Maharashtra, India",
            "product_categories": ["Electronics", "Textiles"],
            "rating": 4.5,
            "notes": "Test supplier from automated testing"
        }
        
        created_supplier = self.run_test("Create Supplier", "POST", "suppliers", 200, supplier_data)
        if not created_supplier:
            self.log_test("Suppliers CRUD Test Failed", False, "Could not create supplier")
            return
            
        supplier_id = created_supplier.get('id')
        if not supplier_id:
            self.log_test("Supplier ID Missing", False, "No ID in created supplier")
            return
            
        self.log_test("Supplier Created Successfully", True)

        # Get Suppliers List
        suppliers_list = self.run_test("Get Suppliers List", "GET", "suppliers", 200)
        if suppliers_list and isinstance(suppliers_list, list):
            self.log_test("Get Suppliers List", True)
        else:
            self.log_test("Get Suppliers List", False, "Invalid response format")

        # Get Single Supplier
        single_supplier = self.run_test("Get Single Supplier", "GET", f"suppliers/{supplier_id}", 200)
        if single_supplier and single_supplier.get('id') == supplier_id:
            self.log_test("Get Single Supplier", True)
        else:
            self.log_test("Get Single Supplier", False, "Supplier not found or ID mismatch")

        # Update Supplier
        update_data = {
            "rating": 5.0,
            "status": "active"
        }
        updated_supplier = self.run_test("Update Supplier", "PATCH", f"suppliers/{supplier_id}", 200, update_data)
        if updated_supplier and updated_supplier.get('rating') == 5.0:
            self.log_test("Update Supplier", True)
        else:
            self.log_test("Update Supplier", False, "Supplier not updated correctly")

        # Delete Supplier
        delete_result = self.run_test("Delete Supplier", "DELETE", f"suppliers/{supplier_id}", 200)
        if delete_result:
            self.log_test("Delete Supplier", True)
        else:
            self.log_test("Delete Supplier", False, "Supplier not deleted")

    def test_authenticated_quotes(self):
        """Test getting quotes as authenticated user"""
        print("\n📋 Testing Authenticated Quotes...")
        
        if not self.token:
            self.log_test("Authenticated Quotes Test Skipped", False, "No authentication token")
            return
            
        quotes = self.run_test("Get User Quotes", "GET", "quotes", 200)
        if quotes is not None and isinstance(quotes, list):
            self.log_test("Get User Quotes", True)
        else:
            self.log_test("Get User Quotes", False, "Invalid response format")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Ecovera Sourcing API Tests...")
        print(f"Testing against: {self.base_url}")
        
        # Test public endpoints first
        self.test_public_endpoints()
        self.test_contact_form()
        self.test_quote_request()
        
        # Test authentication
        self.test_user_registration()
        self.test_user_login()
        
        # Test authenticated endpoints
        self.test_dashboard_stats()
        self.test_orders_crud()
        self.test_suppliers_crud()
        self.test_authenticated_quotes()
        
        # Print summary
        print(f"\n📊 Test Summary:")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = EcoveraAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())