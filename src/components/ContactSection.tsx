import React, { useState } from 'react';
import { Mail, MapPin, Building, Copy, Check, ExternalLink, IdCard } from 'lucide-react';
import { Profile } from '../types';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const officialEmail = profile.officialEmail || profile.email;

  return (
    <section id="contact" className="py-12 sm:py-16 border-b border-gray-200 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3f51b5] mb-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Card */}
          <div className="md:col-span-6 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900">
                Academic Office
              </h3>
              <p className="text-xs text-gray-500">
                Department of Decisions, Operations and Technology
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#3f51b5] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Office Location</div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {profile.office}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    CUHK Business School, The Chinese University of Hong Kong
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#3f51b5] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Official Email</div>
                  
                  <div className="flex items-center justify-between mt-1.5 py-1.5 px-3 rounded-lg bg-gray-50 border border-gray-200">
                    <a
                      href={`mailto:${officialEmail}`}
                      className="text-[#3f51b5] hover:text-[#303f9f] font-mono text-sm underline font-medium"
                    >
                      {officialEmail}
                    </a>
                    <button
                      onClick={() => handleCopy(officialEmail)}
                      className="p-1 rounded text-gray-400 hover:text-[#3f51b5] hover:bg-[#e8eaf6] cursor-pointer transition-colors"
                      title="Copy official email to clipboard"
                      aria-label="Copy official email to clipboard"
                    >
                      {copiedEmail === officialEmail ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Information */}
          <div className="md:col-span-6 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building className="w-5 h-5 text-[#3f51b5]" />
                <h3 className="font-heading text-lg font-bold text-gray-900">
                  Institutional Affiliation
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                The Chinese University of Hong Kong (CUHK)
              </p>

              <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  Associate Professor, Department of Decisions, Operations and Technology (DOT), CUHK Business School.
                </p>
                {profile.administrativeRoles && profile.administrativeRoles.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="font-semibold text-gray-900 block">Administrative Appointments:</span>
                    <ul className="space-y-1 text-gray-700">
                      {profile.administrativeRoles.map((role, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#3f51b5] font-bold">•</span>
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-gray-500 text-xs pt-1">
                  Conveniently situated next to University MTR Station (Exit B) in the Cheng Yu Tung Building (CYT), Shatin.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-3 items-center">
              <a
                href={profile.cuhkProfileUrl || "https://www.bschool.cuhk.edu.hk/staff/ko-chiu-yu/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#303f9f] hover:text-[#1a237e] font-semibold underline"
              >
                <span>CUHK Official Staff Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-gray-300">•</span>
              <a
                href={profile.orcidUrl || "https://orcid.org/0000-0001-8590-6159"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline"
              >
                <IdCard className="w-3.5 h-3.5 text-emerald-700" />
                <span>ORCID Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
