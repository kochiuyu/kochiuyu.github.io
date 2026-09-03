import React, { useState } from 'react';
import { X, Check, Copy, Quote } from 'lucide-react';
import { Publication } from '../types';

interface CiteModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const CiteModal: React.FC<CiteModalProps> = ({ publication, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!publication) return null;

  const bibtex = publication.bibtex || `@article{ko${publication.year},
  title = {${publication.title}},
  author = {${publication.authors.join(' and ')}},
  journal = {${publication.venue}},
  year = {${publication.year}}${publication.doi ? `,\n  doi = {${publication.doi}}` : ''}
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="cite-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="cite-modal-dialog"
        className="bg-white rounded-xl shadow-xl border border-stone-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-[#3f51b5]" />
            <h3 className="font-heading font-bold text-gray-900 text-base">
              BibTeX Citation
            </h3>
          </div>
          <button
            id="close-cite-modal-btn"
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper title info */}
        <div className="px-5 py-3 border-b border-gray-100 text-xs text-gray-600 bg-gray-50">
          <span className="font-medium text-gray-900">{publication.title}</span> ({publication.year})
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="relative">
            <pre
              id="bibtex-code-content"
              className="p-4 bg-gray-900 text-gray-100 font-mono text-xs rounded-lg overflow-x-auto leading-relaxed max-h-72 select-all"
            >
              {bibtex}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Click copy to add to your bibliography
          </span>
          <button
            id="copy-bibtex-btn"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-md shadow-xs transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#3f51b5] text-white hover:bg-[#303f9f]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy BibTeX</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
