import { Check, Share2, Users, Calendar, Phone } from 'lucide-react';
import { ServiceFAQ } from '../components/ServiceFAQ';

export function SocialMaxiPage() {
  const faqs = [
    {
      question: "Which platforms do you manage?",
      answer: "We manage Facebook, Instagram, LinkedIn, and TikTok depending on your goals."
    },
    {
      question: "Do you create the content?",
      answer: "Yes — captions, visuals, and content calendars are included."
    },
    {
      question: "How often do you post?",
      answer: "It depends on your package, but most clients receive 8–16 posts per month."
    },
    {
      question: "Do you reply to comments and messages?",
      answer: "Yes, social engagement is included depending on your plan."
    },
    {
      question: "Will my social media grow organically?",
      answer: "Yes, with consistent content and engagement, growth becomes steady over time."
    }
  ];

  return (
    <>
      <SocialMaxiHero />
      <PackagesSection />
      <CTASection />
      <FactSection />
      <ServiceFAQ
        faqs={faqs}
        primaryColor="#8B5CF6"
        bgColor="#F3E8FF"
      />
    </>
  );
}

function SocialMaxiHero() {
  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
              Social Media Management
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Build a Strong Social Presence That Engages.
          </h1>
          <p className="text-xl text-[#666666] mb-10 leading-relaxed">
            Stop posting randomly and hoping for results. Build a consistent, engaging social media presence that turns followers into customers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-10 py-4 rounded-lg font-semibold hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block"
            >
              Get Started
            </a>
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] px-10 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  const packages = [
    {
      name: 'Social Starter',
      price: '$399',
      period: 'month',
      description: 'Perfect for building your social foundation',
      features: [
        '12 Custom Posts / month (3 per week)',
        'Content Calendar & Strategy',
        '2 Social Platforms (Facebook, Instagram, etc.)',
        'Hashtag Research & Optimization',
        'Monthly Analytics Report'
      ],
      buttonText: 'Start Growing →',
      icon: Share2
    },
    {
      name: 'Social Growth',
      price: '$699',
      period: 'month',
      description: 'Scale your engagement and community',
      features: [
        '20 Custom Posts / month (5 per week)',
        '3 Social Platforms',
        'Community Management & Engagement',
        'Story & Reel Content Creation',
        'Competitor Analysis',
        'Bi-Weekly Strategy Calls'
      ],
      buttonText: 'Grow Engagement →',
      icon: Users
    },
    {
      name: 'Social Dominator',
      price: '$1,199',
      period: 'month',
      description: 'Become the authority in your market',
      features: [
        '30+ Custom Posts / month (Daily+)',
        '4+ Social Platforms',
        'Advanced Community Management',
        'Video Content & Reels',
        'Influencer Outreach',
        'Content Repurposing Strategy',
        'Weekly Strategy Calls'
      ],
      buttonText: 'Dominate Social →',
      icon: Calendar
    },
    {
      name: 'Custom Plan',
      price: "Let's Tailor It",
      period: 'for You',
      description: 'Enterprise social media solutions for ambitious brands.',
      features: [],
      buttonText: 'Book Strategy Call →',
      icon: Phone,
      isCustom: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">{pkg.name}</h3>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-[#111111]">{pkg.price}</span>
                    {!pkg.isCustom && <span className="text-[#666666] text-lg"> / {pkg.period}</span>}
                  </div>
                  <p className="text-[#666666] italic">{pkg.description}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <pkg.icon className="w-8 h-8 text-[#8B5CF6]" />
                </div>
              </div>

              {!pkg.isCustom && pkg.features.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-[#111111] mb-3">What's Included:</p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                        <span className="text-[#666666]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white text-center px-8 py-4 rounded-lg font-semibold hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {pkg.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6">
          Ready to build a thriving social community?
        </h2>
        <p className="text-xl text-[#666666] mb-10">
          Click below to speak to a social media expert.
        </p>
        <a
          href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Talk to an Expert →
        </a>
      </div>
    </section>
  );
}

function FactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            <img
              src="/Sitemaxi, SocialMaxi Image-.png"
              alt="Social Media Management"
              className="w-full max-w-lg rounded-xl"
            />
          </div>
          <div>
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                Social Media Facts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Did you know?
            </h2>
            <p className="text-xl text-[#666666] mb-8 italic">
              71% of consumers who have a positive experience with a brand on social media are likely to recommend it to others.
            </p>
            <p className="text-lg text-[#666666] leading-relaxed">
              Social media isn't just about posting content—it's about building relationships. Consistent, engaging content helps you stay top-of-mind with your audience and creates a community around your brand that drives word-of-mouth referrals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
