import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { getPublishedPosts } from '../lib/blogApi';
import { BlogPost } from '../lib/supabase';
import { ResponsiveImage } from '../components/ResponsiveImage';

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data = await getPublishedPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm uppercase tracking-wide bg-purple-50 px-4 py-2 rounded-full">
                Our Blog
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
              Digital Marketing Insights & Tips
            </h1>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Stay up to date with the latest strategies, trends, and best practices to grow your business online.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666] w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#8B5CF6] text-white'
                      : 'bg-white text-[#666666] hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6]"></div>
            <p className="mt-4 text-[#666666]">Loading articles...</p>
          </div>
        </section>
      ) : filteredPosts.length === 0 ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xl text-[#666666]">No articles found. Try adjusting your search or filters.</p>
          </div>
        </section>
      ) : (
        <>
          {featuredPost && (
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#111111] mb-8">Featured Article</h2>
                <Link to={`/blog/${featuredPost.slug}`} className="group">
                  <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
                    {featuredPost.featured_image ? (
                      <div className="h-[400px] overflow-hidden">
                        <ResponsiveImage
                          src={featuredPost.featured_image}
                          alt={featuredPost.title}
                          type="featured"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-[400px] bg-gradient-to-br from-[#8B5CF6] to-[#1D4ED8] flex items-center justify-center">
                        <span className="text-6xl font-bold text-white opacity-50">Blog</span>
                      </div>
                    )}
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {featuredPost.category}
                        </span>
                        <div className="flex items-center text-[#666666] text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPost.read_time} min read
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-[#111111] mb-4 group-hover:text-[#8B5CF6] transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-[#666666] mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {featuredPost.author_avatar ? (
                            <ResponsiveImage
                              src={featuredPost.author_avatar}
                              alt={featuredPost.author_name}
                              type="avatar"
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6]"></div>
                          )}
                          <div>
                            <div className="font-semibold text-[#111111]">{featuredPost.author_name}</div>
                            <div className="text-sm text-[#666666] flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#8B5CF6] font-semibold group-hover:gap-3 transition-all">
                          Read More <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {regularPosts.length > 0 && (
            <section className="py-20 bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#111111] mb-8">Latest Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map(post => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {post.featured_image ? (
                        <div className="h-48 overflow-hidden">
                          <ResponsiveImage
                            src={post.featured_image}
                            alt={post.title}
                            type="featured"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-[#8B5CF6] to-[#1D4ED8] flex items-center justify-center">
                          <span className="text-4xl font-bold text-white opacity-50">Blog</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-purple-50 text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                          <div className="flex items-center text-[#666666] text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.read_time} min
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#111111] mb-2 group-hover:text-[#8B5CF6] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#666666] text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                          {post.author_avatar ? (
                            <ResponsiveImage
                              src={post.author_avatar}
                              alt={post.author_name}
                              type="avatar"
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6]"></div>
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-[#111111]">{post.author_name}</div>
                            <div className="text-xs text-[#666666]">
                              {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#8B5CF6] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
