import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, User, LogOut, Home, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_sourcingxperts/artifacts/i24d4eko_logo-png.png";

const PortalLayout = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/portal', icon: LayoutDashboard },
    { name: 'Orders', path: '/portal/orders', icon: Package },
    { name: 'Suppliers', path: '/portal/suppliers', icon: Users },
    { name: 'Profile', path: '/portal/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50" data-testid="portal-layout">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0B1120] h-16 flex items-center justify-between px-4">
        <img src={LOGO_URL} alt="Ecovera" className="h-8" />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white" data-testid="portal-mobile-menu-btn">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`portal-sidebar fixed top-0 left-0 w-64 z-30 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="portal-sidebar"
      >
        <div className="p-6">
          <img src={LOGO_URL} alt="Ecovera Sourcing" className="h-10 mb-8" />
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`portal-nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
                data-testid={`portal-nav-${item.name.toLowerCase()}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <Link
              to="/"
              className="portal-nav-item"
              data-testid="portal-nav-home"
            >
              <Home className="w-5 h-5" />
              <span>Back to Website</span>
            </Link>
            <button
              onClick={logout}
              className="portal-nav-item w-full text-left text-red-400 hover:text-red-300"
              data-testid="portal-logout-btn"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-white font-medium truncate">{user.contact_person}</p>
              <p className="text-slate-400 text-sm truncate">{user.company_name}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PortalLayout;
