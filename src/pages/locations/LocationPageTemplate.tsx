import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Search, ChevronDown, ChevronUp, MapPin, ExternalLink } from 'lucide-react';
import { ScrollAnimateWrapper } from '../../components/ScrollAnimateWrapper';
import { SEOHead } from '../../components/SEOHead';
import type { LocationRecord, LocationPageRecord } from './types';
import { SERVICE_TYPES } from './types';
import { SUPPORTED_INDUSTRIES } from './locationContent';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-7 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#111111] pr-4">{question}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-[#6B7280] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-7 pb-6 bg-white">
          <p className="text-[#6B7280] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

interface Props {
  location: LocationRecord;
  page: LocationPageRecord;
  nearbyCityPages: { city: string; slug: string; serviceType: string; serviceLabel: string }[];
}

export function LocationPageTemplate({ location, page, nearbyCityPages }: Props) {
  const serviceInfo = SERVICE_TYPES[page.service_type] ?? {
    label: page.service_label,
    color: '#1D4ED8',
    bg: '#DBEAFE',
    link: '/services',
    description: '',
  };

  const allServices = Object.entries(SERVICE_TYPES).filter(([key]) => key !== page.service_type);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SiteMaxi',
    description: page.meta_description,
    url: `https://sitemaxi.com/locations/${page.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.province,
      addressCountry: 'CA',
    },
    areaServed: {
      '@type': 'City',
      name: location.city,
    },
    serviceType: page.service_label,
  };

  return (
    <>
      <SEOHead
        title={page.meta_title || page.page_title}
        description={page.meta_description}
        keywords={`${page.service_label} ${location.city}, ${location.city} ${page.service_label.toLowerCase()}, digital marketing ${location.city}, ${page.service_label.toLowerCase()} ${location.province}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative bg-white py-20 md:py-28 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-widest"
                  style={{ backgroundColor: serviceInfo.bg, color: serviceInfo.color }}
                >
                  {page.service_label}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-[#374151] px-4 py-1.5 rounded-full text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {location.city}, {location.province}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
                {page.hero_headline}
              </h1>
              <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed">
                {page.hero_subheadline}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/free-seo-audit"
                  className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2 shadow-lg shadow-blue-100"
                >
                  <Search className="w-5 h-5" />
                  {page.custom_cta_text || 'Get Free AI Marketing Audit'}
                </Link>
                <Link
                  to="/apply"
                  className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors flex items-center gap-2"
                >
                  Apply For A Growth Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                {['No long-term contracts', 'Canadian team', 'Results-focused strategy'].map((item) => (
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimateWrapper animation="fade-up">
              <div>
                <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">About This Service</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-6">
                  {page.service_label} in {location.city}
                </h2>
                <p className="text-[#374151] leading-relaxed text-lg mb-6">{page.intro_copy}</p>
                <Link
                  to={serviceInfo.link}
                  className="inline-flex items-center gap-2 font-semibold transition-colors"
                  style={{ color: serviceInfo.color }}
                >
                  Learn about our {page.service_label} service
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollAnimateWrapper>
            <ScrollAnimateWrapper animation="fade-up" delay={150}>
              <div
                className="rounded-3xl p-8 md:p-10"
                style={{ background: `linear-gradient(135deg, ${serviceInfo.bg} 0%, white 70%)` }}
              >
                <h3 className="text-xl font-bold text-[#111111] mb-6">
                  Why {location.city} businesses choose SiteMaxi
                </h3>
                <p className="text-[#374151] leading-relaxed">{page.why_us_copy}</p>
                <div className="mt-6 pt-6 border-t border-white/60 space-y-3">
                  {[
                    'Canadian agency — we know your market',
                    'Transparent monthly reporting',
                    'Strategy tied to revenue, not vanity metrics',
                    'No lock-in contracts',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: serviceInfo.color }} />
                      <span className="text-[#374151] text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimateWrapper>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">
                Our {page.service_label} approach in {location.city}
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto leading-relaxed">{page.service_copy}</p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Audit & Strategy',
                desc: `We analyze your current online presence in ${location.city} and build a custom strategy around your goals and competitive landscape.`,
                color: serviceInfo.color,
                bg: serviceInfo.bg,
              },
              {
                step: '02',
                title: 'Implementation',
                desc: 'Our team executes every element of the strategy — technical, content, and outreach — with precision and speed.',
                color: '#059669',
                bg: '#D1FAE5',
              },
              {
                step: '03',
                title: 'Optimization',
                desc: 'We monitor performance, test improvements, and refine our approach based on real data from your campaigns.',
                color: '#D97706',
                bg: '#FEF3C7',
              },
              {
                step: '04',
                title: 'Reporting & Growth',
                desc: 'Monthly reports show your rankings, leads, and ROI. We use this data to scale what works and capture new opportunities.',
                color: '#DC2626',
                bg: '#FEE2E2',
              },
            ].map((item, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i * 75}>
                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-all duration-300 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-bold text-sm"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-bold text-[#111111] mb-2">{item.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{item.desc}</p>
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
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Industries We Serve in {location.city}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                {page.service_label} for every local business type
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We bring specialized knowledge to {location.city} businesses across every major service industry.
              </p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SUPPORTED_INDUSTRIES.map((industry, i) => (
              <ScrollAnimateWrapper key={industry.slug} animation="fade-up" delay={i * 40}>
                <Link
                  to={industry.path}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition-all duration-300 group block"
                >
                  <span className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                    {industry.label}
                  </span>
                </Link>
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
                Common questions about {page.service_label} in {location.city}
              </h2>
            </div>
          </ScrollAnimateWrapper>
          <div className="space-y-3">
            {page.faqs.map((faq, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i * 50}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-12">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Explore More</span>
              <h2 className="text-3xl font-bold text-[#111111] mt-3 mb-4">
                Related services and nearby cities
              </h2>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimateWrapper animation="fade-up">
              <div>
                <h3 className="font-bold text-[#111111] mb-4 text-lg">Other services in {location.city}</h3>
                <div className="space-y-2">
                  {allServices.slice(0, 4).map(([key, svc]) => (
                    <Link
                      key={key}
                      to={`/locations/${location.slug}/${key}`}
                      className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#1D4ED8] transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#1D4ED8] transition-colors" />
                      {svc.label} {location.city}
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollAnimateWrapper>
            <ScrollAnimateWrapper animation="fade-up" delay={100}>
              <div>
                <h3 className="font-bold text-[#111111] mb-4 text-lg">Nearby cities</h3>
                <div className="space-y-2">
                  {nearbyCityPages.slice(0, 5).map((nearby) => (
                    <Link
                      key={nearby.slug}
                      to={`/locations/${nearby.slug}/${page.service_type}`}
                      className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#1D4ED8] transition-colors group"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#1D4ED8] transition-colors" />
                      {page.service_label} {nearby.city}
                    </Link>
                  ))}
                  {nearbyCityPages.length === 0 && (
                    <Link
                      to="/locations"
                      className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#1D4ED8] transition-colors group"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#1D4ED8] transition-colors" />
                      View all locations we serve
                    </Link>
                  )}
                </div>
              </div>
            </ScrollAnimateWrapper>
            <ScrollAnimateWrapper animation="fade-up" delay={200}>
              <div>
                <h3 className="font-bold text-[#111111] mb-4 text-lg">Helpful resources</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Free AI Marketing Audit', path: '/free-seo-audit' },
                    { label: 'Apply For A Growth Call', path: '/apply', external: false },
                    { label: 'Our Blog', path: '/blog' },
                    { label: 'Resources Hub', path: '/resources-hub' },
                    { label: 'View All Cities', path: '/locations' },
                  ].map((item) => (
                    item.external ? (
                      <a
                        key={item.label}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#1D4ED8] transition-colors group"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#1D4ED8] transition-colors" />
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#1D4ED8] transition-colors group"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#1D4ED8] transition-colors" />
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </ScrollAnimateWrapper>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Ready to Grow?</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mt-4 mb-6 leading-tight">
              Let's build your {location.city} growth strategy
            </h2>
            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto">
              Start with a free AI marketing audit to see exactly where your biggest opportunities are in {location.city}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2 shadow-lg shadow-blue-100"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <Link
                to="/apply"
                className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors flex items-center gap-2"
              >
                Apply For A Growth Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>
    </>
  );
}
