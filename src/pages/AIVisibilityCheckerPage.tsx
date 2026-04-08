import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { VisibilityForm } from './ai-visibility/VisibilityForm';
import { EmailCaptureModal } from './ai-visibility/EmailCaptureModal';
import { VisibilityLoading } from './ai-visibility/VisibilityLoading';
import { VisibilityResults } from './ai-visibility/VisibilityResults';
import type { VisibilityReportData } from './ai-visibility/types';

type PageState = 'form' | 'loading' | 'results';

interface FormData {
  brandName: string;
  websiteUrl: string;
  primaryService: string;
  city: string;
  targetKeywords: string[];
}

export function AIVisibilityCheckerPage() {
  const [pageState, setPageState] = useState<PageState>('form');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [report, setReport] = useState<VisibilityReportData | null>(null);
  const [error, setError] = useState('');

  function handleFormSubmit(data: FormData) {
    setFormData(data);
    setShowEmailModal(true);
    setError('');
  }

  async function handleEmailSubmit(email: string) {
    if (!formData) return;
    setSubmitting(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      setShowEmailModal(false);
      setPageState('loading');

      const response = await fetch(`${supabaseUrl}/functions/v1/run-visibility-check`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, email }),
      });

      const data = await response.json();

      if (!response.ok || !data.report) {
        throw new Error(data.error || 'Visibility check failed');
      }

      setReport(data.report);
      setPageState('results');
    } catch (err) {
      console.error(err);
      setPageState('form');
      setShowEmailModal(false);
      setError('Something went wrong running the visibility check. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleRunAnother() {
    setPageState('form');
    setFormData(null);
    setReport(null);
    setError('');
  }

  return (
    <>
      <SEOHead
        title="AI Brand Visibility Checker — See How You Appear in ChatGPT, Gemini & Claude | SiteMaxi"
        description="Check how visible your brand is across AI platforms like ChatGPT, Gemini, and Claude. Get your free AI visibility score and actionable recommendations to improve."
        keywords="AI brand visibility, ChatGPT visibility, Gemini brand search, Claude AI mentions, AI search optimization, brand visibility checker"
      />
      <div className="min-h-screen">
        {pageState === 'form' && (
          <>
            <VisibilityForm onSubmit={handleFormSubmit} />
            {error && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-xl z-50">
                {error}
              </div>
            )}
          </>
        )}

        {showEmailModal && (
          <EmailCaptureModal
            onSubmit={handleEmailSubmit}
            onClose={() => setShowEmailModal(false)}
            submitting={submitting}
          />
        )}

        {pageState === 'loading' && (
          <VisibilityLoading brandName={formData?.brandName ?? ''} />
        )}

        {pageState === 'results' && report && (
          <VisibilityResults report={report} onRunAnother={handleRunAnother} />
        )}
      </div>
    </>
  );
}
