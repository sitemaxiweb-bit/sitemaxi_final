import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Copy, Check, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
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
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [imageType, setImageType] = useState<'featured' | 'avatar' | 'content'>('content');

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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
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
                    className="w-4 h-4 text-[#8B5CF6]"
                  />
                  <span className="text-sm">Content (1200x800)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="featured"
                    checked={imageType === 'featured'}
                    onChange={(e) => setImageType(e.target.value as any)}
                    className="w-4 h-4 text-[#8B5CF6]"
                  />
                  <span className="text-sm">Featured (1200x630)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="avatar"
                    checked={imageType === 'avatar'}
                    onChange={(e) => setImageType(e.target.value as any)}
                    className="w-4 h-4 text-[#8B5CF6]"
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
                <div className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#8B5CF6] hover:bg-purple-50 transition-all cursor-pointer">
                  <Upload className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-[#666666] font-medium">
                    {uploading ? 'Uploading...' : 'Click to upload image'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-[#111111] mb-6">Uploaded Images</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6] mx-auto"></div>
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
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors text-sm"
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
