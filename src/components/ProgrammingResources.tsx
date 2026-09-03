import React from 'react';
import { Terminal, ExternalLink, Code2, FileCode, Check } from 'lucide-react';
import { ProgrammingCategory } from '../types';

interface ProgrammingResourcesProps {
  categories: ProgrammingCategory[];
}

export const ProgrammingResources: React.FC<ProgrammingResourcesProps> = ({
  categories,
}) => {
  return (
    <section id="resources" className="py-12 sm:py-16 border-b border-gray-200 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3f51b5] mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>Open Educational Resources & Guides</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Programming & Tutorials
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
            Hands-on tutorials, packages, and code snippets for economists and researchers working in R, LaTeX/TikZ, and Excel VBA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#3f51b5]" />
                  <h3 className="font-heading text-lg font-bold text-gray-900">
                    {cat.category}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-gray-100 space-y-2.5">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-gray-50 border border-gray-200/80 hover:bg-[#e8eaf6]/40 hover:border-[#c5cae9] transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="text-xs font-medium text-gray-800">
                        {item.url && item.url !== '#' ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-[#3f51b5] flex items-center gap-1.5"
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="w-3 h-3 text-[#3f51b5] shrink-0" />
                          </a>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#e8eaf6] text-[#303f9f] font-mono shrink-0">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
