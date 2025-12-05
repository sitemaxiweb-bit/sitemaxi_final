/*
  # Add Function to Create Admin Users

  ## Overview
  This migration adds a secure function to check if any admin exists and allow
  the first user to promote themselves to admin. After the first admin exists,
  this function will no longer allow self-promotion.

  ## New Functions
  
  ### `has_any_admin()`
  - Returns true if at least one admin exists in the system
  - Used to determine if initial setup is still allowed
  
  ### `create_first_admin()`
  - Allows a user to promote themselves to admin ONLY if no admins exist yet
  - Returns true if successful, false if admins already exist
  - Prevents multiple admins from being created through the setup page
  - Security: SECURITY DEFINER allows it to bypass RLS for this specific operation
  
  ## Security Features
  
  - Only works when no admins exist (first-time setup only)
  - Automatically becomes disabled after first admin is created
  - Uses SECURITY DEFINER to bypass RLS safely for this controlled operation
  - Authenticated users only
  
  ## Usage
  
  Call this function from the admin setup page to create the first admin user.
*/

CREATE OR REPLACE FUNCTION public.has_any_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.create_first_admin()
RETURNS boolean AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;