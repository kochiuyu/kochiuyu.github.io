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
        className="p-4 bg-stone-50/80 hover:bg-stone-50 rounded-xl border border-stone-200/80 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900 text-base">
                  {student.name}
                </span>
                {student.profileUrl && (
                  <a
                    href={student.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs text-stone-500 hover:text-stone-900 hover:underline"
                    title={`View ${student.name}'s official profile`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400 hover:text-stone-700" />
                  </a>
                )}
              </div>
              <p className="text-xs font-medium text-stone-500 mt-0.5">
                {student.role}
              </p>
            </div>

            {student.year && (
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-700">
                {student.year}
              </span>
            )}
          </div>

          <div className="text-xs text-stone-700 mt-3 flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-normal">
              {student.currentPlacement}
            </span>
          </div>
        </div>

        {student.profileUrl && (
          <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-end">
            <a
              href={student.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-stone-950 underline decoration-stone-300 hover:decoration-stone-800"
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
    <section id="advising" className="py-12 sm:py-16 border-b border-stone-200 bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Doctoral Mentorship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Student Advising
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-3xl leading-relaxed">
            Main dissertation advisor for Ph.D. students at the National University of Singapore (NUS) and The Chinese University of Hong Kong (CUHK).
          </p>
        </div>

        <div className="space-y-8">
          {/* CUHK Doctoral Advisees */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-stone-700" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  The Chinese University of Hong Kong (CUHK)
                </h3>
              </div>
              <span className="text-xs font-medium text-stone-500">
                Main Advisor ({cuhkStudents.length} students)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {cuhkStudents.map((student, idx) => renderStudentCard(student, idx))}
            </div>
          </div>

          {/* NUS Doctoral Advisees (Brief) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-stone-700" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                  National University of Singapore (NUS)
                </h3>
              </div>
              <span className="text-xs font-medium text-stone-500">
                Main Advisor
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
              {nusStudents.map((student, idx) => (
                <div
                  key={idx}
                  id={`advisee-${student.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-200/70 flex items-center justify-between gap-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">{student.name}</span>
                    {student.year && (
                      <span className="text-xs font-mono text-stone-500">({student.year})</span>
                    )}
                  </div>
                  {student.profileUrl ? (
                    <a
                      href={student.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-stone-800 p-0.5"
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
