import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Download, BookOpen, BarChart3, Globe, ShoppingBag,
  Monitor, FileText, CheckSquare, ArrowRight, Star, Filter,
  MapPin, TrendingUp, Target, Zap, Users, ChevronRight
} from 'lucide-react';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import { SEOHead } from '../components/SEOHead';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

type Category = 'all' | 'seo' | 'local' | 'ads' | 'ecommerce' | 'conversion' | 'templates';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: Category;
  categoryLabel: string;
  type: 'guide' | 'checklist' | 'template' | 'playbook';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  featured?: boolean;
  readTime?: string;
  link: string;
}

const resources: Resource[] = [
  {
    id: 'local-seo-checklist',
    title: 'Local SEO Checklist for Service Businesses',
    description: 'A comprehensive 47-point checklist covering Google Business Profile, local citations, on-page SEO, and review generation to dominate local search.',
    category: 'local',
    categoryLabel: 'Local Business',
    type: 'checklist',
    icon: CheckSquare,
    color: '#1D4ED8',
    bg: '#DBEAFE',
    featured: true,
    readTime: '10 min',
    link: '/resources/local-seo-checklist',
  },
  {
    id: 'google-business-profile-guide',
    title: 'Google Business Profile Optimization Guide',
    description: 'Step-by-step guide to fully optimizing your Google Business Profile for maximum local search visibility, reviews, and click-through rates.',
    category: 'local',
    categoryLabel: 'Local Business',
    type: 'guide',
    icon: MapPin,
    color: '#1D4ED8',
    bg: '#DBEAFE',
    featured: true,
    readTime: '15 min',
    link: '/resources/google-business-profile-guide',
  },
  {
    id: 'ecommerce-seo-checklist',
    title: 'E-commerce SEO Checklist',
    description: 'Everything you need to optimize your online store for search — from product page structure to technical SEO, schema markup, and content strategy.',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    type: 'checklist',
    icon: ShoppingBag,
    color: '#059669',
    bg: '#D1FAE5',
    featured: true,
    readTime: '12 min',
    link: '/resources/ecommerce-seo-checklist',
  },
  {
    id: 'google-ads-starter-guide',
    title: 'Google Ads Starter Guide for Small Businesses',
    description: 'Learn how to set up, structure, and optimize your first Google Ads campaign to get more calls and customers without wasting your budget.',
    category: 'ads',
    categoryLabel: 'Google Ads',
    type: 'guide',
    icon: Target,
    color: '#DC2626',
    bg: '#FEE2E2',
    readTime: '20 min',
    link: '/resources/google-ads-starter-guide',
  },
  {
    id: 'landing-page-conversion-checklist',
    title: 'Landing Page Conversion Checklist',
    description: 'A proven 30-point checklist for building landing pages that convert — covering headlines, social proof, CTAs, form optimization, and mobile experience.',
    category: 'conversion',
    categoryLabel: 'Conversion',
    type: 'checklist',
    icon: TrendingUp,
    color: '#059669',
    bg: '#D1FAE5',
    readTime: '8 min',
    link: '/resources/landing-page-checklist',
  },
  {
    id: 'small-business-marketing-playbook',
    title: 'Small Business Marketing Playbook',
    description: 'A complete 90-day marketing playbook for local service businesses — covering SEO, Google Ads, social media, and reputation management in one structured plan.',
    category: 'local',
    categoryLabel: 'Local Business',
    type: 'playbook',
    icon: BookOpen,
    color: '#1D4ED8',
    bg: '#DBEAFE',
    readTime: '30 min',
    link: '/resources/small-business-playbook',
  },
  {
    id: 'seo-keyword-research-guide',
    title: 'Keyword Research Guide for Service Businesses',
    description: 'How to find the keywords your customers actually use — including local intent keywords, service modifiers, and the long-tail opportunities your competitors miss.',
    category: 'seo',
    categoryLabel: 'SEO',
    type: 'guide',
    icon: Search,
    color: '#0891B2',
    bg: '#CFFAFE',
    readTime: '18 min',
    link: '/resources/keyword-research-guide',
  },
  {
    id: 'meta-ads-guide',
    title: 'Meta Ads Guide for Local Businesses',
    description: 'How to run profitable Facebook and Instagram ad campaigns as a local business — audience targeting, creative best practices, and budget optimization.',
    category: 'ads',
    categoryLabel: 'Paid Ads',
    type: 'guide',
    icon: Zap,
    color: '#D97706',
    bg: '#FEF3C7',
    readTime: '22 min',
    link: '/resources/meta-ads-guide',
  },
  {
    id: 'website-conversion-tips',
    title: 'Website Conversion Optimization Tips',
    description: '25 proven tactics to increase the percentage of website visitors who call, book, or buy — without spending more on traffic.',
    category: 'conversion',
    categoryLabel: 'Conversion',
    type: 'guide',
    icon: BarChart3,
    color: '#059669',
    bg: '#D1FAE5',
    readTime: '14 min',
    link: '/resources/website-conversion-tips',
  },
  {
    id: 'ecommerce-growth-guide',
    title: 'E-commerce Growth Guide 2025',
    description: 'A complete framework for scaling your online store — covering organic SEO, paid ads, email marketing, CRO, and retention strategies that work in 2025.',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    type: 'guide',
    icon: Globe,
    color: '#059669',
    bg: '#D1FAE5',
    readTime: '25 min',
    link: '/resources/ecommerce-growth-guide',
  },
  {
    id: 'content-calendar-template',
    title: 'Social Media Content Calendar Template',
    description: 'A ready-to-use content calendar template for local businesses — complete with post ideas, content categories, and a monthly planning framework.',
    category: 'templates',
    categoryLabel: 'Template',
    type: 'template',
    icon: FileText,
    color: '#D97706',
    bg: '#FEF3C7',
    readTime: '5 min',
    link: '/resources/content-calendar-template',
  },
  {
    id: 'seo-audit-checklist',
    title: 'DIY Website SEO Audit Checklist',
    description: 'A step-by-step checklist to audit your own website\'s SEO — covering technical issues, on-page optimization, content gaps, and link building opportunities.',
    category: 'seo',
    categoryLabel: 'SEO',
    type: 'checklist',
    icon: Monitor,
    color: '#0891B2',
    bg: '#CFFAFE',
    readTime: '12 min',
    link: '/resources/seo-audit-checklist',
  },
];

