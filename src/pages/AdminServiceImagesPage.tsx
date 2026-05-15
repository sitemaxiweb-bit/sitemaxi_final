import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Check, Loader2, Image as ImageIcon, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { requireAdmin } from '../lib/auth';
import { cropToAspectRatio } from '../lib/imageOptimization';

/* ─── Service definitions ──────────────────────────────── */
interface StepDef {
  index: number;
  label: string;
  description: string;
}

interface ServiceDef {
  slug: string;
  name: string;
  color: string;
  steps: StepDef[];
}

const SERVICES: ServiceDef[] = [
  {
    slug: 'rankmaxi',
    name: 'RankMaxi',
    color: 'from-blue-600 to-blue-700',
    steps: [
      { index: 0, label: 'Diagnose', description: 'Audit profile and local competition' },
      { index: 1, label: 'Optimize', description: 'Technical GBP and website updates' },
      { index: 2, label: 'Build Authority', description: 'Citations and review generation' },
      { index: 3, label: 'Track & Grow', description: 'Monthly analysis and iteration' },
    ],
  },
  {
    slug: 'searchmaxi',
    name: 'SearchMaxi',
    color: 'from-emerald-600 to-teal-600',
    steps: [
      { index: 0, label: 'Audit', description: 'Technical and content SEO audit' },
      { index: 1, label: 'Strategy', description: 'Keyword and content roadmap' },
      { index: 2, label: 'Optimize', description: 'On-page and technical improvements' },
      { index: 3, label: 'Scale', description: 'Link building and authority growth' },
    ],
  },
  {
    slug: 'admaxi',
    name: 'AdMaxi',
    color: 'from-orange-500 to-red-500',
    steps: [
      { index: 0, label: 'Research', description: 'Audience and competitor analysis' },
      { index: 1, label: 'Build', description: 'Campaign and creative setup' },
      { index: 2, label: 'Launch', description: 'Campaign activation and testing' },
      { index: 3, label: 'Optimize', description: 'Continuous bid and creative optimization' },
    ],
  },
  {
    slug: 'socialmaxi',
    name: 'SocialMaxi',
    color: 'from-pink-500 to-rose-500',
    steps: [
      { index: 0, label: 'Brand Audit', description: 'Review current social presence' },
      { index: 1, label: 'Strategy', description: 'Content calendar and platform plan' },
      { index: 2, label: 'Produce', description: 'Content creation and scheduling' },
      { index: 3, label: 'Grow', description: 'Engagement and community building' },
    ],
  },
  {
    slug: 'clickmaxi',
    name: 'ClickMaxi',
    color: 'from-violet-500 to-blue-600',
    steps: [
      { index: 0, label: 'Discovery', description: 'Funnel and audience analysis' },
      { index: 1, label: 'Build', description: 'Landing page and funnel setup' },
      { index: 2, label: 'Test', description: 'A/B testing and heat mapping' },
      { index: 3, label: 'Convert', description: 'Conversion rate optimization' },
    ],
  },
  {
    slug: 'sitemaxi',
    name: 'SiteMaxi',
    color: 'from-slate-600 to-gray-700',
    steps: [
      { index: 0, label: 'Discovery', description: 'Goals, brand, and competitor review' },
      { index: 1, label: 'Design', description: 'Wireframes and visual design' },
      { index: 2, label: 'Build', description: 'Development and content integration' },
      { index: 3, label: 'Launch', description: 'Testing, SEO setup, and go-live' },
    ],
  },
];

/* ─── Types ────────────────────────────────────────────── */
interface ImageRecord {
  step_index: number;
  image_url: string;
  label: string;
}

