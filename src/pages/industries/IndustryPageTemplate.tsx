import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollAnimateWrapper } from '../../components/ScrollAnimateWrapper';
import { SEOHead } from '../../components/SEOHead';
import { useState } from 'react';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

export interface IndustryService {
  name: string;
  description: string;
  link: string;
  color: string;
  bg: string;
}

export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface IndustryPageData {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    label: string;
    headline: string;
    subheadline: string;
    highlightWord?: string;
  };
  painPoints: {
    title: string;
    items: string[];
  };
  services: IndustryService[];
  howWeHelp: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  approach: {
    seo: string;
    ads: string;
    website: string;
    conversion: string;
  };
  results: {
    stats: { value: string; label: string }[];
    testimonial?: { quote: string; author: string; company: string };
  };
  faqs: IndustryFAQ[];
}

function FAQItem({ question, answer }: IndustryFAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-7 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#111111] pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#6B7280] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#6B7280] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-7 pb-6 bg-white">
          <p className="text-[#6B7280] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  return (
    <>
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
      />

      <section className="relative bg-white py-20 md:py-28 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                {data.hero.label}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
                {data.hero.headline}
              </h1>
              <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed">
                {data.hero.subheadline}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/free-seo-audit"
                  className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2 shadow-lg shadow-blue-100"
                >
                  <Search className="w-5 h-5" />
                  Get Free AI Marketing Audit
                </Link>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors flex items-center gap-2"
                >
                  Book Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                {['No long-term contracts', 'Results-focused strategy', 'Canadian team'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <CheckCircle className="w-4 h-4 text-[#059669]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Pain Points</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">{data.painPoints.title}</h2>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {data.painPoints.items.map((item, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i % 2 === 1 ? 100 : 0}>
                <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-400 font-bold text-sm">✕</span>
                  </div>
                  <p className="text-[#374151] font-medium leading-relaxed">{item}</p>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">
                What we do for {data.hero.label.toLowerCase()}
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto">
                Every service is purpose-built to drive growth in your specific market and industry.
              </p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((service, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i % 3 === 1 ? 100 : i % 3 === 2 ? 200 : 0}>
                <div className="rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
                  style={{ background: `linear-gradient(135deg, ${service.bg}40 0%, white 60%)` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: service.bg }}>
                    <span className="font-bold text-sm" style={{ color: service.color }}>{service.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-2">{service.name}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed flex-1 mb-5">{service.description}</p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5"
                    style={{ color: service.color }}
                  >
                    Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">How We Help</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">{data.howWeHelp.title}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{data.howWeHelp.description}</p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-2 gap-6">
            {data.howWeHelp.items.map((item, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i % 2 === 1 ? 100 : 0}>
                <div className="bg-white/5 rounded-2xl p-7 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-400 font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Our Approach</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">
                Full-funnel marketing for {data.hero.label.toLowerCase()}
              </h2>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'SEO', icon: '🔍', text: data.approach.seo, color: '#1D4ED8', bg: '#DBEAFE' },
              { label: 'Paid Ads', icon: '📢', text: data.approach.ads, color: '#DC2626', bg: '#FEE2E2' },
              { label: 'Website', icon: '💻', text: data.approach.website, color: '#7C3AED', bg: '#EDE9FE' },
              { label: 'Conversion', icon: '📈', text: data.approach.conversion, color: '#059669', bg: '#D1FAE5' },
            ].map((item, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i * 75}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                    style={{ backgroundColor: item.bg }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#111111] mb-2" style={{ color: item.color }}>{item.label}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{item.text}</p>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-12">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">
                Common questions
              </h2>
            </div>
          </ScrollAnimateWrapper>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i * 50}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Ready to Grow?</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mt-4 mb-6 leading-tight">
              Let's build your growth strategy
            </h2>
            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto">
              Start with a free AI marketing audit to see exactly where your biggest opportunities are.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2 shadow-lg shadow-blue-100"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors flex items-center gap-2"
              >
                Book Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>
    </>
  );
}
