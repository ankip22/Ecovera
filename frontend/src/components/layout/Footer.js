import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_sourcingxperts/artifacts/i24d4eko_logo-png.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section" data-testid="main-footer">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <img src={LOGO_URL} alt="Ecovera Sourcing" className="h-12 mb-6" />
            <p className="text-slate-400 mb-6 leading-relaxed">
              Your trusted end-to-end sourcing and trading partner. Delivering seamless product solutions from concept to delivery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors" data-testid="social-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors" data-testid="social-twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="footer-link">Our Services</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/quote" className="footer-link">Get Quote</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="footer-link">Product Sourcing</Link></li>
              <li><Link to="/services" className="footer-link">Supplier Discovery</Link></li>
              <li><Link to="/services" className="footer-link">Quality Control</Link></li>
              <li><Link to="/services" className="footer-link">Supply Chain</Link></li>
              <li><Link to="/services" className="footer-link">Product Development</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="footer-link">+91 9057905733</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@ecoverasourcing.com" className="footer-link">info@ecoverasourcing.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Ecovera Sourcing. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;