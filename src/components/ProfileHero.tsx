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
  'Economics Letters',
  'Economic Letters',
  'Economic Inquiry',
  'Economic Modelling',
  'Theory and Decision',
  "Canadian Journal of Economics / Revue canadienne d'économique",
];

const OFFICIAL_ENTITIES = [
  {
    phrase: 'Master of Science Programme in Information and Technology Management (MSc in ITM)',
    url: 'https://masters.bschool.cuhk.edu.hk/programmes/mscistm/',
  },
  {
    phrase: 'Master of Science Programme in Information and Technology Management',
    url: 'https://masters.bschool.cuhk.edu.hk/programmes/mscistm/',
  },
  {
    phrase: 'Department of Decisions, Operations and Technology',
    url: 'https://www.bschool.cuhk.edu.hk/departments/decisions-operations-and-technology/',
  },
  {
    phrase: 'The Chinese University of Hong Kong (CUHK) Business School',
    url: 'https://www.bschool.cuhk.edu.hk/',
  },
  {
    phrase: 'The Chinese University of Hong Kong',
    url: 'https://www.cuhk.edu.hk/',
  },
  {
    phrase: 'CUHK Business School',
    url: 'https://www.bschool.cuhk.edu.hk/',
  },
  {
    phrase: 'Aviation Policy Research Centre',
    url: 'https://www.bschool.cuhk.edu.hk/centres/aviation-policy-and-research-centre/',
  },
  {
    phrase: 'Associate Professor',
    url: 'https://www.bschool.cuhk.edu.hk/staff/ko-chiu-yu/',
  },
];

const ALL_HIGHLIGHTS = [
  ...OFFICIAL_ENTITIES.map((e) => ({ type: 'link' as const, text: e.phrase, url: e.url })),
  ...JOURNAL_NAMES.map((j) => ({ type: 'journal' as const, text: j, url: '' })),
].sort((a, b) => b.text.length - a.text.length);

