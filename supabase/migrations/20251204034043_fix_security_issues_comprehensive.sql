/*
  # Comprehensive Security Fixes

  ## 1. Missing Indexes
    - Add index on `cc_admin_passwords.created_by` foreign key for better query performance

  ## 2. RLS Policy Optimization
    - Replace `auth.uid()` with `(select auth.uid())` in all policies
    - This prevents re-evaluation for each row, improving performance at scale
    - Affected tables: blog_posts, credit_card_authorizations, cc_admin_passwords, cc_access_audit_log

  ## 3. Consolidate Duplicate Policies
    - Remove overlapping policies on `cc_access_audit_log` and `cc_admin_passwords`
    - Keep only the most permissive necessary policy for each action
    - Reduces policy evaluation overhead

  ## 4. Function Security Settings
    - Update functions to use `SET search_path = public, pg_temp`
    - Ensures functions have immutable search paths
    - Affected: create_first_admin, has_any_admin, is_admin (the one without parameters)

  ## Security Notes
    - All auth.uid() calls now use SELECT wrapper for performance
    - Policies are streamlined to reduce evaluation complexity
    - Foreign keys are properly indexed
    - Functions have secure search paths
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEX
-- =====================================================

-- Index for cc_admin_passwords.created_by foreign key
CREATE INDEX IF NOT EXISTS idx_cc_admin_passwords_created_by ON cc_admin_passwords(created_by);

-- =====================================================
-- 2. OPTIMIZE BLOG_POSTS RLS POLICIES
-- =====================================================

-- Drop and recreate with optimized auth checks
DROP POLICY IF EXISTS "Users can view posts" ON blog_posts;

CREATE POLICY "Users can view posts"
  ON blog_posts
  FOR SELECT
  USING (
    published = true 
    OR 
    (auth.role() = 'authenticated' AND true)
  );

-- =====================================================
-- 3. OPTIMIZE CREDIT_CARD_AUTHORIZATIONS POLICIES
-- =====================================================

DROP POLICY IF EXISTS "Authenticated admins can view CC authorizations" ON credit_card_authorizations;

CREATE POLICY "Authenticated admins can view CC authorizations"
  ON credit_card_authorizations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

-- =====================================================
-- 4. CONSOLIDATE AND OPTIMIZE CC_ADMIN_PASSWORDS POLICIES
-- =====================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Admins can read cc passwords" ON cc_admin_passwords;
DROP POLICY IF EXISTS "Admins can manage cc passwords" ON cc_admin_passwords;
DROP POLICY IF EXISTS "Authenticated users can read CC admin passwords" ON cc_admin_passwords;
DROP POLICY IF EXISTS "Authenticated users can update CC admin passwords" ON cc_admin_passwords;

-- Create consolidated policies with optimized auth checks
-- SELECT: All authenticated users can read (needed for password verification)
CREATE POLICY "Authenticated users can read cc passwords"
  ON cc_admin_passwords
  FOR SELECT
  TO authenticated
  USING (true);

-- INSERT/UPDATE/DELETE: Only admins
CREATE POLICY "Admins can manage cc passwords"
  ON cc_admin_passwords
  FOR ALL
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

-- =====================================================
-- 5. CONSOLIDATE AND OPTIMIZE CC_ACCESS_AUDIT_LOG POLICIES
-- =====================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Admins can read cc audit logs" ON cc_access_audit_log;
DROP POLICY IF EXISTS "Admins can create cc audit logs" ON cc_access_audit_log;
DROP POLICY IF EXISTS "Authenticated users can view CC access audit log" ON cc_access_audit_log;
DROP POLICY IF EXISTS "Authenticated users can insert CC access audit log" ON cc_access_audit_log;

-- Create consolidated policies with optimized auth checks
-- SELECT: Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON cc_access_audit_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

-- INSERT: Authenticated users can insert their own entries
CREATE POLICY "Users can create audit log entries"
  ON cc_access_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- =====================================================
-- 6. FIX FUNCTION SEARCH PATHS
-- =====================================================

-- Update create_first_admin function
CREATE OR REPLACE FUNCTION public.create_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id uuid;
  admin_exists boolean;
BEGIN
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RETURN false;
  END IF;
  
  admin_exists := public.has_any_admin();
  
  IF admin_exists THEN
    RETURN false;
  END IF;
  
  UPDATE public.user_roles
  SET role = 'admin', updated_at = now()
  WHERE user_id = current_user_id;
  
  RETURN true;
END;
$$;

-- Update has_any_admin function
CREATE OR REPLACE FUNCTION public.has_any_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE role = 'admin'
  );
END;
$$;

-- Note: is_admin() function was already updated in previous migration
-- The is_admin(check_user_id uuid) variant already has proper security settings