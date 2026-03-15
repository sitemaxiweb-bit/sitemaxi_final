import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AuditForm } from './seo-audit/AuditForm';
import { AuditLoading } from './seo-audit/AuditLoading';
import { AuditReport } from './seo-audit/AuditReport';
import type { AuditReportData } from './seo-audit/types';

type PageState = 'form' | 'loading' | 'results';

export function FreeSEOAuditPage() {
  const [pageState, setPageState] = useState<PageState>('form');
  const [report, setReport] = useState<AuditReportData | null>(null);
  const [leadId, setLeadId] = useState<string>('');
  const [userEmail, setUserEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  async function handleSubmit(url: string, name: string, email: string, recaptchaToken: string) {
    setFullName(name);
    setUserEmail(email);
    setWebsiteUrl(url);
    setPageState('loading');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/run-seo-audit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteUrl: url, fullName: name, email, recaptchaToken }),
      });

      const data = await response.json();

      if (!response.ok || !data.report) {
        throw new Error(data.error || 'Audit failed');
      }

      setReport(data.report);
      setLeadId(data.leadId || '');
      setPageState('results');
    } catch (err) {
      console.error(err);
      setPageState('form');
      alert('Something went wrong running the audit. Please try again.');
    }
  }

  async function handleEmailReport() {
    if (!report || !userEmail || !leadId) return;

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(`${supabaseUrl}/functions/v1/run-seo-audit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOnly: true,
          leadId,
          fullName,
          email: userEmail,
        }),
      });
    } catch (err) {
      console.error('Email send failed:', err);
    }
  }

  return (
    <>
      <SEOHead
        title="Free AI Marketing Audit | SiteMaxi"
        description="Get a free AI-powered SEO audit for your website in seconds. Discover your SEO score, page speed, and actionable recommendations."
        canonical="https://sitemaxi.com/free-seo-audit"
      />
      <div className="min-h-screen bg-white">
        {pageState === 'form' && <AuditForm onSubmit={handleSubmit} />}
        {pageState === 'loading' && <AuditLoading websiteUrl={websiteUrl} />}
        {pageState === 'results' && report && (
          <AuditReport
            report={report}
            businessName={fullName}
            email={userEmail}
            leadId={leadId}
            onEmailReport={handleEmailReport}
            onRunAnother={() => setPageState('form')}
          />
        )}
      </div>
    </>
  );
}
