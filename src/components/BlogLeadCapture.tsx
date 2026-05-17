import { Link } from 'react-router-dom';
import { Search, ArrowRight, Zap } from 'lucide-react';

export function BlogLeadCapture() {
  return (
    <div className="my-10 bg-gradient-to-br from-[#F0F9FF] to-white rounded-2xl border border-blue-100 p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
          <Zap className="w-6 h-6 text-[#1D4ED8]" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#111111] mb-2">
            See how your website is performing
          </h3>
          <p className="text-[#6B7280] mb-5 leading-relaxed">
            Get a free AI-powered audit of your website's SEO, speed, and marketing effectiveness. Takes 60 seconds, completely free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/free-seo-audit"
              className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#1E40AF] transition-colors text-sm"
            >
              <Search className="w-4 h-4" />
              Run Free Audit
            </Link>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 border border-gray-200 text-[#374151] px-5 py-3 rounded-xl font-semibold hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors text-sm"
            >
              Apply For A Growth Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
