import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, Eye, ArrowLeft, X, Upload, Image as ImageIcon, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { createPost, updatePost, getPostById } from '../lib/blogApi';
import { getCurrentUser } from '../lib/auth';
import { BlogPost, supabase } from '../lib/supabase';
import RichTextEditor, { RichTextEditorRef } from '../components/RichTextEditor';
import MediaLibrary from '../components/MediaLibrary';
import { calculateReadTime, generateSlug } from '../utils/blogHelpers';

interface Author {
  id: string;
  name: string;
  avatar_url: string;
}

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  alt_text?: string;
  caption?: string;
}

export function AdminBlogEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = id && id !== 'new';
  const editorRef = useRef<RichTextEditorRef>(null);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [originalSlug, setOriginalSlug] = useState('');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);

  const [category, setCategory] = useState('SEO');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [readTime, setReadTime] = useState(5);

  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [scheduleFor, setScheduleFor] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaSelectMode, setMediaSelectMode] = useState<'featured' | 'og' | 'inline'>('featured');
  const [showSEOPanel, setShowSEOPanel] = useState(false);

  const categories = ['SEO', 'Social Media', 'Web Design', 'Google Ads', 'Content Marketing', 'Analytics', 'General'];

  useEffect(() => {
    initializeEditor();
    loadAuthors();
  }, []);

  useEffect(() => {
    if (title && !isEditMode) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditMode]);

  useEffect(() => {
    setReadTime(calculateReadTime(content));
  }, [content]);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (title && content && isEditMode) {
        handleAutoSave();
      }
    }, 10000);

    return () => clearTimeout(autoSaveTimer);
  }, [title, slug, excerpt, content, status, scheduleFor]);

  async function initializeEditor() {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return;
      }

      if (isEditMode && id) {
        await loadPost(id);
      }
    } catch (error) {
      navigate('/admin/login');
    }
  }

  async function loadAuthors() {
    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name');

      if (error) throw error;
      setAuthors(data || []);
    } catch (error) {
      console.error('Error loading authors:', error);
    }
  }

  async function loadPost(postId: string) {
    try {
      const post = await getPostById(postId);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setOriginalSlug(post.slug);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setFeaturedImage(post.featured_image || '');
        setAuthorId(post.author_id || '');
        setCategory(post.category);
        setTags(post.tags || []);
        setReadTime(post.read_time);
        setStatus(post.status || 'published');

        if (post.meta_title) setMetaTitle(post.meta_title);
        if (post.meta_description) setMetaDescription(post.meta_description);
        if (post.og_title) setOgTitle(post.og_title);
        if (post.og_description) setOgDescription(post.og_description);
        if (post.og_image) setOgImage(post.og_image);

        if (post.schedule_for) {
          const date = new Date(post.schedule_for);
          const localDatetime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
          setScheduleFor(localDatetime);
        }
        if (post.published_at) {
          const date = new Date(post.published_at);
          const localDatetime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
          setPublishedAt(localDatetime);
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
      alert('Failed to load post');
    } finally {
      setLoading(false);
    }
  }

  async function handleAutoSave() {
    if (!isEditMode || !id) return;

    setAutoSaving(true);
    try {
      const author = authors.find(a => a.id === authorId);
      const postData: Partial<BlogPost> = {
        title,
        slug,
        excerpt,
        content,
        featured_image: featuredImage || null,
        author_id: authorId || null,
        author_name: author?.name || '',
        author_avatar: author?.avatar_url || null,
        category,
        tags,
        read_time: readTime,
        status,
        schedule_for: scheduleFor ? new Date(scheduleFor).toISOString() : null,
        published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        og_title: ogTitle || null,
        og_description: ogDescription || null,
        og_image: ogImage || null,
      };

      await updatePost(id, postData);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Autosave failed:', error);
    } finally {
      setAutoSaving(false);
    }
  }

  async function handleSubmit(e: React.FormEvent, newStatus: 'draft' | 'published' | 'scheduled' = status) {
    e.preventDefault();

    if (!title || !slug || !excerpt || !content || !authorId) {
      alert('Please fill in all required fields');
      return;
    }

    if (newStatus === 'scheduled' && !scheduleFor) {
      alert('Please set a schedule date/time for scheduled posts');
      return;
    }

    setSaving(true);

    try {
      if (isEditMode && originalSlug && originalSlug !== slug) {
        const { error: redirectError } = await supabase
          .from('post_redirects')
          .insert({
            old_slug: originalSlug,
            new_slug: slug,
            post_id: id
          });

        if (redirectError) console.error('Failed to create redirect:', redirectError);
      }

      const author = authors.find(a => a.id === authorId);
      const postData: Partial<BlogPost> = {
        title,
        slug,
        excerpt,
        content,
        featured_image: featuredImage || null,
        author_id: authorId,
        author_name: author?.name || '',
        author_avatar: author?.avatar_url || null,
        category,
        tags,
        read_time: readTime,
        status: newStatus,
        schedule_for: scheduleFor ? new Date(scheduleFor).toISOString() : null,
        published_at: publishedAt ? new Date(publishedAt).toISOString() : (newStatus === 'published' ? new Date().toISOString() : null),
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        og_title: ogTitle || null,
        og_description: ogDescription || null,
        og_image: ogImage || null,
        original_slug: originalSlug || slug,
      };

      if (isEditMode && id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }

      navigate('/admin/blog');
    } catch (error: any) {
      console.error('Error saving post:', error);
      alert(error.message || 'Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function handleAddTag() {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }

  function handleMediaSelect(media: MediaItem) {
    if (mediaSelectMode === 'featured') {
      setFeaturedImage(media.url);
    } else if (mediaSelectMode === 'og') {
      setOgImage(media.url);
    } else if (mediaSelectMode === 'inline') {
      editorRef.current?.insertImage(media.url, media.alt_text || media.filename);
    }
    setShowMediaLibrary(false);
  }

  function handlePreview() {
    if (id) {
      window.open(`/blog/${slug}?preview=true`, '_blank');
    } else {
      alert('Please save as draft first to preview');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showMediaLibrary && (
        <MediaLibrary
          mode="select"
          onSelectImage={handleMediaSelect}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}

      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <Link
              to="/admin/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              {autoSaving && (
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Saving...
                </span>
              )}
              {lastSaved && !autoSaving && (
                <span className="text-sm text-gray-500">
                  Saved at {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <button
                type="button"
                onClick={handlePreview}
                disabled={!id}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Eye className="w-5 h-5" />
                Preview
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'draft')}
                disabled={saving}
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, status === 'scheduled' ? 'scheduled' : 'published')}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : status === 'scheduled' ? (
                  <>
                    <Clock className="w-5 h-5" />
                    Schedule
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Publish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="url-friendly-slug"
                />
                <p className="text-xs text-gray-600 mt-1">URL: /blog/{slug || 'your-slug'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                  rows={3}
                  maxLength={200}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Brief description of the post (max 200 characters)"
                />
                <p className="text-xs text-gray-600 mt-1">{excerpt.length}/200 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                  ref={editorRef}
                  content={content}
                  onChange={setContent}
                  onImageInsert={() => {
                    setMediaSelectMode('inline');
                    setShowMediaLibrary(true);
                  }}
                  placeholder="Start writing your blog post..."
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-600">
                    {calculateReadTime(content)} min read • {content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length} words
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Media & Author</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Featured Image <span className="text-red-500">*</span>
                </label>
                {featuredImage && (
                  <div className="relative inline-block mb-3">
                    <img
                      src={featuredImage}
                      alt="Featured preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setFeaturedImage('')}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMediaSelectMode('featured');
                    setShowMediaLibrary(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                >
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Select from Media Library</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Author <span className="text-red-500">*</span>
                </label>
                <select
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select an author</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Publishing Options</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="draft">Draft (Not visible to public)</option>
                  <option value="published">Published (Visible immediately)</option>
                  <option value="scheduled">Scheduled (Publish at specific time)</option>
                </select>
              </div>

              {status === 'scheduled' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Schedule For <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduleFor}
                    onChange={(e) => setScheduleFor(e.target.value)}
                    required={status === 'scheduled'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Backdate Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-blue-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <button
              type="button"
              onClick={() => setShowSEOPanel(!showSEOPanel)}
              className="w-full px-8 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900">SEO & Social Sharing</h2>
              {showSEOPanel ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>

            {showSEOPanel && (
              <div className="px-8 pb-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Meta Title
                      <span className="text-xs text-gray-600 font-normal ml-2">(Max 60 chars)</span>
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      maxLength={60}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={title || 'Defaults to post title'}
                    />
                    <p className="text-xs text-gray-600 mt-1">{metaTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Meta Description
                      <span className="text-xs text-gray-600 font-normal ml-2">(Max 160 chars)</span>
                    </label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      maxLength={160}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                      placeholder={excerpt || 'Defaults to excerpt'}
                    />
                    <p className="text-xs text-gray-600 mt-1">{metaDescription.length}/160 characters</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Open Graph Title
                    </label>
                    <input
                      type="text"
                      value={ogTitle}
                      onChange={(e) => setOgTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={metaTitle || title || 'Defaults to meta title'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Open Graph Description
                    </label>
                    <textarea
                      value={ogDescription}
                      onChange={(e) => setOgDescription(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                      placeholder={metaDescription || excerpt || 'Defaults to meta description'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Open Graph Image
                  </label>
                  {ogImage && (
                    <div className="relative inline-block mb-3">
                      <img
                        src={ogImage}
                        alt="OG preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setOgImage('')}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMediaSelectMode('og');
                      setShowMediaLibrary(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600 font-medium">
                      {ogImage ? 'Change Image' : 'Select from Media Library (Defaults to featured image)'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}