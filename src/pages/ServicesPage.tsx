import {
  TrendingUp, Target, Share2, Zap, MousePointerClick, Palette,
  ArrowRight, CheckCircle, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import { SEOHead } from '../components/SEOHead';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

const services = [
  {
    icon: TrendingUp,
    name: 'RankMaxi',
    label: 'Local SEO',
    tagline: 'Own your local market on Google',
    description: 'RankMaxi is our local SEO system built to get your business ranking in Google Maps and the local pack. We optimize your Google Business Profile, build local citations, manage reviews, and execute hyper-local content strategies so customers in your area find you first.',
    benefits: [
      'Google Business Profile optimization',
      'Local citation building & cleanup',
      'Review generation & reputation management',
      'Hyper-local keyword targeting',
      'Map Pack ranking strategy',
    ],
    bestFor: 'Local service businesses, restaurants, clinics, contractors',
    color: '#1D4ED8',
    bg: '#DBEAFE',
    path: '/rankmaxi',
  },
  {
    icon: Target,
    name: 'SearchMaxi',
    label: 'SEO',
    tagline: 'Grow organic traffic that compounds over time',
    description: 'SearchMaxi is our full-scale SEO service designed to build long-term organic authority. Through technical audits, content strategy, on-page optimization, and link building, we grow your search rankings and turn Google traffic into consistent leads and revenue.',
    benefits: [
      'Technical SEO audit & site optimization',
      'Keyword research & content strategy',
      'On-page SEO implementation',
      'Link building & domain authority',
      'Monthly performance reporting',
    ],
    bestFor: 'Businesses targeting non-local or national search traffic',
    color: '#0891B2',
    bg: '#CFFAFE',
    path: '/searchmaxi',
  },
  {
    icon: Share2,
    name: 'SocialMaxi',
    label: 'Social Media',
    tagline: 'Build a brand your audience trusts',
    description: 'SocialMaxi manages your social media presence end-to-end. From content creation and scheduling to community management and growth tactics, we build a consistent, engaging presence that keeps your brand top of mind.',
    benefits: [
      'Monthly content calendar & creation',
      'Platform management (Instagram, Facebook, LinkedIn)',
      'Community engagement & response',
      'Hashtag & growth strategy',
      'Analytics & monthly reporting',
    ],
    bestFor: 'Brands wanting consistent social presence without managing it themselves',
    color: '#059669',
    bg: '#D1FAE5',
    path: '/socialmaxi',
  },
  {
    icon: Zap,
    name: 'AdMaxi',
    label: 'Social Ads',
    tagline: 'Paid social campaigns that generate real leads',
    description: 'AdMaxi runs and optimizes paid advertising campaigns on Facebook, Instagram, and TikTok. We handle audience targeting, ad creative, A/B testing, and budget optimization to maximize your return on ad spend.',
    benefits: [
      'Facebook & Instagram ad management',
      'TikTok advertising',
      'Ad creative development',
      'Audience targeting & retargeting',
      'ROAS-focused optimization',
    ],
    bestFor: 'Businesses ready to invest in paid social for rapid lead generation',
    color: '#D97706',
    bg: '#FEF3C7',
    path: '/admaxi',
  },
  {
    icon: MousePointerClick,
    name: 'ClickMaxi',
    label: 'Google Ads',
    tagline: 'Capture high-intent buyers the moment they search',
    description: 'ClickMaxi manages your Google Ads campaigns with a focus on profitability. We set up, optimize, and scale search, display, and shopping campaigns to connect you with customers actively looking for what you offer.',
    benefits: [
      'Google Search & Display campaigns',
      'Google Shopping (for e-commerce)',
      'Remarketing & audience campaigns',
      'Conversion tracking setup',
      'Bid management & budget optimization',
    ],
    bestFor: 'Businesses with clear offers ready to capture demand immediately',
    color: '#DC2626',
    bg: '#FEE2E2',
    path: '/clickmaxi',
  },
  {
    icon: Palette,
    name: 'SiteMaxi',
    label: 'Web Design',
    tagline: 'Websites built to convert visitors into customers',
    description: 'SiteMaxi builds high-converting websites that look great and perform even better. Every site we design is fast, mobile-responsive, SEO-ready, and structured to guide visitors toward taking action.',
    benefits: [
      'Custom responsive website design',
      'Conversion-focused layout & copywriting',
      'Speed optimization & Core Web Vitals',
      'Built-in SEO foundations',
      'CMS & ongoing support',
    ],
    bestFor: 'Businesses needing a professional website that actually generates leads',
    color: '#7C3AED',
    bg: '#EDE9FE',
    path: '/sitemaxi',
  },
];

export function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Our Services — RankMaxi, SearchMaxi, SocialMaxi, AdMaxi, ClickMaxi, SiteMaxi"
        description="Explore SiteMaxi's complete suite of digital marketing services including Local SEO, SEO, social media, paid social ads, Google Ads, and web design."
        keywords="local SEO services, Google Ads management, social media marketing, web design agency, SEO services Canada"
      />

      <section className="bg-white py-20 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#111111] mt-4 mb-6 leading-tight">
              One agency. Six powerful systems.
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-10">
              Each service is a focused, branded system engineered to drive specific business outcomes — from local visibility to e-commerce revenue.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
              >
                Book Strategy Call
              </a>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {services.map((service, index) => (
            <ScrollAnimateWrapper key={index} animation="fade-up">
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-between" style={{ backgroundColor: service.bg }}>
                    <div>
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                        <service.icon className="w-7 h-7" style={{ color: service.color }} />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h2 className="text-3xl font-bold" style={{ color: service.color }}>{service.name}</h2>
                        <span className="text-xs font-bold px-3 py-1 bg-white rounded-full" style={{ color: service.color }}>
                          {service.label}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-[#374151] mb-3">{service.tagline}</p>
                    </div>
                    <div className="mt-6">
                      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Best for</p>
                      <p className="text-sm text-[#374151]">{service.bestFor}</p>
                      <Link
                        to={service.path}
                        className="mt-6 inline-flex items-center gap-2 font-bold text-sm py-3 px-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                        style={{ color: service.color }}
                      >
                        View Plans & Pricing <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="md:col-span-3 p-8 md:p-10">
                    <p className="text-[#555555] leading-relaxed mb-8">{service.description}</p>
                    <div>
                      <p className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-4">What's included</p>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                            <span className="text-[#374151]">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#0F172A]">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-5">Not sure which services you need?</h2>
            <p className="text-lg text-blue-200 mb-10">
              Start with a free AI marketing audit. We'll identify exactly where your biggest opportunities are.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Run Free Marketing Audit
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </ScrollAnimateWrapper>
      </section>
    </>
  );
}
