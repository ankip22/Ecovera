import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Package, Users, Globe, CheckCircle, Shield, Clock, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HERO_BG = "https://images.unsplash.com/photo-1685119166946-d4050647b0e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjBtaW5pbWFsfGVufDB8fHx8MTc3MTE1MjIzMnww&ixlib=rb-4.1.0&q=85";

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, testimonialsRes, faqsRes] = await Promise.all([
          axios.get(`${API}/stats`),
          axios.get(`${API}/testimonials`),
          axios.get(`${API}/faqs`)
        ]);
        setStats(statsRes.data);
        setTestimonials(testimonialsRes.data);
        setFaqs(faqsRes.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const services = [
    { icon: Package, title: 'Product Sourcing', desc: 'End-to-end sourcing support from supplier identification to final delivery.' },
    { icon: Users, title: 'Supplier Discovery', desc: 'Connect with verified, reliable, and high-performing manufacturers.' },
    { icon: Shield, title: 'Quality Control', desc: 'Ensuring product consistency, compliance, and excellence at every stage.' },
    { icon: Globe, title: 'Supply Chain', desc: 'Seamless handling of timelines, logistics, and documentation.' },
    { icon: TrendingUp, title: 'Product Development', desc: 'Transform concepts into market-ready products with tailored solutions.' },
    { icon: Clock, title: 'On-Time Delivery', desc: 'Ethical, transparent operations ensuring reliable execution.' },
  ];

  const whyChooseUs = [
    { title: 'Vetted Network', desc: '500+ verified suppliers across India with proven track records.' },
    { title: 'Quality First', desc: '99.5% quality rate through rigorous 5-stage QC process.' },
    { title: 'End-to-End Support', desc: 'From concept to delivery, we handle everything.' },
    { title: 'Transparent Operations', desc: 'Real-time updates and clear communication at every step.' },
  ];

  const partners = [
    'TechMart', 'GlobalTrade', 'IndiaExports', 'QualityFirst', 'SupplyPro', 'TradeLink'
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="hero-section relative"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        data-testid="hero-section"
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="container-custom relative z-10 py-32 pt-40">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-6 animate-fade-in">
              Your Supply, Our Priority
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in stagger-1" style={{ lineHeight: 1.1 }}>
              End-to-End Sourcing & Trading Solutions
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl animate-fade-in stagger-2">
              Delivering seamless product solutions from concept to delivery. Partner with India's leading sourcing experts for reliable, scalable, and high-quality product lines.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in stagger-3">
              <Link to="/quote">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-base" data-testid="hero-quote-btn">
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/30 text-white hover:bg-white/10" data-testid="hero-services-btn">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="bg-white py-16 border-b" data-testid="stats-section">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat-card animate-fade-in" data-testid="stat-suppliers">
                <div className="stat-number">{stats.suppliers}+</div>
                <div className="stat-label">Verified Suppliers</div>
              </div>
              <div className="stat-card animate-fade-in stagger-1" data-testid="stat-products">
                <div className="stat-number">{(stats.products_delivered / 1000).toFixed(0)}K+</div>
                <div className="stat-label">Products Delivered</div>
              </div>
              <div className="stat-card animate-fade-in stagger-2" data-testid="stat-clients">
                <div className="stat-number">{stats.clients_served}+</div>
                <div className="stat-label">Clients Served</div>
              </div>
              <div className="stat-card animate-fade-in stagger-3" data-testid="stat-quality">
                <div className="stat-number">{stats.quality_rate}%</div>
                <div className="stat-label">Quality Rate</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="section-padding bg-slate-50" data-testid="services-section">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Comprehensive Sourcing Solutions
            </h2>
            <p className="text-slate-600 text-lg">
              From product development to delivery, we provide end-to-end support for your sourcing needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`service-card-${index}`}
              >
                <div className="service-icon">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="view-all-services-btn">
                View All Services
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white" data-testid="why-us-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Your Trusted Sourcing Partner
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                With years of experience and a strong network of vetted manufacturers across India, we deliver results that exceed expectations.
              </p>
              
              <div className="space-y-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1721937127582-ed331de95a04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjBtaW5pbWFsfGVufDB8fHx8MTc3MTE1MjIzMnww&ixlib=rb-4.1.0&q=85"
                alt="Warehouse"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-slate-50" data-testid="testimonials-section">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
                What Our Clients Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="testimonial-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                  data-testid={`testimonial-${index}`}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image_url} 
                      alt={testimonial.client_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.client_name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      <section className="py-16 bg-white border-y" data-testid="partners-section">
        <div className="container-custom">
          <p className="text-center text-slate-500 mb-8 font-medium">Trusted by Leading Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="text-2xl font-bold text-slate-300 hover:text-slate-500 transition-colors cursor-default"
                data-testid={`partner-${index}`}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      {faqs.length > 0 && (
        <section className="section-padding bg-slate-50" data-testid="faq-preview-section">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-600 text-lg mb-8">
                  Find answers to common questions about our sourcing services and processes.
                </p>
                <Link to="/faq">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="view-all-faq-btn">
                    View All FAQs
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="bg-white rounded-lg px-6 border"
                      data-testid={`faq-item-${index}`}
                    >
                      <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section py-20" data-testid="cta-section">
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Streamline Your Sourcing?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Get started with a free consultation. Our experts will help you find the right suppliers and optimize your supply chain.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/quote">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8" data-testid="cta-quote-btn">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 border-white/30 text-white hover:bg-white/10" data-testid="cta-contact-btn">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
