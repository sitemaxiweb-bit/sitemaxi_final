import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../lib/auth';
import { Lock, CreditCard, Calendar, Mail, Phone, MapPin, FileText, Shield, X, Search, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface CCAuthorization {
  id: string;
  confirmation_number: string;
  authorization_name: string;
  company_name: string;
  billing_address: string;
  city_state: string;
  postal_code: string;
  phone: string;
  email: string;
  account_type: string;
  cardholder_name: string;
  account_number_last4: string;
  account_number_encrypted: string;
  cvv_encrypted: string;
  expiration_date: string;
  signature_data: string;
  signature_type: string;
  signature_date: string;
  ip_address: string;
  email_sent: boolean;
  created_at: string;
}

export function AdminCCAuthorizationsPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [authorizations, setAuthorizations] = useState<CCAuthorization[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAuth, setSelectedAuth] = useState<CCAuthorization | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFullCard, setShowFullCard] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [decryptedData, setDecryptedData] = useState<{ cardNumber: string; cvv: string } | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptError, setDecryptError] = useState('');

  useEffect(() => {
    const unlockStatus = sessionStorage.getItem('cc_unlocked');
    const unlockTime = sessionStorage.getItem('cc_unlock_time');

    if (unlockStatus === 'true' && unlockTime) {
      const elapsed = Date.now() - parseInt(unlockTime);
      if (elapsed < 30 * 60 * 1000) {
        setIsUnlocked(true);
        fetchAuthorizations();
      } else {
        sessionStorage.removeItem('cc_unlocked');
        sessionStorage.removeItem('cc_unlock_time');
      }
    }
  }, []);

  useEffect(() => {
    if (lockoutTime) {
      const timer = setInterval(() => {
        if (Date.now() >= lockoutTime) {
          setLockoutTime(null);
          setFailedAttempts(0);
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const logAccess = async (action: string, authorizationId?: string) => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      await supabase.from('cc_access_audit_log').insert({
        user_id: user.id,
        user_email: user.email || '',
        action,
        authorization_id: authorizationId || null,
        ip_address: '',
      });
    } catch (error) {
      console.error('Error logging access:', error);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutTime && Date.now() < lockoutTime) {
      setPasswordError('Too many failed attempts. Please try again later.');
      return;
    }

    setIsVerifying(true);
    setPasswordError('');

    try {
      const hashedPassword = await hashPassword(password);

      const { data, error } = await supabase
        .from('cc_admin_passwords')
        .select('password_hash, failed_attempts, locked_until')
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        setPasswordError('Password not configured. Please contact your administrator.');
        setIsVerifying(false);
        return;
      }

      if (data.locked_until && new Date(data.locked_until) > new Date()) {
        setLockoutTime(new Date(data.locked_until).getTime());
        setPasswordError('Account is locked due to multiple failed attempts.');
        setIsVerifying(false);
        return;
      }

      if (data.password_hash === hashedPassword) {
        await supabase
          .from('cc_admin_passwords')
          .update({ failed_attempts: 0, locked_until: null })
          .eq('password_hash', data.password_hash);

        sessionStorage.setItem('cc_unlocked', 'true');
        sessionStorage.setItem('cc_unlock_time', Date.now().toString());
        setIsUnlocked(true);
        await logAccess('password_verified');
        await fetchAuthorizations();
      } else {
        const newFailedAttempts = (data.failed_attempts || 0) + 1;
        const updates: any = { failed_attempts: newFailedAttempts };

        if (newFailedAttempts >= 3) {
          const lockUntil = new Date(Date.now() + 5 * 60 * 1000);
          updates.locked_until = lockUntil.toISOString();
          setLockoutTime(lockUntil.getTime());
        }

        await supabase
          .from('cc_admin_passwords')
          .update(updates)
          .eq('password_hash', data.password_hash);

        setFailedAttempts(newFailedAttempts);
        setPasswordError(`Incorrect password. ${3 - newFailedAttempts} attempts remaining.`);
      }
    } catch (error) {
      console.error('Password verification error:', error);
      setPasswordError('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
      setPassword('');
    }
  };

  const fetchAuthorizations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('credit_card_authorizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuthorizations(data || []);
      await logAccess('view_list');
    } catch (error) {
      console.error('Error fetching authorizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (auth: CCAuthorization) => {
    setSelectedAuth(auth);
    setShowFullCard(false);
    setShowCVV(false);
    setDecryptedData(null);
    setDecryptError('');
    logAccess('view_detail', auth.id);
  };

  const decryptCardData = async () => {
    if (!selectedAuth) return;

    setIsDecrypting(true);
    setDecryptError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setDecryptError('Session expired. Please refresh and try again.');
        return;
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/decrypt-cc-data`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorizationId: selectedAuth.id,
          encryptedCardNumber: selectedAuth.account_number_encrypted,
          encryptedCVV: selectedAuth.cvv_encrypted,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to decrypt data');
      }

      const data = await response.json();
      setDecryptedData(data);
      setShowFullCard(true);
    } catch (error: any) {
      console.error('Decryption error:', error);
      setDecryptError(error.message || 'Failed to decrypt card data');
    } finally {
      setIsDecrypting(false);
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredAuthorizations = authorizations.filter(auth =>
    auth.authorization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auth.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auth.confirmation_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <Shield className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Restricted Access</h1>
            <p className="text-gray-600">
              This area contains sensitive credit card authorization data. Please enter the special access password.
            </p>
          </div>

          {lockoutTime && Date.now() < lockoutTime && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-semibold">Account Locked</p>
                <p>Too many failed attempts. Try again in {Math.ceil((lockoutTime - Date.now()) / 1000)} seconds.</p>
              </div>
            </div>
          )}

          {passwordError && !lockoutTime && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">{passwordError}</p>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Access Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter special access password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
                disabled={lockoutTime !== null && Date.now() < lockoutTime}
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || (lockoutTime !== null && Date.now() < lockoutTime)}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isVerifying ? 'Verifying...' : 'Unlock Access'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              If you don't have the access password, please contact your system administrator. All access attempts are logged for security purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-900 font-medium">
              You are viewing sensitive financial data. All access is logged and monitored. Handle this information with care.
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Credit Card Authorizations</h1>
            <p className="text-gray-600">
              Total authorizations: <span className="font-semibold">{authorizations.length}</span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or confirmation number..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading authorizations...</p>
          </div>
        ) : filteredAuthorizations.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No authorizations found</h3>
            <p className="text-gray-600">Credit card authorizations will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAuthorizations.map((auth) => (
              <div
                key={auth.id}
                onClick={() => handleViewDetails(auth)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{auth.authorization_name}</h3>
                      <p className="text-sm text-gray-500">Confirmation: {auth.confirmation_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{formatDate(auth.created_at)}</p>
                    {auth.email_sent && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full mt-1">
                        <Mail className="w-3 h-3" />
                        Email sent
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{auth.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{auth.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span>{auth.account_type} •••• {auth.account_number_last4}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedAuth && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50 overflow-y-auto"
          onClick={() => setSelectedAuth(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedAuth.authorization_name}</h2>
                <p className="text-blue-100">Confirmation: {selectedAuth.confirmation_number}</p>
              </div>
              <button
                onClick={() => setSelectedAuth(null)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Contact Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{selectedAuth.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{selectedAuth.phone}</span>
                      </div>
                      {selectedAuth.company_name && (
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{selectedAuth.company_name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Billing Address</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="text-gray-900">
                          <p>{selectedAuth.billing_address}</p>
                          <p>{selectedAuth.city_state}</p>
                          <p>{selectedAuth.postal_code}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Card Information</h3>

                    {decryptError && (
                      <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">{decryptError}</p>
                      </div>
                    )}

                    {showFullCard && decryptedData && (
                      <div className="mb-4 bg-yellow-50 border border-yellow-400 rounded-lg p-3 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-semibold">Sensitive Data Visible</p>
                          <p>Full card details are now visible. This access has been logged.</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="text-sm text-blue-700 font-medium">Card Type</span>
                        <p className="text-blue-900 font-semibold">{selectedAuth.account_type}</p>
                      </div>
                      <div>
                        <span className="text-sm text-blue-700 font-medium">Cardholder Name</span>
                        <p className="text-blue-900">{selectedAuth.cardholder_name}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-blue-700 font-medium">Card Number</span>
                          {!showFullCard ? (
                            <button
                              onClick={decryptCardData}
                              disabled={isDecrypting}
                              className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              {isDecrypting ? 'Decrypting...' : 'Show Full Number'}
                            </button>
                          ) : (
                            <button
                              onClick={() => setShowFullCard(false)}
                              className="text-xs px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-1"
                            >
                              <EyeOff className="w-3 h-3" />
                              Hide
                            </button>
                          )}
                        </div>
                        {showFullCard && decryptedData ? (
                          <p className="text-blue-900 font-mono text-lg tracking-wider bg-white px-3 py-2 rounded border-2 border-blue-300">
                            {formatCardNumber(decryptedData.cardNumber)}
                          </p>
                        ) : (
                          <p className="text-blue-900 font-mono">•••• •••• •••• {selectedAuth.account_number_last4}</p>
                        )}
                      </div>
                      <div>
                        <span className="text-sm text-blue-700 font-medium">Expiration Date</span>
                        <p className="text-blue-900">{selectedAuth.expiration_date}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-blue-700 font-medium">CVV</span>
                          {decryptedData && (
                            <button
                              onClick={() => setShowCVV(!showCVV)}
                              className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                            >
                              {showCVV ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              {showCVV ? 'Hide' : 'Show'} CVV
                            </button>
                          )}
                        </div>
                        {showCVV && decryptedData ? (
                          <p className="text-blue-900 font-mono text-lg tracking-wider bg-white px-3 py-2 rounded border-2 border-blue-300">
                            {decryptedData.cvv}
                          </p>
                        ) : (
                          <p className="text-blue-900 font-mono">•••</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Submission Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">Submitted:</span>
                        <span className="text-gray-900 font-medium">{formatDate(selectedAuth.created_at)}</span>
                      </div>
                      {selectedAuth.ip_address && (
                        <div>
                          <span className="text-gray-700">IP Address:</span>
                          <span className="text-gray-900 font-mono ml-2">{selectedAuth.ip_address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                  Signature ({selectedAuth.signature_type === 'drawn' ? 'Hand-drawn' : 'Typed'})
                </h3>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
                  <img
                    src={selectedAuth.signature_data}
                    alt="Signature"
                    className="max-w-full max-h-48"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Signed on: {new Date(selectedAuth.signature_date).toLocaleDateString('en-US', { dateStyle: 'long' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
