import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { ScrollAnimateWrapper } from '../../components/ScrollAnimateWrapper';
import { SEOHead } from '../../components/SEOHead';

export interface ResourceSection {
  heading: string;
  content?: string;
  items?: string[];
  numbered?: boolean;
}

export interface ResourcePageData {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  seoDescription: string;
  keywords: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  type: 'Guide' | 'Checklist' | 'Template' | 'Playbook';
  readTime: string;
  lastUpdated: string;
  heroSubtitle: string;
  keyBenefits: string[];
  sections: ResourceSection[];
  ctaHeading: string;
  ctaText: string;
  relatedResources: { title: string; link: string; type: string }[];
}

const typeColors: Record<string, { color: string; bg: string }> = {
  Guide: { color: '#1D4ED8', bg: '#DBEAFE' },
  Checklist: { color: '#059669', bg: '#D1FAE5' },
  Template: { color: '#D97706', bg: '#FEF3C7' },
  Playbook: { color: '#DC2626', bg: '#FEE2E2' },
};

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

export function ResourcePageTemplate({ data }: { data: ResourcePageData }) {
  const typeStyle = typeColors[data.type];

  return (
    <>
      <SEOHead
        title={data.seoTitle}
        description={data.seoDescription}
        keywords={data.keywords}
      />

      <section className="bg-white border-b border-gray-100 pt-10 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <Link
              to="/resources-hub"
              className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#1D4ED8] text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Resources Hub
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ backgroundColor: data.categoryBg, color: data.categoryColor }}
              >
                {data.category}
              </span>
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
              >
                {data.type}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight mb-5">
              {data.title}
            </h1>
            <p className="text-xl text-[#6B7280] leading-relaxed mb-8 max-w-3xl">
              {data.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#9CA3AF]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {data.readTime} read
              </div>
              <div>Updated {data.lastUpdated}</div>
              <div>By SiteMaxi Team</div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          <div>
            <ScrollAnimateWrapper animation="fade-up">
              <div className="bg-gradient-to-br from-[#F0F9FF] to-[#EFF6FF] rounded-2xl border border-blue-100 p-8 mb-12">
                <h2 className="text-lg font-bold text-[#111111] mb-5">What you'll learn</h2>
                <ul className="space-y-3">
                  {data.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                      <span className="text-[#374151] text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimateWrapper>

            {data.sections.map((section, i) => (
              <ScrollAnimateWrapper key={i} animation="fade-up" delay={i * 50}>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-[#111111] mb-4 leading-snug">
                    {section.heading}
                  </h2>
                  {section.content && (
                    <p className="text-[#4B5563] leading-relaxed mb-5 text-base">
                      {section.content}
                    </p>
                  )}
                  {section.items && (
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          {section.numbered ? (
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1D4ED8] text-white text-xs font-bold flex items-center justify-center">
                              {j + 1}
                            </span>
                          ) : (
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#DBEAFE] flex items-center justify-center mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                            </span>
                          )}
                          <span className="text-[#4B5563] leading-relaxed text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollAnimateWrapper>
            ))}

            <ScrollAnimateWrapper animation="fade-up">
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] rounded-2xl p-10 text-white mt-4">
                <h2 className="text-2xl font-bold mb-3">{data.ctaHeading}</h2>
                <p className="text-blue-200 mb-6 leading-relaxed max-w-xl">{data.ctaText}</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/free-seo-audit"
                    className="inline-flex items-center gap-2 bg-white text-[#1D4ED8] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                  >
                    Get Free Audit <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Book Strategy Call
                  </a>
                </div>
              </div>
            </ScrollAnimateWrapper>
          </div>

          <aside className="space-y-6">
            <ScrollAnimateWrapper animation="fade-up">
              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm sticky top-24">
                <h3 className="font-bold text-[#111111] mb-5">Get a Free Marketing Audit</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
                  See how your website performs on SEO, speed, and visibility — instantly, free.
                </p>
                <Link
                  to="/free-seo-audit"
                  className="block w-full bg-[#1D4ED8] text-white text-center py-3.5 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors text-sm"
                >
                  Run Free Audit
                </Link>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-[#9CA3AF] text-center">Free • Instant results • No credit card</p>
                </div>
              </div>
            </ScrollAnimateWrapper>

            {data.relatedResources.length > 0 && (
              <ScrollAnimateWrapper animation="fade-up" delay={100}>
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-7">
                  <h3 className="font-bold text-[#111111] mb-5 text-sm uppercase tracking-wide">Related Resources</h3>
                  <ul className="space-y-3">
                    {data.relatedResources.map((r, i) => (
                      <li key={i}>
                        <Link
                          to={r.link}
                          className="flex items-start gap-3 group"
                        >
                          <ChevronRight className="w-4 h-4 text-[#1D4ED8] flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                          <div>
                            <div className="text-sm font-semibold text-[#111111] group-hover:text-[#1D4ED8] transition-colors leading-snug">
                              {r.title}
                            </div>
                            <div className="text-xs text-[#9CA3AF] mt-0.5">{r.type}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimateWrapper>
            )}

            <ScrollAnimateWrapper animation="fade-up" delay={150}>
              <div className="bg-[#F0FDF4] rounded-2xl border border-green-100 p-7">
                <h3 className="font-bold text-[#111111] mb-2 text-sm">Want expert help?</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-4">
                  Book a free strategy call with our team. We'll review your business and build a custom plan.
                </p>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-[#059669] text-[#059669] text-center py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm"
                >
                  Book Free Call
                </a>
              </div>
            </ScrollAnimateWrapper>
          </aside>
        </div>
      </div>
    </>
  );
}
