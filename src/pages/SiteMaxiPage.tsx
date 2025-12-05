import { Check, Palette, Smartphone, Zap, Phone } from 'lucide-react';
import { ServiceFAQ } from '../components/ServiceFAQ';

export function SiteMaxiPage() {
  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Most websites take 2–4 weeks depending on the number of pages and complexity."
    },
    {
      question: "Do you write the website content?",
      answer: "Yes — we can write all the copy for your pages."
    },
    {
      question: "Are your websites mobile-friendly?",
      answer: "Absolutely. Every site we build is responsive, SEO-ready, and fast."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Yes — we specialize in modernizing older websites."
    },
    {
      question: "Do you handle hosting and maintenance?",
      answer: "Yes. We can manage ongoing updates, hosting, and performance checks."
    }
  ];

  return (
    <>
      <SiteMaxiHero />
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

function SiteMaxiHero() {
  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
              Professional Web Design
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Your Website: Clean, Modern, Built to Convert.
          </h1>
          <p className="text-xl text-[#666666] mb-10 leading-relaxed">
            Your website is your digital storefront. Make sure it's fast, beautiful, and designed to turn visitors into customers.
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
      name: 'Website Refresh',
      price: '$1,499',
      period: 'one-time',
      description: 'Modernize your existing website',
      features: [
        'Design Refresh & Modernization',
        'Up to 5 Pages Redesigned',
        'Mobile Responsive',
        'Basic SEO Optimization',
        'Contact Form Integration',
        '1 Month Post-Launch Support'
      ],
      buttonText: 'Refresh My Site →',
      icon: Palette
    },
    {
      name: 'Custom Website',
      price: '$2,999',
      period: 'one-time',
      description: 'Professional custom website design',
      features: [
        'Fully Custom Design',
        'Up to 10 Pages',
        'Mobile & Tablet Responsive',
        'SEO-Ready Structure',
        'Contact & Lead Forms',
        'CMS Integration',
        'Speed Optimization',
        '3 Months Post-Launch Support'
      ],
      buttonText: 'Build My Site →',
      icon: Smartphone
    },
    {
      name: 'E-Commerce Website',
      price: '$4,999',
      period: 'one-time',
      description: 'Full-featured online store',
      features: [
        'Everything in Custom Website',
        'E-Commerce Platform Setup',
        'Product Catalog (up to 100 products)',
        'Shopping Cart & Checkout',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Tracking System',
        '6 Months Post-Launch Support'
      ],
      buttonText: 'Launch My Store →',
      icon: Zap
    },
    {
      name: 'Custom Plan',
      price: "Let's Tailor It",
      period: 'for You',
      description: 'Enterprise websites and web applications.',
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
          Ready to build a website that converts?
        </h2>
        <p className="text-xl text-[#666666] mb-10">
          Click below to speak to a web design expert.
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
              src="/Sitemaxi, SiteMaxi Image-.png"
              alt="Professional Web Design"
              className="w-full max-w-lg rounded-xl"
            />
          </div>
          <div>
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                Website Facts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Did you know?
            </h2>
            <p className="text-xl text-[#666666] mb-8 italic">
              75% of users judge a company's credibility based on their website design, and 88% won't return after a bad user experience.
            </p>
            <p className="text-lg text-[#666666] leading-relaxed">
              Your website is often the first impression potential customers have of your business. A professional, fast-loading, mobile-friendly website builds trust and credibility while a poor website drives customers to your competitors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
