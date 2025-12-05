import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPublishedPosts } from '../lib/blogApi';
import { BlogPost as BlogPostType } from '../lib/supabase';

export function Blog() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const allPosts = await getPublishedPosts();
      setPosts(allPosts.slice(0, 3));
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <section className="py-32 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
              Blog & Insights
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Marketing insights to help you grow
          </h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            Expert advice, proven strategies, and industry insights to keep you ahead of the curve.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6] mx-auto"></div>
            <p className="text-[#666666] mt-4">Loading articles...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#666666]">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#8B5CF6] hover:shadow-2xl transition-all duration-500 block"
              >
                <div className="relative overflow-hidden h-[240px]">
                  <img
                    src={post.featured_image || 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-[#8B5CF6] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-[#666666]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.published_at ? formatDate(post.published_at) : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.read_time} min read</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#111111] mb-3 group-hover:text-[#8B5CF6] transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-[#666666] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-[#666666]">By {post.author_name}</span>
                    <div className="text-[#8B5CF6] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      Read More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link to="/blog" className="inline-block bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-10 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] hover:scale-105 transition-all duration-300 text-lg shadow-lg">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
