/*
  # Fix Remaining Security Issues

  ## 1. Blog Posts RLS Policy Optimization
    - Fix "Users can view posts" policy to use `(select auth.role())` instead of `auth.role()`
    - Prevents re-evaluation for each row, improving query performance

  ## 2. Consolidate CC Admin Passwords Policies
    - Split the "Admins can manage cc passwords" policy from FOR ALL to separate policies
    - This prevents overlap with the SELECT policy
    - Keeps SELECT separate from INSERT/UPDATE/DELETE operations

  ## 3. Fix Function Search Path
    - Update `is_admin(check_user_id uuid)` function to use `SET search_path = public, pg_temp`
    - Ensures the function has an immutable search path

  ## Security Notes
    - All auth function calls now use SELECT wrapper for performance
    - No overlapping policies remain
    - All functions have secure, immutable search paths
*/

-- =====================================================
-- 1. FIX BLOG_POSTS RLS POLICY
-- =====================================================

DROP POLICY IF EXISTS "Users can view posts" ON blog_posts;

CREATE POLICY "Users can view posts"
  ON blog_posts
  FOR SELECT
  USING (
    published = true 
    OR 
    ((select auth.role()) = 'authenticated' AND true)
  );

-- =====================================================
-- 2. CONSOLIDATE CC_ADMIN_PASSWORDS POLICIES
-- =====================================================

-- Drop the overlapping FOR ALL policy
DROP POLICY IF EXISTS "Admins can manage cc passwords" ON cc_admin_passwords;

-- Create separate policies for INSERT, UPDATE, DELETE
CREATE POLICY "Admins can insert cc passwords"
  ON cc_admin_passwords
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update cc passwords"
  ON cc_admin_passwords
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete cc passwords"
  ON cc_admin_passwords
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

-- =====================================================
-- 3. FIX IS_ADMIN FUNCTION SEARCH PATH
-- =====================================================

CREATE OR REPLACE FUNCTION public.is_admin(check_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = check_user_id
    AND role = 'admin'
  );
END;
$$;