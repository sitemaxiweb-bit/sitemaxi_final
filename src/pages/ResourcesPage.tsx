import {
  Search, BookOpen, FileText, TrendingUp, ArrowRight, CheckCircle,
  BarChart3, Globe, Zap, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import { SEOHead } from '../components/SEOHead';

export function ResourcesPage() {
  return (
    <>
      <SEOHead
        title="Free Marketing Resources & Tools | SiteMaxi"
        description="Access free marketing resources from SiteMaxi including the AI-powered marketing audit tool, SEO guides, and digital marketing insights for local businesses and e-commerce brands."
        keywords="free SEO audit tool, digital marketing resources, local SEO guide, e-commerce marketing tips, free marketing tools"
      />

      <section className="bg-white py-20 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Resources Hub</span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#111111] mt-4 mb-6 leading-tight">
              Free tools and insights<br className="hidden md:block" /> to grow your business
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Everything you need to understand your marketing performance, learn proven strategies, and take action.
            </p>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <h2 className="text-2xl font-bold text-[#111111] mb-8">Featured Tool</h2>
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper animation="scale">
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] rounded-3xl overflow-hidden mb-16">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="md:col-span-2 p-10 md:p-14">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-400 text-sm font-semibold">Free — Instant results</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Free AI Marketing Audit Tool
                  </h3>
                  <p className="text-blue-200 text-lg mb-8 leading-relaxed max-w-xl">
                    Get an instant, AI-powered analysis of your website's SEO health. Identify technical issues, check your page speed, see how you rank, and get a prioritized list of fixes.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-10">
                    {[
                      'Overall SEO health score',
                      'Technical SEO issue detection',
                      'Page speed & Core Web Vitals',
                      'Actionable recommendations',
                      'Keyword opportunity insights',
                      'Competitive gap analysis',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-blue-100 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/free-seo-audit"
                    className="inline-flex items-center gap-2 bg-white text-[#1D4ED8] px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    <Search className="w-5 h-5" />
                    Run Free Marketing Audit
                  </Link>
                </div>
                <div className="hidden md:flex items-center justify-center p-10">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full">
                    <div className="text-center mb-6">
                      <div className="text-blue-300 text-sm font-semibold mb-2">Sample Report Preview</div>
                      <div className="relative w-28 h-28 mx-auto">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="10" strokeDasharray="314" strokeDashoffset="80" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-white">74</span>
                          <span className="text-xs text-blue-300">/100</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Page Speed', value: 'Needs Work', color: 'text-yellow-400' },
                        { label: 'Title Tags', value: 'Optimized', color: 'text-green-400' },
                        { label: 'Meta Desc.', value: 'Missing 3', color: 'text-red-400' },
                        { label: 'Schema', value: 'Not Set Up', color: 'text-red-400' },
                        { label: 'Backlinks', value: 'Growing', color: 'text-blue-400' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/10 last:border-0">
                          <span className="text-blue-200 text-xs">{row.label}</span>
                          <span className={`text-xs font-semibold ${row.color}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper animation="fade-up">
            <h2 className="text-2xl font-bold text-[#111111] mb-8">Guides & Learning Resources</h2>
          </ScrollAnimateWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: TrendingUp,
                color: '#1D4ED8',
                bg: '#DBEAFE',
                tag: 'Local SEO',
                title: 'Local SEO Checklist for 2025',
                description: 'A step-by-step checklist to optimize your Google Business Profile, build citations, and rank in the local pack.',
                cta: 'Read Guide',
                href: '/blog',
              },
              {
                icon: BarChart3,
                color: '#059669',
                bg: '#D1FAE5',
                tag: 'Google Ads',
                title: 'Google Ads Starter Guide for Local Businesses',
                description: 'Learn how to set up, target, and optimize Google Ads campaigns that generate calls and leads.',
                cta: 'Read Guide',
                href: '/blog',
              },
              {
                icon: Globe,
                color: '#0891B2',
                bg: '#CFFAFE',
                tag: 'SEO',
                title: 'E-commerce SEO: Ranking Your Online Store',
                description: 'A practical guide to SEO for Shopify and WooCommerce stores — from product pages to technical SEO.',
                cta: 'Read Guide',
                href: '/blog',
              },
              {
                icon: Zap,
                color: '#D97706',
                bg: '#FEF3C7',
                tag: 'Social Ads',
                title: 'Meta Ads Strategy for Small Businesses',
                description: 'How to set up effective Facebook and Instagram ad campaigns without wasting budget.',
                cta: 'Read Guide',
                href: '/blog',
              },
              {
                icon: FileText,
                color: '#7C3AED',
                bg: '#EDE9FE',
                tag: 'Web Design',
                title: 'High-Converting Landing Page Checklist',
                description: '10 elements every landing page needs to maximize conversions from paid and organic traffic.',
                cta: 'Read Guide',
                href: '/blog',
              },
              {
                icon: Users,
                color: '#DC2626',
                bg: '#FEE2E2',
                tag: 'Social Media',
                title: 'Social Media Content Calendar Template',
                description: 'Plan your social content 30 days in advance with this proven framework for consistent posting.',
                cta: 'Read Guide',
                href: '/blog',
              },
            ].map((resource, index) => (
              <ScrollAnimateWrapper key={index} animation="fade-up" delay={index % 3 === 1 ? 100 : index % 3 === 2 ? 200 : 0}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: resource.bg }}>
                      <resource.icon className="w-5 h-5" style={{ color: resource.color }} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: resource.bg, color: resource.color }}>
                      {resource.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#111111] mb-3">{resource.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-5 flex-1">{resource.description}</p>
                  <Link
                    to={resource.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200"
                    style={{ color: resource.color }}
                  >
                    {resource.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>

          <ScrollAnimateWrapper animation="fade-up">
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                    <BookOpen className="w-6 h-6 text-[#1D4ED8]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#111111] mb-4">Browse our blog for more insights</h2>
                  <p className="text-[#6B7280] leading-relaxed mb-6">
                    Our blog covers SEO, paid advertising, social media, web design, and digital marketing strategy — with actionable tips you can implement today.
                  </p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors"
                  >
                    Visit the Blog <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#F0F9FF] rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-bold text-[#111111] mb-2">Want a personalized strategy?</h3>
                    <p className="text-[#6B7280] text-sm mb-4">
                      Book a free 30-minute strategy call. We'll review your site, your competitors, and walk you through a custom plan.
                    </p>
                    <Link
                      to="/apply"
                      className="inline-flex items-center gap-2 border-2 border-[#1D4ED8] text-[#1D4ED8] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
                    >
                      Apply For A Growth Call
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>
    </>
  );
}
