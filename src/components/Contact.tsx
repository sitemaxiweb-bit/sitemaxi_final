import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface SubmissionStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({ type: null, message: '' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
        setStatus({
          type: 'success',
          message: data.message,
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || "We're experiencing technical difficulties. Your message has been saved and we'll contact you shortly",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: "We're experiencing technical difficulties. Please try again or contact us directly at hello@sitemaxi.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-[#8B5CF6] font-bold text-sm tracking-wide uppercase">
              Get in Touch
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Let's start growing your business
          </h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            Ready to take your digital marketing to the next level? Get in touch and let's discuss how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold text-[#111111] mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#111111] mb-1">Email</div>
                    <a href="mailto:hello@sitemaxi.com" className="text-[#666666] hover:text-[#8B5CF6] transition-colors">
                      hello@sitemaxi.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#111111] mb-1">Phone</div>
                    <a href="tel:+15551234567" className="text-[#666666] hover:text-[#8B5CF6] transition-colors">
                      (866) 498-0952
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#111111] mb-1">Office</div>
                    <p className="text-[#666666]">
                      7398 Yonge St 6d Unit 619<br />
                      Vaughan, ON ,CA L4J 2J2
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6] p-8 rounded-3xl text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Free Strategy Session</h3>
              <p className="mb-6 leading-relaxed">
                Book a 30-minute consultation to discover how we can help grow your business.
              </p>
              <button className="bg-white text-[#8B5CF6] px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg w-full">
                Schedule a Call
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl border border-gray-200 shadow-lg space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[#111111] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-20 outline-none transition-all"
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-[#111111] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-20 outline-none transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#111111] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-20 outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#111111] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-20 outline-none transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-[#111111] mb-2">
                  Service Interested In *
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-20 outline-none transition-all"
                  required
                >
                  <option value="">Select a service...</option>
                  <option value="rankmaxi">RankMaxi - Local SEO</option>
                  <option value="searchmaxi">SearchMaxi - SEO</option>
                  <option value="socialmaxi">SocialMaxi - Social Media</option>
                  <option value="admaxi">AdMaxi - Social Ads</option>
                  <option value="clickmaxi">ClickMaxi - Google Ads</option>
                  <option value="sitemaxi">SiteMaxi - Web Design</option>
                  <option value="multiple">Multiple Services</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#111111] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-20 outline-none transition-all resize-none"
                  placeholder="Tell us about your business and what you're looking to achieve..."
                  required
                ></textarea>
              </div>

              {status.type && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] hover:scale-105 transition-all duration-300 text-lg shadow-lg flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {!status.type && (
                <p className="text-sm text-[#666666] text-center">
                  We'll get back to you within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
