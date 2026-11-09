import React, { useState } from 'react';
import { GraduationCap, BookOpen, Layers, CheckCircle2, ExternalLink, Sparkles, Laptop, MonitorPlay, Gamepad2, Wrench } from 'lucide-react';
import { TeachingCourse, TeachingTool } from '../types';

interface TeachingListProps {
  courses: TeachingCourse[];
  tools?: TeachingTool[];
}

const defaultTools: TeachingTool[] = [
  {
    id: 'game-tikz-studio',
    title: 'TikZ Studio',
    subtitle: 'Interactive Game Tree & LaTeX Diagram Generator',
    url: 'https://kochiuyu.github.io/GameTikzStudio/',
    badge: 'Interactive Web App',
    description: 'An interactive web studio for constructing extensive-form game trees, decision trees, and economic diagrams in the browser. Features real-time visual canvas editing and instant export to clean LaTeX/TikZ code ready for lecture slides, problem sets, and research manuscripts.',
    tags: ['Game Theory', 'LaTeX & TikZ', 'Extensive Form Trees', 'Open Educational Tool'],
    features: [
      'Visual node & branch tree constructor for extensive form games',
      'Instant one-click LaTeX/TikZ code export for Beamer and Overleaf',
      'Customizable information sets, nature moves, payoffs, and subgame branches'
    ]
  },
  {
    id: 'presentation-facilitator',
    title: 'Presentation Facilitator',
    subtitle: 'Interactive Lecture Flow & Pacing Facilitator',
    url: 'https://kochiuyu.github.io/Presentation/',
    badge: 'Teaching Utility',
    description: 'A web-based presentation facilitator and pacing controller built for interactive university classrooms and seminar presentations. Helps instructors maintain lecture rhythm, monitor discussion timing, manage slide flow, and promote active student participation.',
    tags: ['Interactive Lectures', 'Classroom Management', 'Lecture Pacing', 'Teaching Utility'],
    features: [
      'Adaptive pacing and section progress tracker for lecture delivery',
      'Clean, high-contrast presenter display optimized for podiums and lecture halls',
      'Facilitates student engagement, interactive pauses, and discussion timing'
    ]
  },
  {
    id: 'interactive-minigames',
    title: 'Interactive Minigames',
    subtitle: 'Classroom Game Theory & Economic Experiments',
    url: 'https://kochiuyu.github.io/minigame/',
    badge: 'Classroom Experiment',
    description: 'A suite of interactive web-based economic minigames and experimental simulations designed for classroom demonstrations. Allows students and participants to engage directly with strategic interactions, market decisions, and game-theoretic scenarios.',
    tags: ['Game Theory', 'Interactive Experiments', 'Classroom Games', 'Pedagogy'],
    features: [
      'Web-based experimental mini-games for real-time student participation',
      'Hands-on exploration of strategic choices, incentives, and equilibrium concepts',
      'Lightweight and instantly accessible across mobile devices, tablets, and laptops'
    ]
  }
];

export const TeachingList: React.FC<TeachingListProps> = ({ courses, tools = defaultTools }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const filteredCourses = courses.filter((c) => {
    if (selectedLevel === 'All') return true;
    return c.level === selectedLevel;
  });

  const levels = ['All', 'Ph.D.', 'Master', 'Undergraduate'];

  const displayTools = tools && tools.length > 0 ? tools : defaultTools;

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
                      {course.url ? (
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#3f51b5] inline-flex items-center gap-1.5 group transition-colors"
                          title={`Visit course website: ${course.url}`}
                        >
                          <span>{course.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#3f51b5] shrink-0 transition-colors" />
                        </a>
                      ) : (
                        course.title
                      )}
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

              {/* Course Website Link */}
              {course.url && (
                <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a237e] hover:text-[#303f9f] bg-[#e8eaf6] hover:bg-[#c5cae9]/50 px-3 py-1.5 rounded-lg border border-[#c5cae9] transition-all shadow-2xs group"
                  >
                    <span>Course Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#3f51b5] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <span className="text-[11px] text-gray-400 font-medium">Online Companion</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Teaching & Learning Tools Showcase */}
        {displayTools && displayTools.length > 0 && (
          <div id="teaching-tools" className="mt-14 pt-12 border-t border-gray-200">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3f51b5] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Pedagogical Web Applications</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Teaching & Learning Tools
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl">
                  Interactive browser-based tools developed by Chiu Yu Ko to empower students, instructors, and researchers with visual game tree modeling, TikZ code generation, and interactive presentation facilitation.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[#e8eaf6] text-[#303f9f] border border-[#c5cae9] font-medium self-start sm:self-auto">
                <span>Free & Open Access</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayTools.map((tool) => (
                <div
                  key={tool.id}
                  id={`teaching-tool-${tool.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs hover:border-[#3f51b5]/60 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-[#e8eaf6] text-[#1a237e] flex items-center justify-center shrink-0 border border-[#c5cae9]/60 group-hover:bg-[#3f51b5] group-hover:text-white transition-colors">
                          {tool.id.includes('tikz') ? (
                            <Laptop className="w-5 h-5" />
                          ) : tool.id.includes('game') || tool.id.includes('minigame') ? (
                            <Gamepad2 className="w-5 h-5" />
                          ) : (
                            <MonitorPlay className="w-5 h-5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-heading text-lg font-bold text-gray-900 group-hover:text-[#3f51b5] transition-colors leading-snug">
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 hover:underline"
                            >
                              <span>{tool.title}</span>
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#3f51b5] shrink-0" />
                            </a>
                          </h4>
                          <p className="text-xs text-[#3f51b5] font-medium mt-0.5 leading-snug">
                            {tool.subtitle}
                          </p>
                        </div>
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-[#1a237e] border border-indigo-200 shrink-0 whitespace-nowrap self-start">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-left">
                      {tool.description}
                    </p>

                    {/* Features checklist */}
                    {tool.features && tool.features.length > 0 && (
                      <div className="pt-1">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                          Key Capabilities
                        </div>
                        <ul className="space-y-1.5">
                          {tool.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#3f51b5] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    {tool.tags && tool.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tool.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200/60 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Action Button */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#3f51b5] hover:bg-[#303f9f] text-white text-xs font-semibold rounded-lg shadow-2xs hover:shadow-xs transition-all group/btn"
                    >
                      <span>Launch {tool.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-gray-400 hover:text-[#3f51b5] truncate transition-colors text-center sm:text-right"
                      title={tool.url}
                    >
                      {tool.url.replace('https://', '')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

