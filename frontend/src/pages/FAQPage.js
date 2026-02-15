import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${API}/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen" data-testid="faq-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-slate-50" data-testid="faq-hero">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-2 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-600">
              Find answers to common questions about our sourcing services, processes, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b" data-testid="faq-search-section">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
                data-testid="faq-search-input"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  data-testid={`faq-category-${category.toLowerCase()}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding bg-white" data-testid="faq-list-section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="spinner"></div>
              </div>
            ) : filteredFAQs.length === 0 ? (
              <div className="text-center py-20" data-testid="faq-no-results">
                <p className="text-slate-500 text-lg mb-4">No FAQs found matching your search.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="bg-slate-50 rounded-xl px-6 border-none"
                    data-testid={`faq-accordion-${index}`}
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5 text-base">
                      <div className="flex items-start gap-4">
                        <span className="flex-1">{faq.question}</span>
                        <span className="text-xs font-normal bg-blue-100 text-blue-600 px-2 py-1 rounded-full flex-shrink-0">
                          {faq.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-slate-50" data-testid="faq-cta-section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8" data-testid="faq-contact-btn">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/quote">
                <Button size="lg" variant="outline" className="h-14 px-8 border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="faq-quote-btn">
                  Request a Quote
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

export default FAQPage;
