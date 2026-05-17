import { Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle } from 'lucide-react';
import { ScrollAnimateWrapper } from './ScrollAnimateWrapper';

interface AuditCTABlockProps {
  variant?: 'dark' | 'light' | 'blue';
  heading?: string;
  subheading?: string;
}

export function AuditCTABlock({
  variant = 'dark',
  heading = 'Ready to see what\'s holding your marketing back?',
  subheading = 'Get a free AI-powered audit of your website and marketing. No commitments, no sales pitch — just clear insights.',
}: AuditCTABlockProps) {
  const isDark = variant === 'dark';
  const isBlue = variant === 'blue';

  const bgClass = isDark
    ? 'bg-[#0F172A]'
    : isBlue
    ? 'bg-gradient-to-br from-[#1D4ED8] to-[#1E3A8A]'
    : 'bg-[#F0F9FF] border border-blue-100';

  const headingClass = isDark || isBlue ? 'text-white' : 'text-[#111111]';
  const subheadingClass = isDark ? 'text-gray-400' : isBlue ? 'text-blue-100' : 'text-[#6B7280]';

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimateWrapper animation="fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${headingClass}`}>
              {heading}
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${subheadingClass}`}>
              {subheading}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Link
                to="/free-seo-audit"
                className="bg-white text-[#1D4ED8] px-7 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Search className="w-5 h-5" />
                Get Free AI Marketing Audit
              </Link>
              <Link
                to="/apply"
                className={`px-7 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                  isDark || isBlue
                    ? 'border-2 border-white/20 text-white hover:border-white/40'
                    : 'border-2 border-gray-200 text-[#374151] hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                }`}
              >
                Apply For A Growth Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {['Free, no credit card needed', 'Results in minutes', 'Actionable recommendations'].map((item) => (
                <div key={item} className={`flex items-center gap-2 text-sm ${isDark || isBlue ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                  <CheckCircle className={`w-4 h-4 ${isDark || isBlue ? 'text-blue-400' : 'text-[#059669]'}`} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </section>
  );
}
