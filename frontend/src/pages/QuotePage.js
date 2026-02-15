import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const QuotePage = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    product_category: '',
    product_description: '',
    quantity: '',
    target_price: '',
    delivery_timeline: '',
    quality_requirements: '',
    additional_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/quotes`, formData);
      setSubmitted(true);
      toast.success('Quote request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit quote request. Please try again.');
      console.error('Quote form error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Consumer Electronics',
    'Home & Kitchen',
    'Textiles & Apparel',
    'Automotive Parts',
    'Industrial Equipment',
    'Packaging Materials',
    'Health & Beauty',
    'Food & Beverage',
    'Other'
  ];

  const timelines = [
    'Urgent (1-2 weeks)',
    'Standard (2-4 weeks)',
    'Flexible (4-8 weeks)',
    'Long-term (8+ weeks)'
  ];

  if (submitted) {
    return (
      <div className="min-h-screen" data-testid="quote-success-page">
        <Navbar />
        <section className="pt-32 pb-20 min-h-[80vh] flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Quote Request Submitted!
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Thank you for your interest in our services. Our team will review your requirements and get back to you within 24-48 hours.
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 h-14 px-8"
                onClick={() => setSubmitted(false)}
                data-testid="submit-another-btn"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="quote-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-slate-50" data-testid="quote-hero">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Get a Quote</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-2 mb-6">
              Request a Free Quote
            </h1>
            <p className="text-lg text-slate-600">
              Tell us about your sourcing requirements and our team will provide you with a customized solution tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-white" data-testid="quote-form-section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8" data-testid="quote-form">
              {/* Company Information */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b">Company Information</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company_name" className="text-slate-700">Company Name *</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Your Company Ltd."
                      required
                      className="mt-2 h-12"
                      data-testid="quote-company-input"
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
                      data-testid="quote-contact-input"
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
                      data-testid="quote-email-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="mt-2 h-12"
                      data-testid="quote-phone-input"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b">Product Details</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="product_category" className="text-slate-700">Product Category *</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('product_category', value)}
                      required
                    >
                      <SelectTrigger className="mt-2 h-12" data-testid="quote-category-select">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="product_description" className="text-slate-700">Product Description *</Label>
                    <Textarea
                      id="product_description"
                      name="product_description"
                      value={formData.product_description}
                      onChange={handleChange}
                      placeholder="Describe the product you're looking for, including specifications, materials, features, etc."
                      required
                      rows={4}
                      className="mt-2"
                      data-testid="quote-description-input"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="quantity" className="text-slate-700">Required Quantity *</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g., 1000 units"
                        required
                        className="mt-2 h-12"
                        data-testid="quote-quantity-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="target_price" className="text-slate-700">Target Price (per unit)</Label>
                      <Input
                        id="target_price"
                        name="target_price"
                        value={formData.target_price}
                        onChange={handleChange}
                        placeholder="e.g., $5-10 USD"
                        className="mt-2 h-12"
                        data-testid="quote-price-input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="delivery_timeline" className="text-slate-700">Delivery Timeline *</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('delivery_timeline', value)}
                      required
                    >
                      <SelectTrigger className="mt-2 h-12" data-testid="quote-timeline-select">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {timeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b">Additional Information</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="quality_requirements" className="text-slate-700">Quality Requirements</Label>
                    <Textarea
                      id="quality_requirements"
                      name="quality_requirements"
                      value={formData.quality_requirements}
                      onChange={handleChange}
                      placeholder="Any specific quality standards, certifications, or compliance requirements..."
                      rows={3}
                      className="mt-2"
                      data-testid="quote-quality-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additional_notes" className="text-slate-700">Additional Notes</Label>
                    <Textarea
                      id="additional_notes"
                      name="additional_notes"
                      value={formData.additional_notes}
                      onChange={handleChange}
                      placeholder="Any other information that might help us understand your requirements better..."
                      rows={3}
                      className="mt-2"
                      data-testid="quote-notes-input"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 h-14 px-8 w-full sm:w-auto"
                  disabled={loading}
                  data-testid="quote-submit-btn"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Quote Request
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuotePage;
