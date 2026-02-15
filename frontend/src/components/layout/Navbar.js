import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_sourcingxperts/artifacts/i24d4eko_logo-png.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', hash: '#home' },
    { name: 'Services', path: '/', hash: '#services' },
    { name: 'About', path: '/', hash: '#about' },
    { name: 'How We Work', path: '/', hash: '#how-we-work' },
    { name: 'Case Studies', path: '/', hash: '#case-studies' },
    { name: 'Testimonials', path: '/', hash: '#testimonials' },
    { name: 'Contact', path: '/', hash: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    if (isHomePage && link.hash) {
      e.preventDefault();
      const element = document.querySelector(link.hash);
      if (element) {
        const offset = 80; // navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-lg'
        }`} 
        data-testid="main-navbar"
      >
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
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={isHomePage ? link.hash : `/${link.hash}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/portal">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="nav-portal-btn">
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
                </>
              ) : (
                <Link to="/quote">
                  <Button className="bg-blue-600 hover:bg-blue-700" data-testid="nav-get-started-btn">
                    Get Started
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
              <a
                key={link.name}
                href={isHomePage ? link.hash : `/${link.hash}`}
                onClick={(e) => handleNavClick(e, link)}
                className="text-lg font-medium text-slate-700 hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}
            
            <hr className="my-4" />
            
            {isAuthenticated ? (
              <>
                <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600">
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
              <>
                <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Client Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
