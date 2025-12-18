import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Eye } from 'lucide-react';
import { getPostBySlug, incrementViews } from '../lib/blogApi';
import { BlogPost } from '../lib/supabase';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import TableOfContents from '../components/TableOfContents';
import ShareButtons from '../components/ShareButtons';
import RelatedPosts from '../components/RelatedPosts';
import { addHeadingIds } from '../utils/blogHelpers';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentWithIds, setContentWithIds] = useState('');
  const isPreview = searchParams.get('preview') === 'true';

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      setContentWithIds(addHeadingIds(post.content));
    }
  }, [post]);

  async function loadPost(slug: string) {
    try {
      const data = await getPostBySlug(slug);
      if (data) {
        if (!isPreview && data.status !== 'published') {
          setPost(null);
          setLoading(false);
          return;
        }

        setPost(data);
        if (!isPreview) {
          await incrementViews(data.id);
        }
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const metaTitle = post.meta_title || post.title;
  const metaDescription = post.meta_description || post.excerpt;
  const ogImageUrl = post.og_image || post.featured_image || undefined;
  const ogTitleText = post.og_title || metaTitle;
  const ogDescriptionText = post.og_description || metaDescription;

  return (
    <div className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-yellow-100 border-b-2 border-yellow-400 px-6 py-3 text-center">
          <p className="text-yellow-900 font-semibold">Preview Mode - This post is not publicly visible</p>
        </div>
      )}

      {post && (
        <>
          <SEOHead
            title={metaTitle}
            description={metaDescription}
            ogImage={ogImageUrl}
            ogType="article"
            ogTitle={ogTitleText}
            ogDescription={ogDescriptionText}
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
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {post.read_time} min read
              </div>
              <div className="flex items-center text-gray-600">
                <Eye className="w-4 h-4 mr-1" />
                {post.views} views
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
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
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
              )}
              <div>
                <div className="font-bold text-gray-900 text-lg">{post.author_name}</div>
                <div className="text-gray-600 flex items-center">
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
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8">
              <div className="flex-1 max-w-3xl">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-24
                    prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
                    prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:text-gray-700 prose-ul:my-6 prose-ul:space-y-2
                    prose-ol:text-gray-700 prose-ol:my-6 prose-ol:space-y-2
                    prose-li:text-gray-700
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
                    prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:my-6
                    prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                    prose-hr:my-8"
                  dangerouslySetInnerHTML={{ __html: contentWithIds }}
                />

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-600 font-semibold mr-2">Tags:</span>
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12">
                  <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
                </div>
              </div>

              <aside className="hidden lg:block w-80">
                <TableOfContents content={contentWithIds} />
              </aside>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <RelatedPosts
              currentPostId={post.id}
              category={post.category}
              tags={post.tags || []}
            />
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to grow your business?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Let's discuss how we can help you achieve your digital marketing goals.
            </p>
            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule a Free Consultation
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}