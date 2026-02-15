import { Link } from 'react-router-dom';
import { Package, Users, Shield, Globe, TrendingUp, Clock, Search, FileCheck, Truck, Lightbulb, Handshake, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ServicesPage = () => {
  const services = [
    {
      icon: Package,
      title: 'Product Sourcing & Procurement',
      desc: 'End-to-end sourcing support from supplier identification to final delivery. We handle the entire procurement process, ensuring you get the best products at competitive prices.',
      features: ['Supplier identification', 'Price negotiation', 'Sample coordination', 'Order management']
    },
    {
      icon: Search,
      title: 'Supplier Discovery & Vendor Management',
      desc: 'Connecting you with verified, reliable, and high-performing manufacturers across India. Our rigorous vetting process ensures you work with only the best.',
      features: ['Factory audits', 'Supplier verification', 'Performance tracking', 'Relationship management']
    },
    {
      icon: Lightbulb,
      title: 'Customized Product Development',
      desc: 'Transforming concepts into market-ready products with tailored design solutions. From ideation to production, we support your product vision.',
      features: ['Concept refinement', 'Design support', 'Prototype development', 'Production setup']
    },
    {
      icon: Shield,
      title: 'Quality Control (QC) & Inspection',
      desc: 'Ensuring product consistency, compliance, and excellence at every stage of production. Our 5-stage QC process guarantees quality.',
      features: ['Pre-production inspection', 'In-process monitoring', 'Pre-shipment inspection', 'Quality reporting']
    },
    {
      icon: FileCheck,
      title: 'Production Monitoring & Coordination',
      desc: 'Real-time oversight to keep manufacturing on track and aligned with specifications. We monitor production to prevent delays and defects.',
      features: ['Timeline tracking', 'Specification compliance', 'Issue resolution', 'Progress reporting']
    },
    {
      icon: Truck,
      title: 'End-to-End Supply Chain Management',
      desc: 'Seamless handling of timelines, communication, logistics, and documentation. We manage your supply chain from start to finish.',
      features: ['Logistics coordination', 'Documentation', 'Customs support', 'Delivery tracking']
    },
    {
      icon: TrendingUp,
      title: 'Trend Research & Product Strategy',
      desc: 'Insights and guidance to build relevant, competitive product lines. Stay ahead of market trends with our research and strategic support.',
      features: ['Market analysis', 'Trend forecasting', 'Competitive insights', 'Product roadmapping']
    },
    {
      icon: Globe,
      title: 'Trading & Consolidation Services',
      desc: 'Supporting faster procurement through curated and ready-to-ship product options. Consolidate orders for efficiency and cost savings.',
      features: ['Ready inventory', 'Multi-supplier consolidation', 'Bulk purchasing', 'Fast shipping']
    },
    {
      icon: Handshake,
      title: 'Ethical & Transparent Operations',
      desc: 'Ensuring responsible sourcing, clear communication, and on-time execution. We operate with integrity and full transparency.',
      features: ['Ethical sourcing', 'Clear communication', 'On-time delivery', 'Full transparency']
    }
  ];

  return (
    <div className="min-h-screen" data-testid="services-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50" data-testid="services-hero">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-2 mb-6">
              Comprehensive Sourcing & Trading Solutions
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              From product development to delivery, we provide end-to-end support for your sourcing needs. Discover how we can help your business grow.
            </p>
            <Link to="/quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8" data-testid="services-quote-btn">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white" data-testid="services-grid">
        <div className="container-custom">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                data-testid={`service-detail-${index}`}
              >
                <div className={`${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="service-icon mb-6">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-slate-100 rounded-2xl aspect-video flex items-center justify-center ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <service.icon className="w-24 h-24 text-blue-600/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-slate-50" data-testid="process-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              How We Work
            </h2>
            <p className="text-slate-600 text-lg">
              A streamlined process designed to deliver results efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understand your requirements and goals' },
              { step: '02', title: 'Sourcing', desc: 'Find the right suppliers and products' },
              { step: '03', title: 'Quality Check', desc: 'Ensure products meet specifications' },
              { step: '04', title: 'Delivery', desc: 'Seamless logistics and handover' }
            ].map((item, index) => (
              <div key={index} className="text-center" data-testid={`process-step-${index}`}>
                <div className="text-6xl font-bold text-blue-600/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20" data-testid="services-cta">
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your sourcing requirements and discover how we can help your business succeed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8" data-testid="services-cta-quote-btn">
                Request a Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/30 text-white hover:bg-white/10" data-testid="services-cta-contact-btn">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
