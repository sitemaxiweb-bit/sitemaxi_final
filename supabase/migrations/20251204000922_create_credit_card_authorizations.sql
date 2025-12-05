/*
  # Create Credit Card Authorizations Table

  ## 1. New Tables

    ### `credit_card_authorizations`
    - `id` (uuid, primary key) - Unique identifier
    - `confirmation_number` (text, unique) - Unique confirmation code for the submission
    - `authorization_name` (text) - Name in "I, [NAME], authorize..." statement
    - `company_name` (text) - Company name
    - `billing_address` (text) - Street address
    - `city_state` (text) - City, State/Province
    - `postal_code` (text) - Zip/Postal code
    - `phone` (text) - Phone number
    - `email` (text) - Email address
    - `account_type` (text) - Card type: Visa, MasterCard, AMEX, Discover
    - `cardholder_name` (text) - Name on card
    - `account_number_encrypted` (text) - Encrypted card number
    - `account_number_last4` (text) - Last 4 digits of card (for display)
    - `expiration_date` (text) - Card expiration date (MM/YY)
    - `cvv_encrypted` (text) - Encrypted CVV code
    - `signature_data` (text) - Base64 encoded signature image
    - `signature_type` (text) - Type of signature: 'drawn' or 'typed'
    - `signature_date` (date) - Date when signed
    - `ip_address` (text) - IP address of submitter
    - `email_sent` (boolean) - Whether notification email was sent
    - `email_sent_at` (timestamptz) - When email was sent
    - `created_at` (timestamptz) - Submission timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
    - Enable RLS on table
    - No public access - service role only
    - This table contains highly sensitive financial data

  ## 3. Indexes
    - Index on confirmation_number for quick lookups
    - Index on email for searching
    - Index on created_at for date filtering
    - Index on account_number_last4 for searching

  ## 4. Important Notes
    - Card numbers and CVV are encrypted before storage
    - Only last 4 digits of card stored in plain text for display
    - Signature stored as base64 PNG image
    - All access requires service role authentication
*/

-- Create credit_card_authorizations table
CREATE TABLE IF NOT EXISTS credit_card_authorizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  confirmation_number text UNIQUE NOT NULL,
  authorization_name text NOT NULL,
  company_name text DEFAULT '',
  billing_address text NOT NULL,
  city_state text NOT NULL,
  postal_code text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  account_type text NOT NULL CHECK (account_type IN ('Visa', 'MasterCard', 'AMEX', 'Discover')),
  cardholder_name text NOT NULL,
  account_number_encrypted text NOT NULL,
  account_number_last4 text NOT NULL,
  expiration_date text NOT NULL,
  cvv_encrypted text NOT NULL,
  signature_data text NOT NULL,
  signature_type text NOT NULL CHECK (signature_type IN ('drawn', 'typed')),
  signature_date date NOT NULL DEFAULT CURRENT_DATE,
  ip_address text DEFAULT '',
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE credit_card_authorizations ENABLE ROW LEVEL SECURITY;

-- No public policies - service role only access
-- This ensures maximum security for sensitive financial data

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cc_auth_confirmation_number ON credit_card_authorizations(confirmation_number);
CREATE INDEX IF NOT EXISTS idx_cc_auth_email ON credit_card_authorizations(email);
CREATE INDEX IF NOT EXISTS idx_cc_auth_created_at ON credit_card_authorizations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cc_auth_last4 ON credit_card_authorizations(account_number_last4);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_credit_card_authorizations_updated_at ON credit_card_authorizations;
CREATE TRIGGER update_credit_card_authorizations_updated_at
  BEFORE UPDATE ON credit_card_authorizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
