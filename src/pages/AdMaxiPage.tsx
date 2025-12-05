import { Check, Zap, Target, DollarSign, Phone } from 'lucide-react';
import { ServiceFAQ } from '../components/ServiceFAQ';

export function AdMaxiPage() {
  const faqs = [
    {
      question: "How much should I spend on ads?",
      answer: "Most businesses start with $300–$1,000 per month on ad spend, depending on goals."
    },
    {
      question: "Do you create the ad copy and graphics?",
      answer: "Yes — all creative assets are included."
    },
    {
      question: "How fast will ads start performing?",
      answer: "Most campaigns start seeing results within the first 7–14 days."
    },
    {
      question: "Do you track results?",
      answer: "Yes — we set up full tracking, conversion events, and monthly performance reports."
    },
    {
      question: "Can you manage retargeting campaigns?",
      answer: "Absolutely. Retargeting is one of the most effective ad strategies we use."
    }
  ];

  return (
    <>
      <AdMaxiHero />
      <PackagesSection />
      <CTASection />
      <FactSection />
      <ServiceFAQ
        faqs={faqs}
        primaryColor="#1D4ED8"
        bgColor="#DBEAFE"
      />
    </>
  );
}

function AdMaxiHero() {
  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-wide bg-blue-50 px-4 py-2 rounded-full">
              Social Media Advertising
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            AdMaxi — Run Profitable Social Ad Campaigns That Generate Leads.
          </h1>
          <p className="text-xl text-[#666666] mb-10 leading-relaxed">
            Stop wasting money on ads that don't convert. Get campaigns that are optimized, tracked, and designed to deliver real ROI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] text-white px-10 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#1D4ED8] transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block"
            >
              Get Started
            </a>
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1D4ED8] border-2 border-[#1D4ED8] px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block"
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
      name: 'Ad Launch',
      price: '$599',
      period: 'month',
      description: 'Perfect for testing the waters with social ads',
      features: [
        'Facebook & Instagram Ad Setup',
        '2 Ad Campaign Strategies',
        'Audience Research & Targeting',
        'Creative Development (2 ad sets)',
        'Conversion Tracking Setup',
        'Monthly Performance Reports'
      ],
      note: 'Ad spend not included',
      buttonText: 'Launch Ads →',
      icon: Zap
    },
    {
      name: 'Ad Growth',
      price: '$999',
      period: 'month',
      description: 'Scale your leads with optimized campaigns',
      features: [
        'Everything in Ad Launch',
        '4 Active Ad Campaigns',
        'A/B Testing & Optimization',
        'Advanced Audience Targeting',
        'Creative Development (4 ad sets)',
        'Weekly Performance Reviews',
        'Landing Page Recommendations'
      ],
      note: 'Ad spend not included',
      buttonText: 'Grow Leads →',
      icon: Target
    },
    {
      name: 'Ad Dominator',
      price: '$1,499',
      period: 'month',
      description: 'Aggressive scaling for serious growth',
      features: [
        'Everything in Ad Growth',
        '6+ Active Ad Campaigns',
        'Multi-Platform Advertising',
        'Advanced Funnel Optimization',
        'Creative Development (8+ ad sets)',
        'Retargeting & Lookalike Audiences',
        'Dedicated Ad Strategist',
        'Bi-Weekly Strategy Calls'
      ],
      note: 'Ad spend not included',
      buttonText: 'Dominate Advertising →',
      icon: DollarSign
    },
    {
      name: 'Custom Plan',
      price: "Let's Tailor It",
      period: 'for You',
      description: 'Enterprise advertising solutions with full management.',
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
                <div className="bg-blue-50 p-3 rounded-lg">
                  <pkg.icon className="w-8 h-8 text-[#1D4ED8]" />
                </div>
              </div>

              {!pkg.isCustom && pkg.features.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-[#111111] mb-3">What's Included:</p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                        <span className="text-[#666666]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.note && (
                    <p className="text-sm text-[#666666] mt-4 italic">* {pkg.note}</p>
                  )}
                </div>
              )}

              <a
                href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] text-white text-center px-8 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#1D4ED8] transition-all duration-300 shadow-md hover:shadow-lg"
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
          Ready to generate real leads with social ads?
        </h2>
        <p className="text-xl text-[#666666] mb-10">
          Click below to speak to an advertising expert.
        </p>
        <a
          href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-[#1E40AF] hover:to-[#1D4ED8] transition-all duration-300 shadow-lg hover:shadow-xl"
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
              src="/Sitemaxi, Admaxi Image-.png"
              alt="Social Media Advertising"
              className="w-full max-w-lg rounded-xl"
            />
          </div>
          <div>
            <div className="inline-block mb-6">
              <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-wide bg-blue-50 px-4 py-2 rounded-full">
                Social Advertising Facts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Did you know?
            </h2>
            <p className="text-xl text-[#666666] mb-8 italic">
              Facebook ads can reach over 2.11 billion people, and businesses make an average of $2 in revenue for every $1 spent on social ads.
            </p>
            <p className="text-lg text-[#666666] leading-relaxed">
              Social media advertising offers unmatched targeting capabilities, allowing you to reach exactly the right audience at the right time. With proper optimization and creative testing, social ads can become your most profitable customer acquisition channel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
