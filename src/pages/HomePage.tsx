import { useId, useState, useEffect } from 'react';
import {
  TrendingUp, Target, Share2, Zap, MousePointerClick, Palette,
  ArrowRight, CheckCircle, BarChart3, Globe, Wrench, Users, Star,
  Search, ShoppingBag, Hammer, Stethoscope, Scale, Scissors, Truck, Leaf,
  Shield, Cpu, Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Blog } from '../components/Blog';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import { SEOHead } from '../components/SEOHead';
import { RevealIndustryCard } from '../components/ui/animated-industry-card';
import { OrganizationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from '../components/StructuredData';
import { LogoSlider } from '../components/LogoSlider';
import { FeatureCarousel } from '../components/FeatureCarousel';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';
import type { Testimonial } from '../components/ui/animated-testimonials';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

export function HomePage() {
  return (
    <>
      <SEOHead
        title="SiteMaxi — Canadian Digital Marketing Agency | SEO, Ads & Web Design"
        description="SiteMaxi helps local businesses and e-commerce brands grow with Local SEO, Google Ads, social media, and high-converting websites. Get your free AI marketing audit today."
        keywords="digital marketing agency canada, local SEO, google ads management, web design, social media marketing, e-commerce SEO, lead generation"
      />
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <LocalBusinessStructuredData />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <IndustryFocusSection />
      <FreeToolsSection />
      <WhyChooseSection />
      <Blog />
      <FinalCTASection />
    </>
  );
}

const CRAWL_WORDS = ['Leads', 'Sales'];

function WordCrawler() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % CRAWL_WORDS.length);
        setAnimating(false);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'middle',
        lineHeight: 'inherit',
        height: '1em',
        position: 'relative',
        top: '-0.12em',
      }}
    >
      <span
        key={index}
        style={{
          display: 'inline-block',
          transform: animating ? 'translateY(-110%)' : 'translateY(0)',
          opacity: animating ? 0 : 1,
          transition: animating
            ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease'
            : 'none',
          lineHeight: 1,
        }}
      >
        {CRAWL_WORDS[index]}
      </span>
    </span>
  );
}

function HeroSection() {
  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></span>
              <span className="text-[#1D4ED8] font-semibold text-sm">Canadian Digital Marketing Agency</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6 leading-[1.1]">
              <span className="sr-only">Canadian Digital Marketing Agency — SEO, Google Ads &amp; Web Design | SiteMaxi</span>
              <span aria-hidden="true">More <WordCrawler />. More growth.<br />
              <span className="text-[#1D4ED8]">More customers.</span></span>
            </h1>

            <p className="text-lg md:text-xl text-[#555555] mb-4 leading-relaxed">
              We help local service businesses and e-commerce brands grow through SEO, paid ads, and conversion-focused websites.
            </p>

            <p className="text-base text-[#6B7280] mb-10">
              No fluff. No guesswork. Just a data-driven strategy built to generate real results.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1E40AF] transition-all duration-200 text-base shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                Get Free AI Marketing Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 text-[#374151] px-8 py-4 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-all duration-200 text-base"
              >
                Book Strategy Call
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#059669]" />
                <span>No contracts required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#059669]" />
                <span>Results in 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#059669]" />
                <span>Canadian team</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/team-collaboration-hero-image.png"
                alt="SiteMaxi marketing team collaborating on growth strategy"
                className="w-full h-[520px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#059669]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#111111]">Avg. Traffic Increase</div>
                  <div className="text-2xl font-bold text-[#059669]">+143%</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm font-semibold text-[#111111]">4.9-star agency</div>
              <div className="text-xs text-[#6B7280]">Trusted by 100+ businesses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-12">
            <LogoSlider />
          </div>



        </ScrollAnimateWrapper>
      </div>
    </section>
  );
}

