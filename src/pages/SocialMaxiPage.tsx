import { Share2, TrendingUp, XCircle, AlertCircle, Clock, ArrowRight, BarChart3, Calendar, Video, MessageCircle, ClipboardCheck, Layers, Cpu, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { ServiceMethodologyCarousel } from '../components/ServiceMethodologyCarousel';
import { useState } from 'react';

const APPLY_URL = '/apply';

export function SocialMaxiPage() {
  return (
    <>
      <SEOHead
        title="SocialMaxi — Social Media Management That Grows Your Business | SiteMaxi Canada"
        description="Build a social media presence that drives real business results. SocialMaxi creates, schedules, and manages your social content across all major platforms for Canadian businesses."
        keywords="social media management Canada, social media marketing, Instagram management, Facebook page management, content creation, social media strategy Canada"
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://sitemaxi.com' },
          { name: 'Services', url: 'https://sitemaxi.com/services' },
          { name: 'SocialMaxi — Social Media', url: 'https://sitemaxi.com/socialmaxi' },
        ]}
      />
      <HeroSection />
      <ProblemSection />
      <StatsSection />
      <BentoSection />
      <SocialMaxiMethodology />
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
        className="inline-block bg-pink-100 text-pink-900 px-3 py-1 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Social Media Channel
      </span>
      <h1
        className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight tracking-tight"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
      >
        Build a Social Presence That Actually Drives Business
      </h1>
      <p
        className="text-[#45464D] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Sporadic posting and recycled content don't grow businesses. Strategic, consistent social media does. We manage your entire social presence so you can focus on running your business while we build your audience and brand authority.
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
      icon: Clock,
      title: "Inconsistent Posting",
      desc: "Posting once a week when inspired, then going silent for a month, destroys your reach. Algorithms reward consistency and your audience expects it."
    },
    {
      icon: AlertCircle,
      title: "No Content Strategy",
      desc: "Random posts that don't connect to your business goals, target audience, or any coherent message do nothing but keep your profile from looking completely abandoned."
    },
    {
      icon: XCircle,
      title: "Zero Engagement",
      desc: "Broadcasting into a void without community management means you're missing every conversation where a follower was one reply away from becoming a customer."
    }
  ];

  return (
    <section className="py-20 bg-[#F2F4F6] px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-16 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Why Most Business Social Accounts Struggle to Grow
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
              Your Customers Are Already On Social Media. The Question Is Whether They Can Find You.
            </h2>
            <p className="text-[#7C839B] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Social proof and brand authority built through consistent social media directly influences buying decisions.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-5 w-full">
            {[
              { stat: "71%", text: "of consumers who had a positive social experience are likely to recommend the brand." },
              { stat: "54%", text: "of social media browsers use it to research products before making a purchase decision." },
              { stat: "4×", text: "faster follower growth for brands that post consistently versus sporadically." },
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
    { icon: Calendar, title: "Content Calendar", desc: "Planned, approved content scheduled weeks in advance so your feed is never empty." },
    { icon: Video, title: "Reels & Stories", desc: "Short-form video and story content that drives reach and keeps your audience engaged." },
    { icon: MessageCircle, title: "Community Management", desc: "Responding to comments, DMs, and mentions to build genuine relationships with your audience." },
    { icon: BarChart3, title: "Analytics & Reporting", desc: "Monthly insights on reach, engagement, follower growth, and content performance." },
  ];

  return (
    <section className="py-20 bg-[#E6E8EA] px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Everything Your Social Presence Needs, Done for You
          </h2>
          <p className="text-[#45464D] max-w-2xl mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            From strategy to creation to community management, we handle every aspect of your social media so you don't have to.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6" style={{ gridTemplateRows: '1fr 1fr', minHeight: '520px' }}>
          <div className="md:col-span-2 row-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center mb-5">
                <Share2 className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#111111] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Platform Strategy</h3>
              <p className="text-[#45464D] text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Not every platform is right for every business. We identify where your ideal customers spend their time and build a platform-specific strategy that matches your content to the right format, algorithm, and audience behavior so every post actually counts.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Social media strategy planning session"
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>

          {small.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-pink-600" />
              </div>
              <h4 className="font-semibold text-[#111111] mb-2 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{title}</h4>
              <p className="text-[#45464D] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:hidden">
          {[{ icon: Share2, title: "Platform Strategy", desc: "Platform-specific strategies that match your content to where your audience actually spends time." }, ...small].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
              <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-pink-600" />
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
const SOCIALMAXI_STEPS = [
  {
    id: 'audit',
    label: 'Brand Audit',
    icon: ClipboardCheck,
    description: "A complete review of your current social presence: what's working, what's missing, and how you compare to competitors in your space.",
    fallbackImage: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'strategy',
    label: 'Strategy',
    icon: Layers,
    description: 'A platform-specific content calendar, tone of voice guide, and posting schedule aligned to your business goals and audience behavior.',
    fallbackImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'produce',
    label: 'Produce',
    icon: Cpu,
    description: 'Monthly content creation covering graphics, captions, reels, and stories, reviewed, approved, and scheduled so your feed is always active.',
    fallbackImage: 'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'grow',
    label: 'Grow',
    icon: Award,
    description: 'Active community management, engagement outreach, and monthly performance reviews to keep growing your audience and brand authority.',
    fallbackImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

function SocialMaxiMethodology() {
  return (
    <ServiceMethodologyCarousel
      serviceSlug="socialmaxi"
      steps={SOCIALMAXI_STEPS}
      heading="A Clear Process, Not a Black Box"
      label="Our Methodology"
    />
  );
}

/* ─── Results ───────────────────────────────────────────── */
function ResultsSection() {
  const metrics = [
    { value: "3–5×", label: "Follower Growth" },
    { value: "+80%", label: "Engagement Rate" },
    { value: "20–30", label: "Posts Per Month" },
    { value: "4–6 Wks", label: "Ramp-Up Period" },
  ];

  return (
    <section className="py-20 bg-[#131B2E] text-white px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            Real Outcomes for Businesses Taking Social Seriously
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
      q: "Which social media platforms does SocialMaxi manage?",
      a: "We manage Instagram, Facebook, LinkedIn, TikTok, and X (Twitter). During your onboarding, we identify which platforms make the most sense for your business and audience. Not every business needs to be everywhere."
    },
    {
      q: "Do you create the content or do we provide it?",
      a: "We create all the content including captions, graphics, and short-form video concepts. You'll review and approve a monthly content calendar before anything is published. Some clients like to provide photos and videos from their business, which we incorporate into the content."
    },
    {
      q: "How long before I see real follower and engagement growth?",
      a: "The first 4–6 weeks are a ramp-up period as we establish a consistent presence and the algorithm begins recognizing your account. Meaningful follower growth and engagement increases typically become visible at the 2–3 month mark."
    },
    {
      q: "Will someone respond to our comments and messages?",
      a: "Community management is included. We respond to comments, handle DMs, and flag any sensitive or urgent messages for your direct response. Response times and escalation protocols are agreed upon during onboarding."
    },
    {
      q: "How is social media content approved before it goes live?",
      a: "Every month you receive a full content calendar for review and approval before anything is scheduled. You can request changes, request different messaging, or pause content. You stay in control of what represents your brand."
    },
    {
      q: "Can social media management help with sales directly?",
      a: "Social media is most powerful as a trust-building and nurturing channel that warms up audiences who then convert through your website, ads, or direct contact. We design content to drive profile visits, website clicks, and DMs that turn into real conversations."
    },
    {
      q: "What makes SocialMaxi different from hiring an internal social media person?",
      a: "SocialMaxi brings a full team including a strategist, content creator, and community manager for less than the cost of a single part-time hire. You get consistent output regardless of vacation, illness, or turnover. No training required, no HR overhead."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] text-center mb-12 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Common Questions About Social Media Management
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
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-pink-500 shadow-sm' : 'border-[#E2E8F0]'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left">
        <span className="font-semibold text-[#111111] pr-8 text-base" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{question}</span>
        <svg className={`w-5 h-5 text-pink-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          className="text-pink-600 text-xs font-medium tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get Started Today
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          Ready to Build a Social Presence That Works While You Focus on Your Business?
        </h2>
        <p
          className="text-[#45464D] mb-10 max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Apply for a Growth Call and we'll review your current social presence before we even speak. We'll show you what's working, what's holding you back, and what a realistic growth plan looks like for your business.
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
