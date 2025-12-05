import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, FileText, Image, Mail } from 'lucide-react';
import { getAllPosts, deletePost } from '../lib/blogApi';
import { signOut, getCurrentUser } from '../lib/auth';
import { BlogPost } from '../lib/supabase';

export function AdminBlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserAndPosts();
  }, []);

  async function loadUserAndPosts() {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        await loadPosts();
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setLoading(false);
    }
  }

  async function loadPosts() {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6]"></div>
          <p className="mt-4 text-[#666666]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img
                src="/SiteMaxi Professional Websites.png"
                alt="SiteMaxi"
                className="h-8 w-auto"
              />
            </Link>
            <span className="text-[#666666]">|</span>
            <h1 className="text-xl font-bold text-[#111111]">Blog Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#666666]">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-[#666666] hover:text-[#111111] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-[#111111] mb-2">Manage Blog Posts</h2>
            <p className="text-[#666666]">Create, edit, and publish your blog articles</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/submissions"
              className="bg-white text-[#10B981] border-2 border-[#10B981] px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Submissions
            </Link>
            <Link
              to="/admin/images"
              className="bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center gap-2"
            >
              <Image className="w-5 h-5" />
              Image Manager
            </Link>
            <Link
              to="/admin/blog/new"
              className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Post
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <FileText className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#111111] mb-2">No blog posts yet</h3>
              <p className="text-[#666666] mb-6">Get started by creating your first blog post</p>
              <Link
                to="/admin/blog/new"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Create First Post
              </Link>
            </div>
          ) : (
            posts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-6">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-48 h-32 bg-gradient-to-br from-[#8B5CF6] to-[#1D4ED8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-12 h-12 text-white opacity-50" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#111111] truncate">{post.title}</h3>
                          {post.published ? (
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                              <Eye className="w-3 h-3" />
                              Published
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 bg-gray-100 text-[#666666] px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                              <EyeOff className="w-3 h-3" />
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="text-[#666666] text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-[#666666]">
                          <span className="bg-purple-50 text-[#8B5CF6] px-2 py-1 rounded">{post.category}</span>
                          <span>{post.read_time} min read</span>
                          <span>{post.views} views</span>
                          <span>
                            {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {post.published && (
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-[#666666] rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold whitespace-nowrap"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    )}
                    <Link
                      to={`/admin/blog/${post.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors text-sm font-semibold whitespace-nowrap"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold whitespace-nowrap"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
