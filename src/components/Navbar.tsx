import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Profile } from '../types';

interface NavbarProps {
  profile: Profile;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'publications', label: 'Publications' },
    { id: 'books', label: 'Books' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'advising', label: 'Advising' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#faf9f6]/95 backdrop-blur-md shadow-xs border-b border-stone-200'
          : 'bg-[#faf9f6] border-b border-stone-200/60'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Name */}
          <div className="flex items-center gap-3">
            <button
              id="brand-home-btn"
              onClick={() => handleItemClick('about')}
              className="text-left group cursor-pointer focus:outline-hidden"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
                {profile.name}
              </span>
              {profile.chineseName && (
                <span className="ml-2 text-stone-500 font-sans text-sm font-medium">
                  {profile.chineseName}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'text-stone-900 bg-stone-200/70 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-b border-stone-200 bg-[#faf9f6] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-item-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 text-base font-medium rounded-md cursor-pointer ${
                activeSection === item.id
                  ? 'text-stone-900 bg-stone-200/80 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
