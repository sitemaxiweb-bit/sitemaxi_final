import { supabase } from './supabase';

export type KeywordStatus =
  | 'new'
  | 'queued'
  | 'outline_ready'
  | 'draft_ready'
  | 'review_needed'
  | 'approved'
  | 'published';

export type BusinessType = 'local' | 'ecommerce' | 'both';
export type SearchIntent = 'informational' | 'commercial' | 'navigational' | 'transactional';
export type ClusterType = 'pillar' | 'supporting';
export type IntentType = 'informational' | 'commercial' | 'mixed';

export interface Keyword {
  id: string;
  keyword: string;
  category: string;
  target_audience: string;
  search_intent: SearchIntent;
  service_relevance: string[];
  industry_relevance: string[];
  location_relevance: string[];
  priority_score: number;
  status: KeywordStatus;
  notes: string;
  assigned_article_title: string;
  cluster_id: string | null;
  business_type: BusinessType;
  monthly_search_volume: number | null;
  keyword_difficulty: number | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface KeywordCluster {
  id: string;
  name: string;
  main_keyword: string;
  supporting_keywords: string[];
  service_association: string[];
  industry_association: string[];
  location_association: string[];
  cluster_type: ClusterType;
  title_ideas: string[];
  content_angle_ideas: string[];
  intent_type: IntentType;
  suggested_cta_type: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export async function getKeywords(filters?: {
  status?: string;
  category?: string;
  business_type?: string;
  search?: string;
}) {
  let query = supabase
    .from('keywords')
    .select('*')
    .order('priority_score', { ascending: false })
    .order('created_at', { ascending: false });

  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.business_type) query = query.eq('business_type', filters.business_type);
  if (filters?.search) query = query.ilike('keyword', `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data as Keyword[];
}

export async function getKeywordById(id: string) {
  const { data, error } = await supabase
    .from('keywords')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as Keyword | null;
}

export async function createKeyword(kw: Partial<Keyword>) {
  const { data, error } = await supabase
    .from('keywords')
    .insert([kw])
    .select()
    .single();
  if (error) throw error;
  return data as Keyword;
}

export async function updateKeyword(id: string, updates: Partial<Keyword>) {
  const { data, error } = await supabase
    .from('keywords')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Keyword;
}

export async function deleteKeyword(id: string) {
  const { error } = await supabase.from('keywords').delete().eq('id', id);
  if (error) throw error;
}

export async function getClusters() {
  const { data, error } = await supabase
    .from('keyword_clusters')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as KeywordCluster[];
}

export async function getClusterById(id: string) {
  const { data, error } = await supabase
    .from('keyword_clusters')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as KeywordCluster | null;
}

export async function createCluster(cluster: Partial<KeywordCluster>) {
  const { data, error } = await supabase
    .from('keyword_clusters')
    .insert([cluster])
    .select()
    .single();
  if (error) throw error;
  return data as KeywordCluster;
}

export async function updateCluster(id: string, updates: Partial<KeywordCluster>) {
  const { data, error } = await supabase
    .from('keyword_clusters')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as KeywordCluster;
}

export async function deleteCluster(id: string) {
  const { error } = await supabase.from('keyword_clusters').delete().eq('id', id);
  if (error) throw error;
}

export async function getKeywordStats() {
  const { data, error } = await supabase.from('keywords').select('status, business_type, category');
  if (error) throw error;
  const rows = data || [];

  const byStatus: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byBusiness: Record<string, number> = {};

  rows.forEach((r) => {
    byStatus[r.status] = (byStatus[r.status] || 0) + 1;
    byCategory[r.category] = (byCategory[r.category] || 0) + 1;
    byBusiness[r.business_type] = (byBusiness[r.business_type] || 0) + 1;
  });

  return { total: rows.length, byStatus, byCategory, byBusiness };
}

export const KEYWORD_CATEGORIES = [
  'seo', 'local-seo', 'web-design', 'ppc', 'social-media',
  'content-marketing', 'analytics', 'ecommerce', 'ai-marketing', 'general'
];

export const SERVICES = [
  'SiteMaxi', 'RankMaxi', 'AdMaxi', 'ClickMaxi', 'SocialMaxi', 'SearchMaxi'
];

export const INDUSTRIES = [
  'Dentists', 'Lawyers', 'Clinics', 'HVAC', 'Plumbers', 'Roofers',
  'Contractors', 'Restaurants', 'Real Estate', 'Med Spas', 'Auto Repair',
  'Funeral Homes', 'Ecommerce'
];

export const CTA_TYPES = [
  'audit', 'strategy_call', 'contact', 'resource', 'none'
];
