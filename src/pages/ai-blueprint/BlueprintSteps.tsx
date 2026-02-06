import { Check, Lightbulb } from 'lucide-react';

interface StepData {
  number: number;
  heading: string;
  items: string[];
  insight: string;
}

const steps: StepData[] = [
  {
    number: 1,
    heading: 'Make Your Store Easy for AI to Understand',
    items: [
      'Clear product and category structure',
      'Descriptive, human-written product descriptions',
      'Clean URLs without unnecessary parameters',
      'Indexable pages with no hidden content',
      'Logical navigation and internal linking',
    ],
    insight: "If AI can't clearly understand what you sell and who it's for, it won't recommend you.",
  },
  {
    number: 2,
    heading: 'Build Content AI Can Confidently Recommend',
    items: [
      "'Best [product] for [use case]' pages",
      'Comparison pages (Brand A vs Brand B)',
      'Use-case focused landing pages',
      'FAQ sections written in natural language',
    ],
    insight: 'ChatGPT favors decision-making content, not generic blog posts.',
  },
  {
    number: 3,
    heading: 'Give AI a Reason to Trust Your Brand',
    items: [
      'Customer reviews on product pages',
      'Google Business Profile where applicable',
      'Clear About, Contact, Shipping, and Returns pages',
      'Real brand story and transparency',
      'Consistent branding across the web',
    ],
    insight: 'AI avoids uncertainty. Trust removes friction.',
  },
  {
    number: 4,
    heading: 'Write the Way People Ask Questions',
    items: [
      'Question-based headings',
      'Clear, direct answers',
      'Natural conversational language',
      'No keyword stuffing',
      'Content written for humans first',
    ],
    insight: 'AI pulls answers — not keywords.',
  },
  {
    number: 5,
    heading: 'Get Referenced Outside Your Website',
    items: [
      'Helpful mentions on blogs',
      'Natural references on Reddit and Quora',
      'Brand mentions in comparison articles',
      'Consistent citations across platforms',
    ],
    insight: 'AI learns trust from the wider web — not just your site.',
  },
  {
    number: 6,
    heading: 'Track AI Revenue Inside Shopify',
    items: [
      "Monitor 'chatgpt.com · None' in Shopify analytics",
      'Compare AI revenue month on month',
      'Track conversion rate from AI traffic',
      'Identify and scale high-performing pages',
    ],
    insight: "If you don't track it, you can't scale it.",
  },
];

function StepCard({ step }: { step: StepData }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#1D4ED8]/15 transition-all duration-300">
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-8 py-5">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent">
            {String(step.number).padStart(2, '0')}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            {step.heading}
          </h3>
        </div>
      </div>

      <div className="p-8">
        <ul className="space-y-4 mb-8">
          {step.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1D4ED8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-[#4B5563] text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 font-medium text-sm leading-relaxed italic">
            {step.insight}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BlueprintSteps() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-[#0891B2] font-semibold text-sm uppercase tracking-wide bg-cyan-50 px-4 py-2 rounded-full">
              The 6-Step Framework
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
            Your AI Visibility Roadmap
          </h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            Follow these six steps to position your Shopify store for AI-driven discovery and revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