const categories = [
  { key: 'all' as Category, label: 'All Resources', icon: Globe },
  { key: 'seo' as Category, label: 'SEO Guides', icon: Search },
  { key: 'local' as Category, label: 'Local Business', icon: MapPin },
  { key: 'ads' as Category, label: 'Google & Meta Ads', icon: Target },
  { key: 'ecommerce' as Category, label: 'E-commerce', icon: ShoppingBag },
  { key: 'conversion' as Category, label: 'Conversion', icon: TrendingUp },
  { key: 'templates' as Category, label: 'Templates', icon: FileText },
];

const typeColors: Record<string, { label: string; color: string; bg: string }> = {
  guide: { label: 'Guide', color: '#1D4ED8', bg: '#DBEAFE' },
  checklist: { label: 'Checklist', color: '#059669', bg: '#D1FAE5' },
  template: { label: 'Template', color: '#D97706', bg: '#FEF3C7' },
  playbook: { label: 'Playbook', color: '#DC2626', bg: '#FEE2E2' },
};

function ResourceCard({ resource }: { resource: Resource }) {
  const typeStyle = typeColors[resource.type];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: resource.bg }}>
            <resource.icon className="w-6 h-6" style={{ color: resource.color }} />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}>
            {typeStyle.label}
          </span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: resource.color }}>
          {resource.categoryLabel}
        </span>
        <h3 className="text-lg font-bold text-[#111111] mb-2 leading-snug group-hover:text-[#1D4ED8] transition-colors">
          {resource.title}
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed flex-1 mb-5">{resource.description}</p>
        <div className="flex items-center justify-between">
          {resource.readTime && (
            <span className="text-xs text-[#9CA3AF]">{resource.readTime} read</span>
          )}
          <Link
            to={resource.link}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
            style={{ color: resource.color }}
          >
            Read guide <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ResourcesHubPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter((r) => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter((r) => r.featured);

  return (
    <>
      <SEOHead
        title="Free Marketing Resources Hub — Guides, Checklists & Playbooks | SiteMaxi"
        description="Free marketing guides, checklists, templates, and playbooks for local businesses and e-commerce brands. Get the knowledge to grow your business online."
        keywords="free marketing resources, local SEO guide, Google Ads guide, e-commerce marketing checklist, small business marketing playbook Canada"
      />

      <section className="relative bg-white py-20 md:py-24 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Free Resources
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
                Grow your business with free marketing resources
              </h1>
              <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed">
                Practical guides, checklists, templates, and playbooks written by our team of marketing specialists — all free, no fluff.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search guides, checklists, and playbooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-50 text-[#374151] placeholder-gray-400 shadow-sm text-lg"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                {['Local SEO', 'Google Ads', 'E-commerce', 'Conversion'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const map: Record<string, Category> = { 'Local SEO': 'local', 'Google Ads': 'ads', 'E-commerce': 'ecommerce', 'Conversion': 'conversion' };
                      setActiveCategory(map[tag]);
                    }}
                    className="text-sm text-[#6B7280] bg-gray-100 hover:bg-blue-50 hover:text-[#1D4ED8] px-3 py-1.5 rounded-full transition-colors font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Featured Tool</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                  Free AI Marketing Audit
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Get a comprehensive AI-powered analysis of your website and marketing in minutes. Discover your biggest SEO opportunities, technical issues, and quick wins — completely free.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Full SEO and technical audit',
                    'Page speed and mobile analysis',
                    'Competitor visibility insights',
                    'Prioritized recommendations',
                    'Instant PDF report',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-xs">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/free-seo-audit"
                  className="inline-flex items-center gap-2 bg-white text-[#1D4ED8] px-7 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Run Your Free Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">AI Marketing Audit</div>
                      <div className="text-gray-400 text-xs">yourwebsite.com</div>
                    </div>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-semibold">Free</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'SEO Health Score', value: 73, color: '#1D4ED8' },
                    { label: 'Page Speed', value: 61, color: '#D97706' },
                    { label: 'Mobile Experience', value: 88, color: '#059669' },
                    { label: 'Local Visibility', value: 45, color: '#DC2626' },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{metric.label}</span>
                        <span className="text-white font-semibold">{metric.value}/100</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${metric.value}%`, backgroundColor: metric.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-gray-400 text-xs">12 issues found • 8 quick wins • 4 opportunities</div>
                </div>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-[#111111] mb-2">Featured Resources</h2>
              <p className="text-[#6B7280]">Our most popular guides and checklists</p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource, i) => (
              <ScrollAnimateWrapper key={resource.id} animation="fade-up" delay={i * 75}>
                <div className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className="bg-[#1D4ED8] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Featured
                    </span>
                  </div>
                  <ResourceCard resource={resource} />
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl font-bold text-[#111111]">All Resources</h2>
                <p className="text-[#6B7280] mt-1">{filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} available</p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#6B7280]" />
                <span className="text-sm text-[#6B7280] font-medium">Filter by:</span>
              </div>
            </div>
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper animation="fade-up">
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat.key
                      ? 'bg-[#1D4ED8] text-white shadow-sm'
                      : 'bg-white text-[#6B7280] border border-gray-200 hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollAnimateWrapper>

          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, i) => (
                <ScrollAnimateWrapper key={resource.id} animation="fade-up" delay={i % 3 * 75}>
                  <ResourceCard resource={resource} />
                </ScrollAnimateWrapper>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#9CA3AF]" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">No resources found</h3>
              <p className="text-[#6B7280] mb-6">Try a different search term or category</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-[#1D4ED8] font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="bg-[#F0F9FF] rounded-3xl p-10 md:p-14 border border-blue-100">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Newsletter</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">
                    Get weekly marketing tips in your inbox
                  </h2>
                  <p className="text-[#6B7280] mb-6 leading-relaxed">
                    Join 2,400+ Canadian business owners getting actionable marketing tips, industry guides, and growth insights every week. No spam, unsubscribe anytime.
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    {['No spam', 'Weekly tips', 'Unsubscribe anytime'].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <span className="w-4 h-4 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8] text-xs">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#111111] mb-5">Subscribe to growth tips</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your first name"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-50 text-[#374151] placeholder-gray-400"
                      />
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-50 text-[#374151] placeholder-gray-400"
                      />
                      <button className="w-full bg-[#1D4ED8] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Get Weekly Tips
                      </button>
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-3 text-center">By subscribing you agree to our privacy policy</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="text-center mb-12">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Industry Guides</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-3 mb-4">
                Marketing guides by industry
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto">
                Explore targeted strategies for your specific industry — each one built around the unique challenges and opportunities of your market.
              </p>
            </div>
          </ScrollAnimateWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Dentists', link: '/industries/dentists', color: '#1D4ED8', bg: '#DBEAFE' },
              { name: 'Lawyers', link: '/industries/lawyers', color: '#0891B2', bg: '#CFFAFE' },
              { name: 'Contractors', link: '/industries/contractors', color: '#D97706', bg: '#FEF3C7' },
              { name: 'HVAC', link: '/industries/hvac', color: '#DC2626', bg: '#FEE2E2' },
              { name: 'Roofers', link: '/industries/roofers', color: '#1D4ED8', bg: '#DBEAFE' },
              { name: 'Med Spas', link: '/industries/med-spas', color: '#059669', bg: '#D1FAE5' },
              { name: 'Restaurants', link: '/industries/restaurants', color: '#D97706', bg: '#FEF3C7' },
              { name: 'E-commerce', link: '/industries/ecommerce', color: '#059669', bg: '#D1FAE5' },
            ].map((industry, i) => (
              <ScrollAnimateWrapper key={industry.name} animation="fade-up" delay={i % 4 * 75}>
                <Link
                  to={industry.link}
                  className="flex items-center gap-3 bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: industry.bg }}>
                    <Users className="w-5 h-5" style={{ color: industry.color }} />
                  </div>
                  <span className="font-semibold text-[#111111] group-hover:text-[#1D4ED8] transition-colors text-sm">
                    {industry.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF] ml-auto group-hover:text-[#1D4ED8] transition-colors" />
                </Link>
              </ScrollAnimateWrapper>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-[#1D4ED8] font-semibold hover:underline"
            >
              View all industries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1E3A8A] rounded-2xl p-10 text-white">
                <h3 className="text-2xl font-bold mb-3">Not sure where to start?</h3>
                <p className="text-blue-100 mb-6">Run our free AI audit and we\'ll tell you exactly what to focus on first based on your specific website and goals.</p>
                <Link
                  to="/free-seo-audit"
                  className="inline-flex items-center gap-2 bg-white text-[#1D4ED8] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Get Free Audit
                </Link>
              </div>
              <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100">
                <h3 className="text-2xl font-bold text-[#111111] mb-3">Want a custom strategy?</h3>
                <p className="text-[#6B7280] mb-6">Book a free strategy call with our team. We\'ll review your business, goals, and build a custom marketing plan.</p>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1E40AF] transition-colors"
                >
                  Book Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>
    </>
  );
}
