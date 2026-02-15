import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_sourcingxperts/artifacts/i24d4eko_logo-png.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass" data-testid="main-navbar">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
              <img 
                src={LOGO_URL} 
                alt="Ecovera Sourcing" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/quote">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="nav-quote-btn">
                  Get Quote
                </Button>
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link to="/portal">
                    <Button className="bg-blue-600 hover:bg-blue-700" data-testid="nav-portal-btn">
                      Client Portal
                    </Button>
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-sm text-slate-600 hover:text-slate-900"
                    data-testid="nav-logout-btn"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700" data-testid="nav-login-btn">
                    Client Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="mobile-menu-btn"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`overlay ${mobileMenuOpen ? 'visible' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} data-testid="mobile-menu">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <img src={LOGO_URL} alt="Ecovera" className="h-10" />
            <button onClick={() => setMobileMenuOpen(false)} data-testid="close-mobile-menu">
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium ${isActive(link.path) ? 'text-blue-600' : 'text-slate-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <hr className="my-4" />
            
            <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-blue-600 text-blue-600">
                Get Quote
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Client Portal
                  </Button>
                </Link>
                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-center text-slate-600 hover:text-slate-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Client Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
