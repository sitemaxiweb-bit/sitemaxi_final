export interface PlatformResult {
  platform: 'ChatGPT' | 'Gemini' | 'Claude';
  mentioned: boolean;
  visibilityScore: number;
  responseSnippet: string;
  competitorsMentioned: string[];
}

export interface VisibilityReportData {
  overallScore: number;
  platforms: PlatformResult[];
  brandSummary: string;
  competitorMentions: string[];
  strengths: string[];
  gaps: string[];
  contentRecommendations: string[];
  seoSuggestions: string[];
  visibilityTips: string[];
  checkedAt: string;
  brandName: string;
  city: string;
  primaryService: string;
  websiteUrl: string;
}
