import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Search, Calendar, ChevronRight } from 'lucide-react';

export function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 w-72 overflow-hidden animate-in">
          <div className="bg-[#1D4ED8] px-5 py-4">
            <p className="text-white font-bold">How can we help?</p>
            <p className="text-blue-200 text-sm">Choose an option below</p>
          </div>
          <div className="p-3 space-y-2">
            <Link
              to="/free-seo-audit"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#111111] text-sm">Free AI Audit</p>
                <p className="text-[#9CA3AF] text-xs">Scan your website now</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#1D4ED8] transition-colors" />
            </Link>
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-green-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-[#D1FAE5] rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#059669]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#111111] text-sm">Apply For A Growth Call</p>
                <p className="text-[#9CA3AF] text-xs">Free 30-minute consultation</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#059669] transition-colors" />
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-[#6B7280]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#111111] text-sm">Send a Message</p>
                <p className="text-[#9CA3AF] text-xs">We reply within 24 hours</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#374151] transition-colors" />
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-gray-700 rotate-0' : 'bg-[#1D4ED8] hover:bg-[#1E40AF]'
        }`}
        aria-label="Contact options"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>
    </div>
  );
}
