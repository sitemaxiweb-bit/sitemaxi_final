import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Zap } from 'lucide-react';

export function StickyAuditCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed && window.scrollY > 400) {
        setVisible(true);
      } else if (window.scrollY <= 400) {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-full max-w-sm px-4 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-[#0F172A] text-white rounded-2xl shadow-2xl shadow-black/30 px-5 py-4 flex items-center gap-4 border border-white/10">
        <div className="w-9 h-9 bg-[#1D4ED8] rounded-xl flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-medium">Free for a limited time</p>
          <p className="text-sm font-bold leading-tight truncate">AI Marketing Audit</p>
        </div>
        <Link
          to="/free-seo-audit"
          className="flex-shrink-0 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5" />
          Run Free Audit
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
