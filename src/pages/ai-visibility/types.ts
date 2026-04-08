export interface SourceCitation {
  title: string;
  url: string;
}

export interface PlatformResult {
  platform: 'Gemini' | 'Claude';
  mentioned: boolean;
  visibilityScore: number;
  responseSnippet: string;
  competitorsMentioned: string[];
  promptsChecked: number;
  mentionRate: number;
  websiteFound: boolean;
  sources: SourceCitation[];
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
