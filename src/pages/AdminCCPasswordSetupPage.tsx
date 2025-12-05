import { useState, useEffect } from 'react';
import { Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../lib/auth';

export function AdminCCPasswordSetupPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasExistingPassword, setHasExistingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  useEffect(() => {
    checkExistingPassword();
  }, []);

  useEffect(() => {
    if (newPassword) {
      calculatePasswordStrength(newPassword);
    }
  }, [newPassword]);

  const checkExistingPassword = async () => {
    try {
      const { data, error } = await supabase
        .from('cc_admin_passwords')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setHasExistingPassword(true);
      }
    } catch (error) {
      console.error('Error checking password:', error);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) setPasswordStrength('weak');
    else if (strength <= 4) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  };

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const verifyCurrentPassword = async (password: string): Promise<boolean> => {
    try {
      const hashedPassword = await hashPassword(password);
      const { data, error } = await supabase
        .from('cc_admin_passwords')
        .select('password_hash')
        .limit(1)
        .maybeSingle();

      if (error || !data) return false;
      return data.password_hash === hashedPassword;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      return;
    }

    if (passwordStrength === 'weak') {
      setMessage({ type: 'error', text: 'Please choose a stronger password' });
      return;
    }

    if (hasExistingPassword && !currentPassword) {
      setMessage({ type: 'error', text: 'Please enter your current password' });
      return;
    }

    setIsLoading(true);

    try {
      if (hasExistingPassword) {
        const isValid = await verifyCurrentPassword(currentPassword);
        if (!isValid) {
          setMessage({ type: 'error', text: 'Current password is incorrect' });
          setIsLoading(false);
          return;
        }
      }

      const user = await getCurrentUser();
      if (!user) {
        setMessage({ type: 'error', text: 'User not authenticated' });
        setIsLoading(false);
        return;
      }

      const hashedPassword = await hashPassword(newPassword);

      if (hasExistingPassword) {
        const { error } = await supabase
          .from('cc_admin_passwords')
          .update({
            password_hash: hashedPassword,
            created_by: user.id,
            failed_attempts: 0,
            locked_until: null,
          })
          .eq('id', (await supabase.from('cc_admin_passwords').select('id').limit(1).single()).data.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cc_admin_passwords')
          .insert({
            password_hash: hashedPassword,
            created_by: user.id,
          });

        if (error) throw error;
        setHasExistingPassword(true);
      }

      setMessage({ type: 'success', text: 'Password configured successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error setting password:', error);
      setMessage({ type: 'error', text: 'Failed to set password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CC Authorization Password</h1>
                <p className="text-blue-100 text-sm">
                  {hasExistingPassword ? 'Update' : 'Set up'} the special access password for credit card authorizations
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Important Security Information</p>
                <p>This password provides access to sensitive credit card authorization data. Choose a strong, unique password and keep it secure. Do not share it with unauthorized personnel.</p>
              </div>
            </div>

            {message && (
              <div className={`rounded-lg p-4 mb-6 flex items-center gap-3 ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <p className={`text-sm font-medium ${
                  message.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {message.text}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {hasExistingPassword && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={hasExistingPassword}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength={8}
                />
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            passwordStrength === 'weak'
                              ? 'w-1/3 bg-red-500'
                              : passwordStrength === 'medium'
                              ? 'w-2/3 bg-yellow-500'
                              : 'w-full bg-green-500'
                          }`}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength === 'weak'
                          ? 'text-red-600'
                          : passwordStrength === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}>
                        {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Use 12+ characters with uppercase, lowercase, numbers, and symbols for a strong password
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? 'Saving...' : hasExistingPassword ? 'Update Password' : 'Set Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
