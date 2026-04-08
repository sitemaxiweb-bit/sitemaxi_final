import { useState } from 'react';
import { Building2, Globe, Briefcase, MapPin, Plus, X, Sparkles, ChevronRight } from 'lucide-react';

interface VisibilityFormProps {
  onSubmit: (data: {
    brandName: string;
    websiteUrl: string;
    primaryService: string;
    city: string;
    targetKeywords: string[];
  }) => void;
}

const EXAMPLE_PHRASES = [
  'Best {service} in {city}',
  'Top {service} companies near me',
  'Who offers {service} in {city}',
  'Recommended {service} providers',
];

export function VisibilityForm({ onSubmit }: VisibilityFormProps) {
  const [brandName, setBrandName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [primaryService, setPrimaryService] = useState('');
  const [city, setCity] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function resolvePhrase(phrase: string) {
    return phrase
      .replace('{service}', primaryService || 'your service')
      .replace('{city}', city || 'your city');
  }

  function addKeyword(value: string) {
    const trimmed = value.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords(prev => [...prev, trimmed]);
    }
    setKeywordInput('');
  }

  function removeKeyword(kw: string) {
    setKeywords(prev => prev.filter(k => k !== kw));
  }

  function handleKeywordKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword(keywordInput);
    }
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!brandName.trim()) errs.brandName = 'Brand name is required';
    if (!websiteUrl.trim()) errs.websiteUrl = 'Website URL is required';
    else if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(websiteUrl.trim())) {
      errs.websiteUrl = 'Please enter a valid website URL';
    }
    if (!primaryService.trim()) errs.primaryService = 'Primary service is required';
    if (!city.trim()) errs.city = 'City / Location is required';
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ brandName: brandName.trim(), websiteUrl: websiteUrl.trim(), primaryService: primaryService.trim(), city: city.trim(), targetKeywords: keywords });
  }

  const inputBase = 'w-full bg-gray-50 border text-[#111111] placeholder-gray-400 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 transition-all text-sm';
  const inputNormal = `${inputBase} border-gray-200 focus:border-[#1D4ED8] focus:ring-blue-100`;
  const inputError = `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-100`;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-24 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#1D4ED8]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1D4ED8]/20 border border-[#1D4ED8]/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI Brand Visibility Checker
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
            Check Your Brand<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Visibility in AI Search</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            See how your business appears across AI platforms like ChatGPT, Gemini, and Claude — and get actionable steps to improve.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            {['ChatGPT', 'Gemini', 'Claude'].map(p => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative -mt-8 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1D4ED8] to-[#0891B2] p-6">
              <h2 className="text-white font-bold text-lg">Your Business Details</h2>
              <p className="text-blue-100 text-sm mt-0.5">We'll check your brand across all major AI platforms</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">Brand Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={brandName}
                      onChange={e => { setBrandName(e.target.value); setErrors(p => ({ ...p, brandName: '' })); }}
                      placeholder="Acme Services Inc."
                      className={errors.brandName ? inputError : inputNormal}
                    />
                  </div>
                  {errors.brandName && <p className="text-red-500 text-xs mt-1.5">{errors.brandName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">Website URL <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={e => { setWebsiteUrl(e.target.value); setErrors(p => ({ ...p, websiteUrl: '' })); }}
                      placeholder="https://yourwebsite.com"
                      className={errors.websiteUrl ? inputError : inputNormal}
                    />
                  </div>
                  {errors.websiteUrl && <p className="text-red-500 text-xs mt-1.5">{errors.websiteUrl}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">Primary Service <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={primaryService}
                      onChange={e => { setPrimaryService(e.target.value); setErrors(p => ({ ...p, primaryService: '' })); }}
                      placeholder="e.g. Plumbing, Dentistry, Law"
                      className={errors.primaryService ? inputError : inputNormal}
                    />
                  </div>
                  {errors.primaryService && <p className="text-red-500 text-xs mt-1.5">{errors.primaryService}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-2">City / Location <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={city}
                      onChange={e => { setCity(e.target.value); setErrors(p => ({ ...p, city: '' })); }}
                      placeholder="e.g. Vancouver, BC"
                      className={errors.city ? inputError : inputNormal}
                    />
                  </div>
                  {errors.city && <p className="text-red-500 text-xs mt-1.5">{errors.city}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-2">
                  Target Keywords <span className="text-gray-400 font-normal text-xs ml-1">(optional — press Enter to add)</span>
                </label>
                <div className={`bg-gray-50 border rounded-xl p-3 transition-all focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-blue-100 ${keywords.length > 0 ? 'border-gray-300' : 'border-gray-200'}`}>
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {keywords.map(kw => (
                        <span key={kw} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium px-2.5 py-1 rounded-full">
                          {kw}
                          <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-blue-900 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={e => setKeywordInput(e.target.value)}
                      onKeyDown={handleKeywordKeyDown}
                      placeholder="Type a keyword and press Enter..."
                      className="flex-1 bg-transparent outline-none text-sm text-[#111111] placeholder-gray-400"
                    />
                    {keywordInput && (
                      <button type="button" onClick={() => addKeyword(keywordInput)} className="text-[#1D4ED8] hover:text-[#1E40AF] transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Click to add example phrases:</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PHRASES.map(phrase => {
                      const resolved = resolvePhrase(phrase);
                      return (
                        <button
                          key={phrase}
                          type="button"
                          onClick={() => addKeyword(resolved)}
                          className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-all"
                        >
                          {resolved}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 mt-2"
              >
                <Sparkles className="w-5 h-5" />
                Run Visibility Check
                <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-center text-xs text-gray-400">
                Results are estimated insights based on AI platform behavior patterns, not exact rankings.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
