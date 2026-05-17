import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CALENDAR_LINK = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF';

export function BlueprintCTA() {
  return (
    <section
      id="get-blueprint"
      className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]"
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1D4ED8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#0891B2]/8 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Want This Implemented for Your Store?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0891B2] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#1E40AF] hover:to-[#0E7490] hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/30 w-full sm:w-auto justify-center"
          >
            <ArrowRight className="w-5 h-5" />
            Request an AI Visibility Audit
          </a>
          <Link
            to="/apply"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Calendar className="w-5 h-5" />
            Apply For A Growth Call
          </Link>
          <a
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            DM Us 'ShopGPT'
          </a>
        </div>

        <p className="text-white/50 text-lg">
          AI is already sending buyers. The question is — <span className="text-white font-semibold">will it send them to you?</span>
        </p>
      </div>
    </section>
  );
}
