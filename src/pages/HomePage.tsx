import { TrendingUp, Share2, Target, MousePointerClick, Palette, Globe, Zap, ArrowRight, Award, Star, Users, TrendingUp as Chart, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LogoSlider } from '../components/LogoSlider';
import { Blog } from '../components/Blog';
import { FAQ } from '../components/FAQ';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import { SEOHead } from '../components/SEOHead';
import { OrganizationStructuredData, WebsiteStructuredData } from '../components/StructuredData';

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Digital Marketing Agency | Local SEO, SEO & Paid Ads"
        description="Grow your business with SiteMaxi's Local SEO, SEO, social media, and paid ads services. We help businesses show up on Google, attract more leads, and turn online traffic into real customers."
        keywords="digital marketing agency, local SEO, SEO services, paid ads, social media marketing, Google ads, Facebook ads, business growth"
      />
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <Hero />
      <LogoSlider />
      <Services />
      <AboutUs />
      <Process />
      <Testimonials />
      <Blog />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                Digital Growth Agency
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-[#111111] mb-6 leading-[1.1]">
              Be the business customers choose first
            </h1>
            <p className="text-lg md:text-xl text-[#666666] mb-10 leading-relaxed">
              From SEO to paid ads, we help local businesses grow consistently with clear strategy, clean design, and data-backed execution.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://calendar.app.google/Pn2PUD5NDJWr25mk8" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-10 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] hover:scale-105 transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block">
                Schedule a Call
              </a>
              <a href="#services" className="bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] px-10 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block">
                Browse Services
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-[550px] flex items-center justify-center overflow-hidden rounded-3xl transition-transform duration-500 hover:scale-105">
              <img
                src="/team-collaboration-hero-image.png"
                alt="Professional team collaborating on digital marketing strategy"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: TrendingUp,
      name: "RankMaxi",
      description: "Dominate local search results and get found by customers in your area.",
      benefits: [
        "Google Business Profile optimization",
        "Local SEO strategy & execution",
        "Review management & reputation"
      ],
      color: "#1D4ED8",
      bgColor: "#DBEAFE",
      checkColor: "#1D4ED8",
      hasLearnMore: true,
      path: "/rankmaxi"
    },
    {
      icon: Target,
      name: "SearchMaxi",
      description: "Build long-term organic traffic that converts into revenue.",
      benefits: [
        "Technical SEO & site optimization",
        "Content strategy & creation",
        "Link building & authority"
      ],
      color: "#0891B2",
      bgColor: "#CFFAFE",
      checkColor: "#0891B2",
      hasLearnMore: true,
      path: "/searchmaxi"
    },
    {
      icon: Share2,
      name: "SocialMaxi",
      description: "Build a strong social presence that engages your audience.",
      benefits: [
        "Content creation & scheduling",
        "Community management",
        "Organic growth strategies"
      ],
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
      checkColor: "#8B5CF6",
      hasLearnMore: true,
      path: "/socialmaxi"
    },
    {
      icon: Zap,
      name: "AdMaxi",
      description: "Run profitable social ad campaigns that generate real leads.",
      benefits: [
        "Facebook & Instagram advertising",
        "Creative development & testing",
        "Campaign optimization & scaling"
      ],
      color: "#1D4ED8",
      bgColor: "#DBEAFE",
      checkColor: "#1D4ED8",
      hasLearnMore: true,
      path: "/admaxi"
    },
    {
      icon: MousePointerClick,
      name: "ClickMaxi",
      description: "Capture high-intent customers ready to buy right now.",
      benefits: [
        "Google Ads management",
        "Search & display campaigns",
        "Conversion tracking & optimization"
      ],
      color: "#0891B2",
      bgColor: "#CFFAFE",
      checkColor: "#0891B2",
      hasLearnMore: true,
      path: "/clickmaxi"
    },
    {
      icon: Palette,
      name: "SiteMaxi",
      description: "Your website; clean, modern, and built to convert.",
      benefits: [
        "Responsive + SEO-Ready",
        "Simple, Clear Navigation",
        "Fast Load Performance"
      ],
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
      checkColor: "#8B5CF6",
      hasLearnMore: true,
      path: "/sitemaxi"
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                OUR SERVICES
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
              Marketing services that turn online attention into real customers.
            </h2>
          </div>
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollAnimateWrapper key={index} animation="fade-up" delay={index % 3 === 1 ? 100 : index % 3 === 2 ? 200 : 0}>
              <ServiceCard {...service} />
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, name, description, benefits, color, bgColor, checkColor, hasLearnMore, path }: any) {
  return (
    <Link to={path} className="block bg-white rounded-3xl p-10 border-2 border-gray-200 hover:border-opacity-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer" style={{ '--hover-color': color } as any}>
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: bgColor }}>
        <Icon className="w-10 h-10 stroke-[2.5]" style={{ color: color }} />
      </div>
      <h3 className="text-2xl font-bold text-[#111111] mb-3">{name}</h3>
      <p className="text-[#6B7280] mb-8 leading-relaxed text-base">{description}</p>
      <ul className="space-y-3">
        {benefits.map((benefit: string, idx: number) => (
          <li key={idx} className="flex items-start text-base text-[#6B7280]">
            <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: checkColor }}>
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {benefit}
          </li>
        ))}
      </ul>
      {hasLearnMore && (
        <div className="mt-6 text-[#8B5CF6] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          Learn More <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </Link>
  );
}

