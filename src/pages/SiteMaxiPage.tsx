import { Globe, TrendingUp, XCircle, AlertCircle, Clock, ArrowRight, Smartphone, Zap, ShoppingCart, BarChart3, ClipboardCheck, Palette, Settings, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { ServiceMethodologyCarousel } from '../components/ServiceMethodologyCarousel';
import { useState } from 'react';

const APPLY_URL = '/apply';

export function SiteMaxiPage() {
  return (
    <>
      <SEOHead
        title="SiteMaxi — Custom Website Design & Development That Converts | SiteMaxi Canada"
        description="Build a website that turns visitors into paying customers. SiteMaxi designs and develops fast, modern, conversion-optimized websites for Canadian businesses."
        keywords="website design Canada, custom website development, business website design, conversion-optimized website, professional web design Canada"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'SiteMaxi — Web Design', url: 'https://sitemaxi.com/sitemaxi' },
        ]}
      />
      <HeroSection />
      <ProblemSection />
      <StatsSection />
      <BentoSection />
      <SiteMaxiMethodology />
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
        className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Web Design & Development
      </span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
      >
        A Website That Converts Visitors Into Paying Customers
      </h1>
      <p
        className="text-[#45464D] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Your website is your most important salesperson, available around the clock. We design and build fast, modern, mobile-first websites that don't just look impressive but are engineered to turn browsers into buyers and inquiries into revenue.
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
      title: "Outdated Design Kills Credibility",
      desc: "75% of users judge a business's credibility based on its website. An outdated or amateur design tells visitors you're not serious before they've even read a single word."
    },
    {
      icon: Clock,
      title: "Slow Speed Drives Bounces",
      desc: "A one-second delay in page load reduces conversions by 7%. Slow websites don't just frustrate visitors. They also rank lower on Google, which compounds the damage over time."
    },
    {
      icon: AlertCircle,
      title: "No Clear Call to Action",
      desc: "Most business websites bury their offer or leave visitors confused about the next step. Without a clear path to conversion, even a well-designed site fails to generate revenue."
    }
  ];

  return (
    <section className="py-20 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-16 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Why Most Business Websites Fail to Generate Leads
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
              Your Website Is Either Working for You or Against You. There Is No Middle Ground.
            </h2>
            <p className="text-[#7C839B] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              In a world where customers check your website before calling, a subpar digital presence is actively costing you business every day.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-5 w-full">
            {[
              { stat: "75%", text: "of consumers judge a business's credibility based on the design of its website." },
              { stat: "88%", text: "of users won't return to a website after a bad experience." },
              { stat: "7%", text: "drop in conversions for every one-second delay in page load time." },
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
    { icon: Smartphone, title: "Mobile-First Design", desc: "Every website we build looks and performs flawlessly on any screen, from mobile to desktop." },
    { icon: Zap, title: "Speed & Core Web Vitals", desc: "Optimized to hit 90+ PageSpeed scores for both performance and SEO ranking factors." },
    { icon: ShoppingCart, title: "CMS Integration", desc: "Easy-to-update content management so you can manage your own content without a developer." },
    { icon: BarChart3, title: "Conversion Optimization", desc: "Clear calls to action, trust signals, and lead capture built into every page by design." },
  ];

  return (
    <section className="py-20 bg-[#E6E8EA] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Every Website We Build Is Designed to Convert
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Beautiful design that also performs. Fast loading, SEO-ready, and engineered to turn visitors into leads and buyers.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6" style={{ gridTemplateRows: '1fr 1fr', minHeight: '520px' }}>
          <div className="md:col-span-2 row-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
                <Globe className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-[#111111] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Conversion-First Architecture</h3>
              <p className="text-[#45464D] text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Every page is structured around a clear goal: get the visitor to take action. We design the hierarchy, messaging, and user flow to reduce friction and guide visitors naturally toward calling, booking, or buying. Form follows function.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern website design on laptop and mobile"
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>

          {small.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-gray-700" />
              </div>
              <h4 className="font-semibold text-[#111111] mb-2 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h4>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:hidden">
          {[{ icon: Globe, title: "Conversion-First Architecture", desc: "Every page structured to guide visitors toward the action that grows your business." }, ...small].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-gray-700" />
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
const SITEMAXI_STEPS = [
  {
    id: 'discovery',
    label: 'Discovery',
    icon: ClipboardCheck,
    description: 'Deep dive into your business goals, brand, target audience, and competitors to ensure the website is built with a clear strategic foundation.',
    fallbackImage: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'design',
    label: 'Design',
    icon: Palette,
    description: 'Wireframes and high-fidelity mockups reviewed and approved before a single line of code is written. No surprises at launch.',
    fallbackImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'build',
    label: 'Build',
    icon: Settings,
    description: 'Development, content integration, speed optimization, and mobile testing. Every detail is handled before you see the staging version.',
    fallbackImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'launch',
    label: 'Launch',
    icon: Award,
    description: 'Final QA, SEO setup, analytics integration, and go-live, followed by post-launch support to ensure everything performs as expected.',
    fallbackImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

function SiteMaxiMethodology() {
  return (
    <ServiceMethodologyCarousel
      serviceSlug="sitemaxi"
      steps={SITEMAXI_STEPS}
      heading="A Clear Process, Not a Black Box"
      label="Our Methodology"
    />
  );
}

/* ─── Results ───────────────────────────────────────────── */
function ResultsSection() {
  const metrics = [
    { value: "90+", label: "PageSpeed Score" },
    { value: "+40%", label: "Conversion Rate" },
    { value: "Mobile-First", label: "All Devices" },
    { value: "3 Months", label: "Post-Launch Support" },
  ];

  return (
    <section className="py-20 bg-[#131B2E] text-white px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            What to Expect From a SiteMaxi Website
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
      q: "How long does it take to build a website?",
      a: "Most custom websites are completed within 2–4 weeks from kickoff, depending on scope and how quickly content and approvals are provided. E-commerce builds typically take 4–6 weeks. We provide a clear timeline at the start of every project."
    },
    {
      q: "Do I own the website after it's built?",
      a: "You own 100% of the website, all the code, and all the content. We don't lock you into proprietary platforms or hold your site hostage. You can host it anywhere and make changes with any developer after handover."
    },
    {
      q: "What platform do you build on?",
      a: "We build on platforms best suited to your goals and technical comfort level. For content-heavy sites, we typically use modern headless or WordPress builds. For e-commerce, we work with Shopify. We'll recommend the best fit during discovery."
    },
    {
      q: "Is SEO included in the website build?",
      a: "Every SiteMaxi website is built SEO-ready with proper URL structure, meta tags, schema markup, Core Web Vitals optimization, and sitemap submission. This gives you the technical foundation. For ongoing content and ranking growth, SearchMaxi complements this perfectly."
    },
    {
      q: "Can you redesign an existing website instead of building from scratch?",
      a: "Absolutely. Many clients come to us with an existing site that needs a refresh rather than a full rebuild. We assess what's working, preserve valuable SEO equity, and redesign around your goals. It's typically faster and at a lower cost than starting fresh."
    },
    {
      q: "Will I be able to update the website myself after launch?",
      a: "Yes. We build with a CMS (content management system) so you can update text, images, blog posts, and team members without touching code. We also provide a brief training session and documentation after launch."
    },
    {
      q: "What support do you provide after the website goes live?",
      a: "Every project includes 3 months of post-launch support covering bug fixes, minor adjustments, and technical assistance. After that period, we offer ongoing support retainers for clients who want continued help."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Website Design
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
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-gray-600 shadow-sm' : 'border-[#E2E8F0]'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left">
        <span className="font-semibold text-[#111111] pr-8 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{question}</span>
        <svg className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          className="text-gray-600 text-xs font-medium tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get Started Today
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Ready to Have a Website That Actually Grows Your Business?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll review your current site before we even speak. We'll show you what's working, what's hurting you, and what a conversion-optimized redesign would look like.
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
