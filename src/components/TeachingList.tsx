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
    <section id="teaching" className="py-12 sm:py-16 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Curriculum & Pedagogy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Teaching
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-xl">
              Doctoral economic theory, graduate financial economics, and undergraduate business statistics at CUHK and NUS.
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg border border-stone-200/80 self-start md:self-auto">
            {levels.map((lvl) => (
              <button
                key={lvl}
                id={`teaching-filter-${lvl.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
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
              className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {course.code && (
                      <span className="text-[11px] font-mono font-medium text-stone-500 block mb-0.5">
                        {course.code}
                      </span>
                    )}
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {course.title}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
                      course.level === 'Ph.D.'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : course.level === 'Master'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Semesters */}
                <p className="text-xs text-stone-500 font-medium italic">
                  Offered: {course.semesters}
                </p>

                {/* Overview */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-justify pt-1">
                  {course.overview}
                </p>

                {/* Topics covered */}
                {course.topics && course.topics.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-stone-800 mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-stone-500" />
                      <span>Key Topics:</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-1 text-xs text-stone-600">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
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