function AboutUs() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollAnimateWrapper animation="slide-left">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Team collaboration"
                    className="w-full h-[300px] object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Marketing workspace"
                    className="w-full h-[200px] object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="SEO strategy"
                    className="w-full h-[240px] object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper animation="slide-right">
            <div>
              <div className="inline-block mb-6">
                <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                  About Us
                </span>
              </div>
              <h2 className="text-4xl font-bold text-[#111111] mb-8 leading-tight">
                We help local businesses grow with clarity, consistency, and confidence.
              </h2>
              <div className="space-y-6 text-[#6B7280] text-lg leading-relaxed">
                <p>
                  At SiteMaxi, we believe great marketing shouldn't feel complicated. Our mission is to make local businesses visible, trusted, and easy to choose online. From SEO to social media, we combine strategy, creativity, and data to turn attention into action.
                </p>
                <p>
                  Our team blends deep marketing experience with modern AI and automation tools, so you can focus on running your business while we handle the growth engine behind it.
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-[#111111] mb-6">What sets us apart</h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-[#6B7280] text-lg">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2.5 mr-4 flex-shrink-0"></div>
                    <span>Transparent results and measurable impact</span>
                  </li>
                  <li className="flex items-start text-[#6B7280] text-lg">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2.5 mr-4 flex-shrink-0"></div>
                    <span>Dedicated support that feels personal, not corporate</span>
                  </li>
                  <li className="flex items-start text-[#6B7280] text-lg">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2.5 mr-4 flex-shrink-0"></div>
                    <span>Strategies designed for long-term, sustainable growth</span>
                  </li>
                </ul>
                <p className="text-[#111111] text-xl font-semibold mt-8">
                  We're not just another agency, we're your local growth partner.
                </p>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We dive deep into your business, understand your goals, and identify the best opportunities for growth."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Our team creates a customized roadmap designed to achieve your specific business objectives."
    },
    {
      number: "03",
      title: "Execution",
      description: "We implement proven strategies, monitor results, and continuously optimize for maximum ROI."
    }
  ];

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                Our Process
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6">
              How we work with you
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              A proven methodology that delivers consistent results for businesses like yours.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <ScrollAnimateWrapper key={index} animation="fade-up" delay={index * 100}>
              <div className="text-center">
                <div className="text-7xl font-bold bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] bg-clip-text text-transparent mb-6">
                  {step.number}
                </div>
                <h3 className="text-3xl font-bold text-[#111111] mb-4">{step.title}</h3>
                <p className="text-[#666666] leading-relaxed">{step.description}</p>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "It was a pleasure working with Sitemaxi. They are thorough, detail oriented & always work towards any goal you have in mind with efficiency & skill!",
      name: "Rohail Ali",
      business: "Caremade.ca",
      role: "Owner",
      image: "/download (5).png"
    },
    {
      quote: "We recently partnered with the incredible and talented SiteMaxi team to completely redesign and relaunch the Adly Travel website. The results speak for themselves.",
      name: "Anu Gunasekara",
      business: "Adly Travel",
      role: "Owner",
      image: "/WhatsApp Image 2025-11-12 at 19.18.27.jpeg"
    },
    {
      quote: "The team at SiteMaxi is professional, responsive, and truly invested in our success. Couldn't ask for a better partner.",
      name: "Dennis Kapadia",
      business: "WelnessMed Supply Inc",
      role: "Head of operations",
      image: "/Generated Image November 12, 2025 - 7_24PM.png"
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                Testimonials
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6">
              What our clients say
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real business owners have to say about working with us.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimateWrapper key={index} animation="scale" delay={index * 100}>
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-10 hover:border-[#8B5CF6] hover:shadow-xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#8B5CF6] text-[#8B5CF6]" />
                  ))}
                </div>
                <p className="text-[#666666] mb-8 leading-relaxed text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6] rounded-full mr-4"></div>
                  )}
                  <div>
                    <div className="font-bold text-[#111111]">{testimonial.name}</div>
                    <div className="text-sm text-[#666666]">{testimonial.role}, {testimonial.business}</div>
                  </div>
                </div>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 bg-gray-50">
      <ScrollAnimateWrapper animation="fade-up">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-[#666666] mb-10">
            Book a free strategy call and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://calendar.app.google/Pn2PUD5NDJWr25mk8" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 inline-block">
              Schedule a Call
            </a>
          </div>
          <p className="text-[#666666] mt-6">No contracts. No pressure. Just results.</p>
        </div>
      </ScrollAnimateWrapper>
    </section>
  );
}
