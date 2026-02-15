import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, Package, Users, Globe, CheckCircle, Shield, Clock, TrendingUp, Star, 
  Search, FileCheck, Truck, Lightbulb, Handshake, Mail, Phone, MapPin, Check,
  Building2, Award, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HERO_IMAGE = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80";
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80";

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, testimonialsRes] = await Promise.all([
          axios.get(`${API}/stats`),
          axios.get(`${API}/testimonials`)
        ]);
        setStats(statsRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      toast.success('Message sent successfully! We will get back to you soon.');
      setContactForm({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  const services = [
    { icon: Package, title: 'Product Sourcing & Procurement', desc: 'End-to-end sourcing support from supplier identification to final delivery.' },
    { icon: Search, title: 'Supplier Discovery & Vendor Management', desc: 'Connecting you with verified, reliable, and high-performing manufacturers.' },
    { icon: Lightbulb, title: 'Customized Product Development', desc: 'Transforming concepts into market-ready products with tailored design solutions.' },
    { icon: Shield, title: 'Quality Control & Inspection', desc: 'Ensuring product consistency, compliance, and excellence at every stage of production.' },
    { icon: FileCheck, title: 'Production Monitoring', desc: 'Real-time oversight to keep manufacturing on track and aligned with specifications.' },
    { icon: Truck, title: 'Supply Chain Management', desc: 'Seamless handling of timelines, communication, logistics, and documentation.' },
    { icon: TrendingUp, title: 'Trend Research & Product Strategy', desc: 'Insights and guidance to build relevant, competitive product lines.' },
    { icon: Globe, title: 'Trading & Consolidation', desc: 'Supporting faster procurement through curated and ready-to-ship product options.' },
    { icon: Handshake, title: 'Ethical & Transparent Operations', desc: 'Ensuring responsible sourcing, clear communication, and on-time execution.' },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery & Consultation', desc: 'We begin by understanding your unique requirements, product specifications, and business goals through detailed consultation.' },
    { step: '02', title: 'Supplier Identification', desc: 'Leveraging our extensive network, we identify and vet the most suitable manufacturers and suppliers for your needs.' },
    { step: '03', title: 'Product Development', desc: 'Our team works closely with manufacturers to develop prototypes, refine designs, and ensure product specifications are met.' },
    { step: '04', title: 'Quality Assurance', desc: 'Rigorous quality control checks at every production stage to ensure consistency, compliance, and excellence.' },
    { step: '05', title: 'Production & Monitoring', desc: 'Real-time oversight of manufacturing processes with regular updates and coordination to keep everything on track.' },
    { step: '06', title: 'Delivery & Support', desc: 'Seamless logistics management from factory to your doorstep, with continued support for future requirements.' },
  ];

  const caseStudies = [
    {
      title: 'Home Decor Brand Launch',
      category: 'Product Development',
      client: 'Nordic Living Co.',
      image: 'https://images.unsplash.com/photo-1672380135241-c024f7fbfa13?w=600&q=80',
      challenge: 'A new home decor brand needed to source and develop 50+ SKUs from concept to market launch within 6 months.',
      solution: 'We identified specialized manufacturers across India, managed custom product development, conducted rigorous QC, and coordinated production timelines.',
      results: ['Launched 52 products on schedule', '98% quality approval rate', '20% cost savings vs. initial quotes', 'Established reliable supplier relationships'],
      timeline: '6 months'
    },
    {
      title: 'Electronics Accessories Scaling',
      category: 'Supply Chain Management',
      client: 'TechGear Solutions',
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&q=80',
      challenge: 'Rapidly scale production of mobile accessories from 10,000 to 100,000 units monthly while maintaining quality.',
      solution: 'Expanded supplier network, implemented multi-tier QC process, and established backup manufacturing partnerships.',
      results: ['10x production increase achieved', '99.2% quality compliance', '15% reduction in unit costs', 'Zero stockouts during scaling'],
      timeline: '4 months'
    },
    {
      title: 'Sustainable Fashion Line',
      category: 'Ethical Sourcing',
      client: 'EcoWear Fashion',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      challenge: 'Launch an eco-friendly fashion line with certified sustainable materials and ethical manufacturing.',
      solution: 'Sourced GOTS-certified organic cotton suppliers, established fair-trade manufacturing partnerships, and implemented full supply chain transparency.',
      results: ['100% sustainable materials sourced', 'Fair-trade certified production', '30% premium pricing achieved', 'Full traceability implemented'],
      timeline: '8 months'
    }
  ];

  const whyChooseUs = [
    { icon: Globe, title: 'Extensive Network', desc: 'Access to vetted manufacturers and suppliers across India in diverse product categories.' },
    { icon: Shield, title: 'Quality First', desc: 'Rigorous QC processes ensure consistent excellence and compliance at every production stage.' },
    { icon: CheckCircle, title: 'Transparent Operations', desc: 'Clear communication, real-time updates, and complete visibility throughout the entire process.' },
    { icon: Handshake, title: 'Ethical Sourcing', desc: 'Committed to responsible sourcing practices and sustainable supplier partnerships.' },
    { icon: Clock, title: 'On-Time Delivery', desc: 'Proven track record of meeting timelines and maintaining reliable, consistent availability.' },
    { icon: Lightbulb, title: 'Custom Solutions', desc: 'Tailored approach to meet unique requirements and transform concepts into reality.' },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden" data-testid="hero-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                Trusted Sourcing Partner
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6" style={{ lineHeight: 1.1 }}>
                Transform Ideas into <span className="text-blue-600">Market-Ready</span> Products
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We are a leading end-to-end sourcing and trading partner, delivering seamless product solutions from concept to delivery. With a strong network of vetted manufacturers across India, we deliver seamless product solutions from concept to delivery.
              </p>
              
              <div className="space-y-3 mb-8">
                {['Vetted manufacturers across India', 'End-to-end quality assurance', 'On-time delivery guaranteed'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/quote">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-base" data-testid="hero-quote-btn">
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="#services">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base border-slate-300 hover:bg-slate-50" data-testid="hero-services-btn">
                    Explore Services
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in stagger-2">
              <img 
                src={HERO_IMAGE}
                alt="Business Partnership"
                className="rounded-2xl shadow-2xl w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-slate-500 text-sm">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white" data-testid="services-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Comprehensive Sourcing Solutions
            </h2>
            <p className="text-slate-600 text-lg">
              From product discovery to final delivery, we provide end-to-end services that ensure quality, efficiency, and peace of mind at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group p-8 bg-white border border-slate-200 rounded-xl hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                data-testid={`service-card-${index}`}
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center mb-6 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-slate-50 rounded-2xl">
            <p className="text-slate-700 mb-4">Need a custom solution? We're here to help.</p>
            <Link to="/quote">
              <Button className="bg-blue-600 hover:bg-blue-700">Discuss Your Requirements</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-slate-50" data-testid="about-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Your Trusted Partner in Global Sourcing
            </h2>
            <p className="text-slate-600 text-lg">
              Driven by quality and guided by integrity, we deliver seamless sourcing experiences that empower businesses to grow with confidence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '500+', label: 'Verified Suppliers' },
              { value: '200+', label: 'Successful Projects' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '50+', label: 'Product Categories' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm" data-testid={`about-stat-${index}`}>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={ABOUT_IMAGE}
                alt="Global Supply Chain"
                className="rounded-2xl shadow-xl w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Transforming Ideas into Market-Ready Products</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We are a leading end-to-end sourcing and trading partner, delivering seamless product solutions from concept to delivery. With a strong network of vetted manufacturers and suppliers across India, we specialize in customized product development, quality assurance, and efficient supply-chain execution.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our strength lies in understanding unique customer requirements and executing with precision—combining strategic sourcing, product expertise, and ethical operations to deliver results that exceed expectations.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Target, title: 'Strategic Sourcing', desc: 'Leveraging our extensive network to connect you with the best manufacturers' },
                  { icon: Award, title: 'Product Expertise', desc: 'Deep industry knowledge to guide you from concept to production' },
                  { icon: Handshake, title: 'Ethical Operations', desc: 'Committed to transparency, sustainability, and responsible sourcing' }
                ].map((item, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Choose Us</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex gap-4 p-6 bg-white rounded-xl" data-testid={`why-us-${index}`}>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="section-padding bg-white" data-testid="process-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              How We Work
            </h2>
            <p className="text-slate-600 text-lg">
              A proven, systematic approach that ensures quality, transparency, and successful outcomes at every stage of your sourcing journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative" data-testid={`process-step-${index}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                    {index < processSteps.length - 1 && index % 3 !== 2 && (
                      <div className="hidden lg:block absolute top-7 left-14 w-full h-0.5 bg-blue-200" style={{ width: 'calc(100% - 56px)' }} />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-8 bg-slate-900 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Sourcing Journey?</h3>
            <p className="text-slate-400 mb-6">Let's discuss your requirements and create a customized solution that brings your product vision to life.</p>
            <Link to="/quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8">Get Started Today</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="section-padding bg-slate-50" data-testid="case-studies-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Case Studies
            </h2>
            <p className="text-slate-600 text-lg">
              Real results from real partnerships. See how we've helped businesses transform their sourcing operations and achieve remarkable outcomes.
            </p>
          </div>

          {/* Case Study Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {caseStudies.map((cs, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCase === index 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
                data-testid={`case-tab-${index}`}
              >
                {cs.title}
              </button>
            ))}
          </div>

          {/* Active Case Study */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={caseStudies[activeCase].image}
                  alt={caseStudies[activeCase].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {caseStudies[activeCase].category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-sm text-slate-600">Timeline: </span>
                  <span className="font-semibold text-slate-900">{caseStudies[activeCase].timeline}</span>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{caseStudies[activeCase].title}</h3>
                <p className="text-blue-600 font-medium mb-6">Client: {caseStudies[activeCase].client}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Challenge</h4>
                    <p className="text-slate-600">{caseStudies[activeCase].challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Solution</h4>
                    <p className="text-slate-600">{caseStudies[activeCase].solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Results</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {caseStudies[activeCase].results.map((result, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-white" data-testid="testimonials-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Client Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 text-lg">
              Don't just take our word for it. Hear from the businesses we've helped achieve their sourcing and product development goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                content: "Working with this team transformed our sourcing operations. Their attention to detail and supplier network helped us launch three new product lines ahead of schedule.",
                name: "Sarah Johnson",
                role: "Procurement Director",
                company: "Lifestyle Brands Co.",
                initials: "SJ"
              },
              {
                content: "Exceptional service from concept to delivery. The quality control process gave us complete confidence, and the products exceeded our expectations.",
                name: "Raj Patel",
                role: "CEO",
                company: "TechHome Solutions",
                initials: "RP"
              },
              {
                content: "Their transparent approach and ethical sourcing practices align perfectly with our values. Communication is seamless, and delivery is always on time.",
                name: "Michael Chen",
                role: "Supply Chain Manager",
                company: "Retail Innovations Ltd.",
                initials: "MC"
              },
              {
                content: "The customized product development service is outstanding. They turned our concepts into market-ready products with incredible precision and speed.",
                name: "Priya Sharma",
                role: "Product Development Head",
                company: "Fashion Forward Inc.",
                initials: "PS"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-slate-50 rounded-2xl p-8 ${index === 3 ? 'lg:col-span-1 md:col-span-2 lg:col-start-2' : ''}`}
                data-testid={`testimonial-${index}`}
              >
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-12 py-8 border-t border-b border-slate-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">200+</div>
              <div className="text-slate-500 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">98%</div>
              <div className="text-slate-500 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">500+</div>
              <div className="text-slate-500 text-sm">Projects Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-slate-50" data-testid="contact-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Start Your Sourcing Journey
            </h2>
            <p className="text-slate-600 text-lg">
              Ready to transform your product ideas into reality? Reach out to discuss your requirements and discover how we can help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Email Us</h4>
                  <a href="mailto:info@ecoverasourcing.com" className="text-blue-600 hover:underline">info@ecoverasourcing.com</a>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Call Us</h4>
                  <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 98765 43210</a>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Visit Us</h4>
                  <p className="text-slate-600">Mumbai, Maharashtra, India</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Business Hours</h4>
                  <p className="text-slate-600">Monday - Friday: 9:00 - 18:00</p>
                  <p className="text-slate-600">Saturday: 10:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-5" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-slate-700">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="John Doe"
                      required
                      className="mt-1.5"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="john@company.com"
                      required
                      className="mt-1.5"
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="company" className="text-slate-700">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={contactForm.company}
                      onChange={handleContactChange}
                      placeholder="Your Company"
                      className="mt-1.5"
                      data-testid="contact-company-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      placeholder="+91 98765 43210"
                      className="mt-1.5"
                      data-testid="contact-phone-input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-slate-700">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Tell us about your requirements..."
                    required
                    rows={5}
                    className="mt-1.5"
                    data-testid="contact-message-input"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12"
                  disabled={contactLoading}
                  data-testid="contact-submit-btn"
                >
                  {contactLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
