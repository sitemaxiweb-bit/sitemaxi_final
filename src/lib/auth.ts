import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getUserRole(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }

  return data?.role || null;
}

export async function isAdmin(userId?: string): Promise<boolean> {
  const user = userId ? { id: userId } : await getCurrentUser();
  if (!user?.id) return false;

  const role = await getUserRole(user.id);
  return role === 'admin';
}

export async function requireAdmin(): Promise<void> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }

  const adminStatus = await isAdmin(user.id);
  if (!adminStatus) {
    throw new Error('Admin access required');
  }
}

export function onAuthStateChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}
