import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Clock } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  category: string;
  read_time: number;
  published_at: string;
}

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
  tags: string[];
}

export default function RelatedPosts({ currentPostId, category, tags }: RelatedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRelatedPosts();
  }, [currentPostId, category, tags]);

  async function loadRelatedPosts() {
    try {
      let query = supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image, category, read_time, published_at')
        .eq('status', 'published')
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(3);

      query = query.eq('category', category);

      const { data, error } = await query;

      if (error) throw error;

      if (data && data.length < 3) {
        const { data: morePosts } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image, category, read_time, published_at')
          .eq('status', 'published')
          .neq('id', currentPostId)
          .neq('category', category)
          .order('published_at', { ascending: false})
          .limit(3 - data.length);

        setPosts([...data, ...(morePosts || [])]);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error loading related posts:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
          >
            {post.featured_image && (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.read_time} min
                </span>
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}