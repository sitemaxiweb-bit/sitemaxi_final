import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Clock, Mail, Phone, Calendar, User, MessageSquare, Tag } from 'lucide-react';

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: 'pending' | 'success' | 'failed';
  heffl_lead_id: string | null;
  lead_source: string;
  lead_stage: string;
  lead_value: number | null;
  api_response: any;
  created_at: string;
  updated_at: string;
}

export function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
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

  const getServiceLabel = (service: string) => {
    const serviceMap: { [key: string]: string } = {
      rankmaxi: 'RankMaxi - Local SEO',
      searchmaxi: 'SearchMaxi - SEO',
      socialmaxi: 'SocialMaxi - Social Media',
      admaxi: 'AdMaxi - Social Ads',
      clickmaxi: 'ClickMaxi - Google Ads',
      sitemaxi: 'SiteMaxi - Web Design',
      multiple: 'Multiple Services',
    };
    return serviceMap[service] || service;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Submissions</h1>
          <p className="text-gray-600">
            Total submissions: <span className="font-semibold">{submissions.length}</span>
          </p>
        </div>

        <div className="grid gap-6">
          {submissions.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No submissions yet</h3>
              <p className="text-gray-600">Contact form submissions will appear here.</p>
            </div>
          ) : (
            submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission.first_name} {submission.last_name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(submission.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getStatusColor(submission.status)}`}>
                    {getStatusIcon(submission.status)}
                    <span className="text-sm font-medium capitalize">{submission.status}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{submission.email}</span>
                  </div>
                  {submission.phone && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{submission.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{getServiceLabel(submission.service)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{submission.message}</p>
                </div>

                {submission.heffl_lead_id && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      Heffl Lead ID: {submission.heffl_lead_id}
                    </div>
                    <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                      Stage: {submission.lead_stage}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedSubmission.first_name} {selectedSubmission.last_name}
                    </h2>
                    <p className="text-gray-500">{formatDate(selectedSubmission.created_at)}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(selectedSubmission.status)}`}>
                  {getStatusIcon(selectedSubmission.status)}
                  <span className="font-medium capitalize">{selectedSubmission.status}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Contact Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{selectedSubmission.email}</span>
                    </div>
                    {selectedSubmission.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{selectedSubmission.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Service Interest</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <span className="text-blue-900 font-medium">{getServiceLabel(selectedSubmission.service)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>

                {selectedSubmission.heffl_lead_id && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Heffl Lead Integration</h3>
                    <div className="bg-green-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-900 font-medium">Successfully synced to Heffl as Lead</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-green-700 font-medium">Lead ID:</span>
                          <p className="text-green-900">{selectedSubmission.heffl_lead_id}</p>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Stage:</span>
                          <p className="text-green-900">{selectedSubmission.lead_stage}</p>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Source:</span>
                          <p className="text-green-900">{selectedSubmission.lead_source}</p>
                        </div>
                        {selectedSubmission.lead_value && (
                          <div>
                            <span className="text-green-700 font-medium">Value:</span>
                            <p className="text-green-900">${selectedSubmission.lead_value}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedSubmission.api_response && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">API Response</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-green-400 text-xs overflow-x-auto">
                        {JSON.stringify(selectedSubmission.api_response, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
