import { useState } from 'react';
import { Search, Globe, Building2, Mail, ArrowRight, CheckCircle, Zap, BarChart3, Shield } from 'lucide-react';

interface AuditFormProps {
  onSubmit: (websiteUrl: string, businessName: string, email: string) => void;
}

export function AuditForm({ onSubmit }: AuditFormProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!websiteUrl.trim()) newErrors.websiteUrl = 'Website URL is required';
    else if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(websiteUrl.trim())) {
      newErrors.websiteUrl = 'Please enter a valid website URL';
    }
    if (!businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(websiteUrl.trim(), businessName.trim(), email.trim());
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
                      Business Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={businessName}
                        onChange={e => { setBusinessName(e.target.value); setErrors(p => ({ ...p, businessName: '' })); }}
                        placeholder="Your Business Name"
                        className={`w-full bg-gray-50 border ${errors.businessName ? 'border-red-400' : 'border-gray-200'} text-[#111111] placeholder-gray-400 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition-all`}
                      />
                    </div>
                    {errors.businessName && <p className="text-red-500 text-xs mt-1.5">{errors.businessName}</p>}
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

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 mt-2"
                  >
                    <Search className="w-5 h-5" />
                    Run Free Audit
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-center text-xs text-gray-400 pt-1">
                    By submitting, you agree to receive your audit report via email.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
