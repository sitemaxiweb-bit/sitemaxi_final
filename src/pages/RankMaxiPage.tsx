import { Check, MapPin, Star, TrendingUp, Phone } from 'lucide-react';
import { ServiceFAQ } from '../components/ServiceFAQ';

export function RankMaxiPage() {
  const faqs = [
    {
      question: "What is Local SEO?",
      answer: "Local SEO helps your business appear in Google Maps results and local searches, especially for keywords like \"near me\"."
    },
    {
      question: "How long does Local SEO take to work?",
      answer: "Most businesses start seeing improvements within 4–8 weeks, with stronger results over 3–6 months."
    },
    {
      question: "Will you manage my Google Business Profile?",
      answer: "Yes — we optimize it, keep it updated, and improve your rankings through consistent activity."
    },
    {
      question: "Do I need reviews for Local SEO?",
      answer: "Absolutely. Reviews are one of the strongest ranking signals. We help you earn them consistently."
    },
    {
      question: "Can Local SEO help multi-location businesses?",
      answer: "Yes. We create and optimize profiles and landing pages for each location."
    }
  ];

  return (
    <>
      <RankMaxiHero />
      <PackagesSection />
      <AddOnSection />
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

function RankMaxiHero() {
  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
              Our Award Winning Service
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Get Found on Google Maps & Local Search.
          </h1>
          <p className="text-xl text-[#666666] mb-10 leading-relaxed">
            Your customers are searching near you right now. We help your business appear in the top 3 results, get more calls, and dominate local search visibility.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-10 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 text-lg shadow-md hover:shadow-xl inline-block"
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
      name: 'Google Business Optimization',
      price: '$199',
      period: 'one-time',
      description: 'Complete Google Business Profile Optimization',
      features: [
        'Google Business Profile Full Audit',
        'Google Business Profile Optimization',
        'Ranking Report + Competitor Comparison',
        '3-Month Action Plan for Ongoing Success'
      ],
      buttonText: 'Get Started →',
      icon: MapPin
    },
    {
      name: 'Map Boost',
      price: '$399',
      period: 'month',
      description: 'Local SEO & Map Pack Growth',
      features: [
        'Comprehensive Audit + Competitor Ranking',
        '20 New Citation Submissions / month',
        'Local Directory Optimization',
        'Review Growth Tools via Taptify',
        'Respond to & Manage Google Reviews',
        'Monthly Progress Reports'
      ],
      buttonText: 'Boost My Maps →',
      icon: TrendingUp
    },
    {
      name: 'Dominator',
      price: '$699',
      period: 'month',
      description: 'Reputation & Local Pack Dominator',
      features: [
        'Everything in Map Boost',
        '+20 High-Quality Local Backlinks',
        '+30 Citation Submissions / month',
        'Advanced Reputation & Review Management',
        'Ongoing Optimization + Monthly Reports'
      ],
      buttonText: 'Dominate Local Search →',
      icon: Star
    },
    {
      name: 'Custom Plan',
      price: "Let's Tailor It",
      period: 'for You',
      description: 'We design custom growth plans for multi-location businesses.',
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
                className="block w-full bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white text-center px-8 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 shadow-md hover:shadow-lg"
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

function AddOnSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="text-3xl font-bold mb-2">Add-On — Review Engage $50/month</h3>
            <p className="text-lg text-white/90">Weekly Google Posts & Monthly Photo Uploads</p>
          </div>
          <a
            href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#8B5CF6] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            Add This →
          </a>
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
          Ready to rise above competitors on Google?
        </h2>
        <p className="text-xl text-[#666666] mb-10">
          Click below to speak to a local SEO expert.
        </p>
        <a
          href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 shadow-lg hover:shadow-xl"
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
              src="/Sitemaxi, Rankmaxi Image- .png"
              alt="Search Engine Optimization Growth"
              className="w-full max-w-lg rounded-xl"
            />
          </div>
          <div>
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                Google search facts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Did you know?
            </h2>
            <p className="text-xl text-[#666666] mb-8 italic">
              76% of people who search for local businesses visit a store within 24 hours.
            </p>
            <p className="text-lg text-[#666666] leading-relaxed">
              Whether you own an online business or run a brick-and-mortar store, you can't deny the importance of "being seen" by your customers. In the online world, that means you must rank high on Google.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
