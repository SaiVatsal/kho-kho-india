import React, { useState } from 'react';
import kluData from '../data/klu_students.json';
import { GraduationCap, Award, Search, Filter, ShieldCheck, MapPin, Sparkles, Building2 } from 'lucide-react';
import { RangoliDivider } from '../utils/warliIcons';

export const CollegePlayers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'klu' | 'national' | 'state' | 'women'
  const [selectedYear, setSelectedYear] = useState('all'); // 'all' | '2026' | '2025' | '2024'

  const students = kluData.students;

  const filtered = students.filter((st) => {
    // Search query match
    const q = searchQuery.toLowerCase();
    const matchSearch =
      st.name.toLowerCase().includes(q) ||
      st.college.toLowerCase().includes(q) ||
      st.stream.toLowerCase().includes(q) ||
      st.state.toLowerCase().includes(q) ||
      st.role.toLowerCase().includes(q) ||
      st.achievement.toLowerCase().includes(q);

    if (!matchSearch) return false;

    // Filter type match
    if (selectedFilter === 'klu' && !st.isKLU) return false;
    if (selectedFilter === 'national' && !st.level.toLowerCase().includes('national')) return false;
    if (selectedFilter === 'state' && !st.level.toLowerCase().includes('state')) return false;
    if (selectedFilter === 'women' && st.category !== 'Women') return false;

    // Year match
    if (selectedYear !== 'all' && st.year.toString() !== selectedYear) return false;

    return true;
  });

  return (
    <section id="colleges" className="relative py-20 px-4 sm:px-8 md:px-16 bg-jaali border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-marigold/15 text-marigold-dark text-xs font-bold uppercase tracking-wider mb-2">
            Collegiate & University Stars (Till 2026)
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-yatra text-indigo">
            National & State Collegiate Roster
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal/80">
            Celebrating student-athletes from colleges across India—featuring the premier powerhouse contingent of <strong className="text-kumkum">KL University (KLU)</strong>.
          </p>
        </div>

        {/* KLU Institution Spotlight Banner */}
        <div className="bg-gradient-to-r from-paper-pure via-paper to-paper-dark rounded-2xl border-2 border-marigold/40 shadow-clay p-6 sm:p-8 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-kumkum text-white text-xs font-bold uppercase tracking-wider">
                  Featured Institution Spotlight
                </span>
                <span className="text-xs text-charcoal/60 font-semibold">
                  Andhra Pradesh & Telangana
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-yatra text-indigo">
                {kluData.institutionHighlight.name}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                {kluData.institutionHighlight.description}
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-charcoal/70 pt-2">
                <span className="flex items-center gap-1 text-indigo">
                  <MapPin className="w-3.5 h-3.5 text-kumkum" />
                  <span>Vaddeswaram (Guntur, AP) & Aziz Nagar (Hyderabad, TG)</span>
                </span>
                <span className="flex items-center gap-1 text-indigo">
                  <ShieldCheck className="w-3.5 h-3.5 text-peacock" />
                  <span>AIU & KKFI University Competitions</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 text-center bg-paper-pure border border-marigold/30 p-4 rounded-xl shadow-sm">
              <div className="text-3xl font-bold font-yatra text-kumkum">
                {students.filter(s => s.isKLU).length}+
              </div>
              <div className="text-xs font-bold text-indigo uppercase">KLU National & State Athletes</div>
              <div className="text-[10px] text-charcoal/60 mt-0.5">2020 – 2026 Cohorts</div>
            </div>
          </div>
        </div>

        {/* Interactive Filter & Search Controls */}
        <div className="bg-paper p-4 rounded-2xl border border-charcoal/15 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search athlete, college (KLU), branch, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-paper-pure border border-charcoal/20 focus:border-marigold focus:ring-1 focus:ring-marigold"
            />
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                selectedFilter === 'all' ? 'bg-indigo text-white shadow' : 'bg-paper-dark text-charcoal'
              }`}
            >
              All Athletes ({students.length})
            </button>
            <button
              onClick={() => setSelectedFilter('klu')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                selectedFilter === 'klu' ? 'bg-kumkum text-white shadow' : 'bg-paper-dark text-charcoal hover:bg-kumkum/10'
              }`}
            >
              <Sparkles className="w-3 h-3 text-turmeric" />
              <span>KLU Only ({students.filter(s => s.isKLU).length})</span>
            </button>
            <button
              onClick={() => setSelectedFilter('national')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                selectedFilter === 'national' ? 'bg-marigold text-white shadow' : 'bg-paper-dark text-charcoal'
              }`}
            >
              National Level
            </button>
            <button
              onClick={() => setSelectedFilter('state')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                selectedFilter === 'state' ? 'bg-peacock text-white shadow' : 'bg-paper-dark text-charcoal'
              }`}
            >
              State Level
            </button>
            <button
              onClick={() => setSelectedFilter('women')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                selectedFilter === 'women' ? 'bg-indigo text-white shadow' : 'bg-paper-dark text-charcoal'
              }`}
            >
              Women Athletes
            </button>

            {/* Year Selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-paper-pure border border-charcoal/20 text-xs font-bold text-indigo"
            >
              <option value="all">All Years (Till 2026)</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        {/* Athletes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((athlete) => (
            <div
              key={athlete.id}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between ${
                athlete.isKLU
                  ? 'bg-paper-pure border-marigold/60 shadow-clay ring-1 ring-marigold/20'
                  : 'bg-paper border-charcoal/15'
              }`}
            >
              <div>
                {/* Header badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    {athlete.isKLU ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-kumkum/15 text-kumkum text-[11px] font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>KLU Athlete</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo/10 text-indigo text-[11px] font-bold">
                        Collegiate Star
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-yatra font-bold text-kumkum">
                    {athlete.year}
                  </span>
                </div>

                {/* Athlete Name & College */}
                <h4 className="text-xl font-bold font-yatra text-indigo mb-1">
                  {athlete.name}
                </h4>
                <div className="text-xs font-semibold text-charcoal/80 mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-peacock shrink-0" />
                  <span>{athlete.college}</span>
                </div>
                {athlete.campus && (
                  <div className="text-[11px] text-charcoal/60 mb-2">
                    {athlete.campus}
                  </div>
                )}

                {/* Stream & Category */}
                <div className="text-xs text-charcoal/70 mb-3 space-y-1">
                  <div><strong>Stream:</strong> {athlete.stream} ({athlete.batch})</div>
                  <div><strong>Role:</strong> <span className="text-marigold-dark font-bold">{athlete.role}</span></div>
                  <div><strong>Level:</strong> <span className="font-bold text-indigo">{athlete.level}</span></div>
                </div>

                {/* Achievement Highlight */}
                <div className="bg-paper-dark/60 p-3 rounded-xl border border-charcoal/10 text-xs text-charcoal/90 leading-relaxed mb-4">
                  <strong className="block text-kumkum font-bold mb-0.5">Tournament Feat:</strong>
                  {athlete.achievement}
                </div>
              </div>

              {/* Footer source citation */}
              <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between text-[11px] text-charcoal/60">
                <span>{athlete.state} ({athlete.category})</span>
                <span className="font-medium truncate max-w-[150px]" title={athlete.source}>
                  Ref: {athlete.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-paper rounded-2xl border border-charcoal/15 text-charcoal/60">
            No athletes found matching your search. Try adjusting the filter or search term.
          </div>
        )}
      </div>

      <RangoliDivider />
    </section>
  );
};
