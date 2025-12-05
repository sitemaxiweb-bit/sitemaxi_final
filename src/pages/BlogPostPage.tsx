import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Eye } from 'lucide-react';
import { getPostBySlug, incrementViews } from '../lib/blogApi';
import { BlogPost } from '../lib/supabase';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  async function loadPost(slug: string) {
    try {
      const data = await getPostBySlug(slug);
      if (data) {
        setPost(data);
        await incrementViews(data.id);
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6]"></div>
          <p className="mt-4 text-[#666666]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-bold text-[#111111] mb-4">Article Not Found</h1>
          <p className="text-[#666666] mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#8B5CF6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7C3AED] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {post && (
        <>
          <SEOHead
            title={post.title}
            description={post.excerpt}
            ogImage={post.featured_image || undefined}
            ogType="article"
            article={{
              publishedTime: post.published_at,
              modifiedTime: post.updated_at,
              author: post.author_name,
              tags: post.tags || [],
            }}
          />
          <StructuredData
            type="article"
            data={{
              headline: post.title,
              description: post.excerpt,
              image: post.featured_image || 'https://sitemaxi.com/SiteMaxi Professional Websites.png',
              datePublished: post.published_at,
              dateModified: post.updated_at || post.published_at,
              author: {
                name: post.author_name,
              },
              publisher: {
                name: 'SiteMaxi',
                logo: 'https://sitemaxi.com/SiteMaxi Professional Websites.png',
              },
            }}
          />
        </>
      )}
      <article>
        <section className="bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB] pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#8B5CF6] font-semibold hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#8B5CF6] text-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <div className="flex items-center text-[#666666]">
                <Clock className="w-4 h-4 mr-1" />
                {post.read_time} min read
              </div>
              <div className="flex items-center text-[#666666]">
                <Eye className="w-4 h-4 mr-1" />
                {post.views} views
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-[#666666] mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
              {post.author_avatar ? (
                <ResponsiveImage
                  src={post.author_avatar}
                  alt={post.author_name}
                  type="avatar"
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6]"></div>
              )}
              <div>
                <div className="font-bold text-[#111111] text-lg">{post.author_name}</div>
                <div className="text-[#666666] flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Published on {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {post.featured_image && (
          <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-6">
              <ResponsiveImage
                src={post.featured_image}
                alt={post.title}
                type="featured"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </section>
        )}

        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#111111] prose-p:text-[#666666] prose-p:leading-relaxed prose-a:text-[#8B5CF6] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#111111] prose-ul:text-[#666666] prose-ol:text-[#666666]"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-[#666666]" />
                  <span className="text-[#666666] font-semibold mr-2">Tags:</span>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-[#666666] px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Ready to grow your business?
            </h2>
            <p className="text-xl text-[#666666] mb-10">
              Let's discuss how we can help you achieve your digital marketing goals.
            </p>
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule a Free Consultation
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}
