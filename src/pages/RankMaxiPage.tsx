import { MapPin, Star, TrendingUp, Search, XCircle, AlertCircle, MessageSquare, ArrowRight, BarChart3, Target, ClipboardCheck, Settings, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { ServiceMethodologyCarousel } from '../components/ServiceMethodologyCarousel';
import { useState } from 'react';

const APPLY_URL = '/apply';

export function RankMaxiPage() {
  return (
    <>
      <SEOHead
        title="RankMaxi — Local SEO & Google Maps Ranking Services Canada"
        description="Get found when local customers are ready to buy. RankMaxi by SiteMaxi helps Canadian businesses rank higher on Google Maps and local search. More calls, more direction requests, more customers."
        keywords="local SEO Canada, Google Maps ranking, Google Business Profile optimization, local search ranking, near me SEO, local SEO services Canada"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'RankMaxi — Local SEO', url: 'https://sitemaxi.com/rankmaxi' },
        ]}
      />
      <HeroSection />
      <ProblemSection />
      <StatsSection />
      <BentoSection />
      <RankMaxiMethodology />
      <ResultsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="py-24 px-4 md:px-12 text-center max-w-4xl mx-auto" style={{ paddingTop: '7rem' }}>
      <span
        className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Local Growth Channel
      </span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
      >
        Get Found When Local Customers Are Ready To Buy
      </h1>
      <p
        className="text-[#45464D] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Your customers search on Google before they call anyone. We help your business appear in the top results on Google Maps, so more of those searches turn into calls, visits, and revenue.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to={APPLY_URL}
          className="bg-[#111111] text-white px-8 py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#222222] transition-all duration-200 shadow-sm"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Apply For A Growth Call
          <TrendingUp className="w-4 h-4" />
        </Link>
        <a
          href="#how-it-works"
          className="border border-[#E2E8F0] bg-white text-[#111111] px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          See How It Works
        </a>
      </div>
    </section>
  );
}

