import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: 'Address', content: 'Mumbai, Maharashtra, India', link: null },
    { icon: Phone, title: 'Phone', content: '+91 98765 43210', link: 'tel:+919876543210' },
    { icon: Mail, title: 'Email', content: 'info@ecoverasourcing.com', link: 'mailto:info@ecoverasourcing.com' },
    { icon: Clock, title: 'Business Hours', content: 'Mon - Sat: 9:00 AM - 6:00 PM IST', link: null },
  ];

  return (
    <div className="min-h-screen" data-testid="contact-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50" data-testid="contact-hero">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-2 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600">
              Have questions about our services? We're here to help. Reach out to us and our team will get back to you promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white" data-testid="contact-form-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-700">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="mt-2 h-12"
                      data-testid="contact-name-input"
                    />
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
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="mt-2 h-12"
                      data-testid="contact-phone-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-slate-700">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="mt-2 h-12"
                      data-testid="contact-company-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    required
                    rows={6}
                    className="mt-2"
                    data-testid="contact-message-input"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 h-14 px-8"
                  disabled={loading}
                  data-testid="contact-submit-btn"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl"
                    data-testid={`contact-info-${index}`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-blue-600 hover:underline">
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-slate-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-slate-100 rounded-xl h-64 flex items-center justify-center" data-testid="contact-map">
                <div className="text-center text-slate-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
