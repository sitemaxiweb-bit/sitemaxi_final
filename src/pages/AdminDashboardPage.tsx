import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image,
  Mail,
  CreditCard,
  Lock,
  LogOut,
  User
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    }
    loadUser();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  const sections: AdminSection[] = [
    {
      title: 'Blog Management',
      description: 'Create, edit, and publish blog posts',
      path: '/admin/blog',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Image Manager',
      description: 'Upload and manage blog images',
      path: '/admin/images',
      icon: <Image className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => navigate(section.path)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left border border-gray-200 hover:border-gray-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {section.icon}
              </div>

              <h3 className="text-xl font-bold text-[#111111] mb-2 group-hover:text-[#1D4ED8] transition-colors">
                {section.title}
              </h3>

              <p className="text-[#666666] text-sm">
                {section.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <LayoutDashboard className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-[#666666]">
                <li>• Use the Blog Management section to create and publish new content</li>
                <li>• Check Contact Submissions regularly to respond to inquiries</li>
                <li>• Set up CC Authorization password before sharing the form with clients</li>
                <li>• Upload images to the Image Manager before using them in blog posts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
