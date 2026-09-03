import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  Sparkles,
  PlusCircle,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Eye,
  Edit3
} from 'lucide-react';
import { SiteData, Publication, TeachingCourse, Book } from '../types';

interface DataManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: SiteData;
  onApplyChanges: (newData: SiteData) => void;
  onResetData: () => void;
}

export const DataManagerModal: React.FC<DataManagerModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onApplyChanges,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'templates' | 'guide'>('editor');
  const [jsonText, setJsonText] = useState(() => JSON.stringify(currentData, null, 2));
  const [parseError, setParseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  // Template generators
  const sampleNewPaper: Publication = {
    id: 'new-paper-slug',
    title: 'New Paper Title Here',
    authors: ['Chiu Yu Ko', 'Coauthor Name'],
    year: 2024,
    date: '2024',
    venue: 'Journal of Economic Theory (or Forthcoming)',
    type: 'Journal Article',
    abstract: 'Abstract text describing research questions, equilibrium models, and main theorems.',
    tags: ['Game Theory', 'Industrial Organization'],
    doi: 'https://doi.org/10.xxxx/xxxxx',
    pdf: '/files/cv.pdf',
    bibtex: `@article{ko2024new,
  title = {New Paper Title Here},
  author = {Ko, Chiu Yu and Coauthor, Name},
  journal = {Journal of Economic Theory},
  year = {2024}
}`
  };

  const sampleNewCourse: TeachingCourse = {
    id: 'new-course-slug',
    code: 'ECON 6000',
    title: 'Advanced Topics in Game Theory',
    level: 'Ph.D.',
    semesters: 'Spring 2025',
    overview: 'In-depth exploration of advanced mechanism design and auction theory.',
    topics: ['Repeated games', 'Dynamic contracts', 'Matching algorithms']
  };

  if (!isOpen) return null;

  const handleJsonChange = (val: string) => {
    setJsonText(val);
    try {
      JSON.parse(val);
      setParseError(null);
    } catch (err: any) {
      setParseError(err.message);
    }
  };

  const handleFormatJson = () => {
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj, null, 2));
      setParseError(null);
    } catch (err: any) {
      setParseError(err.message);
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText) as SiteData;
      onApplyChanges(parsed);
      setApplied(true);
      setParseError(null);
      setTimeout(() => setApplied(false), 2500);
    } catch (err: any) {
      setParseError(`Cannot apply invalid JSON: ${err.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'siteData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="data-manager-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="data-manager-dialog"
        className="bg-white rounded-2xl shadow-2xl border border-stone-300 w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-900 text-stone-100 rounded-lg">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl flex items-center gap-2">
                Single Data File Manager
                <span className="text-xs font-sans font-normal px-2 py-0.5 bg-stone-200 text-stone-700 rounded-full">
                  src/data/siteData.json
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                All website content is driven directly by this single JSON file
              </p>
            </div>
          </div>

          <button
            id="close-data-manager-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'editor'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Live JSON Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'templates'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Paper / Course Template</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Maintenance Guide</span>
            </button>
          </div>

          {activeTab === 'editor' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleFormatJson}
                className="px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-200 rounded-md cursor-pointer hover:bg-stone-50"
                title="Format JSON with indentation"
              >
                Format JSON
              </button>
            </div>
          )}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-hidden p-6 bg-stone-50/50 flex flex-col">
          {activeTab === 'editor' && (
            <div className="flex-1 flex flex-col h-full space-y-3">
              {/* Parse Error Notification */}
              {parseError && (
                <div className="px-3.5 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2 shrink-0">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-mono">{parseError}</span>
                </div>
              )}

              {applied && (
                <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 shrink-0">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Changes applied live to the website preview! Download or save to <code>src/data/siteData.json</code> for permanent storage.
                  </span>
                </div>
              )}

              {/* Textarea */}
              <div className="flex-1 relative rounded-xl border border-stone-300 overflow-hidden bg-stone-900 shadow-inner">
                <textarea
                  id="site-data-json-textarea"
                  value={jsonText}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="w-full h-full p-4 font-mono text-xs sm:text-[13px] text-stone-100 bg-transparent resize-none focus:outline-hidden leading-relaxed select-text"
                  spellCheck={false}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1 shrink-0">
                <span>
                  Tip: You can directly modify text, add co-authors, or change course terms in the editor above.
                </span>
                <span className="font-mono text-stone-400">
                  {jsonText.length.toLocaleString()} characters
                </span>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-stone-700" />
                    <span>How to Add a New Publication</span>
                  </h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(sampleNewPaper, null, 2));
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md border border-stone-200 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Template Snippet</span>
                  </button>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Simply copy this JSON object and paste it inside the <code>"publications": [ ... ]</code> array in <code>siteData.json</code>.
                </p>
                <pre className="p-3.5 bg-stone-900 text-stone-100 font-mono text-xs rounded-lg overflow-x-auto">
                  {JSON.stringify(sampleNewPaper, null, 2)}
                </pre>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-stone-700" />
                    <span>How to Add a New Course</span>
                  </h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(sampleNewCourse, null, 2));
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md border border-stone-200 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Course Snippet</span>
                  </button>
                </div>
                <pre className="p-3.5 bg-stone-900 text-stone-100 font-mono text-xs rounded-lg overflow-x-auto">
                  {JSON.stringify(sampleNewCourse, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="flex-1 overflow-y-auto space-y-5 pr-2 text-stone-700 text-sm leading-relaxed">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4">
                <h4 className="font-serif font-bold text-stone-900 text-lg">
                  Why this is 100x easier than Hugo
                </h4>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200/80">
                    <strong className="text-stone-900 block mb-1">
                      1. One Central File: <code>src/data/siteData.json</code>
                    </strong>
                    Under the previous Hugo Academic setup, adding or editing a single paper required creating nested markdown folders (e.g. <code>content/publication/my-paper/index.md</code>), matching front-matter schemas, maintaining separate <code>cite.bib</code> files, and rebuilding Hugo. Now, everything lives in one readable JSON file.
                  </div>

                  <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200/80">
                    <strong className="text-stone-900 block mb-1">
                      2. Instant Live Updates & Search
                    </strong>
                    The search bar, topic filters, year filters, and BibTeX citations automatically update the moment you add or edit an entry.
                  </div>

                  <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200/80">
                    <strong className="text-stone-900 block mb-1">
                      3. Updating in Code or in Browser
                    </strong>
                    You can either open <code>src/data/siteData.json</code> in VS Code/AI Studio editor, or use this modal to test changes live and download the updated file.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Original</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-json-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            <button
              id="download-json-btn"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Download siteData.json</span>
            </button>

            <button
              id="apply-json-changes-btn"
              onClick={handleApply}
              disabled={!!parseError}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-md shadow-xs transition-all cursor-pointer ${
                parseError
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply Live Preview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
