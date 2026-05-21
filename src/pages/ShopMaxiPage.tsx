import {
  TrendingUp, ArrowRight, BarChart3, ShoppingCart, Zap,
  Mail, MessageSquare, Target, Star, CheckCircle, AlertCircle,
  Smartphone, RefreshCw, Users, DollarSign, Package, Layers,
  ClipboardCheck, Settings, Award, MousePointerClick
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { useState } from 'react';
import { WordCrawler } from '../components/WordCrawler';

const APPLY_URL = '/apply';

export function ShopMaxiPage() {
  return (
    <>
      <SEOHead
        title="ShopMaxi — Shopify Growth Agency | CRO, Paid Ads & Revenue Scaling | SiteMaxi"
        description="Turn your Shopify store into a revenue machine. ShopMaxi by SiteMaxi helps ecommerce brands grow faster with conversion optimization, Meta and Google Ads, email automation, and Shopify store design."
        keywords="Shopify growth agency, Shopify marketing agency, Shopify CRO, Shopify ads management, ecommerce growth experts, Shopify revenue growth, Shopify scaling agency, Shopify conversion optimization, ecommerce ads Canada"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'ShopMaxi — Shopify Growth', url: 'https://sitemaxi.com/shopmaxi' },
        ]}
      />
      <HeroSection />
      <ResultsSection />
      <ProblemsSection />
      <ServicesSection />
      <GrowthSystemSection />
      <CaseStudiesSection />
      <OptimizationSection />
      <EmailSMSSection />
      <WhyUsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="py-24 px-4 md:px-12 overflow-hidden" style={{ paddingTop: '7rem' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span
              className="inline-block bg-[#E6F0FF] text-[#1D4ED8] px-3 py-1 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Shopify Growth Partner
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
            >
              Turn Your Shopify Store Into a Revenue <WordCrawler />
            </h1>
            <p
              className="text-[#45464D] text-base md:text-lg mb-4 max-w-xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We help ecommerce brands grow faster with high converting Shopify experiences, paid acquisition, retention systems, and revenue optimization.
            </p>
            <div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0F4C81] to-[#1D4ED8] text-white px-4 py-2 rounded-full text-sm font-semibold mb-10"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              <TrendingUp className="w-4 h-4" />
              From $0 to $30,000 in 3 months
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={APPLY_URL}
                className="bg-[#111111] text-white px-8 py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#222222] transition-all duration-200 shadow-sm"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Apply For A Growth Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={APPLY_URL}
                className="border border-[#E2E8F0] bg-white text-[#111111] px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Request Free Shopify Audit
              </Link>
            </div>
          </div>

          {/* Shopify dashboard mockup */}
          <div className="relative">
            <div className="bg-[#F8F9FA] rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xl">
              {/* Top bar */}
              <div className="bg-[#131B2E] px-5 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-[#7C839B] text-xs ml-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>ShopMaxi Dashboard</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Revenue row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Monthly Revenue", value: "$31,240", delta: "+184%", pos: true },
                    { label: "ROAS", value: "4.2x", delta: "+1.8x", pos: true },
                    { label: "Conv. Rate", value: "4.7%", delta: "+2.1%", pos: true },
                  ].map(({ label, value, delta, pos }) => (
                    <div key={label} className="bg-white rounded-xl p-3 border border-[#E2E8F0] text-center">
                      <div className="text-xl font-bold text-[#111111]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{value}</div>
                      <div className="text-[10px] text-gray-400 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
                      <div className={`text-[10px] font-semibold ${pos ? 'text-green-600' : 'text-red-500'}`}>{delta}</div>
                    </div>
                  ))}
                </div>
                {/* Mini chart */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#111111]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Revenue Growth</span>
                    <span className="text-xs text-green-600 font-semibold">+184% vs last period</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[20, 28, 35, 42, 38, 55, 65, 70, 62, 80, 88, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: i >= 9 ? 'linear-gradient(to top, #1D4ED8, #3B82F6)' : '#E2E8F0',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>Month 1</span>
                    <span className="text-[9px] text-[#1D4ED8] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Month 3</span>
                  </div>
                </div>
                {/* Order feed */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#E2E8F0]">
                    <span className="text-xs font-semibold text-[#111111]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Recent Orders</span>
                  </div>
                  {[
                    { id: "#4821", product: "Premium Bundle", value: "$247", status: "Paid" },
                    { id: "#4820", product: "Starter Pack", value: "$89", status: "Paid" },
                    { id: "#4819", product: "Upsell Add-on", value: "$34", status: "Paid" },
                  ].map((o) => (
                    <div key={o.id} className="px-4 py-2.5 border-b border-[#F2F4F6] last:border-0 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[#111111]">{o.id} · {o.product}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#111111]">{o.value}</span>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating ROAS card */}
            <div className="absolute -bottom-4 -left-4 bg-[#131B2E] text-white rounded-xl p-4 shadow-xl border border-white/10">
              <div className="text-xs text-[#7C839B] mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Meta Ads ROAS</div>
              <div className="text-2xl font-bold text-[#ADC6FF]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>4.2x</div>
              <div className="text-xs text-green-400 font-semibold">+1.8x from baseline</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Results ───────────────────────────────────────────────── */
function ResultsSection() {
  const metrics = [
    { value: "$30K", label: "In 3 Months", sub: "Revenue generated for a new Shopify brand from zero" },
    { value: "4.2x", label: "Average ROAS", sub: "Return on ad spend across Meta and Google campaigns" },
    { value: "+118%", label: "Conv. Rate Lift", sub: "Average improvement after CRO and store optimization" },
    { value: "38%", label: "Lower CPA", sub: "Reduction in cost per acquisition after full funnel setup" },
  ];

  return (
    <section className="py-20 bg-[#131B2E] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-[#ADC6FF] text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Real Client Growth
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Numbers That Actually Matter
          </h2>
          <p className="text-[#7C839B] max-w-xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            We measure success by revenue, ROAS, and growth rate. Not vanity metrics.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map(({ value, label, sub }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-all duration-200">
              <div className="text-4xl md:text-5xl font-bold text-[#ADC6FF] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{value}</div>
              <div className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{label}</div>
              <p className="text-[#7C839B] text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{sub}</p>
            </div>
          ))}
        </div>
        {/* Screenshot placeholder row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Shopify Analytics", tag: "Month 3 Revenue" },
            { label: "Meta Ads Manager", tag: "ROAS Dashboard" },
            { label: "Klaviyo Email", tag: "Revenue from Flows" },
          ].map(({ label, tag }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl aspect-video flex flex-col items-center justify-center gap-2 group hover:border-[#ADC6FF]/40 transition-all duration-200">
              <BarChart3 className="w-8 h-8 text-[#ADC6FF]/40 group-hover:text-[#ADC6FF]/70 transition-colors" />
              <div className="text-center">
                <div className="text-white/60 text-xs font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{label}</div>
                <div className="text-[#ADC6FF]/60 text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Problems ──────────────────────────────────────────────── */
function ProblemsSection() {
  const problems = [
    { icon: TrendingUp, title: "High Traffic, Low Conversions", desc: "Thousands of visitors but almost no sales. Traffic without conversion infrastructure is just wasted ad spend." },
    { icon: DollarSign, title: "Expensive Ads With Poor Returns", desc: "Rising CPMs and CPCs eating your margin. Without proper creative testing and audience segmentation, ad costs keep climbing." },
    { icon: ShoppingCart, title: "Cart Abandonment", desc: "Over 70% of shoppers leave without buying. Without recovery flows and exit intent strategies, you're leaving massive revenue on the table." },
    { icon: Package, title: "Weak Product Pages", desc: "Product pages that fail to communicate value, build trust, or create urgency result in browsers never becoming buyers." },
    { icon: RefreshCw, title: "No Retention System", desc: "Acquiring a customer once with no follow-up plan means you're constantly paying to replace customers you already had." },
    { icon: Mail, title: "No Email Automation", desc: "Most Shopify stores have zero automated email flows. Welcome, abandoned cart, and post-purchase sequences alone can add 20 to 30% more revenue." },
    { icon: Zap, title: "Slow Store Speed", desc: "A one second delay in page load time can reduce conversions by 7%. Slow stores bleed revenue invisibly on every device, every day." },
    { icon: Smartphone, title: "Poor Mobile Experience", desc: "Over 60% of ecommerce traffic is mobile. A desktop first store design is actively costing you sales with the majority of your visitors." },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-[#F2F4F6]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-red-500 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Common Obstacles
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Why Most Shopify Stores Plateau
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Growth stalls at the same point for most ecommerce brands. These are the problems we fix, systematically and permanently.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all duration-200 group">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <Icon className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-[#111111] mb-2 text-sm leading-tight" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
              <p className="text-[#45464D] text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────────── */
function ServicesSection() {
  const services = [
    { icon: Layers, title: "Shopify Store Design", desc: "Custom high converting Shopify stores built from scratch with conversion architecture at every step.", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: RefreshCw, title: "Shopify Redesign", desc: "Transform an underperforming store into a modern, mobile first revenue machine without starting over.", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: TrendingUp, title: "Conversion Optimization", desc: "Systematic CRO testing on product pages, checkout, and landing pages to consistently lift conversion rate.", color: "text-green-600", bg: "bg-green-50" },
    { icon: Target, title: "Meta Ads", desc: "Facebook and Instagram campaigns engineered for ecommerce with proper creative testing, retargeting, and scaling structures.", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: MousePointerClick, title: "Google Ads", desc: "Shopping, Performance Max, and Search campaigns that capture high intent buyers actively searching for your products.", color: "text-red-600", bg: "bg-red-50" },
    { icon: Mail, title: "Email and SMS Marketing", desc: "Full Klaviyo or Omnisend setup with automated flows and broadcast campaigns that generate 25 to 35% of total revenue.", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Package, title: "Product Page Optimization", desc: "Psychology driven product page redesigns that convert browsers into buyers with better copy, imagery, and social proof.", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Zap, title: "Landing Pages", desc: "High converting landing pages for ad campaigns that drive faster purchase decisions and lower cost per acquisition.", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: DollarSign, title: "Upsell Systems", desc: "Pre and post purchase upsell funnels that increase average order value without disrupting the checkout experience.", color: "text-green-600", bg: "bg-green-50" },
    { icon: RefreshCw, title: "Subscription Systems", desc: "Recurring revenue infrastructure using Recharge or native Shopify subscriptions to build predictable monthly income.", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: BarChart3, title: "Analytics and Tracking", desc: "Full GA4, Meta Pixel, and server side tracking setup so every touchpoint in your customer journey is measured accurately.", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-blue-600 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            What We Do
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Everything Your Shopify Brand Needs to Scale
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            We cover every growth lever in a single partnership so you never have to coordinate between multiple agencies again.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all duration-200 group hover:border-blue-200">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-[#111111] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to={APPLY_URL}
            className="inline-flex items-center gap-2 bg-[#111111] text-white px-9 py-4 rounded-lg font-semibold hover:bg-[#222222] transition-all duration-200 text-base"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Apply For A Growth Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Growth System ─────────────────────────────────────────── */
function GrowthSystemSection() {
  const stages = [
    {
      num: "01",
      label: "Traffic",
      color: "from-blue-500 to-blue-600",
      border: "border-blue-200",
      bg: "bg-blue-50",
      textColor: "text-blue-700",
      items: ["Meta Ads", "Google Shopping", "Performance Max", "Retargeting"],
    },
    {
      num: "02",
      label: "Store",
      color: "from-[#0F4C81] to-[#1D4ED8]",
      border: "border-[#BFDBFE]",
      bg: "bg-[#EFF6FF]",
      textColor: "text-[#1D4ED8]",
      items: ["Shopify Design", "Mobile UX", "Speed Optimization", "Trust Signals"],
    },
    {
      num: "03",
      label: "Conversion",
      color: "from-green-500 to-green-600",
      border: "border-green-200",
      bg: "bg-green-50",
      textColor: "text-green-700",
      items: ["CRO Testing", "Product Pages", "Checkout Flow", "Upsell Systems"],
    },
    {
      num: "04",
      label: "Retention",
      color: "from-purple-500 to-purple-600",
      border: "border-purple-200",
      bg: "bg-purple-50",
      textColor: "text-purple-700",
      items: ["Email Flows", "SMS Campaigns", "Win Back Series", "Loyalty Programs"],
    },
    {
      num: "05",
      label: "Revenue",
      color: "from-amber-500 to-orange-500",
      border: "border-amber-200",
      bg: "bg-amber-50",
      textColor: "text-amber-700",
      items: ["AOV Growth", "Subscriptions", "Referral Programs", "LTV Scaling"],
    },
  ];

  return (
    <section className="py-24 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-blue-600 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            The ShopMaxi Growth System
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            A Complete Ecommerce Growth Ecosystem
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Every stage of the customer journey is covered. We don't just run ads or build websites in isolation. We engineer the entire system.
          </p>
        </div>

        {/* Funnel stages */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-0 relative">
          {stages.map(({ num, label, color, border, bg, textColor, items }, i) => (
            <div key={label} className="flex-1 flex flex-col md:flex-row items-stretch">
              <div className={`flex-1 bg-white rounded-none border ${border} p-6 flex flex-col relative ${i === 0 ? 'md:rounded-l-2xl rounded-t-2xl' : ''} ${i === stages.length - 1 ? 'md:rounded-r-2xl rounded-b-2xl' : ''} hover:shadow-md transition-shadow`}>
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${color} text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start`}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{num}</span>
                  <span style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{label}</span>
                </div>
                <ul className="space-y-2 flex-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color} flex-shrink-0`} />
                      <span className="text-xs text-[#45464D]" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {i < stages.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0 z-10">
                  <ArrowRight className="w-4 h-4 text-[#C9D2DF]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className="mt-10 bg-[#131B2E] rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "Full Funnel", label: "Coverage" },
            { value: "Single Partner", label: "Not 5 agencies" },
            { value: "Data Driven", label: "Every decision" },
            { value: "30 Days", label: "To first results" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-xl font-bold text-[#ADC6FF] mb-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{value}</div>
              <div className="text-[#7C839B] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Case Studies ──────────────────────────────────────────── */
function CaseStudiesSection() {
  const cases = [
    {
      brand: "Apparel Brand",
      industry: "Fashion & Apparel",
      headline: "$0 to $30,000 revenue in 90 days",
      before: [
        { metric: "Monthly Revenue", val: "$0" },
        { metric: "ROAS", val: "N/A" },
        { metric: "Conv. Rate", val: "N/A" },
      ],
      after: [
        { metric: "Monthly Revenue", val: "$30,240" },
        { metric: "ROAS", val: "4.2x" },
        { metric: "Conv. Rate", val: "4.7%" },
      ],
      work: ["Shopify Store Build", "Meta Ads", "Email Flows"],
    },
    {
      brand: "Health and Wellness",
      industry: "Supplements",
      headline: "Conversion rate lifted from 1.2% to 3.8%",
      before: [
        { metric: "Conv. Rate", val: "1.2%" },
        { metric: "CPA", val: "$68" },
        { metric: "AOV", val: "$42" },
      ],
      after: [
        { metric: "Conv. Rate", val: "3.8%" },
        { metric: "CPA", val: "$31" },
        { metric: "AOV", val: "$74" },
      ],
      work: ["CRO", "Product Page Redesign", "Upsells"],
    },
    {
      brand: "Home Goods",
      industry: "Home Decor",
      headline: "Google Ads ROAS improved from 1.4x to 5.1x",
      before: [
        { metric: "Google ROAS", val: "1.4x" },
        { metric: "Monthly Ad Spend", val: "$4,000" },
        { metric: "Revenue from Ads", val: "$5,600" },
      ],
      after: [
        { metric: "Google ROAS", val: "5.1x" },
        { metric: "Monthly Ad Spend", val: "$4,000" },
        { metric: "Revenue from Ads", val: "$20,400" },
      ],
      work: ["Google Shopping", "Performance Max", "Landing Pages"],
    },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-blue-600 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Case Studies
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Before and After Transformations
          </h2>
          <p className="text-[#45464D] max-w-xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Real results from real brands. We don't do vanity metrics.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map(({ brand, industry, headline, before, after, work }) => (
            <div key={brand} className="border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="bg-[#131B2E] px-5 py-4">
                <div className="text-[#7C839B] text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{industry}</div>
                <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{brand}</div>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-[#111111] font-semibold text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{headline}</p>
                {/* Before vs After */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-semibold text-red-500 uppercase tracking-widest mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Before</div>
                    <div className="space-y-1.5">
                      {before.map(({ metric, val }) => (
                        <div key={metric} className="bg-red-50 rounded-lg px-3 py-2">
                          <div className="text-[10px] text-gray-400">{metric}</div>
                          <div className="text-sm font-bold text-red-600">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-green-600 uppercase tracking-widest mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>After</div>
                    <div className="space-y-1.5">
                      {after.map(({ metric, val }) => (
                        <div key={metric} className="bg-green-50 rounded-lg px-3 py-2">
                          <div className="text-[10px] text-gray-400">{metric}</div>
                          <div className="text-sm font-bold text-green-600">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Services used */}
                <div className="flex flex-wrap gap-1.5">
                  {work.map((w) => (
                    <span key={w} className="text-[10px] bg-[#E6F0FF] text-[#1D4ED8] px-2 py-1 rounded-full font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{w}</span>
                  ))}
                </div>
                {/* Testimonial placeholder */}
                <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 text-[#FBBC04] fill-[#FBBC04]" />)}
                  </div>
                  <p className="text-[#45464D] text-xs italic leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    "The ShopMaxi team transformed our store and ad performance completely. Results exceeded every expectation."
                  </p>
                  <div className="text-[10px] font-semibold text-[#111111] mt-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Brand Owner</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Shopify Optimization ──────────────────────────────────── */
function OptimizationSection() {
  const items = [
    {
      icon: Zap,
      title: "Store Speed Optimization",
      desc: "We audit and optimize your Shopify theme, apps, images, and scripts to achieve sub 2 second load times. Every 100ms saved increases revenue measurably.",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Smartphone,
      title: "Mobile First UX",
      desc: "Over 60% of your traffic is on mobile. We redesign every touchpoint of the shopping experience specifically for small screens and thumb navigation.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: ShoppingCart,
      title: "Checkout Optimization",
      desc: "Streamlined checkout flows with fewer steps, trust badges, urgency signals, and native payment methods that reduce abandonment before the sale is lost.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Package,
      title: "Product Page Psychology",
      desc: "We apply buyer psychology principles to every product page: social proof positioning, objection handling copy, scarcity, guarantee placement, and visual hierarchy.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: DollarSign,
      title: "Upsell and Cross Sell Systems",
      desc: "In cart upsells, post purchase offers, and AI powered cross sell recommendations that lift average order value without adding friction to the buying process.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Award,
      title: "Trust Building",
      desc: "Review integration, trust badges, guarantee sections, and social proof systems that convert first time visitors who have never heard of your brand before.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="py-24 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-blue-600 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Store Optimization
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Built to Convert. Engineered to Scale.
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Every element of your Shopify store is a lever for revenue. We pull every one of them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white rounded-2xl p-7 border border-[#E2E8F0] hover:shadow-md transition-all duration-200">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-semibold text-[#111111] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Email & SMS Automation ────────────────────────────────── */
function EmailSMSSection() {
  const flows = [
    {
      trigger: "New Subscriber",
      name: "Welcome Flow",
      steps: ["Welcome email + brand story", "Top products showcase", "Social proof and reviews", "First purchase discount"],
      revenue: "8 to 12% of email revenue",
      color: "border-blue-200 bg-blue-50",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      trigger: "Cart Abandoned",
      name: "Abandoned Cart",
      steps: ["Reminder at 1 hour", "Social proof at 12 hours", "Discount offer at 24 hours", "SMS nudge at 48 hours"],
      revenue: "15 to 25% recovery rate",
      color: "border-amber-200 bg-amber-50",
      badge: "bg-amber-100 text-amber-700",
    },
    {
      trigger: "Order Placed",
      name: "Post Purchase",
      steps: ["Thank you and upsell", "Product use tips", "Review request at day 7", "Repeat purchase offer"],
      revenue: "Increases AOV by 18%",
      color: "border-green-200 bg-green-50",
      badge: "bg-green-100 text-green-700",
    },
    {
      trigger: "90 Days Inactive",
      name: "Win Back Campaign",
      steps: ["Re-engagement email", "New arrivals showcase", "Loyalty reward offer", "Last chance + SMS"],
      revenue: "Recovers 12 to 18% of churned customers",
      color: "border-purple-200 bg-purple-50",
      badge: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span
              className="text-blue-600 text-xs font-medium tracking-widest uppercase mb-4 block"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Email and SMS
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111111] mb-5 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
            >
              Automated Revenue That Works While You Sleep
            </h2>
            <p className="text-[#45464D] text-base leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              The brands generating 30 to 40% of their revenue from email aren't sending newsletters. They have engineered automation systems that turn every customer touchpoint into a revenue event.
            </p>
            <div className="space-y-4">
              {[
                { icon: ShoppingCart, label: "Abandoned cart recovery sequences" },
                { icon: Mail, label: "Welcome flows that build trust and convert" },
                { icon: RefreshCw, label: "Win back campaigns for lapsed customers" },
                { icon: DollarSign, label: "Post purchase upsell automation" },
                { icon: MessageSquare, label: "SMS remarketing and urgency campaigns" },
                { icon: BarChart3, label: "Revenue attributed reporting by flow" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-[#45464D] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flow visuals */}
          <div className="space-y-4">
            {flows.map(({ trigger, name, steps, revenue, color, badge }) => (
              <div key={name} className={`border rounded-xl p-5 ${color}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Trigger: {trigger}</div>
                    <div className="font-semibold text-[#111111] text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{name}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${badge}`} style={{ fontFamily: "'Inter', sans-serif" }}>{revenue}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[9px] font-bold text-gray-500 flex-shrink-0">{i + 1}</div>
                      <span className="text-xs text-[#45464D]" style={{ fontFamily: "'Inter', sans-serif" }}>{step}</span>
                      {i < steps.length - 1 && <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Us ────────────────────────────────────────────────── */
function WhyUsSection() {
  const reasons = [
    {
      icon: BarChart3,
      title: "Data Driven Growth",
      desc: "Every decision from ad creative selection to product page layout is informed by data. We run structured tests, measure outcomes, and scale what works.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Target,
      title: "Creative Strategy",
      desc: "We combine performance marketing expertise with strong creative direction. Great ads need both compelling creative and precise targeting to drive results.",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: TrendingUp,
      title: "Conversion Focused",
      desc: "More traffic is not the goal. More revenue per visitor is. We optimize every stage of the funnel before scaling spend to ensure every dollar works harder.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: ClipboardCheck,
      title: "Transparent Reporting",
      desc: "You get a live dashboard and monthly report with every metric that matters. No vanity numbers, no hiding poor performance. Full visibility, always.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Settings,
      title: "Long Term Scaling Mindset",
      desc: "We don't optimize for the first 30 days. We build scalable systems, automation, and retention engines designed to compound revenue month over month.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Users,
      title: "Senior Dedicated Team",
      desc: "You work directly with senior strategists, not junior account managers. The people who pitched your strategy are the same people executing it.",
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  return (
    <section className="py-24 bg-[#131B2E] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-[#ADC6FF] text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Why ShopMaxi
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Why Shopify Brands Choose Us to Scale
          </h2>
          <p className="text-[#7C839B] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            We're not a generic digital agency. We're a Shopify growth partner that operates more like an in-house team than an external vendor.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-white/20 transition-all duration-200">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-white font-semibold mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
              <p className="text-[#7C839B] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQSection() {
  const faqs = [
    {
      q: "How fast can we scale a Shopify store?",
      a: "Timeline depends on your starting point. For a new brand with a properly built store and sufficient ad budget, we typically achieve meaningful revenue within the first 30 to 60 days. For established stores with existing traffic, conversion improvements can show results within the first two weeks. We set honest expectations during your Growth Call based on your specific situation."
    },
    {
      q: "Do you manage ads as part of ShopMaxi?",
      a: "Yes. We manage Meta Ads, Google Shopping, and Performance Max campaigns directly. Ad spend is paid separately to the platforms. We recommend a minimum ad spend of $1,500 to $3,000 per month to achieve meaningful scale, depending on your product category and margin."
    },
    {
      q: "Can you redesign an existing Shopify store?",
      a: "Absolutely. Many of our best results come from redesigning stores that already have traffic but poor conversion rates. We audit your existing store, identify the highest impact changes, and rebuild or optimize accordingly. You keep your domain, products, and customer data throughout the process."
    },
    {
      q: "Do you work with brand new Shopify stores?",
      a: "Yes. We work with brands at every stage from pre-launch to scaling past seven figures. For new brands we handle store setup, product page creation, initial ad campaigns, and email automation all at once so you launch into the market with everything working from day one."
    },
    {
      q: "What platforms and apps do you integrate with?",
      a: "We work across the full Shopify ecosystem including Klaviyo, Omnisend, Postscript, Recharge, Yotpo, Judge.me, Loox, ReConvert, Zipify, Google Analytics 4, Meta Pixel with CAPI, and Northbeam. If your stack requires a specific integration, we have experience across dozens of Shopify apps."
    },
    {
      q: "Do you handle email marketing and automation?",
      a: "Yes. Email and SMS automation is a core part of our growth system. We set up and manage Klaviyo or Omnisend accounts including abandoned cart flows, welcome sequences, post purchase automation, win back campaigns, and broadcast sending strategy. Most of our clients generate 25 to 35% of their total revenue from email alone after our setup."
    },
    {
      q: "Can you improve our conversion rate without rebuilding the store?",
      a: "In many cases yes. Our CRO process starts with a full audit of your existing store identifying the highest leverage changes: product page structure, checkout flow, trust signals, mobile experience, and page speed. We often achieve significant conversion rate improvements through targeted changes without a full redesign."
    },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-[#F2F4F6]">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Shopify Growth
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-blue-500 shadow-sm' : 'border-[#E2E8F0]'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left">
        <span className="font-semibold text-[#111111] pr-8 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{question}</span>
        <svg className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-0">
          <div className="w-full h-px bg-gray-100 mb-5" />
          <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Final CTA ─────────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="py-24 px-4 md:px-12 text-center bg-white">
      <div className="max-w-4xl mx-auto border-t border-[#E2E8F0] pt-24">
        <span
          className="text-blue-600 text-xs font-medium tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get Started Today
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Ready To Scale Your Shopify Brand?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll audit your store, ad accounts, and email before we even speak. We'll show you exactly where revenue is being left on the table and what it takes to fix it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link
            to={APPLY_URL}
            className="inline-flex items-center gap-2 justify-center bg-[#111111] text-white px-10 py-5 rounded-lg font-bold text-base hover:bg-[#222222] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Apply For A Growth Call <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to={APPLY_URL}
            className="inline-flex items-center gap-2 justify-center border border-[#E2E8F0] bg-white text-[#111111] px-10 py-5 rounded-lg font-bold text-base hover:bg-gray-50 transition-colors"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Get Free Shopify Audit
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: TrendingUp, text: "Revenue Focused" },
            { icon: BarChart3, text: "Full Funnel Coverage" },
            { icon: CheckCircle, text: "Transparent Reporting" },
            { icon: Star, text: "Senior Dedicated Team" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[#45464D]">
              <Icon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
