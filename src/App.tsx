import React, { useState, useEffect } from 'react';
import { initialSiteData } from './data/siteData';
import { SiteData, Publication } from './types';
import { Navbar } from './components/Navbar';
import { ProfileHero } from './components/ProfileHero';
import { PublicationsList } from './components/PublicationsList';
import { BooksList } from './components/BooksList';
import { TeachingList } from './components/TeachingList';
import { AdvisingSection } from './components/AdvisingSection';
import { ProgrammingResources } from './components/ProgrammingResources';
import { ContactSection } from './components/ContactSection';
import { CiteModal } from './components/CiteModal';
import { ArrowUp } from 'lucide-react';

export function App() {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    // Clear previous storage keys to ensure updated author corrections & publications load cleanly
    try {
      localStorage.removeItem('chiu_yu_ko_site_data');
      localStorage.removeItem('chiu_yu_ko_site_data_v3');
      localStorage.removeItem('chiu_yu_ko_site_data_v4');
      const saved = localStorage.getItem('chiu_yu_ko_site_data_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.profile?.chineseName === '高超禹' && parsed?.publications?.length === 21) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse cached site data', e);
    }
    return initialSiteData;
  });

  const [activeSection, setActiveSection] = useState<string>('about');
  const [selectedCitePublication, setSelectedCitePublication] = useState<Publication | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll listener for back-to-top & active section
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['about', 'publications', 'books', 'teaching', 'advising', 'resources', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#212529] flex flex-col font-sans selection:bg-[#c5cae9] selection:text-[#1a237e]">
      {/* Navigation */}
      <Navbar
        profile={siteData.profile}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Profile / Bio Hero */}
        <ProfileHero profile={siteData.profile} />

        {/* Publications & Research */}
        <PublicationsList
          publications={siteData.publications}
          onOpenCiteModal={(pub) => setSelectedCitePublication(pub)}
        />

        {/* Authored Books */}
        <BooksList books={siteData.books} />

        {/* Teaching & Pedagogy */}
        <TeachingList courses={siteData.teaching} />

        {/* Student Advising */}
        <AdvisingSection advising={siteData.advising} />

        {/* Programming Resources */}
        <ProgrammingResources categories={siteData.programming} />

        {/* Contact Information */}
        <ContactSection profile={siteData.profile} />
      </main>

      {/* Academic Footer - Clean Hugo Academic Style */}
      <footer className="bg-[#f8f9fa] text-gray-600 py-10 border-t border-gray-200 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <p className="font-heading text-sm sm:text-base font-bold text-gray-900">
                {siteData.profile.name} {siteData.profile.chineseName && <span className="font-normal text-gray-500 text-sm ml-1">({siteData.profile.chineseName})</span>}
              </p>
              <p className="text-gray-600 text-xs mt-0.5">
                {siteData.profile.title} • {siteData.profile.institution}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                {siteData.profile.department}
              </p>
            </div>

            <div className="text-gray-500 text-xs text-center sm:text-right">
              <p>CUHK Business School • Shatin, N.T., Hong Kong</p>
              <p className="text-gray-400 text-xs mt-0.5">Cheng Yu Tung Building (CYT)</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500">
            <p>
              © {new Date().getFullYear()} {siteData.profile.name}. All rights reserved.
            </p>
            <p>
              Last updated: <span className="font-mono text-[#3f51b5] font-semibold">{siteData.lastUpdated}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Citation Modal */}
      <CiteModal
        publication={selectedCitePublication}
        onClose={() => setSelectedCitePublication(null)}
      />

      {/* Back to top floating button */}
      {showScrollTop && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2.5 bg-[#3f51b5] text-white rounded-full shadow-lg hover:bg-[#303f9f] transition-all z-30 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default App;
