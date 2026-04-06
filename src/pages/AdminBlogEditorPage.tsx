import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, Eye, ArrowLeft, X, Image as ImageIcon, Clock, ChevronDown, ChevronUp, Sparkles, Wand2, FileText, Link2, Loader2, Search, Tag } from 'lucide-react';
import { createPost, updatePost, getPostById } from '../lib/blogApi';
import { getCurrentUser } from '../lib/auth';
import { BlogPost, supabase } from '../lib/supabase';
import RichTextEditor, { RichTextEditorRef } from '../components/RichTextEditor';
import MediaLibrary from '../components/MediaLibrary';
import { calculateReadTime, generateSlug } from '../utils/blogHelpers';
import { getClusters, getKeywords, SERVICES, INDUSTRIES, type KeywordCluster, type Keyword } from '../lib/keywordApi';

const LOCATIONS_LIST = [
  'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Coquitlam',
  'Langley', 'Abbotsford', 'Kelowna', 'Victoria', 'Calgary',
  'Edmonton', 'Toronto', 'Ottawa', 'Montreal', 'Canada',
];

type GenerationMode = 'titles' | 'outline' | 'draft' | 'full_package' | 'image_prompts' | 'metadata';

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

  // Content system fields
  const [relatedServices, setRelatedServices] = useState<string[]>([]);
  const [relatedIndustries, setRelatedIndustries] = useState<string[]>([]);
  const [relatedLocations, setRelatedLocations] = useState<string[]>([]);
  const [clusterId, setClusterId] = useState('');
  const [keywordId, setKeywordId] = useState('');
  const [audienceType, setAudienceType] = useState('both');
  const [contentType, setContentType] = useState('supporting');
  const [ctaType, setCtaType] = useState('audit');
  const [workflowStatus, setWorkflowStatus] = useState('content_idea');
  const [workflowNotes, setWorkflowNotes] = useState('');
  const [featuredImagePrompt, setFeaturedImagePrompt] = useState('');
  const [socialImagePrompt, setSocialImagePrompt] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [internalLinks, setInternalLinks] = useState<Array<{ anchorText: string; targetPage: string; url: string }>>([]);
  const [faqSection, setFaqSection] = useState<Array<{ question: string; answer: string }>>([]);

  // AI generation
  const [clusters, setClusters] = useState<KeywordCluster[]>([]);
  const [keywords, setKeywordsList] = useState<Keyword[]>([]);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<string[]>([]);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [showKeywordDropdown, setShowKeywordDropdown] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showContentSystem, setShowContentSystem] = useState(false);
  const [generationMode, setGenerationMode] = useState<GenerationMode>('full_package');
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<Record<string, unknown> | null>(null);
  const [generationError, setGenerationError] = useState('');
  const [generatingImage, setGeneratingImage] = useState(false);

  const categories = ['SEO', 'Social Media', 'Web Design', 'Google Ads', 'Content Marketing', 'Analytics', 'General'];

  useEffect(() => {
    initializeEditor();
    loadAuthors();
    getClusters().then(setClusters).catch(console.error);
    getKeywords().then(setKeywordsList).catch(console.error);
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

        // Content system fields
        const p = post as BlogPost & Record<string, unknown>;
        if (Array.isArray(p.related_services)) setRelatedServices(p.related_services as string[]);
        if (Array.isArray(p.related_industries)) setRelatedIndustries(p.related_industries as string[]);
        if (Array.isArray(p.related_locations)) setRelatedLocations(p.related_locations as string[]);
        if (p.cluster_id) setClusterId(p.cluster_id as string);
        if (p.keyword_id) setKeywordId(p.keyword_id as string);
        if (p.audience_type) setAudienceType(p.audience_type as string);
        if (p.content_type) setContentType(p.content_type as string);
        if (p.cta_type) setCtaType(p.cta_type as string);
        if (p.workflow_status) setWorkflowStatus(p.workflow_status as string);
        if (p.workflow_notes) setWorkflowNotes(p.workflow_notes as string);
        if (p.featured_image_prompt) setFeaturedImagePrompt(p.featured_image_prompt as string);
        if (p.social_image_prompt) setSocialImagePrompt(p.social_image_prompt as string);
        if (p.featured_image_alt) setFeaturedImageAlt(p.featured_image_alt as string);
        if (p.internal_links) setInternalLinks(p.internal_links as Array<{ anchorText: string; targetPage: string; url: string }>);
        if (p.faq_section) setFaqSection(p.faq_section as Array<{ question: string; answer: string }>);
      }
    } catch (error) {
      console.error('Error loading post:', error);
      alert('Failed to load post');
    } finally {
      setLoading(false);
    }
  }

  function buildContentSystemData(): Record<string, unknown> {
    return {
      related_services: relatedServices.length ? relatedServices : null,
      related_industries: relatedIndustries.length ? relatedIndustries : null,
      related_locations: relatedLocations.length ? relatedLocations : null,
      cluster_id: clusterId || null,
      keyword_id: keywordId || null,
      audience_type: audienceType,
      content_type: contentType,
      cta_type: ctaType,
      workflow_status: workflowStatus,
      workflow_notes: workflowNotes || null,
      featured_image_prompt: featuredImagePrompt || null,
      social_image_prompt: socialImagePrompt || null,
      featured_image_alt: featuredImageAlt || null,
      internal_links: internalLinks.length ? internalLinks : null,
      faq_section: faqSection.length ? faqSection : null,
    };
  }

  function buildKeywordString(): string {
    if (selectedKeywordIds.length > 0) {
      return selectedKeywordIds
        .map(id => keywords.find(k => k.id === id)?.keyword)
        .filter(Boolean)
        .join(', ');
    }
    if (keywordId) {
      return keywords.find(k => k.id === keywordId)?.keyword || title;
    }
    return title;
  }

  async function handleGenerateImage(prompt: string) {
    if (!prompt) return;
    setGeneratingImage(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(`${supabaseUrl}/functions/v1/generate-blog-content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'generate_image',
          keyword: buildKeywordString() || title,
          imagePrompt: prompt,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json() as Record<string, unknown>;
      if (result.imageUrl) {
        setFeaturedImage(result.imageUrl as string);
      }
    } catch (e: unknown) {
      setGenerationError('Image generation failed: ' + (e as Error).message);
    } finally {
      setGeneratingImage(false);
    }
  }

  async function handleGenerate() {
    const keyword = buildKeywordString();
    if (!keyword) { setGenerationError('Select keywords or enter a title first'); return; }

    setGenerating(true);
    setGenerationError('');
    setGenerationResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(`${supabaseUrl}/functions/v1/generate-blog-content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: generationMode,
          keyword,
          keywords: selectedKeywordIds.map(id => keywords.find(k => k.id === id)?.keyword).filter(Boolean),
          articleTitle: title || undefined,
          businessType: audienceType === 'local_business' ? 'local' : audienceType === 'ecommerce_owner' ? 'ecommerce' : 'both',
          targetAudience: audienceType,
          services: relatedServices,
          industries: relatedIndustries,
          locations: relatedLocations,
          ctaType,
          contentType,
          generateImage: generationMode === 'full_package',
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      setGenerationResult(result);

      // Auto-apply results to form
      if (generationMode === 'draft' || generationMode === 'full_package') {
        const draft = generationMode === 'full_package' ? (result as Record<string, unknown>).draft as Record<string, unknown> : result as Record<string, unknown>;
        if (draft?.title && !title) setTitle(draft.title as string);
        if (draft?.content) {
          const htmlContent = draft.content as string;
          setContent(htmlContent);
          editorRef.current?.setContent(htmlContent);
        }
        if (draft?.excerpt) setExcerpt((draft.excerpt as string).slice(0, 200));
      }
      if (generationMode === 'metadata' || generationMode === 'full_package') {
        const meta = generationMode === 'full_package' ? (result as Record<string, unknown>).metadata as Record<string, unknown> : result as Record<string, unknown>;
        if (meta?.metaTitle) setMetaTitle(meta.metaTitle as string);
        if (meta?.metaDescription) setMetaDescription(meta.metaDescription as string);
        if (meta?.ogTitle) setOgTitle(meta.ogTitle as string);
        if (meta?.ogDescription) setOgDescription(meta.ogDescription as string);
        if (meta?.slug && !slug) setSlug(meta.slug as string);
        if (meta?.tags) setTags(meta.tags as string[]);
      }
      if (generationMode === 'outline' || generationMode === 'full_package') {
        const outline = generationMode === 'full_package' ? (result as Record<string, unknown>).outline as Record<string, unknown> : result as Record<string, unknown>;
        if (outline?.internalLinks) setInternalLinks(outline.internalLinks as Array<{ anchorText: string; targetPage: string; url: string }>);
        if (outline?.recommendedTitle && !title) setTitle(outline.recommendedTitle as string);
      }
      if (generationMode === 'full_package') {
        const faq = (result as Record<string, unknown>).faq as Record<string, unknown>;
        if (faq?.faqs) setFaqSection(faq.faqs as Array<{ question: string; answer: string }>);
        const imgs = (result as Record<string, unknown>).imagePrompts as Record<string, unknown>;
        if (imgs?.featuredImagePrompt) setFeaturedImagePrompt(imgs.featuredImagePrompt as string);
        if (imgs?.socialImagePrompt) setSocialImagePrompt(imgs.socialImagePrompt as string);
        if (imgs?.featuredImageAlt) setFeaturedImageAlt(imgs.featuredImageAlt as string);
        const generatedImageUrl = (result as Record<string, unknown>).generatedImageUrl as string | undefined;
        if (generatedImageUrl) setFeaturedImage(generatedImageUrl);
      }
      if (generationMode === 'image_prompts') {
        const imgs = result as Record<string, unknown>;
        if (imgs.featuredImagePrompt) setFeaturedImagePrompt(imgs.featuredImagePrompt as string);
        if (imgs.socialImagePrompt) setSocialImagePrompt(imgs.socialImagePrompt as string);
        if (imgs.featuredImageAlt) setFeaturedImageAlt(imgs.featuredImageAlt as string);
      }
    } catch (e: unknown) {
      setGenerationError((e as Error).message);
    } finally {
      setGenerating(false);
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
        ...buildContentSystemData(),
      } as Partial<BlogPost>;

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
        ...buildContentSystemData(),
      } as Partial<BlogPost>;

      if (isEditMode && id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }

      if (newStatus === 'published') {
        const postUrl = `https://sitemaxi.com/blog/${slug}`;
        supabase.functions.invoke('submit-indexnow', {
          body: { urls: [postUrl] },
        }).catch(() => {});
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

          {/* AI Content Generation Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <button
              type="button"
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="w-full px-8 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Content Generation</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Generate outlines, drafts, metadata, image prompts, and more</p>
                </div>
              </div>
              {showAIPanel ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
            </button>

            {showAIPanel && (
              <div className="px-8 pb-8 space-y-6 border-t border-gray-100 pt-6">

                {/* Multi-keyword selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Target Keywords
                    <span className="text-xs text-gray-500 font-normal ml-2">Select one or more keywords — or pick a cluster to auto-load all</span>
                  </label>

                  <div className="flex gap-3 mb-3">
                    <div className="flex-1">
                      <select
                        value={clusterId}
                        onChange={(e) => {
                          const cid = e.target.value;
                          setClusterId(cid);
                          if (cid) {
                            const cluster = clusters.find(c => c.id === cid);
                            if (cluster) {
                              const clusterKwIds = keywords
                                .filter(k => cluster.supporting_keywords?.includes(k.keyword) || k.keyword === cluster.main_keyword)
                                .map(k => k.id);
                              setSelectedKeywordIds(clusterKwIds);
                            }
                          }
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      >
                        <option value="">Load from cluster...</option>
                        {clusters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={keywordSearch}
                        onChange={(e) => setKeywordSearch(e.target.value)}
                        placeholder="Search keywords..."
                        className="flex-1 text-sm bg-transparent focus:outline-none"
                      />
                      {selectedKeywordIds.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedKeywordIds([])}
                          className="text-xs text-gray-500 hover:text-red-500 transition-colors whitespace-nowrap"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                      {keywords
                        .filter(k => !keywordSearch || k.keyword.toLowerCase().includes(keywordSearch.toLowerCase()))
                        .map(kw => {
                          const selected = selectedKeywordIds.includes(kw.id);
                          return (
                            <button
                              key={kw.id}
                              type="button"
                              onClick={() => setSelectedKeywordIds(
                                selected
                                  ? selectedKeywordIds.filter(id => id !== kw.id)
                                  : [...selectedKeywordIds, kw.id]
                              )}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${selected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                              <div className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                {selected && <X className="w-2.5 h-2.5 text-white" />}
                              </div>
                              <span className={`text-sm ${selected ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>{kw.keyword}</span>
                              <span className={`ml-auto text-xs px-1.5 py-0.5 rounded ${selected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>{kw.category}</span>
                            </button>
                          );
                        })}
                      {keywords.filter(k => !keywordSearch || k.keyword.toLowerCase().includes(keywordSearch.toLowerCase())).length === 0 && (
                        <p className="px-4 py-4 text-sm text-gray-500 text-center">No keywords found</p>
                      )}
                    </div>
                  </div>

                  {selectedKeywordIds.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedKeywordIds.map(id => {
                        const kw = keywords.find(k => k.id === id);
                        return kw ? (
                          <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            <Tag className="w-3 h-3" />
                            {kw.keyword}
                            <button type="button" onClick={() => setSelectedKeywordIds(prev => prev.filter(i => i !== id))} className="hover:text-blue-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Generation Mode</label>
                  <select
                    value={generationMode}
                    onChange={(e) => setGenerationMode(e.target.value as GenerationMode)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="full_package">Full Package — Content + Images + SEO (Recommended)</option>
                    <option value="titles">Title Options Only</option>
                    <option value="outline">Outline Only</option>
                    <option value="draft">Draft Only</option>
                    <option value="metadata">Metadata Only</option>
                    <option value="image_prompts">Image Prompts Only</option>
                  </select>
                  {generationMode === 'full_package' && (
                    <p className="text-xs text-gray-500 mt-1.5">Generates full article, SEO metadata, FAQ, internal links, image prompts, and AI featured image in one click.</p>
                  )}
                </div>

                {generationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{generationError}</div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={generating || generatingImage}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {generating ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> {generationMode === 'full_package' ? 'Generating full blog...' : 'Generating...'}</>
                    ) : (
                      <><Wand2 className="w-5 h-5" /> {generationMode === 'full_package' ? 'Generate Full Blog with Image' : 'Generate Content'}</>
                    )}
                  </button>
                  {featuredImagePrompt && (
                    <button
                      type="button"
                      onClick={() => handleGenerateImage(featuredImagePrompt)}
                      disabled={generatingImage || generating}
                      className="flex items-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg font-semibold text-sm hover:bg-gray-900 disabled:opacity-50 transition-colors"
                    >
                      {generatingImage ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Generating image...</>
                      ) : (
                        <><ImageIcon className="w-4 h-4" /> Generate Image</>
                      )}
                    </button>
                  )}
                </div>

                {generationResult && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <p className="text-sm font-semibold text-green-800 mb-3">Generation complete — results applied to form fields above.</p>

                    {/* Show title options if generated */}
                    {(generationResult.titles as { titles?: Array<{ title: string; format: string; angle: string }> })?.titles && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-green-700 mb-2">Title Options — click to apply:</p>
                        <div className="space-y-1">
                          {(generationResult.titles as { titles: Array<{ title: string; format: string; angle: string }> }).titles.map((t, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setTitle(t.title)}
                              className="w-full text-left text-xs px-3 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-gray-800"
                            >
                              <span className="font-medium text-green-700 uppercase text-[10px] mr-2">{t.format}</span>{t.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* FAQ preview */}
                    {faqSection.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-green-700 mb-1">{faqSection.length} FAQ questions generated</p>
                      </div>
                    )}

                    {/* Image prompts preview */}
                    {featuredImagePrompt && (
                      <div className="mt-3 text-xs text-green-700">
                        <span className="font-semibold">Featured image prompt saved</span> — visible in Content System panel below.
                      </div>
                    )}

                    {internalLinks.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-green-700 mb-1">{internalLinks.length} internal link suggestions generated</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content System Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <button
              type="button"
              onClick={() => setShowContentSystem(!showContentSystem)}
              className="w-full px-8 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Content System</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Workflow, linking, image prompts, audience, and SEO connections</p>
                </div>
              </div>
              {showContentSystem ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
            </button>

            {showContentSystem && (
              <div className="px-8 pb-8 space-y-6 border-t border-gray-100 pt-6">
                {/* Workflow */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Workflow Status</label>
                    <select value={workflowStatus} onChange={(e) => setWorkflowStatus(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="content_idea">Content Idea</option>
                      <option value="outline_ready">Outline Ready</option>
                      <option value="draft_ready">Draft Ready</option>
                      <option value="review_needed">Review Needed</option>
                      <option value="approved">Approved</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Keyword Cluster</label>
                    <select value={clusterId} onChange={(e) => setClusterId(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">No cluster</option>
                      {clusters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Audience Type</label>
                    <select value={audienceType} onChange={(e) => setAudienceType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="local_business">Local Business</option>
                      <option value="ecommerce_owner">E-Commerce</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Content Type</label>
                    <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="pillar">Pillar Page</option>
                      <option value="supporting">Supporting Article</option>
                      <option value="listicle">Listicle</option>
                      <option value="how_to">How-To Guide</option>
                      <option value="case_study">Case Study</option>
                      <option value="news">News/Update</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">CTA Type</label>
                    <select value={ctaType} onChange={(e) => setCtaType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="audit">Free SEO Audit</option>
                      <option value="strategy_call">Book Strategy Call</option>
                      <option value="contact">Contact Form</option>
                      <option value="resource">Resource</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                {/* Related Services */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Related Services</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button key={s} type="button"
                        onClick={() => setRelatedServices(relatedServices.includes(s) ? relatedServices.filter((x) => x !== s) : [...relatedServices, s])}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${relatedServices.includes(s) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Related Industries */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Related Industries</label>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <button key={ind} type="button"
                        onClick={() => setRelatedIndustries(relatedIndustries.includes(ind) ? relatedIndustries.filter((x) => x !== ind) : [...relatedIndustries, ind])}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${relatedIndustries.includes(ind) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Related Locations */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Related Locations</label>
                  <div className="flex flex-wrap gap-2">
                    {LOCATIONS_LIST.map((loc) => (
                      <button key={loc} type="button"
                        onClick={() => setRelatedLocations(relatedLocations.includes(loc) ? relatedLocations.filter((x) => x !== loc) : [...relatedLocations, loc])}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${relatedLocations.includes(loc) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Prompts */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Featured Image Prompt</label>
                    <textarea value={featuredImagePrompt} onChange={(e) => setFeaturedImagePrompt(e.target.value)} rows={3}
                      placeholder="AI image generation prompt for hero image..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Social Image Prompt</label>
                    <textarea value={socialImagePrompt} onChange={(e) => setSocialImagePrompt(e.target.value)} rows={3}
                      placeholder="Prompt for social media share image..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Featured Image Alt Text</label>
                  <input type="text" value={featuredImageAlt} onChange={(e) => setFeaturedImageAlt(e.target.value)}
                    placeholder="Alt text for featured image (for accessibility and SEO)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>

                {/* Internal Links */}
                {internalLinks.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Internal Link Suggestions</label>
                    <div className="space-y-2">
                      {internalLinks.map((link, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                          <div>
                            <span className="text-sm font-medium text-blue-600">{link.anchorText}</span>
                            <span className="text-xs text-gray-500 ml-3">{link.url}</span>
                          </div>
                          <button type="button" onClick={() => setInternalLinks(internalLinks.filter((_, idx) => idx !== i))}
                            className="text-gray-400 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ Section */}
                {faqSection.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">FAQ Section ({faqSection.length} questions)</label>
                    <div className="space-y-2">
                      {faqSection.map((faq, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-800">{faq.question}</p>
                              <p className="text-xs text-gray-600 mt-1">{faq.answer}</p>
                            </div>
                            <button type="button" onClick={() => setFaqSection(faqSection.filter((_, idx) => idx !== i))}
                              className="text-gray-400 hover:text-red-500 flex-shrink-0">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workflow Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Workflow Notes</label>
                  <textarea value={workflowNotes} onChange={(e) => setWorkflowNotes(e.target.value)} rows={2}
                    placeholder="Internal notes for reviewers, editors..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none text-sm" />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}