/* ─── Component ────────────────────────────────────────── */
export function AdminServiceImagesPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>('rankmaxi');
  const [images, setImages] = useState<Record<string, Record<number, ImageRecord>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null); // "slug-stepIndex" key
  const [success, setSuccess] = useState<string | null>(null);
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({}); // "slug-stepIndex" -> url string
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    requireAdmin().catch(() => {});
    loadAllImages();
  }, []);

  async function loadAllImages() {
    setLoading(true);
    const { data } = await supabase
      .from('service_page_images')
      .select('service_slug, step_index, image_url, label');
    if (data) {
      const map: Record<string, Record<number, ImageRecord>> = {};
      data.forEach((row: { service_slug: string; step_index: number; image_url: string; label: string }) => {
        if (!map[row.service_slug]) map[row.service_slug] = {};
        map[row.service_slug][row.step_index] = {
          step_index: row.step_index,
          image_url: row.image_url,
          label: row.label,
        };
      });
      setImages(map);
    }
    setLoading(false);
  }

  function getKey(slug: string, stepIndex: number) {
    return `${slug}-${stepIndex}`;
  }

  function getCurrentUrl(slug: string, stepIndex: number): string {
    const key = getKey(slug, stepIndex);
    if (urlInputs[key] !== undefined) return urlInputs[key];
    return images[slug]?.[stepIndex]?.image_url || '';
  }

  function setUrlInput(slug: string, stepIndex: number, value: string) {
    const key = getKey(slug, stepIndex);
    setUrlInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function saveUrl(service: ServiceDef, step: StepDef) {
    const key = getKey(service.slug, step.index);
    const url = urlInputs[key];
    if (!url?.trim()) return;
    await upsert(service.slug, step.index, url.trim(), step.label);
  }

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    service: ServiceDef,
    step: StepDef
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = getKey(service.slug, step.index);
    setSaving(key);

    try {
      const optimized = await cropToAspectRatio(file, 16 / 9);
      const ext = file.name.split('.').pop() || 'jpg';
      const filename = `service-images/${service.slug}-step-${step.index}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filename, optimized, { contentType: optimized.type, upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filename);

      const publicUrl = urlData.publicUrl;
      await upsert(service.slug, step.index, publicUrl, step.label);

      // Clear file input
      const ref = fileInputRefs.current[key];
      if (ref) ref.value = '';
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setSaving(null);
    }
  }

  async function upsert(
    serviceSlug: string,
    stepIndex: number,
    imageUrl: string,
    label: string
  ) {
    const key = getKey(serviceSlug, stepIndex);
    setSaving(key);

    const { error } = await supabase
      .from('service_page_images')
      .upsert(
        { service_slug: serviceSlug, step_index: stepIndex, image_url: imageUrl, label, updated_at: new Date().toISOString() },
        { onConflict: 'service_slug,step_index' }
      );

    if (!error) {
      setImages((prev) => ({
        ...prev,
        [serviceSlug]: {
          ...(prev[serviceSlug] || {}),
          [stepIndex]: { step_index: stepIndex, image_url: imageUrl, label },
        },
      }));
      // Clear the URL input after successful save
      setUrlInputs((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setSuccess(key);
      setTimeout(() => setSuccess(null), 2500);
    }
    setSaving(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-[#666666] hover:text-[#111111] text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111111] mb-1">Service Page Images</h1>
            <p className="text-[#666666] text-sm">
              Manage the methodology step images shown on each service page. Changes appear live immediately.
            </p>
          </div>
          <button
            onClick={loadAllImages}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#666666] hover:text-[#111111] bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                isExpanded={expandedSlug === service.slug}
                onToggle={() =>
                  setExpandedSlug((prev) => (prev === service.slug ? null : service.slug))
                }
                getCurrentUrl={getCurrentUrl}
                setUrlInput={setUrlInput}
                saveUrl={saveUrl}
                handleFileUpload={handleFileUpload}
                saving={saving}
                success={success}
                fileInputRefs={fileInputRefs}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Service Card ─────────────────────────────────────── */
function ServiceCard({
  service,
  isExpanded,
  onToggle,
  getCurrentUrl,
  setUrlInput,
  saveUrl,
  handleFileUpload,
  saving,
  success,
  fileInputRefs,
}: {
  service: ServiceDef;
  isExpanded: boolean;
  onToggle: () => void;
  getCurrentUrl: (slug: string, stepIndex: number) => string;
  setUrlInput: (slug: string, stepIndex: number, value: string) => void;
  saveUrl: (service: ServiceDef, step: StepDef) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, service: ServiceDef, step: StepDef) => void;
  saving: string | null;
  success: string | null;
  fileInputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111111]">{service.name}</h2>
            <p className="text-xs text-[#666666]">{service.steps.length} methodology steps</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[#666666]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#666666]" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.steps.map((step) => {
              const key = `${service.slug}-${step.index}`;
              const currentUrl = getCurrentUrl(service.slug, step.index);
              const isSaving = saving === key;
              const isSuccess = success === key;

              return (
                <div key={key} className="border border-gray-200 rounded-xl p-5 space-y-4">
                  {/* Step header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {step.index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111111]">{step.label}</p>
                      <p className="text-xs text-[#666666]">{step.description}</p>
                    </div>
                  </div>

                  {/* Current image preview */}
                  {currentUrl ? (
                    <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100">
                      <img
                        src={currentUrl}
                        alt={step.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-lg aspect-video bg-gray-100 flex flex-col items-center justify-center gap-2">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                      <span className="text-xs text-gray-400">No image set</span>
                    </div>
                  )}

                  {/* URL input */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#666666] uppercase tracking-wide">
                      Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://..."
                        value={getCurrentUrl(service.slug, step.index)}
                        onChange={(e) => setUrlInput(service.slug, step.index, e.target.value)}
                        className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => saveUrl(service, step)}
                        disabled={isSaving}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all min-w-[80px] justify-center ${
                          isSuccess
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isSuccess ? (
                          <><Check className="w-4 h-4" /> Saved</>
                        ) : (
                          'Save'
                        )}
                      </button>
                    </div>
                  </div>

                  {/* File upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#666666] uppercase tracking-wide">
                      Or Upload File
                    </label>
                    <label
                      className={`flex items-center gap-3 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer transition-all ${
                        isSaving
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                      ) : (
                        <Upload className="w-4 h-4 text-[#666666] flex-shrink-0" />
                      )}
                      <span className="text-xs text-[#666666]">
                        {isSaving ? 'Uploading...' : 'Click to upload (PNG, JPG, WebP)'}
                      </span>
                      <input
                        ref={(el) => { fileInputRefs.current[key] = el; }}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        disabled={isSaving}
                        onChange={(e) => handleFileUpload(e, service, step)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