/* ─── Problem ───────────────────────────────────────────── */
function ProblemSection() {
  const problems = [
    {
      icon: XCircle,
      title: "No Map Pack Visibility",
      desc: "You're not showing up in the crucial top 3 Google Maps results where 70% of clicks happen."
    },
    {
      icon: AlertCircle,
      title: "Incomplete Profile",
      desc: "Your Google Business Profile is incomplete or unoptimized, confusing both customers and Google."
    },
    {
      icon: MessageSquare,
      title: "Review Stagnation",
      desc: "Few or inconsistent reviews signal to prospective customers that your business might be inactive."
    }
  ];

  return (
    <section className="py-20 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-16 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Why Most Local Businesses Are Invisible on Google
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {problems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white flex items-center justify-center rounded-xl mb-6 shadow-sm">
                <Icon className="w-7 h-7 text-red-500" />
              </div>
              <h3
                className="text-xl font-semibold text-[#111111] mb-3"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-[#45464D] text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats (dark bento) ────────────────────────────────── */
function StatsSection() {
  return (
    <section className="py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#131B2E] rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2
              className="text-white text-3xl md:text-4xl font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
            >
              Every Month Without Local SEO Is Revenue Left on the Table
            </h2>
            <p
              className="text-[#7C839B] text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Missing out on local searches means your competitors are taking your potential customers every single day.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-5 w-full">
            {[
              { stat: "76%", text: "of people visit or contact a local business within 24 hours of search." },
              { stat: "46%", text: "of all Google searches have direct local intent." },
              { stat: "88%", text: "of local mobile searches lead to a call or visit within a day." },
            ].map(({ stat, text }) => (
              <div
                key={stat}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl flex items-center gap-5"
              >
                <div
                  className="text-4xl font-bold text-[#ADC6FF] flex-shrink-0 min-w-[5rem]"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {stat}
                </div>
                <p
                  className="text-white text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Bento Services Grid ───────────────────────────────── */
function BentoSection() {
  const small = [
    { icon: Star, title: "Review Management", desc: "Systematically grow your social proof and manage customer feedback." },
    { icon: Target, title: "Local Landing Pages", desc: "Optimized pages that convert local traffic into phone calls." },
    { icon: BarChart3, title: "Ranking Reports", desc: "Clear, data-driven insights on your business's performance." },
    { icon: Search, title: "Citation Building", desc: "Ensure your business information is accurate across the web." },
  ];

  return (
    <section className="py-20 bg-[#E6E8EA] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Specific Improvements, Not Vague Promises
          </h2>
          <p
            className="text-[#45464D] max-w-2xl mx-auto text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We provide high-precision optimization for the signals Google cares about most.
          </p>
        </div>

        {/* Bento layout: hidden on mobile, visible md+ */}
        <div className="hidden md:grid md:grid-cols-4 gap-6" style={{ gridTemplateRows: '1fr 1fr', minHeight: '520px' }}>
          {/* Large feature card: 2 cols × 2 rows */}
          <div className="md:col-span-2 row-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-[#0058BE]" />
              </div>
              <h3
                className="text-xl font-semibold text-[#111111] mb-4"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Map Pack Dominance
              </h3>
              <p
                className="text-[#45464D] text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get into the coveted top 3 local results where customers actually click. We manage the technical details so you get the visibility and the calls that come with it.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Marketing team analyzing local SEO data"
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>

          {/* 4 small cards fill 2 cols × 2 rows */}
          {small.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-[#0058BE]" />
              </div>
              <h4
                className="font-semibold text-[#111111] mb-2 text-base"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                {title}
              </h4>
              <p
                className="text-[#45464D] text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile fallback: simple stacked grid */}
        <div className="grid grid-cols-1 gap-5 md:hidden">
          {[{ icon: MapPin, title: "Map Pack Dominance", desc: "Get into the coveted top 3 local results where customers actually click." }, ...small].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-[#0058BE]" />
              </div>
              <h4 className="font-semibold text-[#111111] mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h4>
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

/* ─── Methodology Carousel ──────────────────────────────── */
const RANKMAXI_STEPS = [
  {
    id: 'diagnose',
    label: 'Diagnose',
    icon: ClipboardCheck,
    description: 'We audit your current profile and local competition to identify every gap holding you back.',
    fallbackImage: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: Settings,
    description: 'Technical updates to your Google Business Profile and website to align with local ranking factors.',
    fallbackImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'authority',
    label: 'Build Authority',
    icon: Award,
    description: 'Generating citations and reviews that establish you as the undisputed local leader.',
    fallbackImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'grow',
    label: 'Track & Grow',
    icon: TrendingUp,
    description: 'Monthly analysis and iterative improvements to stay ahead of every competitor in your market.',
    fallbackImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

function RankMaxiMethodology() {
  return (
    <ServiceMethodologyCarousel
      serviceSlug="rankmaxi"
      steps={RANKMAXI_STEPS}
      heading="A Clear Process, Not a Black Box"
      label="Our Methodology"
    />
  );
}

/* ─── Results ───────────────────────────────────────────── */
function ResultsSection() {
  const metrics = [
    { value: "#1–3", label: "Map Pack Position" },
    { value: "+40–80%", label: "More Phone Calls" },
    { value: "3×", label: "New Reviews Monthly" },
    { value: "4–8 Wks", label: "To First Results" },
  ];

  return (
    <section className="py-20 bg-[#131B2E] text-white px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Real Outcomes for Local Businesses
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(({ value, label }) => (
            <div key={label} className="p-8 border border-white/10 rounded-2xl text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#ADC6FF] mb-3"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
              >
                {value}
              </div>
              <p
                className="text-[#7C839B] text-xs font-medium uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────── */
function FAQSection() {
  const faqs = [
    {
      q: "How long does it take to see results from Local SEO?",
      a: "Most businesses start seeing measurable improvements in their Google Maps rankings within 4–8 weeks. Stronger, more competitive results typically come at the 3–6 month mark as citations, reviews, and profile authority build up."
    },
    {
      q: "What exactly does Local SEO include?",
      a: "Local SEO covers your Google Business Profile optimization, citation building across local directories, review acquisition and management, local landing pages, NAP (name, address, phone) consistency, and on-page signals that tell Google where you serve."
    },
    {
      q: "Do I need more reviews to rank higher on Google Maps?",
      a: "Reviews are one of the strongest local ranking signals. Quantity, recency, and how you respond all matter. We help you build a consistent review strategy so new reviews come in regularly, not just in bursts."
    },
    {
      q: "Can you help multi-location businesses?",
      a: "Absolutely. We create and optimize individual Google Business Profiles and local landing pages for each location. Each location gets its own citation profile and review strategy so they all rank independently."
    },
    {
      q: "How will I know if it's working?",
      a: "You'll receive monthly reports showing your Google Maps ranking positions, call and direction request volume, profile views, and keyword visibility changes. We track the metrics that actually matter to your business, not vanity numbers."
    },
    {
      q: "What happens after I apply for a Growth Call?",
      a: "We review your Google Business Profile and local presence before the call. When we meet, we walk you through exactly where you stand, what's holding you back, and what a realistic improvement plan looks like. No pressure, no generic pitch."
    },
    {
      q: "Do I need a big budget to get started with Local SEO?",
      a: "Local SEO is one of the most cost-effective channels for local businesses. Unlike ads, the improvements compound over time. During your Growth Call, we'll discuss what's realistic for your situation and what level of investment makes sense for your goals."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Local SEO
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
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-[#0058BE] shadow-sm' : 'border-[#E2E8F0]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <span
          className="font-semibold text-[#111111] pr-8 text-base"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-[#0058BE] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-0">
          <div className="w-full h-px bg-gray-100 mb-5" />
          <p
            className="text-[#45464D] text-sm leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Final CTA ─────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="py-24 px-4 md:px-12 text-center bg-white">
      <div className="max-w-4xl mx-auto border-t border-[#E2E8F0] pt-24">
        <span
          className="text-[#0058BE] text-xs font-medium tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get Started Today
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Ready to Find the Biggest Growth Opportunity in Your Local Market?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll review exactly where your business is getting overlooked on Google before we even speak.
        </p>
        <Link
          to={APPLY_URL}
          className="inline-flex items-center gap-2 bg-[#111111] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#222222] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Apply For A Growth Call <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="mt-12 flex flex-wrap justify-center gap-10 opacity-40">
          {["Care Made Home Care", "Therapy Supply", "Adly Travel", "South Surrey"].map((name) => (
            <div
              key={name}
              className="font-bold text-lg text-[#111111] grayscale"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
