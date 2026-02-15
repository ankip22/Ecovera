import { Link } from 'react-router-dom';
import { Target, Eye, Award, Users, Globe, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  const values = [
    { icon: Shield, title: 'Integrity', desc: 'We operate with honesty and transparency in all our dealings.' },
    { icon: Award, title: 'Excellence', desc: 'We strive for the highest standards in everything we do.' },
    { icon: Users, title: 'Partnership', desc: 'We build lasting relationships based on mutual trust and respect.' },
    { icon: Globe, title: 'Innovation', desc: 'We continuously improve our processes and solutions.' },
  ];

  const milestones = [
    { year: '2014', event: 'Founded with a vision to transform sourcing in India' },
    { year: '2016', event: 'Expanded supplier network to 100+ verified manufacturers' },
    { year: '2018', event: 'Launched end-to-end supply chain management services' },
    { year: '2020', event: 'Served 100+ clients across 10 countries' },
    { year: '2022', event: 'Achieved 99.5% quality rate milestone' },
    { year: '2024', event: 'Network expanded to 500+ suppliers, 15 countries served' },
  ];

  const team = [
    { name: 'Leadership Team', role: 'Combined 50+ years of sourcing expertise', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    { name: 'Quality Team', role: 'Dedicated QC professionals across India', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    { name: 'Operations Team', role: 'Seamless logistics and coordination', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
  ];

  return (
    <div className="min-h-screen" data-testid="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50" data-testid="about-hero">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-2 mb-6">
                Your Trusted Sourcing Partner
              </h1>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We are a leading end-to-end sourcing and trading partner, delivering seamless product solutions from concept to delivery. With a strong network of vetted manufacturers and suppliers across India, we specialize in customized product development, quality assurance, and efficient supply-chain execution.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our mission is to support brands and businesses in building reliable, scalable, and high-quality product lines through strategic sourcing, product expertise, and ethical operations.
              </p>
              <Link to="/quote">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8" data-testid="about-quote-btn">
                  Work With Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1758518729711-1cbacd55efdb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjB0ZWFtJTIwbWVldGluZ3xlbnwwfHx8fDE3NzExNTIyNDV8MA&ixlib=rb-4.1.0&q=85"
                alt="Team meeting"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white" data-testid="mission-vision">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-2xl p-8" data-testid="mission-card">
              <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To transform ideas into market-ready products through tailored development, rigorous quality control, and transparent processes at every stage. We empower businesses to grow with confidence through seamless sourcing experiences.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8" data-testid="vision-card">
              <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted sourcing partner for businesses worldwide, known for our integrity, quality, and commitment to delivering results that exceed expectations. We aim to set the standard for ethical and efficient supply chain management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-slate-50" data-testid="values-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              What Drives Us
            </h2>
            <p className="text-slate-600 text-lg">
              Our core values guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 text-center card-hover"
                data-testid={`value-${index}`}
              >
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white" data-testid="timeline-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Milestones
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="flex gap-8 pb-8 last:pb-0"
                data-testid={`milestone-${index}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                    {milestone.year.slice(2)}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-sm text-blue-600 font-semibold mb-1">{milestone.year}</div>
                  <div className="text-slate-700">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strength Points */}
      <section className="section-padding bg-slate-900 text-white" data-testid="strengths-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Our Strength</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Why Partner With Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Understanding unique customer requirements',
              'Executing with precision and expertise',
              'Strategic sourcing across India',
              'Deep product and industry knowledge',
              'Ethical and transparent operations',
              'Delivering results that exceed expectations'
            ].map((strength, index) => (
              <div key={index} className="flex items-start gap-4" data-testid={`strength-${index}`}>
                <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20" data-testid="about-cta">
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Let's Build Something Great Together
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Partner with us and experience the difference that expertise, integrity, and dedication can make for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8" data-testid="about-cta-quote-btn">
                Start a Project
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/30 text-white hover:bg-white/10" data-testid="about-cta-contact-btn">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
