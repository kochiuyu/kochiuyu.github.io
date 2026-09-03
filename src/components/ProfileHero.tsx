import React from 'react';
import {
  GraduationCap,
  FileText,
  Mail,
  MapPin,
  FileDown,
  Building,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  IdCard,
  Code2
} from 'lucide-react';
import { Profile } from '../types';

interface ProfileHeroProps {
  profile: Profile;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ profile }) => {
  return (
    <section id="about" className="py-12 sm:py-16 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Portrait & Quick Info Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative mb-6">
              <img
                id="author-avatar-img"
                src={profile.avatar}
                alt={profile.name}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover shadow-md border-4 border-white ring-1 ring-stone-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/author/chiu-yu-ko/avatar.jpg';
                }}
              />
              <div className="absolute -bottom-2.5 right-4 bg-stone-900 text-stone-100 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                <span>CUHK Business School</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <h1 id="profile-name-heading" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-950">
                {profile.name}
              </h1>
              {profile.chineseName && (
                <p id="profile-chinese-name" className="text-xl font-medium text-stone-600 font-serif tracking-wide">
                  {profile.chineseName}
                </p>
              )}
            </div>

            <p id="profile-title-role" className="mt-2.5 text-base font-semibold text-stone-800">
              {profile.title}
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              {profile.department}
            </p>
            <p className="text-sm font-medium text-stone-700">
              {profile.institution}
            </p>
            {profile.courtesyAppointment && (
              <p className="text-xs text-stone-500 mt-1 italic">
                {profile.courtesyAppointment}
              </p>
            )}

            {/* Administrative Roles */}
            {profile.administrativeRoles && profile.administrativeRoles.length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-200/80 w-full text-left">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 text-center lg:text-left">
                  Administrative Appointments
                </p>
                <div className="space-y-1">
                  {profile.administrativeRoles.map((role, rIdx) => (
                    <p key={rIdx} className="text-xs text-stone-700 leading-snug">
                      • {role}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Location Details */}
            <div className="mt-4 pt-4 border-t border-stone-200 w-full space-y-2 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <a
                  id="profile-email-link"
                  href={`mailto:${profile.email}`}
                  className="text-stone-800 hover:text-stone-950 hover:underline font-medium"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex items-start gap-2 justify-center lg:justify-start text-left">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{profile.office}</span>
              </div>
            </div>

            {/* Social & Academic Action Buttons */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start w-full">
              {profile.links.map((link, idx) => {
                const isCuhk = link.label.includes('CUHK');
                const isOrcid = link.label.includes('ORCID');
                const isCv = link.label.includes('CV');

                return (
                  <a
                    key={idx}
                    id={`profile-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    href={link.url}
                    target={link.url.startsWith('http') || link.url.endsWith('.pdf') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all shadow-2xs ${
                      isCv
                        ? 'bg-stone-900 text-stone-50 hover:bg-stone-800 font-semibold'
                        : isCuhk
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 font-semibold'
                        : isOrcid
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-semibold'
                        : 'bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {isCv ? (
                      <FileDown className="w-3.5 h-3.5" />
                    ) : isCuhk ? (
                      <Building className="w-3.5 h-3.5 text-amber-700" />
                    ) : isOrcid ? (
                      <IdCard className="w-3.5 h-3.5 text-emerald-700" />
                    ) : link.label.includes('Scholar') ? (
                      <GraduationCap className="w-3.5 h-3.5" />
                    ) : link.label.includes('GitHub') ? (
                      <Code2 className="w-3.5 h-3.5" />
                    ) : link.label.includes('Email') ? (
                      <Mail className="w-3.5 h-3.5" />
                    ) : (
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    )}
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Biography, Research Interests & Education */}
          <div className="lg:col-span-8 space-y-8">
            {/* Biography */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-900 border-b border-stone-200/80 pb-2">
                Biography
              </h2>
              <div className="space-y-3.5 text-stone-700 leading-relaxed text-sm sm:text-base">
                {profile.bio.map((paragraph, idx) => (
                  <p key={idx} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Two-Column Grid: Research Interests & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Research Interests */}
              <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-2xs">
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stone-800"></span>
                  Research Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-200/60 rounded-md"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-2xs">
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-stone-800" />
                  Education
                </h3>
                <ul className="space-y-3">
                  {profile.education.map((edu, idx) => (
                    <li key={idx} className="text-xs sm:text-sm">
                      <div className="font-semibold text-stone-900">
                        {edu.degree}
                      </div>
                      <div className="text-stone-600 flex justify-between items-center text-xs mt-0.5">
                        <span>{edu.institution}</span>
                        <span className="text-stone-500 font-mono">{edu.year}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
