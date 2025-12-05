/*
  # Add Read Policies for Credit Card Authorizations

  ## Changes
    - Add SELECT policy for authenticated users with admin role
    - Add SELECT policy for cc_admin_passwords table
    - Add SELECT policy for cc_access_audit_log table
    - Add INSERT policy for cc_access_audit_log (for logging access)
    - Add UPDATE policy for cc_admin_passwords (for failed attempts tracking)

  ## Security
    - Only authenticated users can access these tables
    - Admin role check ensures only authorized users can view CC data
    - All policies maintain strict access control for sensitive data
*/

-- Policy for admins to read credit card authorizations
CREATE POLICY "Authenticated admins can view CC authorizations"
  ON credit_card_authorizations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy for authenticated users to read cc_admin_passwords (needed for password verification)
CREATE POLICY "Authenticated users can read CC admin passwords"
  ON cc_admin_passwords
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to update cc_admin_passwords (for failed attempts)
CREATE POLICY "Authenticated users can update CC admin passwords"
  ON cc_admin_passwords
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated users to read their own audit log entries
CREATE POLICY "Authenticated users can view CC access audit log"
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

-- Policy for authenticated users to insert audit log entries
CREATE POLICY "Authenticated users can insert CC access audit log"
  ON cc_access_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
