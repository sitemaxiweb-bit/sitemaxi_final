import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ScrollAnimateWrapper } from './ScrollAnimateWrapper';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
  primaryColor: string;
  bgColor: string;
  title?: string;
  subtitle?: string;
}

export function ServiceFAQ({
  faqs,
  primaryColor,
  bgColor,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about this service"
}: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: bgColor, color: primaryColor }}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-semibold text-sm uppercase tracking-wide">
                Common Questions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
              {title}
            </h2>
            <p className="text-xl text-[#666666] max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollAnimateWrapper>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollAnimateWrapper
              key={index}
              animation="fade-up"
              delay={index * 0.1}
            >
              <div
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? 'shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
                style={{
                  borderColor: openIndex === index ? primaryColor : undefined
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span
                    className="text-lg md:text-xl font-semibold text-[#111111] pr-8 transition-colors"
                    style={{
                      color: openIndex === index ? primaryColor : undefined
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ color: primaryColor }}
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
      </div>
    </section>
  );
}
