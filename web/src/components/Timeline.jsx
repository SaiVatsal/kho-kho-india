import React, { useState } from 'react';
import historyData from '../data/history.json';
import { ExternalLink, Award, Sparkles, BookOpen, Calendar, MapPin } from 'lucide-react';
import { RangoliDivider, WarliRunner, WarliSeatedChaser } from '../utils/warliIcons';

export const Timeline = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'tradition' | 'documented'

  const traditionTrack = historyData.tracks.find(t => t.id === 'tradition');
  const documentedTrack = historyData.tracks.find(t => t.id === 'documented');

  return (
    <section id="history" className="relative py-20 px-4 sm:px-8 md:px-16 bg-jaali border-b border-charcoal/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-marigold/15 text-marigold-dark text-xs font-bold uppercase tracking-wider mb-2">
            Chronicles of the Red Clay
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-yatra text-indigo">
            The Journey of Kho Kho
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal/80">
            From mythological chariot tactical drills to the 2025 World Cup in New Delhi.
          </p>

          {/* Track Filter Tabs */}
          <div className="inline-flex items-center p-1.5 mt-6 rounded-full bg-paper border border-charcoal/20 shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-indigo text-white shadow' : 'text-charcoal hover:text-indigo'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setActiveTab('tradition')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'tradition' ? 'bg-terracotta text-white shadow' : 'text-charcoal hover:text-indigo'
              }`}
            >
              Legend & Tradition
            </button>
            <button
              onClick={() => setActiveTab('documented')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'documented' ? 'bg-marigold text-white shadow' : 'text-charcoal hover:text-indigo'
              }`}
            >
              Documented History
            </button>
          </div>
        </div>

        {/* Legend vs Documented Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
          <div className="bg-terracotta/10 border-l-4 border-terracotta p-4 rounded-r-xl">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider block">
              Track A: Ancient Folklore & Traditions
            </span>
            <p className="text-xs text-charcoal/80 mt-1">
              Oral folk memory, warrior conditioning drills, and rural Maharashtra playground roots before formal 1914 codification.
            </p>
          </div>
          <div className="bg-marigold/15 border-l-4 border-marigold p-4 rounded-r-xl">
            <span className="text-xs font-bold text-marigold-dark uppercase tracking-wider block">
              Track B: Documented Official History
            </span>
            <p className="text-xs text-charcoal/80 mt-1">
              Officially recorded tournaments, Deccan Gymkhana rules, KKFI national championships, and government Arjuna awards.
            </p>
          </div>
        </div>

        {/* Horizontal Village Milestone Road / Card Flow */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-1 before:bg-gradient-to-b before:from-terracotta before:via-marigold before:to-indigo before:-translate-x-1/2">
          {/* Combine milestones with sorting */}
          {[
            ...(activeTab !== 'documented' ? traditionTrack.milestones : []),
            ...(activeTab !== 'tradition' ? documentedTrack.milestones : [])
          ].map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const isLegend = milestone.category !== 'documented';

            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Road Milestone Pin */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-paper bg-indigo text-turmeric flex items-center justify-center font-bold text-xs shadow-md z-10">
                  {isLegend ? '📜' : '🏆'}
                </div>

                {/* Milestone Content Card */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8 w-full">
                  <div className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 shadow-clay bg-paper ${
                    isLegend ? 'border-terracotta/40 bg-paper' : 'border-indigo/30 bg-paper-pure'
                  }`}>
                    {/* Badge and Year */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isLegend ? 'bg-terracotta/15 text-terracotta' : 'bg-marigold/15 text-marigold-dark'
                      }`}>
                        {isLegend ? 'Legend & Tradition' : 'Documented History'}
                      </span>
                      <strong className="text-base font-yatra font-bold text-kumkum">
                        {milestone.year}
                      </strong>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl font-bold font-yatra text-indigo mb-2">
                      {milestone.headline}
                    </h3>

                    {/* Two-line Context Summary */}
                    <p className="text-sm font-medium text-charcoal/90 mb-2 leading-relaxed">
                      {milestone.summary}
                    </p>

                    <p className="text-xs text-charcoal/70 mb-4 leading-relaxed">
                      {milestone.details}
                    </p>

                    {/* Warli Illustration & Verified Source Link */}
                    <div className="flex items-center justify-between pt-3 border-t border-charcoal/10 text-xs">
                      <div className="flex items-center space-x-2">
                        {isLegend ? (
                          <WarliSeatedChaser className="w-5 h-5" color="#B5532A" />
                        ) : (
                          <WarliRunner className="w-5 h-5" color="#F28C28" />
                        )}
                        <span className="text-[11px] font-semibold text-charcoal/60">
                          {milestone.sourceName}
                        </span>
                      </div>

                      {milestone.source && (
                        <a
                          href={milestone.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-kumkum hover:underline text-[11px]"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RangoliDivider />
    </section>
  );
};