const HIGHLIGHT_REGEX = new RegExp(
  `(${ALL_HIGHLIGHTS.map((h) => h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g'
);

const renderBioText = (paragraph: string) => {
  const parts = paragraph.split(HIGHLIGHT_REGEX);
  if (parts.length === 1) return paragraph;
  return parts.map((part, i) => {
    const matched = ALL_HIGHLIGHTS.find((h) => h.text === part);
    if (!matched) return part;
    if (matched.type === 'link') {
      return (
        <a
          key={i}
          href={matched.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3f51b5] hover:text-[#303f9f] hover:underline font-semibold inline-flex items-center gap-0.5 group"
        >
          <span>{part}</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#3f51b5]/70 group-hover:text-[#303f9f] inline-block shrink-0 ml-0.5" />
        </a>
      );
    }
    return (
      <em key={i} className="italic font-medium text-gray-800">
        {part}
      </em>
    );
  });
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
              <a
                href={profile.institutionUrl || 'https://www.bschool.cuhk.edu.hk/'}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-1.5 right-4 bg-[#3f51b5] hover:bg-[#303f9f] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 transition-colors"
                title="Visit CUHK Business School"
              >
                <span>CUHK Business School</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>
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

            {/* Primary Role & Institutional Affiliation */}
            <div className="mt-2.5 space-y-1 w-full text-center lg:text-left">
              <div>
                <a
                  id="profile-title-role"
                  href={profile.cuhkProfileUrl || 'https://www.bschool.cuhk.edu.hk/staff/ko-chiu-yu/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-gray-900 hover:text-[#3f51b5] inline-flex items-center gap-1.5 group transition-colors"
                  title="View official Faculty Profile at CUHK (Primary Role: Associate Professor)"
                >
                  <span>{profile.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#3f51b5] shrink-0 transition-colors" />
                </a>
              </div>
              <div>
                <a
                  id="profile-department-link"
                  href={profile.departmentUrl || 'https://www.bschool.cuhk.edu.hk/departments/decisions-operations-and-technology/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-[#3f51b5] inline-flex items-center gap-1 group leading-snug transition-colors"
                  title="Visit Department of Decisions, Operations and Technology (DOT)"
                >
                  <span>{profile.department}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#3f51b5] shrink-0 transition-colors" />
                </a>
              </div>
              <div>
                <a
                  id="profile-institution-link"
                  href={profile.institutionUrl || 'https://www.bschool.cuhk.edu.hk/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 hover:text-[#3f51b5] inline-flex items-center gap-1 group transition-colors"
                  title="Visit CUHK Business School"
                >
                  <span>{profile.institution}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#3f51b5] shrink-0 transition-colors" />
                </a>
              </div>
            </div>

            {/* Administrative Roles */}
            {profile.administrativeRoles && profile.administrativeRoles.length > 0 && (
              <div className="mt-3.5 pt-3 border-t border-gray-200 w-full text-left">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-center lg:text-left">
                  Administrative Appointments
                </p>
                <div className="space-y-2">
                  {profile.administrativeRoles.map((roleItem, rIdx) => {
                    const isObj = typeof roleItem === 'object' && roleItem !== null;
                    const roleTitle = isObj ? roleItem.role : (roleItem.includes(',') ? roleItem.split(',')[0].trim() : 'Associate Director');
                    const orgName = isObj ? roleItem.organization : (roleItem.includes(',') ? roleItem.split(',').slice(1).join(',').trim() : roleItem);
                    const shortName = isObj ? roleItem.shortName : (orgName.includes('Information and Technology Management') ? 'MSc in ITM' : orgName.includes('Aviation Policy') ? 'APRC' : undefined);
                    const url = isObj && roleItem.url
                      ? roleItem.url
                      : orgName.includes('Information and Technology Management')
                      ? 'https://masters.bschool.cuhk.edu.hk/programmes/mscistm/'
                      : orgName.includes('Aviation Policy')
                      ? 'https://www.bschool.cuhk.edu.hk/centres/aviation-policy-and-research-centre/'
                      : undefined;

                    return (
                      <div
                        key={rIdx}
                        className="bg-stone-50 hover:bg-indigo-50/50 transition-colors p-2.5 rounded-lg border border-stone-200/90 text-xs"
                      >
                        <div className="font-semibold text-gray-900 flex items-center justify-between gap-1">
                          <span>{roleTitle}</span>
                          {shortName && (
                            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-1.5 py-0.5 rounded">
                              {shortName}
                            </span>
                          )}
                        </div>
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-[#3f51b5] hover:text-[#303f9f] hover:underline font-medium flex items-center gap-1 group leading-snug"
                          >
                            <span>{orgName}</span>
                            <ExternalLink className="w-3 h-3 text-[#3f51b5] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <p className="mt-1 text-gray-700 leading-snug">{orgName}</p>
                        )}
                      </div>
                    );
                  })}
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
                const isDot = link.label.includes('DOT') || link.label.includes('Department');
                const isOrcid = link.label.includes('ORCID');
                const isCv = link.label.includes('CV');
                const isItm = link.label.includes('ITM');
                const isAviation = link.label.includes('Aviation');

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
                        : isDot
                        ? 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 font-semibold'
                        : isItm
                        ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100 font-semibold'
                        : isAviation
                        ? 'bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100 font-semibold'
                        : isOrcid
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-semibold'
                        : 'bg-white text-gray-700 hover:text-[#3f51b5] hover:bg-[#e8eaf6]/40 border border-gray-200 hover:border-[#3f51b5]'
                    }`}
                  >
                    {isCv ? (
                      <FileDown className="w-3.5 h-3.5" />
                    ) : isCuhk ? (
                      <Building className="w-3.5 h-3.5 text-[#3f51b5]" />
                    ) : isDot ? (
                      <Building className="w-3.5 h-3.5 text-blue-700" />
                    ) : isItm ? (
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-700" />
                    ) : isAviation ? (
                      <Building className="w-3.5 h-3.5 text-sky-700" />
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
