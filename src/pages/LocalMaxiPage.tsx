import {
  MapPin, Shield, CheckCircle, XCircle, AlertCircle, ArrowRight,
  Phone, MessageSquare, BarChart3, Clock, Star, TrendingUp,
  ClipboardCheck, Settings, Zap, Users, Bell, FileText, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { useState } from 'react';
import { WordCrawler } from '../components/WordCrawler';

const APPLY_URL = '/apply';

export function LocalMaxiPage() {
  return (
    <>
      <SEOHead
        title="LocalMaxi — Google Local Services Ads Management | SiteMaxi Canada & USA"
        description="Stop paying for clicks. Start paying for real leads. LocalMaxi sets up and manages Google Local Services Ads for Canadian and US businesses. Get Google Guaranteed and pay only for qualified leads."
        keywords="Google Local Services Ads Canada, LSA management agency, Google Guaranteed setup, Local Services Ads USA, Google LSA experts, Google Guaranteed Canada, pay per lead advertising, local services ads management"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'LocalMaxi — Google Local Services Ads', url: 'https://sitemaxi.com/localmaxi' },
        ]}
      />
      <HeroSection />
      <TrustSection />
      <WhatIsLSASection />
      <IndustriesSection />
      <WhyBusinessesFailSection />
      <OurProcessSection />
      <GoogleGuaranteedSection />
      <LeadTrackingSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="py-24 px-4 md:px-12 text-center max-w-5xl mx-auto" style={{ paddingTop: '7rem' }}>
      <span
        className="inline-block bg-green-100 text-green-900 px-3 py-1 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Google Local Services Ads
      </span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
      >
        Stop Paying for Clicks.<br />Start Paying for Real <WordCrawler />.
      </h1>
      <p
        className="text-[#45464D] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Google Local Services Ads place your business at the very top of search results with a Google Guaranteed badge — and you only pay when a qualified customer contacts you directly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <Link
          to={APPLY_URL}
          className="bg-[#111111] text-white px-8 py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#222222] transition-all duration-200 shadow-sm"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Apply For A Growth Call
          <TrendingUp className="w-4 h-4" />
        </Link>
        <Link
          to={APPLY_URL}
          className="border border-[#E2E8F0] bg-white text-[#111111] px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Get Free LSA Audit
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Google search mockup */}
      <div className="max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-left">
          {/* Search bar */}
          <div className="bg-[#F8F9FA] p-3 border-b border-gray-100 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-200 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
              <span className="text-sm text-gray-500">plumber near me</span>
            </div>
          </div>
          {/* LSA results */}
          <div className="p-3 space-y-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider px-1" style={{ fontFamily: "'Inter', sans-serif" }}>Sponsored · Local Services Ads</p>
            {[
              { name: "ABC Plumbing Co.", rating: "4.9", reviews: "312", tag: "Verified · Serves your area" },
              { name: "Metro Plumbers", rating: "4.8", reviews: "187", tag: "Verified · Serves your area" },
            ].map((r) => (
              <div key={r.name} className="border border-gray-100 rounded-xl p-3 bg-white hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#2E7D32]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-semibold text-[#1A0DAB] text-sm truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{r.name}</span>
                      <span className="inline-flex items-center gap-0.5 bg-[#E8F5E9] text-[#1B5E20] text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0">
                        <Shield className="w-2.5 h-2.5" /> Guaranteed
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#FBBC04] fill-[#FBBC04]" />
                      <span className="text-xs font-semibold text-[#111111]">{r.rating}</span>
                      <span className="text-[11px] text-gray-400">({r.reviews})</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{r.tag}</p>
                  </div>
                  <Phone className="w-4 h-4 text-[#4285F4] flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>Your business appears here — above all other ads</p>
      </div>
    </section>
  );
}

/* ─── Trust ─────────────────────────────────────────────────── */
function TrustSection() {
  const stats = [
    { value: "#1", label: "Position on Google", sub: "LSAs appear above all Google Ads and organic results", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { value: "PPL", label: "Pay Per Lead", sub: "You only pay when a customer actually calls or messages you", icon: Shield, color: "text-green-600", bg: "bg-green-50" },
    { value: "2–3×", label: "Higher Trust", sub: "Google Guaranteed badge drives more clicks vs standard listings", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
    { value: "Local", label: "Verified by Google", sub: "Background checks, licensing, and insurance reviewed by Google", icon: CheckCircle, color: "text-teal-600", bg: "bg-teal-50" },
  ];

  return (
    <section className="py-20 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            The Most Powerful Local Ad Format Google Has Ever Built
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Local Services Ads aren't just another ad type. They're Google's highest-trust ad placement for local businesses, giving verified businesses prime real estate at the very top of search.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, label, sub, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-7 border border-[#E2E8F0] hover:shadow-md transition-all duration-200">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className="text-3xl font-bold text-[#111111] mb-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{value}</div>
              <div className="text-sm font-semibold text-[#111111] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{label}</div>
              <p className="text-[#45464D] text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── What Is LSA ───────────────────────────────────────────── */
function WhatIsLSASection() {
  const comparison = [
    { feature: "Billing Model", lsa: "Pay per qualified lead", ads: "Pay per click (even bad clicks)" },
    { feature: "Placement", lsa: "Above all ads & organic results", ads: "Below LSA listings" },
    { feature: "Trust Level", lsa: "Google Guaranteed badge", ads: "Standard ad label" },
    { feature: "Lead Quality", lsa: "Phone calls & messages only", ads: "Clicks to website" },
    { feature: "Competition", lsa: "Only verified businesses", ads: "Anyone who pays" },
    { feature: "Setup Complexity", lsa: "Verification + optimization", ads: "Keywords + bidding" },
  ];

  return (
    <section className="py-24 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span
              className="text-green-600 text-xs font-medium tracking-widest uppercase mb-4 block"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Education
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111111] mb-6 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
            >
              What Are Google Local Services Ads?
            </h2>
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  title: "A dedicated ad format for local service businesses",
                  desc: "LSAs are a Google ad product built exclusively for service-based businesses. They appear at the very top of Google search — even above traditional Google Ads."
                },
                {
                  icon: Shield,
                  title: "Google verifies your business first",
                  desc: "Before you can run LSAs, Google reviews your business licenses, insurance, and runs background checks on your team. Passing this process earns you the Google Guaranteed badge."
                },
                {
                  icon: Phone,
                  title: "You only pay when customers contact you",
                  desc: "Unlike regular Google Ads where you pay for every click, with LSAs you only pay when a verified customer calls, texts, or books directly through your listing."
                },
                {
                  icon: Star,
                  title: "Google Guaranteed builds instant trust",
                  desc: "Customers see the green Google Guaranteed badge before they even click. This verification signal dramatically increases conversion rates vs standard ads."
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111111] mb-1 text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
                    <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="text-xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Google Ads vs. Local Services Ads
            </h3>
            <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <div className="grid grid-cols-3 bg-[#131B2E] text-white">
                <div className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Feature</div>
                <div className="p-4 text-xs font-semibold uppercase tracking-wider border-l border-white/10 text-[#ADC6FF]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LSA</div>
                <div className="p-4 text-xs font-semibold uppercase tracking-wider border-l border-white/10 text-gray-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Google Ads</div>
              </div>
              {comparison.map(({ feature, lsa, ads }, i) => (
                <div key={feature} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} border-t border-[#E2E8F0]`}>
                  <div className="p-4 text-xs font-semibold text-[#111111]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{feature}</div>
                  <div className="p-4 border-l border-[#E2E8F0] flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#111111] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{lsa}</span>
                  </div>
                  <div className="p-4 border-l border-[#E2E8F0] flex items-start gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{ads}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Industries ────────────────────────────────────────────── */
const CANADA_INDUSTRIES = [
  "Appliance repair services", "Carpet cleaning services", "Cleaning services",
  "Electricians", "HVAC (heating or air conditioning)", "Junk removal services",
  "Lawn care services", "Locksmiths", "Movers", "Pest control services",
  "Plumbers", "Roofers", "Tree services", "Water damage services",
  "Window cleaning services", "Window repair services",
];

const USA_INDUSTRIES = [
  "Acupuncturist", "Allergist", "Animal rescue", "Appliance repair services",
  "Architect (CA & FL only)", "Audiologist", "Auto body shop", "Auto repair shop",
  "Bankruptcy lawyer", "Barber shop (CA & FL only)", "Bathroom remodeling",
  "Beauty school", "Business lawyer", "Carpet cleaning", "Carpenters",
  "Car wash & detailing", "Cell phone & laptop repair", "Child care",
  "Chiropractor", "Contract lawyer", "Countertop services", "Criminal lawyer",
  "Dance instructor", "Dentist", "Dermatologist", "Dietitian",
  "Disability lawyer", "Driving instructor", "DUI lawyer", "Electricians",
  "Estate lawyer", "Family lawyer", "Fencing services", "Financial planning",
  "First aid training", "Flooring services", "Foundations services",
  "Funeral home", "Garage door services", "General contractor", "Handyman",
  "Hair removal (CA & FL only)", "Hair salon (CA & FL only)", "Home inspector",
  "Home insulation (CA & FL only)", "Home security", "Home theater",
  "House cleaning", "HVAC", "Immigration lawyer", "Insurance agency (CA & FL only)",
  "Interior designer (CA & FL only)", "IP lawyer", "Junk removal",
  "Kitchen remodeling", "Labor lawyer", "Landscaping", "Language instructor",
  "Lawn care", "Lawyers", "Litigation lawyer", "Locksmiths",
  "Malpractice lawyer", "Massage therapist", "Moving services",
  "Nail salon (CA & FL only)", "Occupational therapist", "Ophthalmologist",
  "Optometrist", "Orthodontist", "Orthopedic surgeon", "Painter",
  "Personal injury lawyer", "Personal trainer", "Pest control", "Pet adoption",
  "Pet boarding", "Pet grooming", "Pet training", "Physical therapist",
  "Plastic surgeon", "Plumbers", "Podiatrist", "Pool cleaner", "Pool contractor",
  "Preschool", "Primary care physician", "Real estate lawyer", "Real estate services",
  "Roofers", "Sewage system", "Siding services", "Snow removal",
  "Solar energy contractor", "Storage", "Tax services",
  "Tattoo studio (CA & FL only)", "Tire shop (CA & FL only)", "Traffic lawyer",
  "Tree services", "Towing", "Tutor", "Veterinarian", "Water damage services",
  "Weight loss service", "Window cleaning", "Window repair", "Yoga studio",
];

const INDUSTRY_ICONS: Record<string, typeof MapPin> = {
  default: MapPin,
};

function IndustriesSection() {
  const [tab, setTab] = useState<'canada' | 'usa'>('canada');
  const industries = tab === 'canada' ? CANADA_INDUSTRIES : USA_INDUSTRIES;

  return (
    <section className="py-24 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="text-green-600 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Eligible Industries
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Is Your Business Eligible for LSAs?
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Google Local Services Ads are available to hundreds of business categories across Canada and the United States.
          </p>
          {/* Tab toggle */}
          <div className="inline-flex bg-white rounded-xl border border-[#E2E8F0] p-1 shadow-sm">
            <button
              onClick={() => setTab('canada')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === 'canada' ? 'bg-[#131B2E] text-white shadow-sm' : 'text-[#45464D] hover:text-[#111111]'}`}
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Canada
            </button>
            <button
              onClick={() => setTab('usa')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === 'usa' ? 'bg-[#131B2E] text-white shadow-sm' : 'text-[#45464D] hover:text-[#111111]'}`}
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              United States
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {industries.map((industry) => (
            <div
              key={industry}
              className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 flex items-center gap-2.5 hover:border-green-300 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="text-[#111111] text-xs font-medium leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>{industry}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#45464D] text-sm inline-flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            Eligibility varies by region and Google requirements. Contact us to confirm your industry.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Businesses Fail ───────────────────────────────────── */
function WhyBusinessesFailSection() {
  const failures = [
    {
      icon: AlertCircle,
      title: "Poor Profile Setup",
      desc: "Incomplete business profiles with missing service areas, photos, or categories cause Google to deprioritize your listing before it even reaches customers.",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: Star,
      title: "No Review Strategy",
      desc: "LSAs heavily weight your Google review count and rating. Businesses with fewer than 20 reviews rarely appear consistently at the top of results.",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: MapPin,
      title: "Wrong Targeting",
      desc: "Targeting too broad of a service area dilutes your budget across unqualified locations. Precise geo-targeting is critical for profitable LSA campaigns.",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: Clock,
      title: "Slow Response Times",
      desc: "Google monitors how quickly businesses respond to leads. Slow response rates damage your LSA ranking and waste ad budget on missed opportunities.",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: BarChart3,
      title: "Unoptimized Budgets",
      desc: "Setting a flat weekly budget without adjusting for seasonal demand, peak hours, or high-value services leads to wasted spend and missed lead volume.",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: XCircle,
      title: "Weak Verification Setup",
      desc: "Failing Google's license, insurance, and background check process delays your listing for months. Proper documentation preparation is essential from day one.",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-red-500 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Common Mistakes
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Why Most Businesses Fail With LSA
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Google Local Services Ads look simple but require expert setup and ongoing optimization. Most businesses burn budget on avoidable mistakes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {failures.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white border border-[#E2E8F0] rounded-2xl p-7 hover:shadow-md transition-all duration-200">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-base font-semibold text-[#111111] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Our Process ───────────────────────────────────────────── */
function OurProcessSection() {
  const steps = [
    {
      num: "01",
      icon: ClipboardCheck,
      title: "Business Eligibility Check",
      desc: "We confirm your industry and location are eligible for LSAs and identify exactly what documents and verification steps will be required.",
    },
    {
      num: "02",
      icon: Settings,
      title: "LSA Setup & Verification",
      desc: "We create and configure your Google Local Services Ads profile with the correct categories, service areas, hours, and business details.",
    },
    {
      num: "03",
      icon: Shield,
      title: "Background Checks & Licensing",
      desc: "We guide you through Google's verification process for business licenses, insurance certificates, and any required background checks.",
    },
    {
      num: "04",
      icon: FileText,
      title: "Profile Optimization",
      desc: "Every element of your LSA profile is optimized — photos, service descriptions, service areas, and business category selection — to maximize impressions.",
    },
    {
      num: "05",
      icon: Star,
      title: "Review Strategy Setup",
      desc: "We implement a systematic review generation process to build your Google rating and review count, which directly impacts your LSA ranking.",
    },
    {
      num: "06",
      icon: Phone,
      title: "Lead Routing & Tracking",
      desc: "All inbound LSA calls and messages are routed through our tracking system so every lead is recorded, attributed, and followed up on automatically.",
    },
    {
      num: "07",
      icon: RefreshCw,
      title: "Ongoing Optimization",
      desc: "We monitor budget pacing, bid strategy, response rates, and review velocity every week — continuously improving your cost per lead.",
    },
  ];

  return (
    <section className="py-24 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-green-600 text-xs font-medium tracking-widest uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Our Process
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            From Application to Approved in 7 Steps
          </h2>
          <p className="text-[#45464D] max-w-xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            We manage the entire LSA setup and optimization process from end to end so you can focus on handling the inbound leads.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#E2E8F0] hidden md:block" />

          <div className="space-y-6">
            {steps.map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="flex gap-6 relative">
                <div className="flex-shrink-0 w-16 h-16 bg-white border-2 border-[#E2E8F0] rounded-2xl flex flex-col items-center justify-center shadow-sm relative z-10">
                  <Icon className="w-5 h-5 text-green-600 mb-0.5" />
                  <span className="text-[10px] font-bold text-green-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{num}</span>
                </div>
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 flex-1 hover:shadow-sm transition-shadow">
                  <h3 className="text-base font-semibold text-[#111111] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
                  <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
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

/* ─── Google Guaranteed ─────────────────────────────────────── */
function GoogleGuaranteedSection() {
  return (
    <section className="py-24 bg-[#131B2E] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1E2D4A] border border-white/10 px-4 py-2 rounded-full mb-8">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Google Guaranteed</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
            >
              The Most Trusted Badge in Local Search
            </h2>
            <p className="text-[#7C839B] text-base leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              The Google Guaranteed badge is not just a label — it's a signal that Google has personally verified your business's licenses, insurance, and background. Customers see this before they even click your listing, and it changes how they feel about calling you.
            </p>
            <div className="space-y-5">
              {[
                { icon: Shield, title: "Google Has Verified Your Business", desc: "Background checks on technicians, license verification, and insurance review completed by Google itself." },
                { icon: CheckCircle, title: "Customers Are Protected", desc: "If a customer is unsatisfied, Google may refund up to the amount paid for the service — giving them zero risk to try your business." },
                { icon: TrendingUp, title: "Higher Click-Through Rates", desc: "Verified Google Guaranteed listings receive significantly more clicks and calls than non-guaranteed competitors in the same market." },
                { icon: Star, title: "Builds Instant Credibility", desc: "New businesses with fewer reviews can compete with established players because the badge itself signals legitimacy and trustworthiness." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
                    <p className="text-[#7C839B] text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge visual */}
          <div className="flex flex-col items-center gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-2xl text-center w-full max-w-sm">
              <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-5">
                <Shield className="w-10 h-10 text-[#1B5E20]" />
              </div>
              <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#1B5E20] px-4 py-2 rounded-full mb-4">
                <Shield className="w-4 h-4" />
                <span className="font-bold text-sm">Google Guaranteed</span>
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Your Business Name</h3>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 text-[#FBBC04] fill-[#FBBC04]" />)}
                <span className="text-sm font-semibold text-[#111111] ml-1">4.9</span>
                <span className="text-sm text-gray-400">(148 reviews)</span>
              </div>
              <p className="text-xs text-gray-400 mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>Licensed · Insured · Background Checked</p>
              <button className="w-full bg-[#4285F4] text-white rounded-lg py-3 font-semibold text-sm hover:bg-[#3367D6] transition-colors">
                Call Now
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {[
                { label: "Customer Guarantee", value: "Up to $2,000" },
                { label: "Approval Timeline", value: "2–4 Weeks" },
                { label: "Click Rate Lift", value: "+38% avg" },
                { label: "Lead Quality", value: "Verified only" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-white font-bold text-lg" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{value}</div>
                  <div className="text-[#7C839B] text-xs mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Lead Tracking ─────────────────────────────────────────── */
function LeadTrackingSection() {
  const features = [
    { icon: Phone, title: "Call Tracking", desc: "Every inbound call is recorded and attributed to your LSA campaign so you know exactly which leads come from Google." },
    { icon: FileText, title: "Lead Recording", desc: "Full call recordings stored and organized for quality review, training, and dispute resolution with Google." },
    { icon: Bell, title: "Missed Call Text Back", desc: "When a lead calls and you miss it, they automatically receive a text within seconds to keep them engaged." },
    { icon: MessageSquare, title: "SMS Follow-Ups", desc: "Automated text sequences follow up with new leads at the right intervals to maximize booking rates." },
    { icon: BarChart3, title: "Reporting Dashboard", desc: "Live dashboards show lead volume, cost per lead, response rates, and booking conversion in one place." },
  ];

  return (
    <section className="py-24 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="text-green-600 text-xs font-medium tracking-widest uppercase mb-4 block"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Lead Management
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111111] mb-5 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
            >
              Every Lead Tracked, Followed Up, and Converted
            </h2>
            <p className="text-[#45464D] text-base leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
              Getting a lead is only half the battle. We connect your LSA campaigns with CRM automation so no lead falls through the cracks — whether you answer the phone or not.
            </p>
            <div className="space-y-6">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111111] mb-1 text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
                    <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-lg">
            <div className="bg-[#131B2E] px-5 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-[#7C839B] text-xs ml-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LSA Dashboard — Live</span>
            </div>
            <div className="p-5 space-y-4">
              {/* Metric row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Leads This Month", value: "34", delta: "+12%", pos: true },
                  { label: "Cost Per Lead", value: "$28", delta: "-8%", pos: true },
                  { label: "Booking Rate", value: "71%", delta: "+5%", pos: true },
                ].map(({ label, value, delta, pos }) => (
                  <div key={label} className="bg-white rounded-xl p-3 border border-[#E2E8F0] text-center">
                    <div className="text-xl font-bold text-[#111111]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{value}</div>
                    <div className="text-[10px] text-gray-400 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
                    <div className={`text-[10px] font-semibold ${pos ? 'text-green-600' : 'text-red-500'}`}>{delta}</div>
                  </div>
                ))}
              </div>
              {/* Recent leads */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#111111]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Recent Leads</span>
                  <span className="text-[10px] text-green-600 font-medium">Live</span>
                </div>
                {[
                  { name: "Sarah M.", type: "Call", time: "2m ago", status: "Booked" },
                  { name: "James K.", type: "Message", time: "18m ago", status: "Follow-up sent" },
                  { name: "Linda R.", type: "Call", time: "1h ago", status: "Booked" },
                  { name: "Mike T.", type: "Call", time: "2h ago", status: "Missed → SMS sent" },
                ].map((lead) => (
                  <div key={lead.name} className="px-4 py-2.5 border-b border-[#F2F4F6] last:border-0 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#111111]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{lead.name}</div>
                        <div className="text-[10px] text-gray-400">{lead.type} · {lead.time}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${lead.status === 'Booked' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'}`}>
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQSection() {
  const faqs = [
    {
      q: "How much do Google Local Services Ads cost?",
      a: "LSAs work on a pay-per-lead model. You set a weekly budget and only pay when a verified customer calls or messages you directly through your listing. Lead costs vary by industry and location but typically range from $15–$90 per lead. You're never charged for clicks — only for real contacts."
    },
    {
      q: "Do I need reviews to run LSAs?",
      a: "Yes. Google factors your review count and rating into your LSA ranking. Businesses with higher ratings and more reviews appear more frequently and prominently. We recommend having at least 10–20 verified Google reviews before launching, and we implement a review generation strategy as part of our onboarding."
    },
    {
      q: "Is LSA available in my industry?",
      a: "LSAs are available for over 100 service categories in the United States and 16 categories in Canada. Eligibility also depends on your city and region. The best way to confirm is to contact us — we'll check your specific business type and location in minutes."
    },
    {
      q: "What is Google Guaranteed and how do I get it?",
      a: "Google Guaranteed is a verification badge that Google awards after reviewing your business licenses, insurance, and conducting background checks on your team. The process takes 2–4 weeks. Once approved, the green Google Guaranteed badge appears on your listing and customers are covered by a Google-backed satisfaction guarantee."
    },
    {
      q: "How long does LSA approval take?",
      a: "The Google verification process typically takes 2–4 weeks depending on your industry and how quickly you submit the required documents. We manage this entire process for you, preparing your documentation and following up with Google to minimize delays."
    },
    {
      q: "Do I pay per click with LSAs?",
      a: "No. That's one of the biggest advantages of LSAs over regular Google Ads. You only pay when a verified customer contacts you directly — via phone call or message — through your LSA listing. You never pay for someone who simply clicks and leaves."
    },
    {
      q: "Can SiteMaxi manage everything for me?",
      a: "Yes. We handle the full LSA setup, Google verification process, profile optimization, review strategy, lead tracking, and ongoing budget and bid management. You approve the setup, we manage the day-to-day, and you receive a monthly performance report with full transparency into your cost per lead."
    },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-[#F2F4F6]">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Google LSAs
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
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-green-500 shadow-sm' : 'border-[#E2E8F0]'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left">
        <span className="font-semibold text-[#111111] pr-8 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{question}</span>
        <svg className={`w-5 h-5 text-green-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          className="text-green-600 text-xs font-medium tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get Started Today
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Ready to Dominate Local Search with Google Local Services Ads?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll audit your current local presence, confirm your LSA eligibility, and show you exactly what it takes to get the Google Guaranteed badge for your business.
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
            Request Free LSA Audit
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: Shield, text: "Google Verified Setup" },
            { icon: CheckCircle, text: "Pay Per Lead Only" },
            { icon: Star, text: "Full Profile Optimization" },
            { icon: BarChart3, text: "Monthly Reporting" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[#45464D]">
              <Icon className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
