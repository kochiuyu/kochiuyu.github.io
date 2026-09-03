import React, { useState } from 'react';
import { GraduationCap, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { TeachingCourse } from '../types';

interface TeachingListProps {
  courses: TeachingCourse[];
}

export const TeachingList: React.FC<TeachingListProps> = ({ courses }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const filteredCourses = courses.filter((c) => {
    if (selectedLevel === 'All') return true;
    return c.level === selectedLevel;
  });

  const levels = ['All', 'Ph.D.', 'Master', 'Undergraduate'];

  return (
    <section id="teaching" className="py-12 sm:py-16 border-b border-gray-200 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3f51b5] mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Curriculum & Pedagogy</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Teaching
            </h2>
            <p className="mt-1 text-sm text-gray-600 max-w-xl">
              Doctoral economic theory, graduate financial economics, and undergraduate business statistics at CUHK and NUS.
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-gray-200/70 p-1 rounded-lg border border-gray-300/60 self-start md:self-auto">
            {levels.map((lvl) => (
              <button
                key={lvl}
                id={`teaching-filter-${lvl.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-[#3f51b5] text-white shadow-xs font-semibold'
                    : 'text-gray-700 hover:text-gray-950 hover:bg-white/50'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {course.code && (
                      <span className="text-[11px] font-mono font-medium text-[#3f51b5] block mb-0.5">
                        {course.code}
                      </span>
                    )}
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      {course.title}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
                      course.level === 'Ph.D.'
                        ? 'bg-[#e8eaf6] text-[#303f9f] border border-[#c5cae9]'
                        : course.level === 'Master'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Semesters */}
                <p className="text-xs text-gray-500 font-medium italic">
                  Offered: {course.semesters}
                </p>

                {/* Overview */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify pt-1">
                  {course.overview}
                </p>

                {/* Topics covered */}
                {course.topics && course.topics.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-gray-800 mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#3f51b5]" />
                      <span>Key Topics:</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#3f51b5] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
