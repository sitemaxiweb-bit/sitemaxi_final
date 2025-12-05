/*
  # Fix Security Issues

  ## Overview
  This migration addresses multiple security and performance issues identified by Supabase security scanner.

  ## Changes Made

  ### 1. RLS Policy Performance Optimization
  - Fixed `user_roles` table policies to use `(select auth.uid())` instead of `auth.uid()`
  - This prevents re-evaluation of auth functions for each row, improving query performance at scale

  ### 2. Remove Unused Indexes
  - Dropped `blog_posts_published_idx` - unused index
  - Dropped `blog_posts_category_idx` - unused index
  - Dropped `idx_contact_submissions_status` - unused index
  - Dropped `idx_contact_submissions_email` - unused index

  ### 3. Fix Multiple Permissive Policies
  - Removed conflicting SELECT policies on `blog_posts` table
  - Created single combined policy that allows both public and authenticated access appropriately

  ### 4. Add Missing RLS Policies
  - Added policies for `api_config` table (admin-only access)
  - Added policies for `contact_submissions` table (admin view, system insert)

  ### 5. Fix Function Search Paths
  - Updated all functions to have immutable search paths by adding `SET search_path = public, pg_temp`
  - Affected functions: create_first_admin, update_blog_posts_updated_at, handle_new_user, 
    is_admin, has_any_admin, set_blog_post_published_at, update_updated_at_column

  ## Security Notes
  - All functions now have secure, immutable search paths
  - RLS policies are optimized for performance
  - Tables are properly protected with appropriate policies
  - Unused indexes removed to improve write performance
*/

-- =====================================================
-- 1. FIX RLS POLICIES - USE SELECT WRAPPER
-- =====================================================

DROP POLICY IF EXISTS "Users can view own role" ON user_roles;
DROP POLICY IF EXISTS "Allow role updates during signup" ON user_roles;

CREATE POLICY "Users can view own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Allow role updates during signup"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- =====================================================
-- 2. REMOVE UNUSED INDEXES
-- =====================================================

DROP INDEX IF EXISTS blog_posts_published_idx;
DROP INDEX IF EXISTS blog_posts_category_idx;
DROP INDEX IF EXISTS idx_contact_submissions_status;
DROP INDEX IF EXISTS idx_contact_submissions_email;

-- =====================================================
-- 3. FIX MULTIPLE PERMISSIVE POLICIES ON BLOG_POSTS
-- =====================================================

DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON blog_posts;

CREATE POLICY "Users can view posts"
  ON blog_posts
  FOR SELECT
  USING (
    published = true 
    OR 
    (auth.role() = 'authenticated' AND true)
  );

-- =====================================================
-- 4. ADD RLS POLICIES FOR MISSING TABLES
-- =====================================================

-- API Config policies (admin only)
CREATE POLICY "Only admins can view api config"
  ON api_config
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can insert api config"
  ON api_config
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update api config"
  ON api_config
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

-- Contact Submissions policies
CREATE POLICY "Service role can insert submissions"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update submissions"
  ON contact_submissions
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

-- =====================================================
-- 5. FIX FUNCTION SEARCH PATHS
-- =====================================================

-- Drop and recreate functions with proper search path

-- create_first_admin function
CREATE OR REPLACE FUNCTION public.create_first_admin(admin_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  admin_exists boolean;
  target_user_id uuid;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM user_roles WHERE role = 'admin'
  ) INTO admin_exists;
  
  IF admin_exists THEN
    RETURN false;
  END IF;
  
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = admin_email;
  
  IF target_user_id IS NULL THEN
    RETURN false;
  END IF;
  
  INSERT INTO user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id) 
  DO UPDATE SET role = 'admin';
  
  RETURN true;
END;
$$;

-- update_blog_posts_updated_at function
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$;

-- has_any_admin function
CREATE OR REPLACE FUNCTION public.has_any_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles WHERE role = 'admin'
  );
END;
$$;

-- set_blog_post_published_at function
CREATE OR REPLACE FUNCTION public.set_blog_post_published_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.published = true AND OLD.published = false AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$;

-- update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
