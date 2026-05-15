import { MapPin, Phone, Star, TrendingUp, Search, AlertTriangle, CheckCircle, ArrowRight, BarChart3, Users, Clock, Target, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceFAQ } from '../components/ServiceFAQ';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';

const APPLY_URL = '/apply';

export function RankMaxiPage() {
  const faqs = [
    {
      question: "How long does it take to see results from Local SEO?",
      answer: "Most businesses start seeing measurable improvements in their Google Maps rankings within 4–8 weeks. Stronger, more competitive results typically come at the 3–6 month mark as citations, reviews, and profile authority build up."
    },
    {
      question: "What exactly does Local SEO include?",
      answer: "Local SEO covers your Google Business Profile optimization, citation building across local directories, review acquisition and management, local landing pages, NAP (name, address, phone) consistency, and on-page signals that tell Google where you serve."
    },
    {
      question: "Do I need more reviews to rank higher on Google Maps?",
      answer: "Yes — reviews are one of the strongest local ranking signals. Quantity, recency, and how you respond all matter. We help you build a consistent review strategy so new reviews come in regularly, not just in bursts."
    },
    {
      question: "Can you help multi-location businesses?",
      answer: "Absolutely. We create and optimize individual Google Business Profiles and local landing pages for each location. Each location gets its own citation profile and review strategy so they all rank independently."
    },
    {
      question: "How will I know if it's working?",
      answer: "You'll receive monthly reports showing your Google Maps ranking positions, call and direction request volume, profile views, and keyword visibility changes. We track the metrics that matter to your business — not vanity numbers."
    },
    {
      question: "What happens after I apply for a Growth Call?",
      answer: "We'll review your Google Business Profile and local presence before the call. When we meet, we'll walk you through exactly where you stand, what's holding you back, and what a realistic improvement plan looks like. No pressure, no generic pitch."
    },
    {
      question: "Do I need a big budget to get started with Local SEO?",
      answer: "Local SEO is one of the most cost-effective channels for local businesses. Unlike ads, the improvements compound over time. During your Growth Call, we'll discuss what's realistic for your situation and what level of investment makes sense for your goals."
    }
  ];

  return (
    <>
      <SEOHead
        title="RankMaxi — Local SEO & Google Maps Ranking Services Canada"
        description="Get found when local customers are ready to buy. RankMaxi by SiteMaxi helps Canadian businesses rank higher on Google Maps and local search — more calls, more direction requests, more customers."
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
      <WhyItMattersSection />
      <ProcessSection />
      <WhatWeImproveSection />
      <WhoIsThisForSection />
      <ResultsSection />
      <ServiceFAQ
        faqs={faqs}
        primaryColor="#1D4ED8"
        bgColor="#DBEAFE"
        title="Common Questions About Local SEO"
        subtitle="Answers to what most businesses ask before getting started"
      />
      <FinalCTASection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="bg-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1D4ED8] px-4 py-2 rounded-full mb-8">
          <MapPin className="w-4 h-4" />
          <span className="font-semibold text-sm uppercase tracking-wide">Local SEO & Google Maps</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] mb-6 leading-[1.08] tracking-tight">
          Get Found When Local<br className="hidden md:block" /> Customers Are Ready<br className="hidden md:block" /> To Buy
        </h1>
        <p className="text-xl text-[#555555] mb-10 max-w-2xl mx-auto leading-relaxed">
          Your customers search on Google before they call anyone. We help your business appear in the top results on Google Maps — so more of those searches turn into calls, visits, and revenue.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to={APPLY_URL}
            className="bg-[#1D4ED8] text-white px-9 py-4 rounded-lg font-semibold hover:bg-[#1E40AF] transition-all duration-200 text-lg shadow-sm hover:shadow-md inline-flex items-center gap-2"
          >
            Apply For A Growth Call <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#how-it-works"
            className="bg-white text-[#1D4ED8] border-2 border-[#1D4ED8] px-9 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 text-lg inline-block"
          >
            See How It Works
          </a>
        </div>
        <p className="mt-6 text-sm text-[#888888]">No pricing commitments on this call — we review your situation first.</p>
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    {
      icon: Search,
      title: "You're not showing up in the Map Pack",
      desc: "When someone searches for your service in your city, your competitors appear in the top 3 map results — and you don't. Most customers never scroll past those three listings."
    },
    {
      icon: AlertTriangle,
      title: "Your Google Business Profile is incomplete",
      desc: "Missing hours, wrong categories, no photos, no responses to reviews. Google treats an incomplete profile as a low-trust signal and ranks it lower than optimized competitors."
    },
    {
      icon: MessageSquare,
      title: "You have few or inconsistent reviews",
      desc: "Reviews are one of Google's strongest local ranking signals. Without a consistent strategy, you fall behind businesses that actively earn new reviews every month."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#555555] px-4 py-2 rounded-full mb-6">
            <span className="font-semibold text-sm uppercase tracking-wide">The Problem</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-5 leading-tight">
            Most Local Businesses Are Invisible on Google
          </h2>
          <p className="text-lg text-[#555555] leading-relaxed">
            Having a website isn't enough. If your Google Business Profile isn't optimized and you're not building local authority, you're handing customers directly to your competitors.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-bold text-[#111111] text-lg mb-3">{title}</h3>
              <p className="text-[#666666] leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyItMattersSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1D4ED8] px-4 py-2 rounded-full mb-6">
              <span className="font-semibold text-sm uppercase tracking-wide">Why It Matters</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Every Month Without Local SEO Is Revenue Left on the Table
            </h2>
            <p className="text-lg text-[#555555] mb-6 leading-relaxed">
              Local search is high intent. People searching "plumber near me" or "best dentist in Vaughan" are ready to buy today — they're not browsing. If you're not in the top results when they search, that call goes to your competitor.
            </p>
            <p className="text-lg text-[#555555] mb-8 leading-relaxed">
              Unlike paid ads, Local SEO builds compounding authority. The improvements we make today increase your visibility next month and next year.
            </p>
            <div className="space-y-4">
              {[
                "Missed calls from high-intent customers",
                "Competitor businesses ranking above you despite being newer",
                "Low review count hurting your credibility",
                "Service areas you serve that customers can't find you in",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <p className="text-[#555555]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-3xl p-10 border border-gray-200">
            <div className="text-center mb-8">
              <p className="text-6xl font-bold text-[#1D4ED8] mb-2">76%</p>
              <p className="text-[#555555] text-lg">of people who search for a local business visit or contact that business within 24 hours.</p>
            </div>
            <div className="w-full h-px bg-gray-200 mb-8" />
            <div className="grid grid-cols-2 gap-6">
              {[
                { stat: "46%", label: "of all Google searches have local intent" },
                { stat: "88%", label: "of local mobile searches lead to a call or visit within a day" },
              ].map(({ stat, label }) => (
                <div key={stat} className="text-center">
                  <p className="text-3xl font-bold text-[#111111] mb-1">{stat}</p>
                  <p className="text-sm text-[#666666] leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Diagnose",
      desc: "We audit your Google Business Profile, map rankings, citations, and review profile to understand exactly where you stand and what's holding you back.",
      icon: Search
    },
    {
      number: "02",
      title: "Optimize",
      desc: "We fix your profile — categories, services, photos, hours, and descriptions — and correct NAP inconsistencies across the web that confuse Google.",
      icon: Target
    },
    {
      number: "03",
      title: "Build Authority",
      desc: "We build citations on reputable local directories, launch a review acquisition strategy, and create local landing pages for your service areas.",
      icon: TrendingUp
    },
    {
      number: "04",
      title: "Track & Grow",
      desc: "Monthly reports show your ranking positions, call volume, and profile views. We continue optimizing based on what the data shows.",
      icon: BarChart3
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#555555] px-4 py-2 rounded-full mb-6">
            <span className="font-semibold text-sm uppercase tracking-wide">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-5 leading-tight">
            A Clear Process, Not a Black Box
          </h2>
          <p className="text-lg text-[#555555] leading-relaxed">
            You'll always know what we're doing and why. Here's how we approach local SEO.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ number, title, desc, icon: Icon }) => (
            <div key={number} className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="text-7xl font-black text-gray-100 absolute -top-3 -right-1 leading-none select-none">
                {number}
              </div>
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-5 relative z-10">
                <Icon className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <h3 className="font-bold text-[#111111] text-lg mb-3 relative z-10">{title}</h3>
              <p className="text-[#666666] text-sm leading-relaxed relative z-10">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeImproveSection() {
  const deliverables = [
    {
      icon: MapPin,
      title: "Google Business Profile",
      desc: "Full optimization of your profile including categories, services, photos, description, and attributes."
    },
    {
      icon: Star,
      title: "Review Management",
      desc: "Strategy to consistently earn new reviews, plus professional responses to existing reviews."
    },
    {
      icon: Search,
      title: "Citation Building",
      desc: "Submissions to authoritative local directories to build consistent NAP signals across the web."
    },
    {
      icon: TrendingUp,
      title: "Map Pack Rankings",
      desc: "Ongoing optimization to push your business into the top 3 results for your target local searches."
    },
    {
      icon: Target,
      title: "Local Landing Pages",
      desc: "Dedicated pages for your service areas that capture local search traffic and convert visitors to leads."
    },
    {
      icon: Phone,
      title: "Call & Direction Tracking",
      desc: "Track exactly how many calls, website clicks, and direction requests your Google profile generates."
    },
    {
      icon: BarChart3,
      title: "Monthly Ranking Reports",
      desc: "Clear reports showing your position changes, profile performance, and what's improving month over month."
    },
    {
      icon: Users,
      title: "Competitor Analysis",
      desc: "Understand what your top-ranking competitors are doing and how we'll strategically outperform them."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1D4ED8] px-4 py-2 rounded-full mb-6">
            <span className="font-semibold text-sm uppercase tracking-wide">What We Improve</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-5 leading-tight">
            Specific Improvements, Not Vague Promises
          </h2>
          <p className="text-lg text-[#555555] leading-relaxed">
            Here's exactly what we work on — and what changes as a result.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deliverables.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#1D4ED8] hover:shadow-sm transition-all duration-200 group">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-200">
                <Icon className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <h3 className="font-bold text-[#111111] mb-2">{title}</h3>
              <p className="text-[#666666] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to={APPLY_URL}
            className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-9 py-4 rounded-lg font-semibold hover:bg-[#1E40AF] transition-all duration-200 text-lg shadow-sm"
          >
            Apply For A Growth Call <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhoIsThisForSection() {
  const personas = [
    {
      title: "Local service businesses",
      desc: "Contractors, plumbers, HVAC companies, electricians — businesses where the phone ringing is everything."
    },
    {
      title: "Healthcare & wellness practices",
      desc: "Dentists, clinics, physios, med spas that rely on patients finding them locally rather than travelling."
    },
    {
      title: "Brick-and-mortar retailers",
      desc: "Stores and studios where foot traffic matters and being discovered on Google Maps drives real visits."
    },
    {
      title: "Multi-location businesses",
      desc: "Franchises or expanding businesses that need each location ranking independently in its own service area."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#555555] px-4 py-2 rounded-full mb-6">
              <span className="font-semibold text-sm uppercase tracking-wide">Who This Is For</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-5 leading-tight">
              Built for Businesses That Need Local Customers
            </h2>
            <p className="text-lg text-[#555555] leading-relaxed mb-8">
              RankMaxi is the right fit if your customers are nearby, and you need them to find you before they find your competitor.
            </p>
            <Link
              to={APPLY_URL}
              className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-[#1E40AF] transition-all duration-200"
            >
              Apply For A Growth Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-3 space-y-4">
            {personas.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 flex items-start gap-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111111] mb-1">{title}</p>
                  <p className="text-[#666666] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const outcomes = [
    {
      icon: MapPin,
      metric: "Top 3",
      label: "Map Pack Position",
      desc: "Businesses we work with consistently move into the top 3 local results for their primary search terms within 3–6 months."
    },
    {
      icon: Phone,
      metric: "+40–80%",
      label: "More Calls from Google",
      desc: "Higher Map Pack rankings and optimized profiles drive significantly more calls and direction requests directly from Google."
    },
    {
      icon: Star,
      metric: "3×",
      label: "More New Reviews",
      desc: "A consistent review strategy brings in new reviews regularly — improving both rankings and customer trust at the same time."
    },
    {
      icon: Clock,
      metric: "4–8 Wks",
      label: "To First Results",
      desc: "Early ranking improvements and profile performance gains typically appear within the first two months of the engagement."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1D4ED8] px-4 py-2 rounded-full mb-6">
            <span className="font-semibold text-sm uppercase tracking-wide">What To Expect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-5 leading-tight">
            Real Outcomes for Local Businesses
          </h2>
          <p className="text-lg text-[#555555] leading-relaxed">
            These are the improvements our clients experience when we execute a focused local SEO strategy.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map(({ icon: Icon, metric, label, desc }) => (
            <div key={label} className="bg-gray-50 rounded-2xl p-7 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Icon className="w-6 h-6 text-[#1D4ED8]" />
              </div>
              <p className="text-3xl font-black text-[#111111] mb-0.5">{metric}</p>
              <p className="text-sm font-semibold text-[#1D4ED8] uppercase tracking-wide mb-3">{label}</p>
              <p className="text-[#666666] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-28 bg-[#0F172A]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full mb-8">
          <span className="font-semibold text-sm uppercase tracking-wide">Ready to Grow?</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Find the Biggest Growth Opportunity in Your Local Market?
        </h2>
        <p className="text-xl text-white/70 mb-10 leading-relaxed">
          Apply for a Growth Call and we'll review exactly where your business is getting overlooked on Google — before we even speak.
        </p>
        <Link
          to={APPLY_URL}
          className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-[#1E40AF] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Apply For A Growth Call <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="mt-6 text-white/40 text-sm">No pricing commitments. No generic pitch. Just a real look at your situation.</p>
      </div>
    </section>
  );
}
