import React from 'react';
import { BookOpen, ExternalLink, Bookmark } from 'lucide-react';
import { Book } from '../types';

interface BooksListProps {
  books: Book[];
}

export const BooksList: React.FC<BooksListProps> = ({ books }) => {
  return (
    <section id="books" className="py-12 sm:py-16 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3f51b5] mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Authored Books & Textbooks</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Books
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">
            Practical guidebooks on algorithmic financial modeling in R and publication-grade vector graphics with TikZ in LaTeX.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <article
              key={book.id}
              id={`book-card-${book.id}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Book Cover */}
                <div className="relative aspect-4/3 bg-gray-100 overflow-hidden border-b border-gray-200">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback image styling if image fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span className="absolute top-3 right-3 bg-[#3f51b5] text-white text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-sm shadow-xs">
                    {book.year}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-gray-900 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">
                      {book.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed text-justify">
                    {book.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {book.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 bg-[#e8eaf6] text-[#303f9f] rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="p-5 pt-0 border-t border-gray-100 mt-4 space-y-2">
                <div className="pt-3 flex flex-wrap gap-2">
                  {book.links.map((link, idx) => (
                    <a
                      key={idx}
                      id={`book-link-${book.id}-${idx}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#303f9f] bg-[#e8eaf6]/70 hover:bg-[#3f51b5] hover:text-white rounded-md border border-[#c5cae9]/80 transition-colors w-full justify-center"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
