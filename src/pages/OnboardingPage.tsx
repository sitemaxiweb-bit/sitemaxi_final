import { useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function OnboardingPage() {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://clienthub.heffl.com/embed.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://clienthub.heffl.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
      <SEOHead
        title="Client Onboarding Questionnaire - SiteMaxi"
        description="Complete your client onboarding questionnaire to help us tailor our services to your business needs."
      />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <ClipboardList className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Client Onboarding Questionnaire</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Welcome! Please take a few minutes to complete this questionnaire so our team can better understand your business and goals.
            </p>
          </div>

          <div className="p-8">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 text-center">
              <p className="text-blue-800 text-sm">
                Your responses help us personalize your experience and hit the ground running. All information is kept strictly confidential.
              </p>
            </div>

            <div
              data-heffl-embed
              data-form="frm_YFjCyaZLV2LryrZE"
              data-width="100%"
              data-height="700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
