import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, Eye, ArrowLeft, X, Upload, Image as ImageIcon } from 'lucide-react';
import { createPost, updatePost, getPostById, generateSlug } from '../lib/blogApi';
import { getCurrentUser } from '../lib/auth';
import { BlogPost, supabase } from '../lib/supabase';
import { cropToSquare, cropToAspectRatio, generateFileName, getOptimalQuality, IMAGE_SIZES } from '../lib/imageOptimization';

export function AdminBlogEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = id && id !== 'new';

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [category, setCategory] = useState('SEO');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [published, setPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState('');
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const categories = ['SEO', 'Social Media', 'Web Design', 'Google Ads', 'Content Marketing', 'Analytics', 'General'];

  useEffect(() => {
    initializeEditor();
  }, []);

  useEffect(() => {
    if (title && !isEditMode) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditMode]);

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

  async function loadPost(postId: string) {
    try {
      const post = await getPostById(postId);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setFeaturedImage(post.featured_image || '');
        setAuthorName(post.author_name);
        setAuthorAvatar(post.author_avatar || '');
        setCategory(post.category);
        setTags(post.tags || []);
        setReadTime(post.read_time);
        setPublished(post.published);
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

  async function handleSubmit(e: React.FormEvent, shouldPublish: boolean = false) {
    e.preventDefault();

    if (!title || !slug || !excerpt || !content || !authorName) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      const postData: Partial<BlogPost> = {
        title,
        slug,
        excerpt,
        content,
        featured_image: featuredImage || null,
        author_name: authorName,
        author_avatar: authorAvatar || null,
        category,
        tags,
        read_time: readTime,
        published: shouldPublish,
        published_at: publishedAt ? new Date(publishedAt).toISOString() : undefined,
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

  async function handleImageUpload(file: File, type: 'featured' | 'avatar') {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be less than 10MB');
      return;
    }

    const setUploading = type === 'featured' ? setUploadingFeatured : setUploadingAvatar;
    const setImageUrl = type === 'featured' ? setFeaturedImage : setAuthorAvatar;

    try {
      setUploading(true);

      const quality = getOptimalQuality(file.size);
      const uploadedUrls: string[] = [];

      if (type === 'avatar') {
        const sizes = IMAGE_SIZES.avatar;

        for (const [key, size] of Object.entries(sizes)) {
          const optimizedBlob = await cropToSquare(file, size.width, quality);
          const fileName = generateFileName(file.name, size.suffix);
          const filePath = `avatar/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, optimizedBlob, {
              cacheControl: '3600',
              upsert: false,
              contentType: 'image/jpeg'
            });

          if (uploadError) {
            throw uploadError;
          }

          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

          uploadedUrls.push(urlData.publicUrl);

          if (key === 'large') {
            setImageUrl(urlData.publicUrl);
          }
        }
      } else {
        const sizes = IMAGE_SIZES.featured;

        for (const [key, size] of Object.entries(sizes)) {
          const optimizedBlob = await cropToAspectRatio(file, size.width, size.height, quality);
          const fileName = generateFileName(file.name, size.suffix);
          const filePath = `featured/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, optimizedBlob, {
              cacheControl: '3600',
              upsert: false,
              contentType: 'image/jpeg'
            });

          if (uploadError) {
            throw uploadError;
          }

          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

          uploadedUrls.push(urlData.publicUrl);

          if (key === 'large') {
            setImageUrl(urlData.publicUrl);
          }
        }
      }

      console.log(`Successfully uploaded ${uploadedUrls.length} image variants`);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6]"></div>
          <p className="mt-4 text-[#666666]">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/admin/blog"
            className="flex items-center gap-2 text-[#666666] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => handleSubmit(e, false)}
              disabled={saving}
              className="px-6 py-2 bg-gray-200 text-[#111111] rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Draft
            </button>
            <button
              onClick={(e) => handleSubmit(e, true)}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Publish
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-[#111111] mb-8">
          {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>

        <form onSubmit={(e) => handleSubmit(e, published)} className="space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">Basic Information</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  placeholder="url-friendly-slug"
                />
                <p className="text-xs text-[#666666] mt-1">URL: /blog/{slug || 'your-slug'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent resize-none"
                  placeholder="Brief description of the post"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent resize-none font-mono text-sm"
                  placeholder="Write your blog post content here..."
                />
                <p className="text-xs text-[#666666] mt-1">Supports line breaks. Use double line breaks for paragraphs.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">Media & Author</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Featured Image
                  <span className="text-xs text-[#666666] font-normal ml-2">(Recommended: 1200x630px, will be auto-optimized)</span>
                </label>
                <div className="space-y-3">
                  {featuredImage && (
                    <div className="relative inline-block">
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
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#8B5CF6] hover:bg-purple-50 transition-all">
                        {uploadingFeatured ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8B5CF6]"></div>
                            <span className="text-[#666666]">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-[#666666]" />
                            <span className="text-[#666666] font-medium">Upload Image</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'featured')}
                        className="hidden"
                        disabled={uploadingFeatured}
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent text-sm"
                    placeholder="Or paste image URL"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-2">
                    Author Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-2">
                    Author Avatar
                    <span className="text-xs text-[#666666] font-normal ml-2">(Recommended: Square, will be auto-cropped)</span>
                  </label>
                  <div className="space-y-3">
                    {authorAvatar && (
                      <div className="relative inline-block">
                        <img
                          src={authorAvatar}
                          alt="Avatar preview"
                          className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => setAuthorAvatar('')}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <label className="cursor-pointer block">
                      <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#8B5CF6] hover:bg-purple-50 transition-all">
                        {uploadingAvatar ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8B5CF6]"></div>
                            <span className="text-[#666666]">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-[#666666]" />
                            <span className="text-[#666666] font-medium">Upload Avatar</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'avatar')}
                        className="hidden"
                        disabled={uploadingAvatar}
                      />
                    </label>
                    <input
                      type="url"
                      value={authorAvatar}
                      onChange={(e) => setAuthorAvatar(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent text-sm"
                      placeholder="Or paste avatar URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">Categorization</h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={readTime}
                    onChange={(e) => setReadTime(parseInt(e.target.value))}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-2">
                    Publish Date
                    <span className="text-xs text-[#666666] font-normal ml-2">(Optional - backdate posts)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 py-3 bg-[#8B5CF6] text-white rounded-lg font-semibold hover:bg-[#7C3AED] transition-colors"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-50 text-[#8B5CF6] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-[#7C3AED]"
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
        </form>
      </div>
    </div>
  );
}
