import React from 'react';
import { Users, Award, Briefcase, ExternalLink, Building2, GraduationCap } from 'lucide-react';
import { Advising, Advisee } from '../types';

interface AdvisingSectionProps {
  advising: Advising;
}

export const AdvisingSection: React.FC<AdvisingSectionProps> = ({ advising }) => {
  // Separate into NUS and CUHK advisees
  const nusStudents = advising.phdStudents.filter(
    (s) => s.institution?.includes('Singapore') || s.institution?.includes('NUS')
  );
  const cuhkStudents = advising.phdStudents.filter(
    (s) => s.institution?.includes('Hong Kong') || s.institution?.includes('CUHK')
  );

  const renderStudentCard = (student: Advisee, idx: number) => {
    return (
      <div
        key={idx}
        id={`advisee-${student.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
        className="p-4 bg-gray-50/80 hover:bg-white rounded-xl border border-gray-200 transition-all shadow-2xs hover:shadow-xs hover:border-indigo-200 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-gray-900 text-base">
                  {student.name}
                </span>
                {student.profileUrl && (
                  <a
                    href={student.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs text-[#3f51b5] hover:text-[#303f9f] hover:underline"
                    title={`View ${student.name}'s official profile`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#3f51b5]" />
                  </a>
                )}
              </div>
              <p className="text-xs font-medium text-gray-500 mt-0.5">
                {student.role}
              </p>
            </div>

            {student.year && (
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-[#e8eaf6] text-[#303f9f]">
                {student.year}
              </span>
            )}
          </div>

          <div className="text-xs text-gray-700 mt-3 flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-normal">
              {student.currentPlacement}
            </span>
          </div>
        </div>

        {student.profileUrl && (
          <div className="mt-3 pt-2.5 border-t border-gray-200 flex items-center justify-end">
            <a
              href={student.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3f51b5] hover:text-[#303f9f] hover:underline"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="advising" className="py-12 sm:py-16 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3f51b5] mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Doctoral Mentorship</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Student Advising
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-3xl leading-relaxed">
            Main dissertation advisor for Ph.D. students at the National University of Singapore (NUS) and The Chinese University of Hong Kong (CUHK).
          </p>
        </div>

        <div className="space-y-8">
          {/* CUHK Doctoral Advisees */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#3f51b5]" />
                <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900">
                  The Chinese University of Hong Kong (CUHK)
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#3f51b5]">
                Main Advisor ({cuhkStudents.length} students)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {cuhkStudents.map((student, idx) => renderStudentCard(student, idx))}
            </div>
          </div>

          {/* NUS Doctoral Advisees (Brief) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#3f51b5]" />
                <h3 className="font-heading text-base sm:text-lg font-bold text-gray-900">
                  National University of Singapore (NUS)
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#3f51b5]">
                Main Advisor
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
              {nusStudents.map((student, idx) => (
                <div
                  key={idx}
                  id={`advisee-${student.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between gap-2 text-sm hover:bg-gray-100/80 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{student.name}</span>
                    {student.year && (
                      <span className="text-xs font-mono text-[#3f51b5] font-medium">({student.year})</span>
                    )}
                  </div>
                  {student.profileUrl ? (
                    <a
                      href={student.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3f51b5] hover:text-[#303f9f] p-0.5"
                      title={`${student.name}'s profile`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
