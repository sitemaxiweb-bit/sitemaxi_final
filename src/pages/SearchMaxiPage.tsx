import { Search, TrendingUp, XCircle, AlertCircle, FileX, ArrowRight, BarChart3, Link2, FileText, Wrench, ClipboardCheck, Settings, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { ServiceMethodologyCarousel } from '../components/ServiceMethodologyCarousel';
import { useState } from 'react';

const APPLY_URL = '/apply';

export function SearchMaxiPage() {
  return (
    <>
      <SEOHead
        title="SearchMaxi — Organic SEO Services That Drive Lasting Traffic | SiteMaxi Canada"
        description="Turn Google into your #1 lead source. SearchMaxi builds lasting organic visibility through technical SEO, content strategy, and link building for Canadian businesses."
        keywords="organic SEO Canada, technical SEO services, content SEO, link building, on-page SEO, SEO agency Canada"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'SearchMaxi — Organic SEO', url: 'https://sitemaxi.com/searchmaxi' },
        ]}
      />
      <HeroSection />
      <ProblemSection />
      <StatsSection />
      <BentoSection />
      <SearchMaxiMethodology />
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
        className="inline-block bg-teal-100 text-teal-900 px-3 py-1 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Organic Growth Channel
      </span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
      >
        Turn Google Into Your #1 Lead Source
      </h1>
      <p
        className="text-[#45464D] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Paid ads stop the moment you stop paying. Organic SEO compounds. We build the technical foundation, content strategy, and authority signals that move your business to the top of search results and keep it there.
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
      title: "No Page-One Rankings",
      desc: "Your website exists but ranks on page 3, 4, or nowhere. Without page-one visibility, you simply don't get the traffic — or the leads."
    },
    {
      icon: AlertCircle,
      title: "Thin, Unoptimized Content",
      desc: "Pages that don't answer what searchers want don't rank. Most sites are full of content that was never built with search intent in mind."
    },
    {
      icon: FileX,
      title: "Technical SEO Ignored",
      desc: "Crawl errors, slow Core Web Vitals, broken internal links — these silent issues stop Google from properly indexing and ranking your site."
    }
  ];

  return (
    <section className="py-20 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-16 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Why Most Websites Never Rank on Google
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
              Every Day Without Organic SEO Is Traffic Handed to Your Competitors
            </h2>
            <p
              className="text-[#7C839B] text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Organic search is the highest-intent, lowest-cost traffic source available — but only if you've earned the rankings.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-5 w-full">
            {[
              { stat: "68%", text: "of all online experiences begin with a search engine query." },
              { stat: "53%", text: "of all website traffic across the web comes from organic search." },
              { stat: "91%", text: "of all clicks go to websites on the first page of Google results." },
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

/* ─── Bento ─────────────────────────────────────────────── */
function BentoSection() {
  const small = [
    { icon: FileText, title: "Content Strategy", desc: "Topic clusters and content calendars built around what your buyers actually search for." },
    { icon: Link2, title: "Link Building", desc: "Earning high-authority backlinks that send trust signals to Google on your behalf." },
    { icon: BarChart3, title: "Ranking Reports", desc: "Clear monthly visibility into your keyword positions, traffic, and opportunity gaps." },
    { icon: Wrench, title: "Technical SEO", desc: "Fixing crawl issues, site speed, Core Web Vitals, and indexability problems." },
  ];

  return (
    <section className="py-20 bg-[#E6E8EA] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Full-Spectrum SEO, Not Just Keywords
          </h2>
          <p
            className="text-[#45464D] max-w-2xl mx-auto text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Rankings come from the combination of technical health, content quality, and authoritative links — we manage all three.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6" style={{ gridTemplateRows: '1fr 1fr', minHeight: '520px' }}>
          <div className="md:col-span-2 row-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <Search className="w-5 h-5 text-teal-700" />
              </div>
              <h3
                className="text-xl font-semibold text-[#111111] mb-4"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                On-Page Optimization
              </h3>
              <p
                className="text-[#45464D] text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Every page on your site is an opportunity to rank. We align your titles, headings, internal links, schema markup, and content with what Google needs to understand and promote your pages — so each asset works harder for you.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="SEO team optimizing website content"
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>

          {small.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-teal-700" />
              </div>
              <h4 className="font-semibold text-[#111111] mb-2 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h4>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:hidden">
          {[{ icon: Search, title: "On-Page Optimization", desc: "Every page aligned with what Google needs to understand and rank your content." }, ...small].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-teal-700" />
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
const SEARCHMAXI_STEPS = [
  {
    id: 'audit',
    label: 'Audit',
    icon: ClipboardCheck,
    description: 'A deep technical and content audit that reveals exactly what is holding your site back from page-one rankings.',
    fallbackImage: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'strategy',
    label: 'Strategy',
    icon: BarChart3,
    description: 'A keyword and content roadmap built around real search intent — so every piece of content has a clear path to rank.',
    fallbackImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: Settings,
    description: 'On-page improvements, technical fixes, and schema markup applied systematically across your highest-opportunity pages.',
    fallbackImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'scale',
    label: 'Scale',
    icon: Award,
    description: 'Link building, content expansion, and authority growth that compounds your rankings month over month.',
    fallbackImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

function SearchMaxiMethodology() {
  return (
    <ServiceMethodologyCarousel
      serviceSlug="searchmaxi"
      steps={SEARCHMAXI_STEPS}
      heading="A Clear Process, Not a Black Box"
      label="Our Methodology"
    />
  );
}

/* ─── Results ───────────────────────────────────────────── */
function ResultsSection() {
  const metrics = [
    { value: "Page 1", label: "Target Rankings" },
    { value: "+60–120%", label: "Organic Traffic" },
    { value: "3–6 Mo.", label: "To Lasting Results" },
    { value: "4×", label: "Content ROI" },
  ];

  return (
    <section className="py-20 bg-[#131B2E] text-white px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Real Outcomes for Growing Businesses
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
      q: "How long does it take to rank on page one of Google?",
      a: "For competitive keywords, realistic page-one rankings take 3–6 months of consistent effort. Less competitive terms can move faster — within 4–8 weeks. We set clear milestones so you always know where you stand."
    },
    {
      q: "What is included in SearchMaxi's organic SEO service?",
      a: "SearchMaxi covers full technical SEO auditing and fixes, keyword research, on-page optimization, content strategy and creation, internal linking, schema markup, and authority link building — everything needed to compete organically."
    },
    {
      q: "Do you write the content or just advise on it?",
      a: "We do both. Our team produces SEO-optimized blog posts, service pages, and landing pages that target specific keywords while genuinely serving your audience. Content is edited to match your brand voice before publishing."
    },
    {
      q: "What is link building and why does it matter?",
      a: "Backlinks — links from other websites to yours — are one of Google's strongest ranking signals. They tell Google that other sites trust and vouch for your content. We build high-quality links through editorial outreach to relevant, authoritative websites."
    },
    {
      q: "Will my rankings drop if I stop the service?",
      a: "Unlike paid ads, organic rankings don't disappear the moment you stop. The authority and content you've built continues to work for you. That said, competitors keep optimizing, so maintaining momentum is worthwhile once you're in a strong position."
    },
    {
      q: "How do you measure SEO success?",
      a: "We track keyword position changes, organic traffic growth, click-through rates, and conversion events — not just vanity metrics. Monthly reports show what moved, what's next, and how organic performance maps to real business outcomes."
    },
    {
      q: "Is SearchMaxi right for a new website with no existing traffic?",
      a: "Yes — starting SEO early is actually an advantage. We can build the right architecture, content, and authority from day one rather than correcting mistakes later. New sites can see meaningful traction within 3–4 months with the right strategy."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Organic SEO
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
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-teal-600 shadow-sm' : 'border-[#E2E8F0]'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left">
        <span className="font-semibold text-[#111111] pr-8 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{question}</span>
        <svg className={`w-5 h-5 text-teal-600 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          className="text-teal-700 text-xs font-medium tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get Started Today
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Ready to Build Traffic That Doesn't Disappear When You Stop Paying?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll audit your current organic presence — where you rank, what you're missing, and the fastest path to page one — before we even speak.
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
