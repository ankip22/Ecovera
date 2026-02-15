import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_sourcingxperts/artifacts/i24d4eko_logo-png.png";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company_name: '',
    contact_person: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        company_name: formData.company_name,
        contact_person: formData.contact_person,
        phone: formData.phone
      });
      toast.success('Account created successfully!');
      navigate('/portal');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" data-testid="register-page">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-block mb-8">
            <img src={LOGO_URL} alt="Ecovera Sourcing" className="h-12" />
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600 mb-8">Join Ecovera Sourcing to access our client portal</p>

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="register-form">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name" className="text-slate-700">Company Name *</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Your Company"
                  required
                  className="mt-2 h-12"
                  data-testid="register-company-input"
                />
              </div>
              <div>
                <Label htmlFor="contact_person" className="text-slate-700">Contact Person *</Label>
                <Input
                  id="contact_person"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="mt-2 h-12"
                  data-testid="register-contact-input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                required
                className="mt-2 h-12"
                data-testid="register-email-input"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="mt-2 h-12"
                data-testid="register-phone-input"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700">Password *</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="h-12 pr-12"
                  data-testid="register-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-slate-700">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="mt-2 h-12"
                data-testid="register-confirm-password-input"
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-blue-600 hover:bg-blue-700 h-14"
              disabled={loading}
              data-testid="register-submit-btn"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline" data-testid="login-link">
              Sign In
            </Link>
          </p>

          <Link to="/" className="block mt-6 text-center text-slate-500 hover:text-slate-700">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 bg-slate-900 items-center justify-center p-16">
        <div className="max-w-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Network</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Create your account to access exclusive sourcing tools, track orders, manage suppliers, and streamline your procurement process with Ecovera.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
