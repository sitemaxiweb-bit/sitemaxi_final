import { Check, MousePointerClick, Target, TrendingUp, Phone } from 'lucide-react';
import { ServiceFAQ } from '../components/ServiceFAQ';

export function ClickMaxiPage() {
  const faqs = [
    {
      question: "How do Google Ads work?",
      answer: "Google Ads place your business at the top of Google when people search for your services."
    },
    {
      question: "What's a good budget for Google Ads?",
      answer: "Most service businesses spend between $400–$1,500 per month depending on competition."
    },
    {
      question: "Will you manage the keywords and bidding?",
      answer: "Yes — we handle everything from keywords to ad copy, bidding, and optimization."
    },
    {
      question: "How soon can I get leads?",
      answer: "Google Ads can start generating leads within a few days of launch."
    },
    {
      question: "Do you provide performance reports?",
      answer: "Yes — you'll receive clear monthly insights."
    }
  ];

  return (
    <>
      <ClickMaxiHero />
      <PackagesSection />
      <CTASection />
      <FactSection />
      <ServiceFAQ
        faqs={faqs}
        primaryColor="#0891B2"
        bgColor="#CFFAFE"
      />
    </>
  );
}

function ClickMaxiHero() {
  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-[#0891B2] font-semibold text-sm uppercase tracking-wide bg-cyan-50 px-4 py-2 rounded-full">
              Google Ads Management
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Capture High-Intent Customers Ready to Buy.
          </h1>
          <p className="text-xl text-[#666666] mb-10 leading-relaxed">
            Stop losing customers to competitors. Get found at the exact moment people are searching for your services with Google Ads that convert.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white px-10 py-4 rounded-lg font-semibold hover:from-[#0E7490] hover:to-[#0891B2] transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block"
            >
              Get Started
            </a>
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0891B2] border-2 border-[#0891B2] px-10 py-4 rounded-lg font-semibold hover:bg-cyan-50 transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block"
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
      name: 'Search Starter',
      price: '$699',
      period: 'month',
      description: 'Perfect for businesses starting with Google Ads',
      features: [
        'Google Ads Account Setup & Audit',
        '2 Search Campaigns',
        'Keyword Research & Strategy',
        'Ad Copy Development',
        'Conversion Tracking Setup',
        'Monthly Performance Reports'
      ],
      note: 'Ad spend not included',
      buttonText: 'Start Capturing Leads →',
      icon: MousePointerClick
    },
    {
      name: 'Search Growth',
      price: '$1,199',
      period: 'month',
      description: 'Scale your customer acquisition',
      features: [
        'Everything in Search Starter',
        '4+ Search & Display Campaigns',
        'Advanced Keyword Optimization',
        'A/B Testing & Ad Variations',
        'Remarketing Campaigns',
        'Landing Page Optimization',
        'Weekly Performance Reviews'
      ],
      note: 'Ad spend not included',
      buttonText: 'Grow Conversions →',
      icon: Target
    },
    {
      name: 'Search Dominator',
      price: '$1,799',
      period: 'month',
      description: 'Dominate your market with aggressive PPC',
      features: [
        'Everything in Search Growth',
        '6+ Multi-Channel Campaigns',
        'YouTube & Display Network Ads',
        'Shopping Campaigns (if applicable)',
        'Advanced Bid Strategies',
        'Competitor Conquest Campaigns',
        'Dedicated PPC Strategist',
        'Bi-Weekly Strategy Calls'
      ],
      note: 'Ad spend not included',
      buttonText: 'Dominate Search →',
      icon: TrendingUp
    },
    {
      name: 'Custom Plan',
      price: "Let's Tailor It",
      period: 'for You',
      description: 'Enterprise PPC solutions for ambitious growth.',
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
                <div className="bg-cyan-50 p-3 rounded-lg">
                  <pkg.icon className="w-8 h-8 text-[#0891B2]" />
                </div>
              </div>

              {!pkg.isCustom && pkg.features.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-[#111111] mb-3">What's Included:</p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" />
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
                className="block w-full bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white text-center px-8 py-4 rounded-lg font-semibold hover:from-[#0E7490] hover:to-[#0891B2] transition-all duration-300 shadow-md hover:shadow-lg"
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
          Ready to capture high-intent customers?
        </h2>
        <p className="text-xl text-[#666666] mb-10">
          Click below to speak to a Google Ads expert.
        </p>
        <a
          href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-[#0E7490] hover:to-[#0891B2] transition-all duration-300 shadow-lg hover:shadow-xl"
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
              src="/Sitemaxi, ClickMaxi Image-.png"
              alt="Google Ads Management"
              className="w-full max-w-lg rounded-xl"
            />
          </div>
          <div>
            <div className="inline-block mb-6">
              <span className="text-[#0891B2] font-semibold text-sm uppercase tracking-wide bg-cyan-50 px-4 py-2 rounded-full">
                Google Ads Facts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Did you know?
            </h2>
            <p className="text-xl text-[#666666] mb-8 italic">
              Businesses make an average of $2 in revenue for every $1 they spend on Google Ads, and 65% of people click on Google Ads when looking to buy.
            </p>
            <p className="text-lg text-[#666666] leading-relaxed">
              Google Ads puts you in front of customers at the exact moment they're searching for your services. Unlike other marketing channels, these are people with high purchase intent actively looking for solutions you provide—making Google Ads one of the most effective customer acquisition channels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
