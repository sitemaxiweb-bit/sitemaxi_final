import { useState } from 'react';
import { Lock, CreditCard, CheckCircle } from 'lucide-react';
import { SignatureCapture } from '../components/SignatureCapture';
import { SEOHead } from '../components/SEOHead';

interface FormData {
  authorizationName: string;
  companyName: string;
  billingAddress: string;
  cityState: string;
  postalCode: string;
  phone: string;
  email: string;
  accountType: 'Visa' | 'MasterCard' | 'AMEX' | 'Discover' | '';
  cardholderName: string;
  accountNumber: string;
  expirationDate: string;
  cvv: string;
}

export function CreditCardAuthorizationPage() {
  const [formData, setFormData] = useState<FormData>({
    authorizationName: '',
    companyName: '',
    billingAddress: '',
    cityState: '',
    postalCode: '',
    phone: '',
    email: '',
    accountType: '',
    cardholderName: '',
    accountNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [signatureData, setSignatureData] = useState<string>('');
  const [signatureType, setSignatureType] = useState<'drawn' | 'typed'>('drawn');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 16);
    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpirationDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, accountNumber: formatted }));
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpirationDate(e.target.value);
    setFormData(prev => ({ ...prev, expirationDate: formatted }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.authorizationName.trim()) newErrors.authorizationName = 'Required';
    if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Required';
    if (!formData.cityState.trim()) newErrors.cityState = 'Required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.accountType) newErrors.accountType = 'Required';
    if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Required';
    else if (formData.accountNumber.replace(/\s/g, '').length < 13) {
      newErrors.accountNumber = 'Invalid card number';
    }
    if (!formData.expirationDate.trim()) newErrors.expirationDate = 'Required';
    else if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
      newErrors.expirationDate = 'Format: MM/YY';
    }
    if (!formData.cvv.trim()) newErrors.cvv = 'Required';
    else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!signatureData) {
      alert('Please provide your signature before submitting.');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-cc-authorization`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorizationName: formData.authorizationName,
          companyName: formData.companyName,
          billingAddress: formData.billingAddress,
          cityState: formData.cityState,
          postalCode: formData.postalCode,
          phone: formData.phone,
          email: formData.email,
          accountType: formData.accountType,
          cardholderName: formData.cardholderName,
          accountNumber: formData.accountNumber.replace(/\s/g, ''),
          expirationDate: formData.expirationDate,
          cvv: formData.cvv,
          signatureData,
          signatureType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setConfirmationNumber(result.confirmationNumber);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting your authorization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
        <SEOHead
          title="Authorization Submitted - SiteMaxi"
          description="Your credit card authorization has been submitted successfully"
        />
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Authorization Submitted Successfully</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your credit card authorization has been securely received and processed.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-blue-700 font-medium mb-2">Confirmation Number</p>
            <p className="text-2xl font-bold text-blue-900 font-mono">{confirmationNumber}</p>
            <p className="text-sm text-blue-600 mt-2">Please save this number for your records</p>
          </div>
          <p className="text-gray-600 mb-8">
            Our team will process your authorization and contact you within 24 hours.
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-sm text-gray-700">
              <strong>SiteMaxi</strong><br />
              7398 Yonge St, Unit 619<br />
              Vaughan, ON, CA L4J 2J2<br />
              Phone: +1 (866) 344-6294<br />
              Email: operations@sitemaxi.com
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
      <SEOHead
        title="Credit Card Authorization Form - SiteMaxi"
        description="Securely authorize credit card payments for SiteMaxi services"
      />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Credit Card Authorization Form</h1>
            <p className="text-blue-100">Sign and complete this form to authorize SiteMaxi to make debit(s) to your credit card</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-blue-100 text-sm">
              <Lock className="w-4 h-4" />
              <span>Secure SSL Encrypted</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-blue-900 text-center">
                <strong>SiteMaxi</strong><br />
                7398 Yonge St, Unit 619, Vaughan, ON, CA L4J 2J2<br />
                +1 (866) 344-6294 | sitemaxi.com
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <input
                  type="text"
                  name="authorizationName"
                  value={formData.authorizationName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className={`flex-1 px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.authorizationName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                <span className="text-gray-700 pt-3">, authorize SiteMaxi to charge my credit card.</span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Personal & Company Information</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Billing Address *
                </label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    City, State/Province *
                  </label>
                  <input
                    type="text"
                    name="cityState"
                    value={formData.cityState}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cityState ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Zip/Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Credit Card Information</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Account Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Visa', 'MasterCard', 'AMEX', 'Discover'].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.accountType === type
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        value={type}
                        checked={formData.accountType === type}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <span className="font-medium text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  placeholder="Name as it appears on card"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Expiration Date *
                  </label>
                  <input
                    type="text"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleExpirationChange}
                    placeholder="MM/YY"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.expirationDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    CVV2 *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="3 or 4 digits"
                    maxLength={4}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    3-digit number on back of Visa/MC/Discover, 4-digits on front of AMEX
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Signature *</h2>
              <SignatureCapture
                onSignatureChange={(data, type) => {
                  setSignatureData(data);
                  setSignatureType(type);
                }}
                typedName={formData.authorizationName}
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Authorization Statement:</strong> I authorize the above named business to charge the credit card indicated in this authorization form according to the terms outlined above. This payment authorization is for the goods/services described above. I certify that I am an authorized user of this credit card and that I will not dispute the payment with my credit card company; so long as the transaction corresponds to the terms indicated in this form.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Your information is encrypted and secure</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Authorization'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
