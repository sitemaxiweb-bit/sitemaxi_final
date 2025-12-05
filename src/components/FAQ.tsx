import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ScrollAnimateWrapper } from './ScrollAnimateWrapper';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services does SiteMaxi offer?",
    answer: "We help businesses grow through Local SEO, SEO, social media management, paid ads, Google Ads, branding, and website design. Everything you need to build visibility and attract customers online."
  },
  {
    question: "How soon can I expect results?",
    answer: "It depends on the service. Paid ads can deliver results quickly, while SEO and local SEO take time but build long-term momentum. We'll give you a clear timeline during onboarding."
  },
  {
    question: "Do you work with all business types?",
    answer: "Yes. We work with local service businesses, e-commerce brands, real estate professionals, medical practices, contractors, and more."
  },
  {
    question: "Is there a contract?",
    answer: "Most services are month-to-month. Some advanced packages may include a minimum commitment, depending on the goals."
  },
  {
    question: "What makes SiteMaxi different from other marketing agencies?",
    answer: "We focus on clarity, communication, and real results. You get a dedicated Client Success Manager, clear reporting, and a personalized strategy, not cookie-cutter marketing."
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes. You can book a strategy call anytime, and we'll walk you through what's best for your business."
  },
  {
    question: "How do I get started?",
    answer: "Fill out our contact form or book a call. We'll learn about your goals and recommend a service plan that makes sense for your business."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1D4ED8] px-4 py-2 rounded-full mb-6">
              <HelpCircle className="w-5 h-5" />
              <span className="font-semibold text-sm uppercase tracking-wide">
                Common Questions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#666666] max-w-2xl mx-auto">
              Everything you need to know about working with SiteMaxi
            </p>
          </div>
        </ScrollAnimateWrapper>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <ScrollAnimateWrapper
              key={index}
              animation="fade-up"
              delay={index * 0.1}
            >
              <div
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? 'border-[#8B5CF6] shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg md:text-xl font-semibold text-[#111111] pr-8 group-hover:text-[#8B5CF6] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 flex-shrink-0 text-[#8B5CF6] transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 pt-0">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
                    <p className="text-[#666666] text-base md:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>

        <ScrollAnimateWrapper animation="fade-up" delay={0.8}>
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 border border-gray-200">
            <h3 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">
              Still have questions?
            </h3>
            <p className="text-lg text-[#666666] mb-6">
              We're here to help. Book a free consultation and get personalized answers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Schedule a Call
              </a>
              <a
                href="/contact"
                className="bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </section>
  );
}
