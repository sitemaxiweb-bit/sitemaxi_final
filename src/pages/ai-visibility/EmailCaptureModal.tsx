import { useState } from 'react';
import { X, Mail, Sparkles, Shield, ChevronRight, Loader2 } from 'lucide-react';

interface EmailCaptureModalProps {
  onSubmit: (email: string) => void;
  onClose: () => void;
  submitting: boolean;
}

export function EmailCaptureModal({ onSubmit, onClose, submitting }: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; agreed?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: { email?: string; agreed?: string } = {};
    if (!email.trim()) errs.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address';
    if (!agreed) errs.agreed = 'You must agree to receive your report';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(email.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={!submitting ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] p-8 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-blue-300" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Almost there!</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Enter your email to receive your full AI Visibility Report and personalized recommendations.
          </p>
        </div>

        <button
          onClick={!submitting ? onClose : undefined}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                placeholder="you@company.com"
                className={`w-full bg-gray-50 border text-[#111111] placeholder-gray-400 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-[#1D4ED8] focus:ring-blue-100'}`}
                disabled={submitting}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
          </div>

          <div>
            <label className={`flex items-start gap-3 cursor-pointer group ${submitting ? 'pointer-events-none opacity-60' : ''}`}>
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => { setAgreed(e.target.checked); setErrors(p => ({ ...p, agreed: '' })); }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${agreed ? 'bg-[#1D4ED8] border-[#1D4ED8]' : errors.agreed ? 'border-red-400' : 'border-gray-300 group-hover:border-[#1D4ED8]'}`}>
                  {agreed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-[#374151] leading-snug">
                I agree to receive my AI visibility report and accept the{' '}
                <a href="/terms-of-service" target="_blank" className="text-[#1D4ED8] hover:underline">terms and conditions</a>.
              </span>
            </label>
            {errors.agreed && <p className="text-red-500 text-xs mt-1.5 ml-8">{errors.agreed}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-blue-500/20"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Get My Visibility Report
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Shield className="w-3.5 h-3.5" />
            Your information is private and never shared.
          </div>
        </form>
      </div>
    </div>
  );
}
