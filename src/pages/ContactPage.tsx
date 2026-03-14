import { Contact } from '../components/Contact';
import { SEOHead } from '../components/SEOHead';
import { ScrollAnimateWrapper } from '../components/ScrollAnimateWrapper';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle, Calendar, Phone, Mail } from 'lucide-react';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

export function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact SiteMaxi — Book a Strategy Call or Get in Touch"
        description="Contact the SiteMaxi team to discuss your marketing goals. Book a free strategy call, send us a message, or start with a free AI marketing audit."
        keywords="contact SiteMaxi, book strategy call, digital marketing consultation, free marketing audit"
      />

      <section className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ScrollAnimateWrapper animation="fade-up">
            <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mt-4 mb-5 leading-tight">
              Let's grow your business
            </h1>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Whether you're ready to start or just exploring your options, we're here to help. Pick the best way to connect.
            </p>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <section className="py-14 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimateWrapper animation="fade-up">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] rounded-2xl p-8 text-white">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                  <Search className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Start with a Free Audit</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-6">
                  Get an instant AI-powered analysis of your website's SEO health, technical issues, and growth opportunities. Free, no commitment.
                </p>
                <div className="space-y-2 mb-6">
                  {['SEO health score', 'Technical issues', 'Page speed report', 'Growth recommendations'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-blue-100 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/free-seo-audit"
                  className="flex items-center justify-center gap-2 bg-white text-[#1D4ED8] px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors w-full"
                >
                  <Search className="w-4 h-4" />
                  Run Free AI Audit
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <Calendar className="w-6 h-6 text-[#1D4ED8]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-3">Book a Strategy Call</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                  Schedule a free 30-minute call with our team. We'll review your business goals, discuss your competitors, and outline a custom growth plan.
                </p>
                <div className="space-y-2 mb-6">
                  {['30-minute session', 'No sales pressure', 'Custom growth roadmap', 'Answer all your questions'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#6B7280] text-sm">
                      <CheckCircle className="w-4 h-4 text-[#1D4ED8] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#1E40AF] transition-colors w-full"
                >
                  <Calendar className="w-4 h-4" />
                  Book Free Call
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-5">
                  <Mail className="w-6 h-6 text-[#374151]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-3">Send a Message</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                  Prefer to write us first? Fill out the form below and we'll get back to you within 24 hours with a thoughtful reply.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                    <a href="mailto:hello@sitemaxi.com" className="text-sm text-[#374151] hover:text-[#1D4ED8] transition-colors">
                      hello@sitemaxi.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                    <a href="tel:+18663446294" className="text-sm text-[#374151] hover:text-[#1D4ED8] transition-colors">
                      +1 (866) 344-6294
                    </a>
                  </div>
                </div>
                <a
                  href="#contact-form"
                  className="flex items-center justify-center gap-2 border-2 border-gray-200 text-[#374151] px-6 py-3 rounded-xl font-bold text-sm hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors w-full"
                >
                  Go to Contact Form
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </section>

      <div id="contact-form">
        <Contact />
      </div>
    </>
  );
}