function GridPattern({ width, height, x, y, squares, ...props }: { width: number; height: number; x: string; y: string; squares: number[][]; className?: string }) {
  const patternId = useId();
  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <rect strokeWidth="0" key={`${sx}-${sy}`} width={width + 1} height={height + 1} x={sx * width} y={sy * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

const CARD_GRID_PATTERNS: number[][][] = [
  [[8,2],[10,4],[9,1],[11,3]],
  [[7,3],[10,2],[9,5],[8,1]],
  [[9,4],[11,2],[8,3],[10,1]],
  [[8,1],[9,3],[11,4],[10,2]],
  [[7,2],[10,5],[9,3],[8,4]],
  [[11,1],[8,5],[10,3],[9,2]],
];

function CardGrid({ color, index = 0 }: { color: string; index?: number }) {
  const squares = CARD_GRID_PATTERNS[index % CARD_GRID_PATTERNS.length];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-60" style={{ background: `radial-gradient(farthest-side at top, ${color}22, transparent)` }}>
        <GridPattern
          width={20}
          height={20}
          x="-12"
          y="4"
          squares={squares}
          className="absolute inset-0 h-full w-full mix-blend-overlay fill-black/10 stroke-black/10"
        />
      </div>
    </div>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: TrendingUp,
      name: 'RankMaxi',
      label: 'Local SEO',
      description: 'Rank in Google Maps and local search to capture customers in your area.',
      color: '#1D4ED8',
      bg: '#DBEAFE',
      path: '/rankmaxi',
    },
    {
      icon: Target,
      name: 'SearchMaxi',
      label: 'SEO',
      description: 'Advanced SEO strategies to grow organic search traffic and authority.',
      color: '#0891B2',
      bg: '#CFFAFE',
      path: '/searchmaxi',
    },
    {
      icon: Share2,
      name: 'SocialMaxi',
      label: 'Social Media',
      description: 'Social media growth, content strategy, and audience engagement.',
      color: '#059669',
      bg: '#D1FAE5',
      path: '/socialmaxi',
    },
    {
      icon: Zap,
      name: 'AdMaxi',
      label: 'Social Ads',
      description: 'Paid social campaigns on Facebook, Instagram, and TikTok for customer acquisition.',
      color: '#D97706',
      bg: '#FEF3C7',
      path: '/admaxi',
    },
    {
      icon: MousePointerClick,
      name: 'ClickMaxi',
      label: 'Google Ads',
      description: 'Google Ads campaign management and optimization to capture high-intent buyers.',
      color: '#DC2626',
      bg: '#FEE2E2',
      path: '/clickmaxi',
    },
    {
      icon: Palette,
      name: 'SiteMaxi',
      label: 'Web Design',
      description: 'High-converting websites designed to generate leads and sales around the clock.',
      color: '#7C3AED',
      bg: '#EDE9FE',
      path: '/sitemaxi',
    },
  ];

  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-16">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mt-3 mb-5 leading-tight">
              A complete marketing system<br className="hidden md:block" /> built for growth
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Every service is a branded system designed to deliver measurable results, not just activity.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollAnimateWrapper key={index} animation="fade-up" delay={index % 3 === 1 ? 100 : index % 3 === 2 ? 200 : 0}>
              <Link
                to={service.path}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 h-full [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] hover:[box-shadow:0_0_0_1px_rgba(0,0,0,.06),0_4px_12px_rgba(0,0,0,.08),0_24px_48px_rgba(0,0,0,.08)] transition-shadow duration-300 bg-gradient-to-b from-neutral-50 to-white"
                style={{ '--card-color': service.bg } as React.CSSProperties}
              >
                <CardGrid color={service.color} index={index} />
                <div className="pointer-events-none z-10 flex flex-col gap-1 p-8 transition-all duration-300 group-hover:-translate-y-8">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-[#111111]">{service.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: service.bg, color: service.color }}>
                      {service.label}
                    </span>
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">{service.description}</p>
                </div>

                <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="pointer-events-auto flex items-center gap-2 text-sm font-semibold" style={{ color: service.color }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.02]" />
              </Link>
            </ScrollAnimateWrapper>
          ))}
        </div>

        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-[#1D4ED8] text-[#1D4ED8] px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </section>
  );
}

function IndustryFocusSection() {
  const localIndustries = [
    { icon: Hammer, label: 'Contractors & Trades' },
    { icon: Stethoscope, label: 'Dental & Medical' },
    { icon: Scale, label: 'Law & Legal' },
    { icon: Scissors, label: 'Salons & Spas' },
    { icon: Home, label: 'Real Estate' },
    { icon: Truck, label: 'Moving & Logistics' },
  ];

  const ecommerceIndustries = [
    { icon: Leaf, label: 'Health & Wellness' },
    { icon: ShoppingBag, label: 'Fashion & Apparel' },
    { icon: Cpu, label: 'Electronics & Tech' },
    { icon: Home, label: 'Home & Garden' },
    { icon: Stethoscope, label: 'Beauty & Skincare' },
    { icon: Truck, label: 'Food & Beverage' },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-16">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Who We Serve</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mt-3 mb-5 leading-tight">
              Built for two types of businesses
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Our strategies are tailored for the specific growth challenges of local service companies and online stores.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollAnimateWrapper animation="slide-left">
            <RevealIndustryCard
              icon={Users}
              title="Local Service Businesses"
              description="Dominate your local market. Show up when customers in your city search for exactly what you offer."
              industries={localIndustries}
              linkLabel="See all local industries"
              linkTo="/industries"
              accentColor="#2563EB"
              accentLight="rgba(219,234,254,0.85)"
              iconBgOverlay="rgba(255,255,255,0.2)"
              industryIconColor="#93C5FD"
              industryIconBg="rgba(37,99,235,0.25)"
            />
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper animation="slide-right">
            <RevealIndustryCard
              icon={ShoppingBag}
              title="E-commerce Brands"
              description="Scale your online store with paid ads, SEO, and conversion optimization that drives revenue."
              industries={ecommerceIndustries}
              linkLabel="See all e-commerce verticals"
              linkTo="/industries"
              accentColor="#059669"
              accentLight="rgba(209,250,229,0.85)"
              iconBgOverlay="rgba(255,255,255,0.2)"
              industryIconColor="#6EE7B7"
              industryIconBg="rgba(5,150,105,0.25)"
            />
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
}

function FreeToolsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-14">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Free Marketing Tools</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mt-3 mb-5 leading-tight">
              See exactly where you stand online
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Our AI-powered audit tool gives you a complete picture of your website's SEO health, page speed, and growth opportunities in minutes.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper animation="scale">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 w-fit">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-sm font-semibold">Free — No credit card needed</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Free AI Marketing Audit Tool
                </h3>
                <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                  Enter your website URL and get a comprehensive report covering SEO score, technical issues, page speed metrics, and a prioritized action plan.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    'Overall SEO health score',
                    'Technical SEO issues identified',
                    'Page speed & Core Web Vitals',
                    'Top recommendations to fix now',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-blue-100">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/free-seo-audit"
                  className="inline-flex items-center gap-2 bg-white text-[#1D4ED8] px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors w-fit shadow-lg"
                >
                  <Search className="w-5 h-5" />
                  Run Free Marketing Audit
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center p-10 relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-white font-semibold">SEO Score</div>
                    <div className="text-green-400 font-bold text-lg">Good</div>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="10" strokeDasharray="314" strokeDashoffset="80" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-white">74</span>
                        <span className="text-xs text-blue-300">/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Page Speed', value: 'Needs Work', color: 'text-yellow-400' },
                      { label: 'Title Tags', value: 'Optimized', color: 'text-green-400' },
                      { label: 'Meta Desc.', value: 'Missing 3', color: 'text-red-400' },
                      { label: 'Backlinks', value: 'Growing', color: 'text-blue-400' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                        <span className="text-blue-200 text-sm">{row.label}</span>
                        <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </section>
  );
}

