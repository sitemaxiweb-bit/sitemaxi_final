import { useState, FormEvent } from 'react';
import { CheckCircle, AlertCircle, Send, ArrowRight, Clock, Users, TrendingUp } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Link } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  smsConsent: boolean;
}

interface SubmissionStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export function ApplyPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    smsConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({ type: null, message: '' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/submit-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          smsConsent: false,
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || "We're experiencing technical difficulties. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: "We're experiencing technical difficulties. Please try again or contact us at hello@sitemaxi.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Apply For A Growth Call — SiteMaxi | Canadian Digital Marketing Agency"
        description="Apply for a Growth Call with SiteMaxi. We'll review your business, identify your biggest growth opportunity, and show you exactly what we'd do to improve your results."
        keywords="apply for growth call, digital marketing consultation, SiteMaxi growth call, Canadian digital marketing agency"
      />

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left column — context */}
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1D4ED8] px-4 py-2 rounded-full mb-6">
                <span className="font-semibold text-sm uppercase tracking-wide">Growth Call Application</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
                Let's Find Your Biggest Growth Opportunity
              </h1>
              <p className="text-lg text-[#555555] mb-8 leading-relaxed">
                Apply below and one of our growth strategists will review your business before the call. We'll come prepared with specific observations — no generic pitch, no wasted time.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  {
                    icon: Clock,
                    title: "30-Minute Call",
                    desc: "Focused, no-fluff conversation about your growth opportunities."
                  },
                  {
                    icon: TrendingUp,
                    title: "We Come Prepared",
                    desc: "We review your online presence before the call so the conversation is specific to your business."
                  },
                  {
                    icon: Users,
                    title: "No Hard Sell",
                    desc: "If we're a good fit, we'll outline a plan. If not, we'll tell you honestly."
                  }
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111111] mb-0.5">{title}</p>
                      <p className="text-[#666666] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <p className="text-sm font-semibold text-[#111111] mb-3">Who is this call for?</p>
                <ul className="space-y-2">
                  {[
                    "Canadian businesses serious about online growth",
                    "Business owners who want qualified leads, not just traffic",
                    "Companies ready to invest in a real strategy",
                    "Anyone frustrated with their current marketing results",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#555555]">
                      <ArrowRight className="w-4 h-4 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column — form */}
            <div>
              {status.type === 'success' ? (
                <div className="bg-white border border-green-200 rounded-3xl p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#111111] mb-3">Application Received</h2>
                  <p className="text-[#666666] mb-8 leading-relaxed">
                    We'll review your information and reach out within one business day to schedule your Growth Call.
                  </p>
                  <Link
                    to="/"
                    className="inline-block bg-[#1D4ED8] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E40AF] transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111111] mb-1">Apply For A Growth Call</h2>
                    <p className="text-[#666666] text-sm">Fill out the form and we'll be in touch within one business day.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-[#111111] mb-2">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[#111111]"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-[#111111] mb-2">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[#111111]"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#111111] mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[#111111]"
                      placeholder="john@yourbusiness.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#111111] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[#111111]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-[#111111] mb-2">What are you looking to improve? *</label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[#111111]"
                      required
                    >
                      <option value="">Select a service...</option>
                      <option value="rankmaxi">RankMaxi — Local SEO & Google Maps</option>
                      <option value="searchmaxi">SearchMaxi — Organic SEO</option>
                      <option value="clickmaxi">ClickMaxi — Google Ads</option>
                      <option value="admaxi">AdMaxi — Social Ads</option>
                      <option value="socialmaxi">SocialMaxi — Social Media</option>
                      <option value="sitemaxi">SiteMaxi — Website Design</option>
                      <option value="multiple">Multiple Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#111111] mb-2">Tell us about your business *</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-[#111111]"
                      placeholder="What does your business do? What's your biggest challenge right now? What results are you looking for?"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <input
                      type="checkbox"
                      id="smsConsent"
                      checked={formData.smsConsent}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-[#1D4ED8] border-gray-300 rounded focus:ring-[#1D4ED8] focus:ring-2 cursor-pointer"
                      required
                    />
                    <label htmlFor="smsConsent" className="text-sm text-[#666666] leading-relaxed cursor-pointer">
                      By checking this box, I consent to receive SMS messages from SiteMaxi related to my inquiry and service updates. Message and data rates may apply. Reply STOP to opt out. I agree to the{' '}
                      <Link to="/terms-of-service" className="text-[#1D4ED8] hover:text-[#1E40AF] underline font-medium">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy-policy" className="text-[#1D4ED8] hover:text-[#1E40AF] underline font-medium">Privacy Policy</Link>.
                    </label>
                  </div>

                  {status.type === 'error' && (
                    <div className="p-4 rounded-lg flex items-center gap-3 bg-red-50 text-red-800 border border-red-200">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{status.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.smsConsent}
                    className={`w-full bg-[#1D4ED8] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1E40AF] transition-all duration-200 text-lg flex items-center justify-center gap-2 ${
                      isSubmitting || !formData.smsConsent ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-[#888888] text-center">
                    We'll get back to you within one business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
