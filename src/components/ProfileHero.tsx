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

const JOURNAL_NAMES = [
  'Journal of Environmental Economics and Management',
  'Journal of Economics & Management Strategy',
  'Journal of Institutional and Theoretical Economics',
  'Journal of Public Economic Theory',
  'Annals of Economics and Finance',
  'Eurasian Geography and Economics',
  'Mathematical Social Sciences',
  'Canadian Journal of Economics',
  'International Economic Review',
  'Games and Economic Behavior',
  'Journal of Economic Theory',
  'Global Finance Journal',
  'Management Science',
  'Economic Inquiry',
  'Economic Modelling',
  'Theory and Decision',
];

const JOURNAL_REGEX = new RegExp(
  `(${JOURNAL_NAMES.map((j) => j.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g'
);

const renderBioText = (paragraph: string) => {
  const parts = paragraph.split(JOURNAL_REGEX);
  if (parts.length === 1) return paragraph;
  return parts.map((part, i) =>
    JOURNAL_NAMES.includes(part) ? (
      <em key={i} className="italic font-medium text-gray-800">
        {part}
      </em>
    ) : (
      part
    )
  );
};

interface ProfileHeroProps {
  profile: Profile;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ profile }) => {
  return (
    <section id="about" className="py-12 sm:py-16 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Portrait & Quick Info Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative mb-6">
              <img
                id="author-avatar-img"
                src={profile.avatar}
                alt={profile.name}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover shadow-md border-4 border-white ring-1 ring-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/author/chiu-yu-ko/avatar.jpg';
                }}
              />
              <div className="absolute -bottom-1.5 right-4 bg-[#3f51b5] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                <span>CUHK Business School</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <h1 id="profile-name-heading" className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                {profile.name}
              </h1>
              {profile.chineseName && (
                <p id="profile-chinese-name" className="text-xl font-medium text-gray-500 tracking-wide">
                  {profile.chineseName}
                </p>
              )}
            </div>

            <p id="profile-title-role" className="mt-2.5 text-base font-semibold text-gray-800">
              {profile.title}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.department}
            </p>
            <p className="text-sm font-medium text-gray-700">
              {profile.institution}
            </p>

            {/* Administrative Roles */}
            {profile.administrativeRoles && profile.administrativeRoles.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 w-full text-left">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 text-center lg:text-left">
                  Administrative Appointments
                </p>
                <div className="space-y-1">
                  {profile.administrativeRoles.map((role, rIdx) => (
                    <p key={rIdx} className="text-xs text-gray-700 leading-snug">
                      • {role}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Location Details */}
            <div className="mt-4 pt-4 border-t border-gray-200 w-full space-y-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Mail className="w-4 h-4 text-[#3f51b5] shrink-0" />
                <a
                  id="profile-email-link"
                  href={`mailto:${profile.email}`}
                  className="text-[#3f51b5] hover:text-[#303f9f] hover:underline font-medium"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex items-start gap-2 justify-center lg:justify-start text-left">
                <MapPin className="w-4 h-4 text-[#3f51b5] shrink-0 mt-0.5" />
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
                        ? 'bg-[#3f51b5] text-white hover:bg-[#303f9f] font-semibold'
                        : isCuhk
                        ? 'bg-[#e8eaf6] text-[#303f9f] border border-[#c5cae9] hover:bg-[#c5cae9]/50 font-semibold'
                        : isOrcid
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-semibold'
                        : 'bg-white text-gray-700 hover:text-[#3f51b5] hover:bg-[#e8eaf6]/40 border border-gray-200 hover:border-[#3f51b5]'
                    }`}
                  >
                    {isCv ? (
                      <FileDown className="w-3.5 h-3.5" />
                    ) : isCuhk ? (
                      <Building className="w-3.5 h-3.5 text-[#3f51b5]" />
                    ) : isOrcid ? (
                      <IdCard className="w-3.5 h-3.5 text-emerald-700" />
                    ) : link.label.includes('Scholar') ? (
                      <GraduationCap className="w-3.5 h-3.5 text-[#3f51b5]" />
                    ) : link.label.includes('GitHub') ? (
                      <Code2 className="w-3.5 h-3.5 text-gray-700" />
                    ) : link.label.includes('Email') ? (
                      <Mail className="w-3.5 h-3.5 text-[#3f51b5]" />
                    ) : (
                      <ExternalLink className="w-3 h-3 text-gray-400" />
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
              <h2 className="font-heading text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-2">
                Biography
              </h2>
              <div className="space-y-3.5 text-gray-700 leading-relaxed text-sm sm:text-base">
                {profile.bio.map((paragraph, idx) => (
                  <p key={idx} className="text-justify">
                    {renderBioText(paragraph)}
                  </p>
                ))}
              </div>
            </div>

            {/* Two-Column Grid: Research Interests & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Research Interests */}
              <div id="research-interests-card" className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#3f51b5]" />
                    Research Interests
                  </h3>

                  <div className="space-y-3 pt-0.5">
                    {/* Primary Fields */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3f51b5]"></span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3f51b5]">
                          Primary Fields
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(profile.researchFields?.primary || ['Applied Game Theory', 'Industrial Organization']).map((field, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-[#1a237e] bg-[#e8eaf6] border border-[#c5cae9] rounded-md"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Fields */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                          Secondary Fields
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(profile.researchFields?.secondary || ['Public Economics', 'Financial Economics']).map((field, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-800 bg-slate-50 border border-slate-200 rounded-md"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Focus Topics & Applications */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                          Focus Topics & Applications
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(profile.researchFields?.topics || [
                          'Patent Licensing & FRAND Royalties',
                          'Platform Economics & Two-Sided Markets',
                          'Bargaining & Dynamic Contracts',
                          'Political Economy & State Capacity'
                        ]).map((topic, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-md"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3.5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#3f51b5]" />
                  Education
                </h3>
                <ul className="space-y-3">
                  {profile.education.map((edu, idx) => (
                    <li key={idx} className="text-xs sm:text-sm">
                      <div className="font-semibold text-gray-900">
                        {edu.degree}
                      </div>
                      <div className="text-gray-600 flex justify-between items-center text-xs mt-0.5">
                        <span>{edu.institution}</span>
                        <span className="text-[#3f51b5] font-semibold font-mono">{edu.year}</span>
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