const SITE_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Thorough, detail oriented and always work towards any goal with efficiency and skill.",
    name: "Rohail Ali",
    designation: "SSME",
    src: "/download (5).png",
  },
  {
    quote: "SiteMaxi completely redesigned our website and the results speak for themselves.",
    name: "Anu Gunasekara",
    designation: "Adly Travel",
    src: "/WhatsApp Image 2025-11-12 at 19.18.27.jpeg",
  },
  {
    quote: "Professional, responsive, and truly invested in our success.",
    name: "Dennis Kapadia",
    designation: "WelnessMed Supply Inc",
    src: "/Generated Image November 12, 2025 - 7_24PM.png",
  },
];

function WhyChooseSection() {
  const differentiators = [
    {
      icon: Target,
      title: 'SEO Expertise',
      description: 'Deep technical and content SEO that builds lasting organic visibility for your business.',
      color: '#1D4ED8',
      bg: '#DBEAFE',
    },
    {
      icon: MousePointerClick,
      title: 'Paid Advertising',
      description: 'Google Ads and paid social campaigns managed by certified professionals who optimize for ROI.',
      color: '#DC2626',
      bg: '#FEE2E2',
    },
    {
      icon: BarChart3,
      title: 'Growth Strategy',
      description: 'A clear roadmap aligned to your business goals, not just vanity metrics.',
      color: '#059669',
      bg: '#D1FAE5',
    },
    {
      icon: Cpu,
      title: 'AI & Automation',
      description: 'We leverage AI tools and marketing automation to move faster and smarter than traditional agencies.',
      color: '#D97706',
      bg: '#FEF3C7',
    },
    {
      icon: Wrench,
      title: 'Conversion Optimization',
      description: 'Every landing page and website we build is designed to turn visitors into paying customers.',
      color: '#7C3AED',
      bg: '#EDE9FE',
    },
    {
      icon: TrendingUp,
      title: 'Long-Term Growth',
      description: 'We build sustainable systems, not short-term tactics. Your marketing compounds over time.',
      color: '#0891B2',
      bg: '#CFFAFE',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-16">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Why SiteMaxi</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mt-3 mb-5 leading-tight">
              We're not just another agency
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              We combine deep marketing expertise with modern tools to deliver growth that lasts.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper animation="fade-up">
          <FeatureCarousel />
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper animation="fade-up">
          <div className="mt-16 bg-white rounded-2xl overflow-hidden px-10 py-10 border border-gray-100 shadow-sm">
            <AnimatedTestimonials testimonials={SITE_TESTIMONIALS} autoplay={true} />
          </div>
        </ScrollAnimateWrapper>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 bg-[#0F172A]">
      <ScrollAnimateWrapper animation="fade-up">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Ready to Grow?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Start with a free audit.<br />
            <span className="text-blue-400">See your growth potential.</span>
          </h2>
          <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto">
            Get a complete AI-powered marketing audit in minutes, then book a free strategy call to walk through the opportunities with our team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/free-seo-audit"
              className="bg-[#1D4ED8] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-[#2563EB] transition-colors shadow-xl shadow-blue-900/40 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Run Free AI Marketing Audit
            </Link>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-colors"
            >
              Book Strategy Call
            </a>
          </div>
          <p className="text-blue-300 text-sm mt-6">No commitment. No credit card. Just clarity.</p>
        </div>
      </ScrollAnimateWrapper>
    </section>
  );
}
