import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Copy, Check, Trash2, ArrowLeft, Image as ImageIcon, Sparkles, Wand2, Download, RefreshCw, X, Zap as ZapIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../lib/auth';
import { cropToSquare, cropToAspectRatio, generateFileName, getOptimalQuality } from '../lib/imageOptimization';

interface UploadedImage {
  name: string;
  url: string;
  path: string;
  created_at: string;
  size: number;
}

export function AdminImageManagerPage() {
  const navigate = useNavigate();
  const generatedPreviewRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [imageType, setImageType] = useState<'featured' | 'avatar' | 'content'>('content');

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiImageType, setAiImageType] = useState<'featured' | 'content'>('featured');
  const [enhancingPrompt, setEnhancingPrompt] = useState(false);
  const [generatingAiImage, setGeneratingAiImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [savingAiImage, setSavingAiImage] = useState(false);
  const [copiedGenUrl, setCopiedGenUrl] = useState(false);

  useEffect(() => {
    checkAuth();
    loadImages();
  }, []);

  async function checkAuth() {
    const user = await getCurrentUser();
    if (!user) {
      navigate('/admin/login');
    }
  }

  async function loadImages() {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from('blog-images')
        .list('content', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const imageList = data.map(file => {
        const { data: urlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(`content/${file.name}`);

        return {
          name: file.name,
          url: urlData.publicUrl,
          path: `content/${file.name}`,
          created_at: file.created_at || '',
          size: file.metadata?.size || 0
        };
      });

      setImages(imageList);
    } catch (error: any) {
      console.error('Error loading images:', error);
      alert('Failed to load images');
    } finally {
      setLoading(false);
    }
  }

  function generateSEOFriendlyName(baseName: string): string {
    const cleanName = baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);

    return `${cleanName}-${timestamp}-${random}.jpg`;
  }

  async function handleImageUpload(file: File) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be less than 10MB');
      return;
    }

    try {
      setUploading(true);

      const quality = getOptimalQuality(file.size);
      let optimizedBlob: Blob;

      if (imageType === 'avatar') {
        optimizedBlob = await cropToSquare(file, 400, quality);
      } else if (imageType === 'featured') {
        optimizedBlob = await cropToAspectRatio(file, 1200, 630, quality);
      } else {
        optimizedBlob = await cropToAspectRatio(file, 1200, 800, quality);
      }

      const seoName = customName.trim()
        ? generateSEOFriendlyName(customName)
        : generateFileName(file.name);

      const filePath = `content/${seoName}`;

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

      setCustomName('');
      await loadImages();
      alert('Image uploaded successfully!');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(path: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase.storage
        .from('blog-images')
        .remove([path]);

      if (error) throw error;

      await loadImages();
      alert('Image deleted successfully');
    } catch (error: any) {
      console.error('Error deleting image:', error);
      alert(`Failed to delete image: ${error.message}`);
    }
  }

  async function copyToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      alert('Failed to copy URL');
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  async function handleEnhancePrompt() {
    if (!aiPrompt.trim()) return;
    setEnhancingPrompt(true);
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
          mode: 'enhance_prompt',
          keyword: '',
          imagePrompt: aiPrompt.trim(),
          imageType: aiImageType,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      if (result.enhancedPrompt) {
        setAiPrompt(result.enhancedPrompt);
      }
    } catch (error: any) {
      console.error('Enhance prompt error:', error);
      alert(`Failed to enhance prompt: ${error.message}`);
    } finally {
      setEnhancingPrompt(false);
    }
  }

  async function handleGenerateAiImage() {
    if (!aiPrompt.trim()) return;
    setGeneratingAiImage(true);
    setGeneratedImageUrl(null);
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
          keyword: 'image-manager',
          imagePrompt: aiPrompt.trim(),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      if (result.imageUrl) {
        setGeneratedImageUrl(result.imageUrl);
        setTimeout(() => {
          generatedPreviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch (error: any) {
      console.error('Generate image error:', error);
      alert(`Failed to generate image: ${error.message}`);
    } finally {
      setGeneratingAiImage(false);
    }
  }

  async function handleSaveToLibrary() {
    if (!generatedImageUrl) return;
    setSavingAiImage(true);
    try {
      const response = await fetch(generatedImageUrl);
      if (!response.ok) throw new Error('Failed to fetch generated image');
      const blob = await response.blob();

      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const filename = `ai-generated-${timestamp}-${random}.png`;
      const filePath = `content/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/png',
        });

      if (uploadError) throw uploadError;

      await loadImages();
      alert('Image saved to library successfully!');
    } catch (error: any) {
      console.error('Save to library error:', error);
      alert(`Failed to save image: ${error.message}`);
    } finally {
      setSavingAiImage(false);
    }
  }

  async function copyGenUrl() {
    if (!generatedImageUrl) return;
    try {
      await navigator.clipboard.writeText(generatedImageUrl);
      setCopiedGenUrl(true);
      setTimeout(() => setCopiedGenUrl(false), 2000);
    } catch {
      alert('Failed to copy URL');
    }
  }

  const promptLength = aiPrompt.length;
  const promptNearLimit = promptLength > 850;
  const promptOverLimit = promptLength > 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/blog"
                className="flex items-center gap-2 text-[#666666] hover:text-[#111111] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Blog Admin</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-[#111111]">Image Manager</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">

        {/* AI Image Generator */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-5 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Image Generator</h2>
              <p className="text-blue-100 text-sm">Generate images with DALL-E 3 · 1792×1024</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Image type */}
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-3">Image Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="featured"
                    checked={aiImageType === 'featured'}
                    onChange={() => setAiImageType('featured')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-[#333333]">Featured (1200×630)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="content"
                    checked={aiImageType === 'content'}
                    onChange={() => setAiImageType('content')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-[#333333]">Content (1200×800)</span>
                </label>
              </div>
            </div>

            {/* Prompt */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-[#111111]">Image Prompt</label>
                <span className={`text-xs font-medium ${promptOverLimit ? 'text-red-500' : promptNearLimit ? 'text-amber-500' : 'text-[#999999]'}`}>
                  {promptLength} / 1000
                </span>
              </div>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={4}
                placeholder="Describe the image you want to generate... e.g. 'a dentist office reception area with modern clean design'"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-[#333333] placeholder-gray-400 text-sm"
              />
              <p className="text-xs text-[#999999] mt-1.5">
                Tip: Use the Enhance button to turn a simple idea into a detailed, professional DALL-E 3 prompt.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleEnhancePrompt}
                disabled={!aiPrompt.trim() || enhancingPrompt || generatingAiImage}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#333333] font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {enhancingPrompt ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Enhance Prompt
                  </>
                )}
              </button>

              <button
                onClick={handleGenerateAiImage}
                disabled={!aiPrompt.trim() || promptOverLimit || generatingAiImage || enhancingPrompt}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm"
              >
                {generatingAiImage ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ZapIcon className="w-4 h-4" />
                    Generate Image
                  </>
                )}
              </button>
            </div>

            {/* Generation loading state */}
            {generatingAiImage && (
              <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin flex-shrink-0" style={{ borderWidth: 3 }}></div>
                <div>
                  <p className="text-sm font-semibold text-blue-800">Generating your image with DALL-E 3...</p>
                  <p className="text-xs text-blue-600 mt-0.5">This usually takes 15–30 seconds</p>
                </div>
              </div>
            )}

            {/* Generated image preview */}
            {generatedImageUrl && !generatingAiImage && (
              <div ref={generatedPreviewRef} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#111111]">Generated Image</h3>
                  <button
                    onClick={() => setGeneratedImageUrl(null)}
                    className="text-[#999999] hover:text-[#333333] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={generatedImageUrl}
                    alt="AI generated"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedImageUrl}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-xs text-[#666666] font-mono truncate"
                  />
                  <button
                    onClick={copyGenUrl}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#333333] rounded-xl transition-colors text-xs font-medium whitespace-nowrap"
                  >
                    {copiedGenUrl ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedGenUrl ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveToLibrary}
                    disabled={savingAiImage}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm shadow-sm"
                  >
                    {savingAiImage ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Save to Library
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleGenerateAiImage}
                    disabled={generatingAiImage}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#333333] font-medium rounded-xl transition-colors text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Manual Upload */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-[#111111] mb-6">Upload New Image</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                SEO-Friendly Name (optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g., marketing-strategy-2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-[#666666] mt-1">
                Leave empty for automatic naming. Special characters will be converted to hyphens.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Image Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="content"
                    checked={imageType === 'content'}
                    onChange={(e) => setImageType(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Content (1200x800)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="featured"
                    checked={imageType === 'featured'}
                    onChange={(e) => setImageType(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Featured (1200x630)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="avatar"
                    checked={imageType === 'avatar'}
                    onChange={(e) => setImageType(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Avatar (400x400)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Select Image
              </label>
              <label className="block w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  disabled={uploading}
                />
                <div className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                  <Upload className="w-5 h-5 text-blue-500" />
                  <span className="text-[#666666] font-medium">
                    {uploading ? 'Uploading...' : 'Click to upload image'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Uploaded Images */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-[#111111] mb-6">Uploaded Images</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-[#666666] mt-4">Loading images...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-[#666666]">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.path}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-[#111111] truncate mb-2">
                      {image.name}
                    </p>
                    <p className="text-xs text-[#666666] mb-3">
                      {formatBytes(image.size)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(image.url)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        {copiedUrl === image.url ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(image.path)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
