import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import FAQPage from "@/pages/FAQPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

// Portal Pages
import PortalDashboard from "@/pages/portal/Dashboard";
import PortalOrders from "@/pages/portal/Orders";
import PortalSuppliers from "@/pages/portal/Suppliers";
import PortalProfile from "@/pages/portal/Profile";

// Components
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Portal Routes */}
          <Route path="/portal" element={<ProtectedRoute><PortalDashboard /></ProtectedRoute>} />
          <Route path="/portal/orders" element={<ProtectedRoute><PortalOrders /></ProtectedRoute>} />
          <Route path="/portal/suppliers" element={<ProtectedRoute><PortalSuppliers /></ProtectedRoute>} />
          <Route path="/portal/profile" element={<ProtectedRoute><PortalProfile /></ProtectedRoute>} />
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
