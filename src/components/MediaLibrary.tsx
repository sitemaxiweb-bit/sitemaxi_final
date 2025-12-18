import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Search, X, Copy, Check, Image as ImageIcon } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  caption?: string;
  file_size?: number;
  created_at: string;
}

interface MediaLibraryProps {
  onSelectImage?: (image: MediaItem) => void;
  mode?: 'select' | 'manage';
  onClose?: () => void;
}

export default function MediaLibrary({
  onSelectImage,
  mode = 'manage',
  onClose
}: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `media/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('blog-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('media_library')
          .insert({
            filename: file.name,
            url: publicUrl,
            thumbnail_url: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            uploaded_by: user?.id
          });

        if (dbError) throw dbError;
      }

      await loadMedia();
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const filteredMedia = media.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${mode === 'select' ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4' : ''}`}>
      <div className={`${mode === 'select' ? 'bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden' : 'w-full'}`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Media Library</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-6">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="w-5 h-5" />
              {uploading ? 'Uploading...' : 'Upload'}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {mode === 'select' && onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: mode === 'select' ? 'calc(90vh - 140px)' : 'auto' }}>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading media...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No media found matching your search' : 'No media uploaded yet'}
              </p>
              <p className="text-gray-500 mt-2">
                Upload images to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={`group relative bg-white border-2 rounded-lg overflow-hidden transition-all ${
                    mode === 'select' ? 'cursor-pointer hover:border-blue-500 hover:shadow-lg' : 'border-gray-200'
                  }`}
                  onClick={() => mode === 'select' && onSelectImage && onSelectImage(item)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.thumbnail_url || item.url}
                      alt={item.alt_text || item.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    {item.file_size && (
                      <p className="text-xs text-gray-500 mt-1">
                        {(item.file_size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>

                  {mode === 'manage' && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyUrl(item.url, item.id)}
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                        title="Copy URL"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-700" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}