# Ecovera Sourcing - Product Requirements Document

## Company Details
- **Name:** Ecovera Sourcing
- **Tagline:** "Your Supply, Our Priority"
- **Industry:** End-to-end sourcing and trading solutions

## Original Problem Statement
Build a corporate website for Ecovera Sourcing - a leading sourcing and trading partner delivering seamless product solutions from concept to delivery. Features include informational/corporate pages, lead generation forms, and a client portal.

## User Requirements
- Blue and white color theme
- Professional & Corporate design
- Full platform: Informational site + Lead generation + Client Portal
- Simple contact form
- Testimonials, Partner logos, FAQ sections

## Architecture
- **Frontend:** React with Shadcn UI components, Tailwind CSS
- **Backend:** FastAPI with Python
- **Database:** MongoDB
- **Authentication:** JWT-based

## User Personas
1. **Business Owners** - Looking for sourcing partners
2. **Procurement Managers** - Managing supplier relationships
3. **Product Developers** - Seeking custom product development

## Core Features (Implemented)

### Public Website
- [x] Homepage with hero, stats, services overview, testimonials, FAQ preview, CTA
- [x] Services page with 9 detailed service offerings
- [x] About page with mission, vision, values, milestones
- [x] Contact page with form submission
- [x] Quote request page with detailed form
- [x] FAQ page with search and category filter
- [x] Responsive navigation with mobile menu
- [x] Footer with company info, links, contact details

### Client Portal
- [x] User registration and login (JWT auth)
- [x] Dashboard with stats (orders, suppliers, total value)
- [x] Orders management (CRUD operations)
- [x] Suppliers management (CRUD operations)
- [x] Profile page
- [x] Sidebar navigation

### Backend APIs
- [x] Authentication: /api/auth/register, /api/auth/login, /api/auth/me
- [x] Contact: /api/contact
- [x] Quotes: /api/quotes
- [x] Orders: /api/orders (CRUD)
- [x] Suppliers: /api/suppliers (CRUD)
- [x] Stats: /api/stats, /api/dashboard/stats
- [x] Static data: /api/testimonials, /api/faqs

## Backlog (Future Enhancements)
### P0 (Critical)
- None remaining

### P1 (High Priority)
- Email notifications for contact/quote submissions
- Password reset functionality
- Order status email notifications

### P2 (Nice to Have)
- Admin panel for managing quotes/contacts
- Export orders/suppliers to CSV
- Multi-language support
- Dark mode toggle

## Tech Stack
- React 19, React Router DOM
- FastAPI, Python 3.x
- MongoDB, Motor (async driver)
- Shadcn UI, Tailwind CSS
- JWT for authentication
- Sonner for toast notifications

## Last Updated
December 2025

## Status
MVP Complete ✅
