/*
  # Create User Roles System

  ## Overview
  This migration establishes a role-based access control (RBAC) system for the application.
  It creates a table to store user roles and automatically assigns default roles to new users.

  ## New Tables
  
  ### `user_roles`
  - `id` (uuid, primary key) - Unique identifier for the role assignment
  - `user_id` (uuid, foreign key) - References auth.users, the user this role belongs to
  - `role` (text) - The role name (e.g., 'admin', 'user')
  - `created_at` (timestamptz) - When the role was assigned
  - `updated_at` (timestamptz) - When the role was last modified
  
  **Indexes:**
  - Unique index on `user_id` to ensure one role per user
  - Index on `role` for efficient role-based queries

  ## Security Features
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `user_roles` table
  - Users can view their own role
  - Only authenticated users can read roles
  - Role modifications are restricted (no public INSERT/UPDATE/DELETE policies)
  - Admin role changes must be done through Supabase dashboard or secure functions
  
  ### Database Functions
  - `handle_new_user()` - Automatically creates a 'user' role entry for new signups
  - `is_admin(user_id uuid)` - Helper function to check if a user has admin role
  
  ### Triggers
  - Automatically assigns 'user' role to new users upon signup
  
  ## Important Notes
  
  1. **First Admin Setup**: After running this migration, you need to manually create the first admin:
     - Go to Supabase Dashboard → Authentication → Users
     - Create a new user or select existing user
     - Go to Table Editor → user_roles
     - Insert a row: user_id = [user's UUID], role = 'admin'
  
  2. **Default Role**: All new signups automatically receive 'user' role
  
  3. **Role Management**: To promote users to admin, update their role in the user_roles table
*/

CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.is_admin(check_user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = check_user_id
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;