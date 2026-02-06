import { ImageIcon } from 'lucide-react';

export function BlueprintProof() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-sm uppercase tracking-wide">Live Data</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-8 leading-tight">
              This Is Already Working — Not a Future Concept
            </h2>

            <div className="space-y-6 text-[#4B5563] text-lg leading-relaxed">
              <p>
                Shopify has started attributing sales directly to AI sources like ChatGPT.
              </p>

              <p>When customers ask questions such as:</p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-3">
                <p className="flex items-start gap-3">
                  <span className="text-[#1D4ED8] font-bold mt-0.5">"</span>
                  <span className="italic text-[#111111]">Where can I buy the best [product] in Canada?</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-[#1D4ED8] font-bold mt-0.5">"</span>
                  <span className="italic text-[#111111]">Which brand should I trust for [category]?</span>
                </p>
              </div>

              <p>
                AI tools now recommend trusted stores. When users click those recommendations and purchase, Shopify tracks that revenue.
              </p>

              <p className="font-semibold text-[#111111]">
                The data shown here represents real sales generated from ChatGPT — growing month on month.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#1D4ED8]/5 to-[#0891B2]/5 rounded-3xl blur-xl" />
            <div className="relative bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 font-semibold text-lg mb-2">Shopify Analytics Screenshot</p>
              <p className="text-gray-400 text-sm text-center max-w-xs">
                AI-attributed revenue data from a live Shopify store showing ChatGPT as a traffic source
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
