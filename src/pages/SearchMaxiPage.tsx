import { Check, Search, TrendingUp, FileText, Phone } from 'lucide-react';
import { ServiceFAQ } from '../components/ServiceFAQ';

export function SearchMaxiPage() {
  const faqs = [
    {
      question: "How is SEO different from Local SEO?",
      answer: "SEO focuses on ranking your website in Google's organic search results, not just the map pack."
    },
    {
      question: "When can I expect results?",
      answer: "SEO usually takes 2–4 months to see steady improvements, depending on competition and website quality."
    },
    {
      question: "What's included in your SEO packages?",
      answer: "Technical SEO, on-page optimization, content writing, backlinks, reports, and ongoing improvements."
    },
    {
      question: "Do you write the blog content?",
      answer: "Yes. Our team creates SEO-driven content that helps you rank and attract organic traffic."
    },
    {
      question: "Do you guarantee rankings?",
      answer: "No ethical SEO agency can guarantee rankings, but we guarantee consistent work, reporting, and strategic improvement."
    }
  ];

  return (
    <>
      <SearchMaxiHero />
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

function SearchMaxiHero() {
  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-[#0891B2] font-semibold text-sm uppercase tracking-wide bg-cyan-50 px-4 py-2 rounded-full">
              Organic Search Engine Optimization
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Build Long-Term Organic Traffic That Converts.
          </h1>
          <p className="text-xl text-[#666666] mb-10 leading-relaxed">
            Stop paying for every click. Build a sustainable traffic engine that brings qualified customers to your site month after month.
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
      name: 'SearchMaxi Foundation',
      price: '$599',
      period: 'month',
      description: 'Perfect for businesses starting their SEO journey',
      features: [
        'Complete Technical SEO Audit',
        'On-Page Optimization (up to 10 pages)',
        'Keyword Research & Strategy',
        'Monthly Performance Reports',
        '2 High-Quality Blog Posts / month',
        'Google Search Console Setup & Monitoring',
        'Core Web Vitals Review',
        'Indexing & Crawlability Optimization'
      ],
      buttonText: 'Start Building →',
      icon: Search
    },
    {
      name: 'SearchMaxi Growth',
      price: '$999',
      period: 'month',
      description: 'Scale your organic traffic with content & authority',
      features: [
        'Everything in SEO Foundation',
        'On-Page Optimization (up to 20 pages)',
        '4 High-Quality Blog Posts / month',
        '10 Quality Backlinks / month',
        'Content Strategy & Planning',
        'Competitor Analysis & Monitoring',
        'Schema Markup Setup (Local + Standard)',
        'Monthly Ranking Reports & Insights'
      ],
      buttonText: 'Grow Traffic →',
      icon: TrendingUp
    },
    {
      name: 'SearchMaxi Dominator',
      price: '$1,499',
      period: 'month',
      description: 'Dominate your market with aggressive SEO & authority building',
      features: [
        'Everything in SEO Growth',
        'On-Page Optimization (up to 30 pages)',
        '8 High-Quality Blog Posts / month',
        '20 Quality Backlinks / month',
        'Advanced Technical Optimization',
        'Conversion Rate Optimization',
        'Dedicated SEO Strategist'
      ],
      buttonText: 'Dominate Search →',
      icon: FileText
    },
    {
      name: 'Custom Plan',
      price: "Let's Tailor It",
      period: 'for You',
      description: 'Enterprise SEO solutions for ambitious businesses.',
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
          Ready to build sustainable organic traffic?
        </h2>
        <p className="text-xl text-[#666666] mb-10">
          Click below to speak to an SEO expert.
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
              src="/Sitemaxi, SearchMaxi Image-.png"
              alt="Search Engine Optimization Growth"
              className="w-full max-w-lg rounded-xl"
            />
          </div>
          <div>
            <div className="inline-block mb-6">
              <span className="text-[#0891B2] font-semibold text-sm uppercase tracking-wide bg-cyan-50 px-4 py-2 rounded-full">
                SEO Facts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Did you know?
            </h2>
            <p className="text-xl text-[#666666] mb-8 italic">
              68% of online experiences begin with a search engine, and SEO drives 1000%+ more traffic than organic social media.
            </p>
            <p className="text-lg text-[#666666] leading-relaxed">
              While paid ads stop working the moment you stop paying, SEO is an investment that compounds over time. Every piece of optimized content and every quality backlink continues working for you 24/7, bringing qualified traffic that converts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
