export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

export interface AuditReportData {
  seoScore: number;
  technicalSEO: {
    titleTag: { present: boolean; content: string; length: number; status: 'good' | 'warning' | 'error' };
    metaDescription: { present: boolean; content: string; length: number; status: 'good' | 'warning' | 'error' };
    h1Tag: { present: boolean; count: number; status: 'good' | 'warning' | 'error' };
    httpsEnabled: boolean;
    canonicalTag: boolean;
    viewportMeta: boolean;
  };
  pageSpeed: {
    mobileScore: number;
    desktopScore: number;
    lcp: string;
    fcp: string;
    cls: string;
    status: 'good' | 'warning' | 'error';
  };
  mobileFriendly: boolean;
  onPageIssues: SEOIssue[];
  recommendations: Recommendation[];
  aiInsights: string;
  auditedUrl: string;
  auditDate: string;
}
