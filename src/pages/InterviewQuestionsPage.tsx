import { useEffect } from 'react';

export function InterviewQuestionsPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://web.sitemaxi.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-center">
        <img
          src="/SiteMaxi Professional Websites.png"
          alt="SiteMaxi"
          className="h-9 md:h-10 w-auto"
        />
      </header>

      {/* Survey */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#111111] mb-2">
            Team Application
          </h1>
          <p className="text-[#6B7280] text-sm md:text-base">
            Please complete the pre-qualification questionnaire below.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <iframe
            src="https://web.sitemaxi.com/widget/survey/F5JgFbcqX4syAWydAVoN"
            style={{ border: 'none', width: '100%', minHeight: '800px' }}
            scrolling="no"
            id="F5JgFbcqX4syAWydAVoN"
            title="survey"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#9CA3AF] border-t border-gray-100 bg-white">
        &copy; {new Date().getFullYear()} SiteMaxi. All rights reserved.
      </footer>
    </div>
  );
}
