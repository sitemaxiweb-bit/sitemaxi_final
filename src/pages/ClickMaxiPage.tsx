import { MousePointerClick, TrendingUp, XCircle, AlertCircle, DollarSign, ArrowRight, BarChart3, Target, FileText, Layers, ClipboardCheck, Zap, Settings, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { ServiceMethodologyCarousel } from '../components/ServiceMethodologyCarousel';
import { useState } from 'react';

const APPLY_URL = '/apply';

export function ClickMaxiPage() {
  return (
    <>
      <SEOHead
        title="ClickMaxi — Google Ads Management That Generates High-Intent Leads | SiteMaxi Canada"
        description="Capture customers the moment they search for what you offer. ClickMaxi manages Google Ads campaigns for Canadian businesses with precise targeting, optimized bids, and maximum ROI."
        keywords="Google Ads management Canada, PPC advertising, pay-per-click Canada, Google search ads, Google Ads agency, PPC management services"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'ClickMaxi — Google Ads', url: 'https://sitemaxi.com/clickmaxi' },
        ]}
      />
      <HeroSection />
      <ProblemSection />
      <StatsSection />
      <BentoSection />
      <ClickMaxiMethodology />
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
        Paid Search Channel
      </span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
      >
        Capture High-Intent Customers the Moment They Search
      </h1>
      <p
        className="text-[#45464D] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Google Ads lets you appear at the exact moment someone searches for what you offer. But without expert management, most ad budgets are wasted on broad keywords, poor Quality Scores, and campaigns that never get optimized. We fix that.
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
      icon: DollarSign,
      title: "Wasted Budget on Broad Keywords",
      desc: "Targeting keywords that are too broad means you're paying for clicks from people who will never buy from you. Keyword discipline is everything in Google Ads."
    },
    {
      icon: AlertCircle,
      title: "No Conversion Tracking",
      desc: "Running Google Ads without conversion tracking is like driving with your eyes closed. You can't optimize what you're not measuring, and most campaigns aren't measuring the right things."
    },
    {
      icon: XCircle,
      title: "Poor Quality Scores",
      desc: "Low Quality Scores mean you pay more per click than competitors while getting worse ad placement. A well-structured campaign with strong landing page alignment lowers your CPC and improves position."
    }
  ];

  return (
    <section className="py-20 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-16 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Why Most Google Ads Campaigns Drain Budgets Without Delivering
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {problems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white flex items-center justify-center rounded-xl mb-6 shadow-sm">
                <Icon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-[#111111] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h3>
              <p className="text-[#45464D] text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─────────────────────────────────────────────── */
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
              Google Ads Captures Customers at the Exact Moment They're Ready to Buy
            </h2>
            <p className="text-[#7C839B] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              No other channel reaches buyers with this level of intent. But only expertly managed campaigns convert that intent into revenue.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-5 w-full">
            {[
              { stat: "65%", text: "of people click on Google ads when they are ready to make a purchase." },
              { stat: "$2", text: "average return on every $1 invested in well-managed Google Ads campaigns." },
              { stat: "89%", text: "of traffic generated by Google Ads cannot be replaced by organic search when ads are paused." },
            ].map(({ stat, text }) => (
              <div key={stat} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl flex items-center gap-5">
                <div className="text-4xl font-bold text-[#ADC6FF] flex-shrink-0 min-w-[5rem]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{stat}</div>
                <p className="text-white text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Bento ─────────────────────────────────────────────── */
function BentoSection() {
  const small = [
    { icon: FileText, title: "Ad Copywriting", desc: "High-converting headlines and descriptions tested across multiple variations to maximize CTR." },
    { icon: BarChart3, title: "Bid Management", desc: "Smart bidding strategies adjusted continuously to hit your target CPA and ROAS goals." },
    { icon: Target, title: "Conversion Tracking", desc: "Full tracking setup for calls, form fills, and purchases so every click is accountable." },
    { icon: Layers, title: "Negative Keywords", desc: "Ongoing exclusion of irrelevant search terms so your budget reaches only qualified buyers." },
  ];

  return (
    <section className="py-20 bg-[#E6E8EA] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Precision-Engineered Campaigns, Not Set-and-Forget Ads
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Every element of your campaign, from structure and keywords to bids and creative, is actively managed to minimize waste and maximize return.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6" style={{ gridTemplateRows: '1fr 1fr', minHeight: '520px' }}>
          <div className="md:col-span-2 row-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <MousePointerClick className="w-5 h-5 text-[#0058BE]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111111] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Campaign Architecture</h3>
              <p className="text-[#45464D] text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Campaign structure is the foundation of Google Ads performance. We build tightly themed ad groups that match keyword intent to ad copy and landing pages, so Quality Scores improve, costs drop, and every click is working toward a conversion.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Google Ads campaign performance dashboard"
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>

          {small.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-[#0058BE]" />
              </div>
              <h4 className="font-semibold text-[#111111] mb-2 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h4>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:hidden">
          {[{ icon: MousePointerClick, title: "Campaign Architecture", desc: "Tightly structured campaigns that improve Quality Scores and lower cost per click." }, ...small].map(({ icon: Icon, title, desc }) => (
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

/* ─── Methodology ───────────────────────────────────────── */
const CLICKMAXI_STEPS = [
  {
    id: 'discovery',
    label: 'Discovery',
    icon: ClipboardCheck,
    description: 'Keyword research, competitor analysis, and audience mapping to build a campaign strategy around where buyers are actually searching.',
    fallbackImage: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'build',
    label: 'Build',
    icon: Layers,
    description: 'Campaign architecture, ad copy, extensions, conversion tracking, and landing page alignment built before a single dollar is spent.',
    fallbackImage: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'launch',
    label: 'Launch',
    icon: Zap,
    description: 'Campaigns go live with structured A/B tests running from day one. Multiple ad variations compete to find the highest performer.',
    fallbackImage: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: Award,
    description: 'Weekly bid adjustments, negative keyword additions, and creative refinements that continuously lower cost per conversion.',
    fallbackImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

function ClickMaxiMethodology() {
  return (
    <ServiceMethodologyCarousel
      serviceSlug="clickmaxi"
      steps={CLICKMAXI_STEPS}
      heading="A Clear Process, Not a Black Box"
      label="Our Methodology"
    />
  );
}

/* ─── Results ───────────────────────────────────────────── */
function ResultsSection() {
  const metrics = [
    { value: "2–5X", label: "ROAS Average" },
    { value: "-35%", label: "Cost Per Click" },
    { value: "30 Days", label: "To Go Live" },
    { value: "6+", label: "Active Ad Groups" },
  ];

  return (
    <section className="py-20 bg-[#131B2E] text-white px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Real Outcomes for Businesses Running Google Ads
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(({ value, label }) => (
            <div key={label} className="p-8 border border-white/10 rounded-2xl text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#ADC6FF] mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{value}</div>
              <p className="text-[#7C839B] text-xs font-medium uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</p>
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
      q: "How quickly will I see results from Google Ads?",
      a: "Most clients see their first leads within the first week of going live. The first 30 days involve continuous optimization as Google's algorithm learns your campaign. By month 2, campaigns are running efficiently with a clear cost per lead established."
    },
    {
      q: "What is ad spend and is it included in the management fee?",
      a: "Ad spend is the budget paid directly to Google for showing your ads. It is separate from our management fee. We recommend a minimum of $2500–$3,500/month(depending on the industry) in ad spend to gather enough data for meaningful optimization."
    },
    {
      q: "What is a Quality Score and why does it matter?",
      a: "Quality Score is Google's rating of how relevant your ad, keywords, and landing page are to each other. Higher Quality Scores mean lower costs and better ad placement. Our campaign structure is specifically designed to maximize Quality Scores from day one."
    },
    {
      q: "Do you manage Google Shopping campaigns for e-commerce?",
      a: "Yes. For e-commerce clients, we set up and manage Google Shopping campaigns alongside Search campaigns to maximize product visibility. We handle feed optimization, bidding strategy, and ongoing product group management."
    },
    {
      q: "How do you prevent irrelevant clicks from wasting budget?",
      a: "We build comprehensive negative keyword lists during setup and refine them weekly. We also use match types strategically, prioritizing phrase and exact match for high-intent terms, to ensure your ads only show to searchers with genuine buying intent."
    },
    {
      q: "What metrics will I see in monthly reports?",
      a: "You'll receive data on impressions, clicks, CTR, average CPC, Quality Scores, conversion volume, cost per conversion, and ROAS. We also include trend analysis and recommendations for the next month."
    },
    {
      q: "Will my campaigns keep running if I pause the service?",
      a: "You keep full ownership of the Google Ads account. Your campaigns, ad history, and data remain yours. We can provide handover documentation so you or another team can continue managing them."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Google Ads
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
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left">
        <span className="font-semibold text-[#111111] pr-8 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{question}</span>
        <svg className={`w-5 h-5 text-[#0058BE] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          Ready to Capture Customers Who Are Already Searching for What You Offer?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll audit your current Google Ads account before we even speak. If you're starting fresh, we'll show you exactly what a new campaign would target.
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
            <div key={name} className="font-bold text-lg text-[#111111] grayscale" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              {name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
