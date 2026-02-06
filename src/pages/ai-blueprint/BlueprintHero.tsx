import { ArrowRight, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';

export function BlueprintHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="absolute top-20 left-10 w-72 h-72 bg-[#1D4ED8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0891B2]/8 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 px-5 py-2.5 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-[#38BDF8]" />
          <span className="font-medium text-sm tracking-wide">AI-Powered Ecommerce Growth</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
          The Exact Blueprint We Used to Generate Revenue from{' '}
          <span className="bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent">
            ChatGPT
          </span>{' '}
          for a Shopify Store
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-6 max-w-3xl mx-auto leading-relaxed">
          A practical, step-by-step framework to turn AI tools like ChatGPT into a real, trackable revenue channel — without spending on ads.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Proven on live Shopify stores</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#38BDF8]" />
            <span>AI-attributed revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-amber-400" />
            <span>Growing month on month</span>
          </div>
        </div>

        <a
          href="#get-blueprint"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0891B2] text-white px-10 py-5 rounded-xl font-semibold text-lg hover:from-[#1E40AF] hover:to-[#0E7490] hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40"
        >
          Get the Free Blueprint
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
