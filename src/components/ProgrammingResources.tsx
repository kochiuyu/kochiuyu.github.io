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
    <section id="resources" className="py-12 sm:py-16 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>Open Educational Resources & Guides</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Programming & Tutorials
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-2xl leading-relaxed">
            Hands-on tutorials, packages, and code snippets for economists and researchers working in R, LaTeX/TikZ, and Excel VBA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-stone-700" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {cat.category}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-stone-100 space-y-2.5">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 hover:bg-stone-100/80 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="text-xs font-medium text-stone-800">
                        {item.url && item.url !== '#' ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-stone-950 flex items-center gap-1.5"
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="w-3 h-3 text-stone-400 shrink-0" />
                          </a>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-500 font-mono shrink-0">
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
