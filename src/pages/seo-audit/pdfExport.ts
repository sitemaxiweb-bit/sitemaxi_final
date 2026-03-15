import type { AuditReportData } from './types';

function scoreColor(score: number) {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#ca8a04';
  if (score >= 40) return '#ea580c';
  return '#dc2626';
}

function scoreLabel(score: number) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs Work';
  return 'Poor';
}

function priorityColor(p: string) {
  if (p === 'high') return '#dc2626';
  if (p === 'medium') return '#ca8a04';
  return '#16a34a';
}

function issueColor(type: string) {
  if (type === 'error') return '#dc2626';
  if (type === 'warning') return '#ca8a04';
  return '#2563eb';
}

function issueBg(type: string) {
  if (type === 'error') return '#fef2f2';
  if (type === 'warning') return '#fffbeb';
  return '#eff6ff';
}

function checkIcon(status: string) {
  if (status === 'good' || status === true) return '✔';
  if (status === 'warning') return '⚠';
  return '✘';
}

function checkColor(status: string | boolean) {
  if (status === 'good' || status === true) return '#16a34a';
  if (status === 'warning') return '#ca8a04';
  return '#dc2626';
}

export function downloadAuditPDF(report: AuditReportData, businessName: string) {
  const color = scoreColor(report.seoScore);
  const label = scoreLabel(report.seoScore);
  const auditDate = new Date(report.auditDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const technicalRows = [
    { label: 'Title Tag', status: report.technicalSEO.titleTag.status, detail: report.technicalSEO.titleTag.present ? `${report.technicalSEO.titleTag.length} chars` : 'Missing' },
    { label: 'Meta Description', status: report.technicalSEO.metaDescription.status, detail: report.technicalSEO.metaDescription.present ? `${report.technicalSEO.metaDescription.length} chars` : 'Missing' },
    { label: 'H1 Tag', status: report.technicalSEO.h1Tag.status, detail: report.technicalSEO.h1Tag.present ? `${report.technicalSEO.h1Tag.count} found` : 'Missing' },
    { label: 'HTTPS / SSL', status: report.technicalSEO.httpsEnabled ? 'good' : 'error', detail: report.technicalSEO.httpsEnabled ? 'Enabled' : 'Not enabled' },
    { label: 'Canonical Tag', status: report.technicalSEO.canonicalTag ? 'good' : 'warning', detail: report.technicalSEO.canonicalTag ? 'Present' : 'Missing' },
    { label: 'Viewport Meta', status: report.technicalSEO.viewportMeta ? 'good' : 'error', detail: report.technicalSEO.viewportMeta ? 'Present' : 'Missing' },
  ];

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>SEO Audit Report – ${businessName}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #111; background: #fff; }
  .page { max-width: 800px; margin: 0 auto; padding: 32px; }
  .header { background: #0f172a; color: white; padding: 28px 32px; border-radius: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
  .header h1 { font-size: 22px; font-weight: 800; }
  .header .meta { font-size: 11px; color: #94a3b8; margin-top: 4px; }
  .score-pill { background: ${color}; color: white; padding: 10px 20px; border-radius: 50px; text-align: center; }
  .score-pill .num { font-size: 36px; font-weight: 900; line-height: 1; }
  .score-pill .lbl { font-size: 11px; opacity: 0.9; margin-top: 2px; }
  .stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 24px; }
  .stat-card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; text-align: center; }
  .stat-card .count { font-size: 32px; font-weight: 900; }
  .stat-card .name { font-size: 11px; color: #6b7280; margin-top: 2px; }
  .section { margin-bottom: 24px; }
  .section-title { font-size: 15px; font-weight: 800; color: #111; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 14px; }
  .ai-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 18px; margin-bottom: 24px; }
  .ai-box p { line-height: 1.7; color: #1e3a5f; font-size: 12.5px; }
  table { width: 100%; border-collapse: collapse; }
  td, th { padding: 8px 10px; text-align: left; font-size: 12px; }
  th { background: #f8fafc; font-weight: 700; color: #374151; border-bottom: 1px solid #e5e7eb; }
  tr:not(:last-child) td { border-bottom: 1px solid #f1f5f9; }
  .issue { border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; border-left: 4px solid; }
  .rec { border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; border-left: 4px solid #16a34a; background: #f0fdf4; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 50px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
  .speed-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
  .speed-card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; text-align: center; }
  .speed-num { font-size: 28px; font-weight: 900; }
  .cta { background: #1d4ed8; color: white; border-radius: 10px; padding: 20px 24px; margin-top: 28px; text-align: center; }
  .cta h3 { font-size: 17px; font-weight: 800; }
  .cta p { font-size: 12px; opacity: 0.85; margin-top: 6px; }
  .footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 28px; padding-top: 16px; border-top: 1px solid #e5e7eb; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { padding: 20px; }
    .no-print { display: none; }
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div>
      <h1>SEO Audit Report</h1>
      <div class="meta">${report.auditedUrl} · ${auditDate}</div>
      <div class="meta" style="margin-top:6px; color:#60a5fa;">Generated by SiteMaxi AI Marketing Audit</div>
    </div>
    <div class="score-pill">
      <div class="num">${report.seoScore}</div>
      <div class="lbl">${label}</div>
    </div>
  </div>

  <div class="stats">
    <div class="stat-card">
      <div class="count" style="color:#dc2626;">${report.onPageIssues.filter(i => i.type === 'error').length}</div>
      <div class="name">Critical Issues</div>
    </div>
    <div class="stat-card">
      <div class="count" style="color:#ca8a04;">${report.onPageIssues.filter(i => i.type === 'warning').length}</div>
      <div class="name">Warnings</div>
    </div>
    <div class="stat-card">
      <div class="count" style="color:#2563eb;">${report.onPageIssues.filter(i => i.type === 'info').length}</div>
      <div class="name">Opportunities</div>
    </div>
  </div>

  ${report.aiInsights ? `
  <div class="ai-box">
    <div style="font-weight:800; color:#1e3a5f; margin-bottom:8px; font-size:13px;">AI-Powered Insights for ${businessName}</div>
    <p>${report.aiInsights.replace(/\n/g, '<br/>')}</p>
  </div>` : ''}

  <div class="section">
    <div class="section-title">Technical SEO</div>
    <table>
      <thead><tr><th>Check</th><th>Status</th><th>Detail</th></tr></thead>
      <tbody>
        ${technicalRows.map(r => `
        <tr>
          <td><strong>${r.label}</strong></td>
          <td style="color:${checkColor(r.status)}; font-weight:700;">${checkIcon(r.status)} ${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</td>
          <td style="color:#6b7280;">${r.detail}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Page Speed</div>
    <div class="speed-grid">
      <div class="speed-card">
        <div class="speed-num" style="color:${scoreColor(report.pageSpeed.mobileScore)};">${report.pageSpeed.mobileScore}</div>
        <div style="font-size:11px; color:#6b7280; margin-top:4px;">Mobile Score / 100</div>
      </div>
      <div class="speed-card">
        <div class="speed-num" style="color:${scoreColor(report.pageSpeed.desktopScore)};">${report.pageSpeed.desktopScore}</div>
        <div style="font-size:11px; color:#6b7280; margin-top:4px;">Desktop Score / 100</div>
      </div>
    </div>
    <table>
      <thead><tr><th>Metric</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>LCP (Largest Contentful Paint)</td><td>${report.pageSpeed.lcp}</td></tr>
        <tr><td>FCP (First Contentful Paint)</td><td>${report.pageSpeed.fcp}</td></tr>
        <tr><td>CLS (Cumulative Layout Shift)</td><td>${report.pageSpeed.cls}</td></tr>
        <tr><td>Mobile Friendly</td><td style="color:${report.mobileFriendly ? '#16a34a' : '#dc2626'}; font-weight:700;">${report.mobileFriendly ? '✔ Yes' : '✘ No'}</td></tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Issues Found (${report.onPageIssues.length})</div>
    ${report.onPageIssues.map(issue => `
    <div class="issue" style="background:${issueBg(issue.type)}; border-color:${issueColor(issue.type)};">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span class="badge" style="background:${issueColor(issue.type)}; color:white;">${issue.type}</span>
        <strong style="font-size:13px;">${issue.title}</strong>
      </div>
      <div style="color:#374151; font-size:12px; line-height:1.5;">${issue.description}</div>
    </div>`).join('')}
  </div>

  <div class="section">
    <div class="section-title">Recommendations (${report.recommendations.length})</div>
    ${report.recommendations.map(rec => `
    <div class="rec" style="border-color:${priorityColor(rec.priority)};">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span class="badge" style="background:${priorityColor(rec.priority)}; color:white;">${rec.priority} priority</span>
        <strong style="font-size:13px;">${rec.title}</strong>
      </div>
      <div style="color:#374151; font-size:12px; line-height:1.5;">${rec.description}</div>
    </div>`).join('')}
  </div>

  <div class="cta">
    <h3>Ready to Fix These Issues?</h3>
    <p>Book a free consultation at sitemaxi.com/contact — our SEO team will build a custom plan.</p>
    <div style="margin-top:12px; font-size:13px; font-weight:700; color:#bfdbfe;">sitemaxi.com</div>
  </div>

  <div class="footer">
    <p>This report was generated by SiteMaxi AI Marketing Audit · sitemaxi.com</p>
    <p style="margin-top:4px;">Audited on ${auditDate}</p>
  </div>

</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) {
    win.addEventListener('load', () => {
      win.print();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    });
  }
}
