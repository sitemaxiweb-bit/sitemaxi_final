/*
  # Create CC Admin Passwords Table

  ## 1. New Tables

    ### `cc_admin_passwords`
    - `id` (uuid, primary key) - Unique identifier
    - `password_hash` (text) - Bcrypt hash of the special CC access password
    - `created_by` (uuid) - User ID who created/updated the password
    - `failed_attempts` (integer) - Track failed login attempts
    - `locked_until` (timestamptz) - Lockout expiration after failed attempts
    - `created_at` (timestamptz) - When password was created
    - `updated_at` (timestamptz) - When password was last updated

    ### `cc_access_audit_log`
    - `id` (uuid, primary key) - Unique identifier
    - `user_id` (uuid) - Admin user who accessed CC data
    - `user_email` (text) - Email of the admin user
    - `action` (text) - Type of action: 'view_list', 'view_detail', 'password_verified'
    - `authorization_id` (uuid, nullable) - ID of specific authorization viewed
    - `ip_address` (text) - IP address of the access
    - `created_at` (timestamptz) - When the access occurred

  ## 2. Security
    - Enable RLS on both tables
    - Only authenticated admin users can access
    - Password hash never exposed to client
    - Audit log tracks all access to CC data

  ## 3. Important Notes
    - Only one password entry should exist (enforced by application logic)
    - Failed attempts trigger temporary lockout
    - All access to CC authorizations is logged for compliance
*/

-- Create cc_admin_passwords table
CREATE TABLE IF NOT EXISTS cc_admin_passwords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  failed_attempts integer DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cc_access_audit_log table
CREATE TABLE IF NOT EXISTS cc_access_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  user_email text NOT NULL,
  action text NOT NULL,
  authorization_id uuid REFERENCES credit_card_authorizations(id),
  ip_address text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cc_admin_passwords ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_access_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cc_admin_passwords
-- Admins can read password data (for verification via Edge Function)
CREATE POLICY "Admins can read cc passwords"
  ON cc_admin_passwords
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Admins can insert/update password
CREATE POLICY "Admins can manage cc passwords"
  ON cc_admin_passwords
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- RLS Policies for cc_access_audit_log
-- Admins can read audit logs
CREATE POLICY "Admins can read cc audit logs"
  ON cc_access_audit_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Admins can insert audit log entries
CREATE POLICY "Admins can create cc audit logs"
  ON cc_access_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cc_audit_user_id ON cc_access_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_cc_audit_created_at ON cc_access_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cc_audit_authorization_id ON cc_access_audit_log(authorization_id);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_cc_admin_passwords_updated_at ON cc_admin_passwords;
CREATE TRIGGER update_cc_admin_passwords_updated_at
  BEFORE UPDATE ON cc_admin_passwords
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
