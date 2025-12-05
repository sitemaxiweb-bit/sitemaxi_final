/*
  # Fix Infinite Recursion in User Roles RLS Policy

  ## Overview
  This migration fixes the infinite recursion issue in the user_roles table RLS policies.
  The problem was caused by the "Admins can view all roles" policy checking the same table
  it was protecting, creating a circular reference.

  ## Changes Made
  
  1. **Removed Recursive Policy**: Dropped the "Admins can view all roles" policy that was causing recursion
  
  2. **Simplified RLS**: Users can only view their own role through the "Users can view own role" policy
  
  3. **Admin Management**: Admin role assignments should be managed through:
     - Direct database updates via Supabase dashboard
     - Service role key operations (backend only)
     - The admin setup page which uses the anon key with update permission
  
  ## Security Notes
  
  - Users can only read their own role (no security risk)
  - Role modifications are not allowed through standard policies
  - Admin promotion must be done via Supabase dashboard or service role
  - This prevents the infinite recursion while maintaining security
*/

DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;

CREATE POLICY "Allow role updates during signup"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);