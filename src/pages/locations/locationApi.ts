import { supabase } from '../../lib/supabase';
import type { LocationRecord, LocationPageRecord, LocationPageWithLocation } from './types';

export async function getLocations(): Promise<LocationRecord[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('active', true)
    .order('province')
    .order('city');
  if (error) throw error;
  return data ?? [];
}

export async function getLocationBySlug(slug: string): Promise<LocationRecord | null> {
  const { data } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();
  return data;
}

export async function getLocationPage(citySlug: string, serviceSlug: string): Promise<LocationPageWithLocation | null> {
  const fullSlug = `${citySlug}/${serviceSlug}`;
  const { data } = await supabase
    .from('location_pages')
    .select('*, location:locations(*)')
    .eq('slug', fullSlug)
    .eq('published', true)
    .maybeSingle();
  return data as LocationPageWithLocation | null;
}

export async function getLocationPages(locationId: string): Promise<LocationPageRecord[]> {
  const { data, error } = await supabase
    .from('location_pages')
    .select('*')
    .eq('location_id', locationId)
    .eq('published', true)
    .order('service_type');
  if (error) throw error;
  return data ?? [];
}

export async function getAllLocationPages(): Promise<LocationPageWithLocation[]> {
  const { data, error } = await supabase
    .from('location_pages')
    .select('*, location:locations(*)')
    .eq('published', true)
    .order('slug');
  if (error) throw error;
  return (data ?? []) as LocationPageWithLocation[];
}

export async function adminGetAllLocations(): Promise<LocationRecord[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('province')
    .order('city');
  if (error) throw error;
  return data ?? [];
}

export async function adminGetAllLocationPages(): Promise<LocationPageWithLocation[]> {
  const { data, error } = await supabase
    .from('location_pages')
    .select('*, location:locations(*)')
    .order('slug');
  if (error) throw error;
  return (data ?? []) as LocationPageWithLocation[];
}

export async function upsertLocation(location: Partial<LocationRecord> & { slug: string }): Promise<LocationRecord> {
  const { data, error } = await supabase
    .from('locations')
    .upsert({ ...location, updated_at: new Date().toISOString() }, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertLocationPage(page: Partial<LocationPageRecord> & { slug: string }): Promise<LocationPageRecord> {
  const { data, error } = await supabase
    .from('location_pages')
    .upsert({ ...page, updated_at: new Date().toISOString() }, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteLocation(id: string): Promise<void> {
  const { error } = await supabase.from('locations').delete().eq('id', id);
  if (error) throw error;
}

export async function deleteLocationPage(id: string): Promise<void> {
  const { error } = await supabase.from('location_pages').delete().eq('id', id);
  if (error) throw error;
}
