import { Target, TrendingUp, XCircle, AlertCircle, DollarSign, ArrowRight, BarChart3, Users, Layers, RefreshCw, ClipboardCheck, Zap, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { ServiceMethodologyCarousel } from '../components/ServiceMethodologyCarousel';
import { useState } from 'react';

const APPLY_URL = '/apply';

export function AdMaxiPage() {
  return (
    <>
      <SEOHead
        title="AdMaxi — Social Ad Campaigns That Generate Real Leads | SiteMaxi Canada"
        description="Stop wasting ad spend on campaigns that don't convert. AdMaxi runs high-ROI Facebook and Instagram ad campaigns for Canadian businesses. Targeted, tested, and built to generate leads."
        keywords="Facebook ads Canada, Instagram advertising, social media ads, Meta ads management, paid social media Canada, lead generation ads"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'AdMaxi — Social Ads', url: 'https://sitemaxi.com/admaxi' },
        ]}
      />
      <HeroSection />
      <ProblemSection />
      <StatsSection />
      <BentoSection />
      <AdMaxiMethodology />
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
        className="inline-block bg-orange-100 text-orange-900 px-3 py-1 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Social Ads Channel
      </span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
      >
        Stop Wasting Ad Spend. Start Generating Leads.
      </h1>
      <p
        className="text-[#45464D] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Most social ad budgets are burned on poor targeting, untested creatives, and zero conversion tracking. We build Facebook and Instagram campaigns that are engineered from day one to drive real leads at a profitable cost.
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
      title: "Ad Spend With No Returns",
      desc: "Running ads without proper targeting or creative testing burns budget fast. Most businesses have no idea which campaigns are actually working."
    },
    {
      icon: AlertCircle,
      title: "Wrong Audiences",
      desc: "Broad audiences waste your budget reaching people who will never buy from you. Precise audience segmentation is what separates profitable campaigns from expensive experiments."
    },
    {
      icon: XCircle,
      title: "No Conversion Tracking",
      desc: "Without proper pixel setup and conversion events, you're flying blind. You can't optimize what you can't measure, and most businesses aren't measuring anything meaningful."
    }
  ];

  return (
    <section className="py-20 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-16 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Why Most Social Ad Campaigns Fail to Deliver ROI
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
              Social Advertising Is Where Your Buyers Already Spend Their Time
            </h2>
            <p className="text-[#7C839B] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              The opportunity is massive, but only if your campaigns are built with precision targeting and compelling creative.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-5 w-full">
            {[
              { stat: "3.2B+", text: "people are reachable through Facebook and Instagram advertising worldwide." },
              { stat: "$2", text: "average return for every $1 spent on well-managed social ad campaigns." },
              { stat: "78%", text: "of consumers have discovered products or services through social media ads." },
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
    { icon: Users, title: "Audience Research", desc: "Detailed buyer personas and custom audiences built from real data, not guesswork." },
    { icon: RefreshCw, title: "A/B Testing", desc: "Systematic creative and copy testing that continuously improves performance." },
    { icon: BarChart3, title: "Performance Reports", desc: "Transparent reporting on spend, reach, leads, and cost per acquisition every month." },
    { icon: Layers, title: "Retargeting", desc: "Re-engaging warm audiences who visited your site or engaged with your content." },
  ];

  return (
    <section className="py-20 bg-[#E6E8EA] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Campaigns Built to Generate Leads, Not Just Impressions
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Every campaign we build is optimized for your actual business goal, not vanity metrics like reach and clicks.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6" style={{ gridTemplateRows: '1fr 1fr', minHeight: '520px' }}>
          <div className="md:col-span-2 row-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-5">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#111111] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Campaign Strategy</h3>
              <p className="text-[#45464D] text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                We design full-funnel ad strategies covering awareness through conversion, aligned with your sales process. No cookie-cutter campaigns. Every strategy is tailored to your offer, your market, and your ideal customer.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Marketing team planning ad campaign strategy"
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>

          {small.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-orange-600" />
              </div>
              <h4 className="font-semibold text-[#111111] mb-2 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h4>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:hidden">
          {[{ icon: Target, title: "Campaign Strategy", desc: "Full-funnel ad strategies tailored to your offer and ideal customer." }, ...small].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-orange-600" />
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
const ADMAXI_STEPS = [
  {
    id: 'research',
    label: 'Research',
    icon: ClipboardCheck,
    description: 'Audience profiles, competitor ads, and market analysis that give us the data to build campaigns that actually resonate.',
    fallbackImage: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'build',
    label: 'Build',
    icon: Layers,
    description: 'Campaigns, ad sets, and creatives built to a clear objective, with every conversion event tracked from day one.',
    fallbackImage: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'launch',
    label: 'Launch',
    icon: Zap,
    description: 'Campaigns go live with a structured testing framework. Multiple creatives, audiences, and copy variants compete simultaneously to surface the top performer.',
    fallbackImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: Settings,
    description: 'Continuous bid adjustments, creative refreshes, and audience refinements that lower your cost per lead month over month.',
    fallbackImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

function AdMaxiMethodology() {
  return (
    <ServiceMethodologyCarousel
      serviceSlug="admaxi"
      steps={ADMAXI_STEPS}
      heading="A Clear Process, Not a Black Box"
      label="Our Methodology"
    />
  );
}

/* ─── Results ───────────────────────────────────────────── */
function ResultsSection() {
  const metrics = [
    { value: "$2–4", label: "ROAS Average" },
    { value: "-40%", label: "Cost Per Lead" },
    { value: "30 Days", label: "To First Results" },
    { value: "4–6", label: "Active Campaigns" },
  ];

  return (
    <section className="py-20 bg-[#131B2E] text-white px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Real Outcomes for Businesses Investing in Social Ads
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
      q: "How quickly will I see results from Facebook and Instagram ads?",
      a: "Most clients see their first leads within the first 2 to 4 weeks. The first 30 days are a learning phase where we test audiences and creatives to find what works best for your offer. By month 2, campaigns are fully optimized and delivering consistent results."
    },
    {
      q: "What is ad spend and is it included in the service fee?",
      a: "Ad spend is the budget you pay directly to Facebook/Instagram for showing your ads. It is separate from our management fee. We recommend a minimum ad spend of $500–$1,000/month to get meaningful data and results."
    },
    {
      q: "What types of businesses does AdMaxi work best for?",
      a: "AdMaxi works exceptionally well for local service businesses, e-commerce brands, coaches and consultants, and any business with a defined offer and a target audience. We'll let you know during the Growth Call if social ads are the right channel for your situation."
    },
    {
      q: "Do you create the ad creatives and copy?",
      a: "Yes. Our team produces ad copy, static image ads, and carousel creatives. For video ads, we can work with existing footage you provide or guide you on simple, high-converting video formats. We test multiple creative variations to find what resonates."
    },
    {
      q: "What platforms do you run ads on?",
      a: "Our primary focus is Facebook and Instagram (Meta). Depending on your business and audience, we may also recommend additional channels. We'll discuss the best platform mix for your goals during your Growth Call."
    },
    {
      q: "How will I know my ads are performing?",
      a: "You'll receive monthly reports showing spend, reach, click-through rate, leads generated, cost per lead, and ROAS. We also provide access to a live reporting dashboard so you can check performance anytime."
    },
    {
      q: "What happens if an ad campaign isn't performing well?",
      a: "We monitor campaigns weekly and make real-time adjustments to targeting, bidding, and creative. If a campaign isn't hitting targets, we diagnose whether it's the audience, creative, or offer and adjust accordingly. We don't let underperforming campaigns run on autopilot."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Social Ads
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
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-orange-500 shadow-sm' : 'border-[#E2E8F0]'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left">
        <span className="font-semibold text-[#111111] pr-8 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{question}</span>
        <svg className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          className="text-orange-600 text-xs font-medium tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get Started Today
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Ready to Turn Your Ad Budget Into a Predictable Lead Engine?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll analyze your current ad setup before we even speak. We'll show you what's working, what's wasting budget, and where the biggest opportunity lies.
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
