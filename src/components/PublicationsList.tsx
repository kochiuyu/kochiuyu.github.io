import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  Quote,
  ChevronDown,
  ChevronUp,
  Tag,
  Filter,
  Sparkles
} from 'lucide-react';
import { Publication } from '../types';

interface PublicationsListProps {
  publications: Publication[];
  onOpenCiteModal: (pub: Publication) => void;
}

export const PublicationsList: React.FC<PublicationsListProps> = ({
  publications,
  onOpenCiteModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    publications.forEach((p) => {
      p.tags.forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [publications]);

  // Extract all unique years
  const allYears = useMemo(() => {
    const set = new Set<number>();
    publications.forEach((p) => set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [publications]);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.authors.some((a) => a.toLowerCase().includes(q)) ||
        pub.venue.toLowerCase().includes(q) ||
        pub.abstract.toLowerCase().includes(q) ||
        pub.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTag = !selectedTag || pub.tags.includes(selectedTag);
      const matchesYear = !selectedYear || pub.year.toString() === selectedYear;

      return matchesSearch && matchesTag && matchesYear;
    });
  }, [publications, searchQuery, selectedTag, selectedYear]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedYear(null);
  };

  return (
    <section id="publications" className="py-12 sm:py-16 border-b border-gray-200 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3f51b5] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Peer-Reviewed Journal Articles</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Publications
            </h2>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Showing {filteredPublications.length} of {publications.length} articles
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="publications-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by title, co-author, journal, topic..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#3f51b5] focus:border-[#3f51b5] focus:bg-white text-gray-900 placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Year Filter */}
            <div className="md:col-span-2">
              <select
                id="publications-year-filter"
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value || null)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-[#3f51b5] focus:border-[#3f51b5]"
              >
                <option value="">All Years</option>
                {allYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div className="md:col-span-3">
              <select
                id="publications-tag-filter"
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-[#3f51b5] focus:border-[#3f51b5] truncate"
              >
                <option value="">All Topics</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Tags Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-gray-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#3f51b5]" /> Quick Filter:
            </span>
            {['Game Theory', 'Industrial Organization', 'Political Economy', 'Innovation'].map(
              (tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#3f51b5] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-[#e8eaf6] hover:text-[#3f51b5]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              }
            )}

            {(searchQuery || selectedTag || selectedYear) && (
              <button
                id="clear-publication-filters-btn"
                onClick={clearFilters}
                className="ml-auto text-[#3f51b5] hover:text-[#303f9f] underline cursor-pointer text-xs font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Publications List */}
        {filteredPublications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 p-8">
            <p className="text-gray-500 text-base">
              No publications match your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-3 text-xs font-semibold text-[#3f51b5] underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((pub) => {
              const isExpanded = !!expandedAbstracts[pub.id];
              return (
                <article
                  key={pub.id}
                  id={`pub-${pub.id}`}
                  className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      {/* Title */}
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                        {pub.doi ? (
                          <a
                            href={pub.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#3f51b5] transition-colors"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          pub.title
                        )}
                      </h3>

                      {/* Authors */}
                      <div className="text-sm text-gray-700 font-sans">
                        {pub.authors.map((author, i) => {
                          const isSelf = /^(chiu\s*yu\s*ko|ko,\s*chiu\s*yu)$/i.test(author.trim());
                          return (
                            <React.Fragment key={i}>
                              <span
                                className={
                                  isSelf
                                    ? 'font-bold text-[#1a237e] underline decoration-[#3f51b5]/40 underline-offset-2'
                                    : 'text-gray-600'
                                }
                              >
                                {author}
                              </span>
                              {i < pub.authors.length - 1 && ', '}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Venue & Date */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 pt-0.5">
                        <span className="italic font-medium text-[#3f51b5]">
                          {pub.venue || 'Working Paper'}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-gray-500 font-medium">
                          {pub.year}
                        </span>
                        {pub.type && (
                          <>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-[#e8eaf6] text-[#303f9f] rounded text-[11px] font-medium">
                              {pub.type}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                      {pub.doi && (
                        <a
                          id={`pub-doi-btn-${pub.id}`}
                          href={pub.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#303f9f] bg-[#e8eaf6]/60 hover:bg-[#3f51b5] hover:text-white border border-[#c5cae9]/80 rounded-md transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>DOI</span>
                        </a>
                      )}
                      <button
                        id={`pub-cite-btn-${pub.id}`}
                        onClick={() => onOpenCiteModal(pub)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white hover:bg-[#e8eaf6] hover:text-[#303f9f] hover:border-[#3f51b5] border border-gray-300 rounded-md transition-colors cursor-pointer"
                        title="View BibTeX Citation"
                      >
                        <Quote className="w-3 h-3 text-gray-500" />
                        <span>Cite</span>
                      </button>
                    </div>
                  </div>

                  {/* Abstract Section */}
                  {pub.abstract && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        id={`toggle-abstract-btn-${pub.id}`}
                        onClick={() => toggleAbstract(pub.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#3f51b5] hover:text-[#303f9f] cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Abstract' : 'Show Abstract'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                      {isExpanded && (
                        <p className="mt-2 text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                          {pub.abstract}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Topic Tags */}
                  {pub.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                      {pub.tags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                          className={`text-[11px] px-2 py-0.5 rounded-sm transition-colors cursor-pointer ${
                            tag === selectedTag
                              ? 'bg-[#3f51b5] text-white font-medium'
                              : 'bg-[#e8eaf6] text-[#303f9f] hover:bg-[#c5cae9]'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
