import React, { useState } from 'react';
import statsData from '../data/stats.json';
import playersData from '../data/players.json';
import { Trophy, Award, Zap, Activity, Users, Flame, ExternalLink, BarChart3, ChevronRight } from 'lucide-react';
import { RangoliDivider, WarliRunner } from '../utils/warliIcons';

export const StatsSection = () => {
  const [awardFilter, setAwardFilter] = useState('all');
  const [activeStar, setActiveStar] = useState(playersData.modernStars[0]);

  const filteredAwards = statsData.arjunaAwards.filter((award) => {
    if (awardFilter === 'all') return true;
    if (awardFilter === 'recent') return award.year >= 2020;
    if (awardFilter === 'pioneer') return award.year <= 1985;
    return true;
  });

  return (
    <section id="stats" className="relative py-20 px-4 sm:px-8 md:px-16 bg-paper-pure border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-turmeric/20 text-indigo text-xs font-bold uppercase tracking-wider mb-2">
            Athletic Biomechanics & Hall of Fame
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-yatra text-indigo">
            Numbers, Records & Legends
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal/80">
            Backed by official Ministry of Youth Affairs and Sports records and 2025 World Cup finals data.
          </p>
        </div>

        {/* 6 Key Kinetic Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {statsData.counters.map((cnt) => (
            <div
              key={cnt.id}
              className="bg-paper p-5 rounded-2xl border-2 border-charcoal/10 shadow-sm hover:border-marigold transition-all text-center flex flex-col justify-between"
            >
              <div className="text-3xl sm:text-4xl font-bold font-yatra text-kumkum">
                {typeof cnt.value === 'number' && cnt.value > 1000
                  ? cnt.value.toLocaleString()
                  : cnt.value}
                <span className="text-sm font-poppins text-indigo ml-1 font-bold">{cnt.unit}</span>
              </div>
              <div className="text-xs font-bold text-indigo uppercase mt-2 mb-1">
                {cnt.label}
              </div>
              <p className="text-[11px] text-charcoal/70 leading-tight">
                {cnt.context}
              </p>
            </div>
          ))}
        </div>

        {/* World Cup 2025 Bar Chart & Results Showcase */}
        <div className="bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-6 sm:p-8 mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal/10 gap-2 mb-6">
            <div>
              <span className="text-xs font-bold text-marigold uppercase tracking-wider block">
                Official Final Tournament Scores
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-yatra text-indigo">
                {statsData.worldCup2025Results.title}
              </h3>
            </div>
            <div className="text-xs text-charcoal/70 bg-paper-dark px-3 py-1.5 rounded-lg border border-charcoal/10">
              {statsData.worldCup2025Results.date} • {statsData.worldCup2025Results.venue}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Native Clean Bar Chart */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-indigo uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-kumkum" />
                <span>Points Scored in World Cup Finals</span>
              </h4>

              {/* Men's Final Bar: India 54 vs Nepal 36 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-indigo">Men's Final: India (54) vs Nepal (36)</span>
                  <span className="text-kumkum">+18 Pts Margin</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-xs font-semibold text-charcoal">India</span>
                    <div className="flex-1 bg-paper-dark rounded-full h-5 overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-marigold to-kumkum h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-bold text-white" style={{ width: '69%' }}>
                        54
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-xs font-semibold text-charcoal">Nepal</span>
                    <div className="flex-1 bg-paper-dark rounded-full h-5 overflow-hidden p-0.5">
                      <div className="bg-indigo/60 h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-bold text-white" style={{ width: '46%' }}>
                        36
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Women's Final Bar: India 78 vs Nepal 40 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-indigo">Women's Final: India (78) vs Nepal (40)</span>
                  <span className="text-kumkum">+38 Pts Margin</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-xs font-semibold text-charcoal">India</span>
                    <div className="flex-1 bg-paper-dark rounded-full h-5 overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-turmeric to-marigold h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-bold text-white" style={{ width: '100%' }}>
                        78
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-xs font-semibold text-charcoal">Nepal</span>
                    <div className="flex-1 bg-paper-dark rounded-full h-5 overflow-hidden p-0.5">
                      <div className="bg-indigo/60 h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[10px] font-bold text-white" style={{ width: '51%' }}>
                        40
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Cards Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-paper-pure border border-charcoal/15">
                <span className="text-[10px] font-bold uppercase tracking-wider text-kumkum block mb-1">
                  Men's World Champions
                </span>
                <div className="text-xl font-bold font-yatra text-indigo">India 54 – 36 Nepal</div>
                <p className="text-xs text-charcoal/80 mt-2">
                  India maintained an undefeated 6-0 run across group and knockout rounds, led by captain Pratik Waikar's lightning pole turns.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-paper-pure border border-charcoal/15">
                <span className="text-[10px] font-bold uppercase tracking-wider text-kumkum block mb-1">
                  Women's World Champions
                </span>
                <div className="text-xl font-bold font-yatra text-indigo">India 78 – 40 Nepal</div>
                <p className="text-xs text-charcoal/80 mt-2">
                  Captain Nasreen Shaikh led the women's contingent in a masterclass 38-point victory in front of 12,000 cheering fans.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Stars Spotlight & Arjuna Awards Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Modern Stars Spotlight (5 Cols) */}
          <div className="lg:col-span-5 bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-6">
            <h3 className="text-xl font-bold font-yatra text-indigo mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-kumkum" />
              <span>Modern Trailblazers to Watch</span>
            </h3>

            {/* Star Selector Buttons */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {playersData.modernStars.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStar(st)}
                  className={`px-3 py-1 text-xs rounded-full font-semibold transition-all ${
                    activeStar.id === st.id
                      ? 'bg-kumkum text-white shadow'
                      : 'bg-paper-dark text-charcoal hover:bg-paper'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>

            {/* Active Star Profile Card */}
            <div className="bg-paper-pure p-5 rounded-xl border border-charcoal/15 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold font-yatra text-indigo">{activeStar.name}</h4>
                  <span className="text-xs font-semibold text-marigold-dark">{activeStar.team}</span>
                </div>
                <span className="text-xs font-bold bg-indigo/10 text-indigo px-2.5 py-0.5 rounded-full">
                  {activeStar.role}
                </span>
              </div>

              <div className="text-xs text-charcoal/90">
                <strong>Signature Move: </strong>
                <span className="text-kumkum font-bold">{activeStar.signatureMove}</span>
              </div>

              <p className="text-xs text-charcoal/80 leading-relaxed">
                {activeStar.achievement}
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-charcoal/10 text-center">
                <div className="bg-paper p-2 rounded-lg border border-charcoal/5">
                  <div className="text-sm font-bold text-indigo">{activeStar.careerStats.totalPoints}</div>
                  <div className="text-[10px] text-charcoal/60 uppercase">Points</div>
                </div>
                <div className="bg-paper p-2 rounded-lg border border-charcoal/5">
                  <div className="text-sm font-bold text-kumkum">{activeStar.careerStats.divePoints}</div>
                  <div className="text-[10px] text-charcoal/60 uppercase">Dives</div>
                </div>
                <div className="bg-paper p-2 rounded-lg border border-charcoal/5">
                  <div className="text-sm font-bold text-peacock">{activeStar.careerStats.notOutMinutes}</div>
                  <div className="text-[10px] text-charcoal/60 uppercase">Defended</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arjuna Award Hall of Fame (7 Cols) */}
          <div className="lg:col-span-7 bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-charcoal/10 gap-2 mb-4">
              <h3 className="text-xl font-bold font-yatra text-indigo flex items-center gap-2">
                <Award className="w-5 h-5 text-turmeric" />
                <span>Arjuna Award Recipients in Kho Kho</span>
              </h3>

              <div className="flex items-center space-x-1 text-xs">
                <button
                  onClick={() => setAwardFilter('all')}
                  className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                    awardFilter === 'all' ? 'bg-indigo text-white' : 'text-charcoal'
                  }`}
                >
                  All ({statsData.arjunaAwards.length})
                </button>
                <button
                  onClick={() => setAwardFilter('recent')}
                  className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                    awardFilter === 'recent' ? 'bg-indigo text-white' : 'text-charcoal'
                  }`}
                >
                  2020–Present
                </button>
                <button
                  onClick={() => setAwardFilter('pioneer')}
                  className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                    awardFilter === 'pioneer' ? 'bg-indigo text-white' : 'text-charcoal'
                  }`}
                >
                  Pioneers (1970–85)
                </button>
              </div>
            </div>

            {/* Scrollable Awardees List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredAwards.map((award, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-paper-pure border border-charcoal/10 hover:border-marigold transition-all"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-sm font-bold text-indigo">{award.name}</strong>
                    <span className="text-xs font-bold text-kumkum font-yatra">{award.year}</span>
                  </div>
                  <div className="text-xs text-charcoal/70 flex items-center gap-2 mb-1">
                    <span>{award.state}</span> • <span>{award.role}</span>
                  </div>
                  <p className="text-xs text-charcoal/80 leading-snug">
                    {award.citation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RangoliDivider />
    </section>
  );
};
