import { Eye, ShieldCheck, Globe, FileText, BarChart3, Users, Info } from 'lucide-react';

const bulletPoints = [
  { icon: Eye, text: 'How ChatGPT actually sends traffic to ecommerce stores' },
  { icon: ShieldCheck, text: "Why some brands get recommended and others don't" },
  { icon: Globe, text: 'How to structure your Shopify store so AI trusts it' },
  { icon: FileText, text: 'What type of content AI tools reference' },
  { icon: Users, text: 'How to turn AI visibility into buyer-ready traffic' },
  { icon: BarChart3, text: 'How to track AI-attributed revenue inside Shopify' },
];

export function BlueprintValue() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-wide bg-blue-50 px-4 py-2 rounded-full">
              Inside the Blueprint
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
            What This Blueprint Will Show You
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {bulletPoints.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1D4ED8]/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1D4ED8] transition-colors duration-300">
                <item.icon className="w-6 h-6 text-[#1D4ED8] group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="text-[#111111] font-medium text-lg leading-snug pt-2">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1D4ED8]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-[#1D4ED8]" />
            </div>
            <p className="text-[#1D4ED8] font-semibold text-lg leading-relaxed">
              This is not about hacks or shortcuts. This is about clarity, trust, and intent — optimized for AI discovery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
