import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image,
  Mail,
  CreditCard,
  Lock,
  LogOut,
  User,
  BarChart3,
  MapPin,
  TrendingUp,
  Layers,
  Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { getKeywordStats } from '../lib/keywordApi';

interface AdminSection {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [kwStats, setKwStats] = useState<{ total: number; byStatus: Record<string, number> } | null>(null);
  const [blogStats, setBlogStats] = useState<{ total: number; published: number; drafts: number } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setUserEmail(user.email);
    }
    async function loadStats() {
      try {
        const [ks, { data: posts }] = await Promise.all([
          getKeywordStats(),
          supabase.from('blog_posts').select('status'),
        ]);
        setKwStats(ks);
        const p = posts || [];
        setBlogStats({
          total: p.length,
          published: p.filter((x) => x.status === 'published').length,
          drafts: p.filter((x) => x.status === 'draft').length,
        });
      } catch {}
    }
    loadUser();
    loadStats();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  const contentSections: AdminSection[] = [
    {
      title: 'Keyword Manager',
      description: 'Track, prioritize, and manage keyword opportunities for content growth',
      path: '/admin/keywords',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Keyword Clusters',
      description: 'Organize keywords into topic clusters for topical authority',
      path: '/admin/clusters',
      icon: <Layers className="w-8 h-8" />,
      color: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Blog Management',
      description: 'Create, edit, and publish blog posts with AI assistance',
      path: '/admin/blog',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Image Manager',
      description: 'Upload and manage blog images',
      path: '/admin/images',
      icon: <Image className="w-8 h-8" />,
      color: 'from-slate-500 to-slate-600'
    },
  ];

  const sections: AdminSection[] = [
    {
      title: 'Contact Submissions',
      description: 'View and manage contact form submissions',
      path: '/admin/submissions',
      icon: <Mail className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'CC Authorization Password',
      description: 'Set up password for credit card authorization form',
      path: '/admin/cc-password-setup',
      icon: <Lock className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'CC Authorizations',
      description: 'View submitted credit card authorizations',
      path: '/admin/cc-authorizations',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'SEO Audit Leads',
      description: 'View leads from the Free AI Marketing Audit tool',
      path: '/admin/audit-leads',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Location Pages',
      description: 'Manage city-based local SEO landing pages across Canada',
      path: '/admin/locations',
      icon: <MapPin className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#111111] mb-2">Admin Dashboard</h1>
            <p className="text-[#666666]">Manage your website content and settings</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <User className="w-5 h-5 text-[#666666]" />
              <span className="text-sm text-[#111111]">{userEmail}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-[#666666] hover:text-[#111111] hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Content Growth Stats */}
        {(kwStats || blogStats) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
            {blogStats && (
              <>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{blogStats.total}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Total Posts</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{blogStats.published}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Published</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-amber-500">{blogStats.drafts}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Drafts</div>
                </div>
              </>
            )}
            {kwStats && (
              <>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{kwStats.total}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Keywords</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-sky-600">{kwStats.byStatus['queued'] || 0}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Queued</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">{kwStats.byStatus['draft_ready'] || 0}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Draft Ready</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-rose-500">{kwStats.byStatus['review_needed'] || 0}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Review Needed</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Content Growth Engine */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Content Growth Engine</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contentSections.map((section, index) => (
              <button
                key={index}
                onClick={() => navigate(section.path)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left border border-gray-200 hover:border-blue-200 hover:-translate-y-0.5"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {section.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{section.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{section.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Other Sections */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-5">Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => navigate(section.path)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {section.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{section.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{section.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Content Workflow</h3>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>1. Add keywords in Keyword Manager — set priority, category, business type</li>
                <li>2. Group keywords into clusters for topical authority</li>
                <li>3. In Blog Editor, select a keyword and run AI generation (outline, draft, metadata, images)</li>
                <li>4. Review generated content, tag services/industries/locations, set workflow status</li>
                <li>5. Publish or schedule the post</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
