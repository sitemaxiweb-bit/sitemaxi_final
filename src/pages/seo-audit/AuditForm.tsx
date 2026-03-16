import { useState, useEffect } from 'react';
import { Search, Globe, User, Mail, ArrowRight, CheckCircle, Zap, BarChart3, Shield, Lock } from 'lucide-react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface AuditFormProps {
  onSubmit: (websiteUrl: string, fullName: string, email: string, recaptchaToken: string) => void;
}

export function AuditForm({ onSubmit }: AuditFormProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

  useEffect(() => {
    if (!siteKey) return;
    const scriptId = 'recaptcha-v3-script';
    if (document.getElementById(scriptId)) return;
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, [siteKey]);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!websiteUrl.trim()) newErrors.websiteUrl = 'Website URL is required';
    else if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(websiteUrl.trim())) {
      newErrors.websiteUrl = 'Please enter a valid website URL';
    }
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      let token = '';
      if (siteKey) {
        token = await new Promise<string>((resolve) => {
          const attempt = () => {
            if (window.grecaptcha) {
              window.grecaptcha.ready(async () => {
                try {
                  const t = await window.grecaptcha.execute(siteKey, { action: 'submit_audit' });
                  resolve(t);
                } catch {
                  resolve('');
                }
              });
            } else {
              setTimeout(attempt, 300);
            }
          };
          attempt();
        });
      }
      onSubmit(websiteUrl.trim(), fullName.trim(), email.trim(), token);
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
      setSubmitting(false);
    }
  }

  const features = [
    { icon: <BarChart3 className="w-5 h-5" />, text: 'SEO Score out of 100' },
    { icon: <Zap className="w-5 h-5" />, text: 'Page speed analysis' },
    { icon: <Shield className="w-5 h-5" />, text: 'Technical SEO audit' },
    { icon: <Search className="w-5 h-5" />, text: 'AI-powered recommendations' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-wide bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2 w-fit">
                  <Zap className="w-4 h-4" />
                  Free AI-Powered Audit
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-[#111111] leading-tight mb-6">
                How Well Does
                <span className="block text-[#1D4ED8]">Google See</span>
                Your Website?
              </h1>
              <p className="text-xl text-[#666666] mb-10 leading-relaxed">
                Get a comprehensive SEO report in under 60 seconds. Our AI analyzes your site and delivers actionable insights to rank higher and get more customers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#444444]">
                    <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#1D4ED8] flex-shrink-0">
                      {f.icon}
                    </div>
                    <span className="text-sm font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-[#999999]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1D4ED8]" />
                  No credit card needed
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1D4ED8]" />
                  Instant results
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1D4ED8]" />
                  100% free
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-[#111111] mb-2">Run Your Free Audit</h2>
                <p className="text-[#666666] text-sm mb-8">Enter your details below to get your personalized report</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Website URL
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={websiteUrl}
                        onChange={e => { setWebsiteUrl(e.target.value); setErrors(p => ({ ...p, websiteUrl: '' })); }}
                        placeholder="https://yourwebsite.com"
                        className={`w-full bg-gray-50 border ${errors.websiteUrl ? 'border-red-400' : 'border-gray-200'} text-[#111111] placeholder-gray-400 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition-all`}
                      />
                    </div>
                    {errors.websiteUrl && <p className="text-red-500 text-xs mt-1.5">{errors.websiteUrl}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={e => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: '' })); }}
                        placeholder="Your Full Name"
                        className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-400' : 'border-gray-200'} text-[#111111] placeholder-gray-400 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition-all`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Email Address
                      <span className="text-gray-400 font-normal ml-1">(your report will be sent here)</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                        placeholder="you@company.com"
                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-200'} text-[#111111] placeholder-gray-400 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition-all`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                  </div>

                  {errors.general && <p className="text-red-500 text-xs text-center">{errors.general}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    <Search className="w-5 h-5" />
                    {submitting ? 'Verifying...' : 'Run Free Audit'}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1">
                    <p className="text-center text-xs text-gray-400">
                      By submitting, you agree to receive your audit report via email.
                    </p>
                    {siteKey && (
                      <div className="flex items-center gap-1 text-gray-400 text-xs flex-shrink-0">
                        <Lock className="w-3 h-3" />
                        <span>reCAPTCHA protected</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
