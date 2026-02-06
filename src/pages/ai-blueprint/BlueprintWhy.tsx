import { AlertTriangle, Building2 } from 'lucide-react';

export function BlueprintWhy() {
  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-1 flex lg:justify-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-8 leading-tight">
                Why Most Stores Aren't Seeing AI Revenue (Yet)
              </h2>
              <div className="space-y-6 text-[#4B5563] text-lg leading-relaxed">
                <p>
                  Most ecommerce brands still optimize only for Google rankings or paid ads.
                </p>
                <p>
                  AI search works differently. It rewards clarity, context, trust, and buyer intent.
                </p>
                <p className="font-semibold text-[#111111] text-xl">
                  Brands that structure early gain compounding visibility over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-1 flex lg:justify-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#1D4ED8]" />
              </div>
            </div>
            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-8 leading-tight">
                Why We Built This Blueprint
              </h2>
              <div className="space-y-6 text-[#4B5563] text-lg leading-relaxed">
                <p>
                  At SiteMaxi, we help brands grow visibility across search, AI, and buyer intent — not just rankings.
                </p>
                <p>
                  We focus on AI-ready SEO, ecommerce growth, and long-term, compounding traffic.
                </p>
                <p className="font-semibold text-[#111111]">
                  This blueprint is a distilled version of what we apply for real Shopify clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
