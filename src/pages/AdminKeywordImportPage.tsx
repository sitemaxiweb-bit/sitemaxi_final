import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Upload, CheckCircle, XCircle, Loader2, TrendingUp, AlertCircle, Plus, X, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createKeyword } from '../lib/keywordApi';

interface ParsedKeyword {
  keyword: string;
  avgMonthlySearches: number | null;
  competition: string | null;
  topBidLow: number | null;
  topBidHigh: number | null;
  selected: boolean;
  source: 'csv' | 'domain';
  category?: string;
  searchIntent?: string;
}

interface DomainAnalysisResult {
  domain: string;
  keywords: ParsedKeyword[];
  error?: string;
}

export default function AdminKeywordImportPage() {
  const [activeTab, setActiveTab] = useState<'domain' | 'csv'>('csv');

  const [domainInputs, setDomainInputs] = useState<string[]>(['']);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<DomainAnalysisResult[]>([]);
  const [analysisError, setAnalysisError] = useState('');

  const [csvKeywords, setCsvKeywords] = useState<ParsedKeyword[]>([]);
  const [csvError, setCsvError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(0);
  const [importError, setImportError] = useState('');

  function addDomainInput() {
    setDomainInputs([...domainInputs, '']);
  }

  function removeDomainInput(index: number) {
    setDomainInputs(domainInputs.filter((_, i) => i !== index));
  }

  function updateDomainInput(index: number, value: string) {
    const updated = [...domainInputs];
    updated[index] = value;
    setDomainInputs(updated);
  }

  async function handleAnalyzeDomains() {
    const domains = domainInputs.map(d => d.trim()).filter(Boolean);
    if (domains.length === 0) {
      setAnalysisError('Please enter at least one domain URL');
      return;
    }

    setAnalyzing(true);
    setAnalysisError('');
    setAnalysisResults([]);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      const res = await fetch(`${supabaseUrl}/functions/v1/analyze-domain-keywords`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domains }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Analysis failed');
      }

      const data = await res.json();
      const results: DomainAnalysisResult[] = data.results.map((r: any) => ({
        domain: r.domain,
        error: r.error,
        keywords: (r.keywords || []).map((kw: any) => ({
          keyword: kw.keyword,
          avgMonthlySearches: null,
          competition: kw.competition || null,
          topBidLow: null,
          topBidHigh: null,
          selected: true,
          source: 'domain' as const,
          category: kw.category || 'seo',
          searchIntent: kw.search_intent || 'informational',
        })),
      }));
      setAnalysisResults(results);
    } catch (e: any) {
      setAnalysisError(e.message);
    } finally {
      setAnalyzing(false);
    }
  }

  function toggleDomainKeyword(domainIndex: number, kwIndex: number) {
    setAnalysisResults(prev => prev.map((r, di) =>
      di === domainIndex
        ? { ...r, keywords: r.keywords.map((kw, ki) => ki === kwIndex ? { ...kw, selected: !kw.selected } : kw) }
        : r
    ));
  }

  function toggleAllDomainKeywords(domainIndex: number, selected: boolean) {
    setAnalysisResults(prev => prev.map((r, di) =>
      di === domainIndex ? { ...r, keywords: r.keywords.map(kw => ({ ...kw, selected })) } : r
    ));
  }

  function handleCsvFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvError('');

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const parsed = parseGoogleKeywordPlannerCsv(text);
        setCsvKeywords(parsed);
      } catch (err: any) {
        setCsvError(err.message || 'Failed to parse CSV file');
      }
    };
    reader.readAsText(file);
  }

  function parseGoogleKeywordPlannerCsv(text: string): ParsedKeyword[] {
    const lines = text.trim().split('\n').filter(l => l.trim());
    let dataStart = -1;
    let headers: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const lower = lines[i].toLowerCase();
      if (lower.includes('keyword') && lower.includes('competition')) {
        dataStart = i + 1;
        headers = lines[i].split('\t').map(h => h.trim().replace(/['"]/g, '').toLowerCase());
        break;
      }
    }

    if (dataStart === -1) {
      const firstLine = lines[0].split('\t').map(h => h.trim().replace(/['"]/g, '').toLowerCase());
      if (firstLine.includes('keyword')) {
        dataStart = 1;
        headers = firstLine;
      } else {
        throw new Error('Could not find keyword data. Make sure this is a Google Keyword Planner CSV export.');
      }
    }

    const kwIdx = headers.findIndex(h => h === 'keyword');
    const searchIdx = headers.findIndex(h => h.includes('avg') && h.includes('monthly'));
    const compIdx = headers.findIndex(h => h === 'competition' && !h.includes('indexed'));
    const bidLowIdx = headers.findIndex(h => h.includes('low range') || (h.includes('bid') && h.includes('low')));
    const bidHighIdx = headers.findIndex(h => h.includes('high range') || (h.includes('bid') && h.includes('high')));

    if (kwIdx === -1) throw new Error('Could not find "Keyword" column in CSV');

    const results: ParsedKeyword[] = [];

    for (let i = dataStart; i < lines.length; i++) {
      const cols = lines[i].split('\t').map(c => c.trim().replace(/^["']|["']$/g, ''));
      const keyword = cols[kwIdx];
      if (!keyword || keyword === '--') continue;

      const searches = searchIdx >= 0 ? parseFloat(cols[searchIdx]?.replace(/,/g, '') || '') : null;
      const competition = compIdx >= 0 ? cols[compIdx] : null;
      const bidLow = bidLowIdx >= 0 ? parseFloat(cols[bidLowIdx]?.replace(/[,$]/g, '') || '') : null;
      const bidHigh = bidHighIdx >= 0 ? parseFloat(cols[bidHighIdx]?.replace(/[,$]/g, '') || '') : null;

      results.push({
        keyword,
        avgMonthlySearches: isNaN(searches as number) ? null : (searches as number),
        competition: competition || null,
        topBidLow: isNaN(bidLow as number) ? null : (bidLow as number),
        topBidHigh: isNaN(bidHigh as number) ? null : (bidHigh as number),
        selected: true,
        source: 'csv',
        category: 'seo',
        searchIntent: 'informational',
      });
    }

    if (results.length === 0) throw new Error('No keywords found in the CSV file');
    return results;
  }

  function toggleCsvKeyword(index: number) {
    setCsvKeywords(prev => prev.map((k, i) => i === index ? { ...k, selected: !k.selected } : k));
  }

  function toggleAllCsvKeywords(selected: boolean) {
    setCsvKeywords(prev => prev.map(k => ({ ...k, selected })));
  }

  async function handleImport() {
    const toImport: ParsedKeyword[] = activeTab === 'csv'
      ? csvKeywords.filter(k => k.selected)
      : analysisResults.flatMap(r => r.keywords.filter(k => k.selected));

    if (toImport.length === 0) {
      setImportError('Select at least one keyword to import');
      return;
    }

    setImporting(true);
    setImportError('');
    setImportSuccess(0);

    let count = 0;
    for (const kw of toImport) {
      try {
        await createKeyword({
          keyword: kw.keyword,
          category: (kw.category as any) || 'seo',
          search_intent: (kw.searchIntent as any) || 'informational',
          status: 'new',
          source: kw.source === 'csv' ? 'google_keyword_planner' : 'domain_analysis',
          monthly_search_volume: kw.avgMonthlySearches || undefined,
          notes: [
            kw.competition ? `Competition: ${kw.competition}` : null,
            kw.topBidHigh ? `Top bid: $${kw.topBidHigh}` : null,
          ].filter(Boolean).join(' | ') || undefined,
        });
        count++;
      } catch (e) {
        console.error('Error importing keyword:', kw.keyword, e);
      }
    }

    setImportSuccess(count);
    setImporting(false);

    if (activeTab === 'csv') {
      setCsvKeywords(prev => prev.map(k => k.selected ? { ...k, selected: false } : k));
    } else {
      setAnalysisResults(prev => prev.map(r => ({ ...r, keywords: r.keywords.map(k => k.selected ? { ...k, selected: false } : k) })));
    }
  }

  const selectedCsvCount = csvKeywords.filter(k => k.selected).length;
  const selectedDomainCount = analysisResults.flatMap(r => r.keywords).filter(k => k.selected).length;
  const selectedCount = activeTab === 'csv' ? selectedCsvCount : selectedDomainCount;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/keywords" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Import Keywords</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {importSuccess > 0 && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">{importSuccess} keyword{importSuccess !== 1 ? 's' : ''} imported successfully!</p>
            <Link to="/admin/keywords" className="ml-auto text-sm text-green-700 underline hover:text-green-900">
              View all keywords
            </Link>
          </div>
        )}

        <div className="flex gap-1 mb-8 p-1 bg-white border border-gray-200 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'csv' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FileText className="w-4 h-4" />
            CSV Upload
          </button>
          <button
            onClick={() => setActiveTab('domain')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'domain' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Globe className="w-4 h-4" />
            Domain Analyzer
          </button>
        </div>

        {activeTab === 'csv' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Import from Google Keyword Planner</h2>
              <p className="text-sm text-gray-500 mb-5">Export your keyword data from Google Keyword Planner as CSV and upload it here.</p>

              {csvError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{csvError}</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.tsv,.txt"
                onChange={handleCsvFile}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 px-6 py-10 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-700 group-hover:text-blue-700">Click to upload CSV file</p>
                  <p className="text-sm text-gray-400 mt-1">Google Keyword Planner export format (.csv)</p>
                </div>
              </button>
            </div>

            {csvKeywords.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{csvKeywords.length} keywords found</h3>
                    <p className="text-sm text-gray-500">{selectedCsvCount} selected for import</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAllCsvKeywords(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Select All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => toggleAllCsvKeywords(false)}
                      className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="w-10 px-4 py-3"></th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Keyword</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-600">Avg. Searches</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-600">Competition</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-600">Top Bid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {csvKeywords.map((kw, i) => (
                        <tr
                          key={i}
                          onClick={() => toggleCsvKeyword(i)}
                          className={`cursor-pointer transition-colors ${kw.selected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-4 py-3">
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${kw.selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                              {kw.selected && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">{kw.keyword}</td>
                          <td className="px-4 py-3 text-right text-gray-600">
                            {kw.avgMonthlySearches != null ? kw.avgMonthlySearches.toLocaleString() : '—'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {kw.competition ? (
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                                kw.competition === 'High' ? 'bg-red-100 text-red-700' :
                                kw.competition === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                kw.competition === 'Low' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {kw.competition}
                              </span>
                            ) : '—'}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600">
                            {kw.topBidHigh != null ? `$${kw.topBidHigh.toFixed(2)}` : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'domain' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">AI Domain Keyword Analyzer</h2>
              <p className="text-sm text-gray-500 mb-5">Enter competitor or reference domains and AI will analyze their content to extract keywords they're targeting.</p>

              {analysisError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{analysisError}</p>
                </div>
              )}

              <div className="space-y-3 mb-4">
                {domainInputs.map((domain, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="flex-1 relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        value={domain}
                        onChange={(e) => updateDomainInput(i, e.target.value)}
                        placeholder="https://example.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {domainInputs.length > 1 && (
                      <button
                        onClick={() => removeDomainInput(i)}
                        className="p-2.5 text-gray-400 hover:text-red-500 border border-gray-200 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addDomainInput}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add another domain
                </button>
              </div>

              <button
                onClick={handleAnalyzeDomains}
                disabled={analyzing}
                className="mt-5 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {analyzing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing domains...</>
                ) : (
                  <><Globe className="w-4 h-4" /> Analyze Domains</>
                )}
              </button>
            </div>

            {analysisResults.length > 0 && analysisResults.map((result, di) => (
              <div key={di} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.domain}</h3>
                    {result.error ? (
                      <p className="text-sm text-red-600">{result.error}</p>
                    ) : (
                      <p className="text-sm text-gray-500">{result.keywords.length} keywords detected</p>
                    )}
                  </div>
                  {!result.error && result.keywords.length > 0 && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleAllDomainKeywords(di, true)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Select All
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => toggleAllDomainKeywords(di, false)}
                        className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                      >
                        Deselect All
                      </button>
                    </div>
                  )}
                </div>

                {!result.error && result.keywords.length > 0 && (
                  <div className="divide-y divide-gray-50">
                    {result.keywords.map((kw, ki) => (
                      <div
                        key={ki}
                        onClick={() => toggleDomainKeyword(di, ki)}
                        className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors ${kw.selected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${kw.selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                          {kw.selected && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{kw.keyword}</p>
                          {kw.searchIntent && (
                            <p className="text-xs text-gray-500 mt-0.5 capitalize">{kw.searchIntent} intent · {kw.category}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {(csvKeywords.length > 0 || analysisResults.some(r => r.keywords.length > 0)) && (
          <div className="mt-8 flex items-center justify-between bg-white rounded-xl border border-gray-200 px-6 py-4">
            <div>
              <p className="font-semibold text-gray-900">{selectedCount} keyword{selectedCount !== 1 ? 's' : ''} selected</p>
              <p className="text-sm text-gray-500">They will be added with status "New" for review</p>
            </div>

            {importError && (
              <p className="text-sm text-red-600">{importError}</p>
            )}

            <button
              onClick={handleImport}
              disabled={importing || selectedCount === 0}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {importing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Importing...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> Import {selectedCount} Keyword{selectedCount !== 1 ? 's' : ''}</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
