import React from 'react';
import newsData from '../data/news.json';
import { Newspaper, ExternalLink, Calendar, Flame, Globe2, Sparkles, MapPin } from 'lucide-react';
import { MadhubaniPeacock, RangoliDivider } from '../utils/warliIcons';

export const LatestNews = () => {
  return (
    <section id="news" className="relative py-20 px-4 sm:px-8 md:px-16 bg-paper-pure border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-kumkum/15 text-kumkum text-xs font-bold uppercase tracking-wider mb-2">
            Global Expansion & Fresh Headlines
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-yatra text-indigo">
            Latest News & The Olympic Vision
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal/80">
            From the 2025 World Cup triumph to collegiate tournaments and the historic road toward the Olympic Games.
          </p>
        </div>

        {/* Latest News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {newsData.articles.map((item) => (
            <article
              key={item.id}
              className="bg-paper p-6 rounded-2xl border-2 border-charcoal/15 shadow-clay hover:border-marigold transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-marigold/15 text-marigold-dark text-[11px] font-bold">
                    {item.badge}
                  </span>
                  <span className="text-xs text-charcoal/60 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold font-yatra text-indigo mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal/60">{item.sourceName}</span>
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-kumkum hover:underline text-[11px]"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Why It Matters / Road to Olympics Callout Card */}
        <div className="bg-gradient-to-r from-indigo via-indigo-dark to-indigo p-8 sm:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-marigold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turmeric/20 text-turmeric text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-3.5 h-3.5" />
                <span>The Road Ahead: 2026 Aichi-Nagoya & Olympics</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold font-yatra text-turmeric">
                Why Kho Kho Matters to the World
              </h3>

              <p className="text-sm sm:text-base text-paper/90 leading-relaxed">
                Kho Kho requires zero expensive gear—only chalk lines, two wooden posts, and raw physical willpower. With 24 nations at the 2025 World Cup and over 164 million viewers watching franchise leagues, India's earthen ground game is transitioning into a global Olympic movement.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-marigold hover:bg-marigold-dark text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find an Academy Near You</span>
                </a>
                <a
                  href="#colleges"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper/10 hover:bg-paper/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all"
                >
                  <span>Explore Collegiate Programs</span>
                </a>
              </div>
            </div>

            {/* Madhubani Peacock Motif Accent */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4">
              <div className="bg-paper/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
                <MadhubaniPeacock className="w-28 h-28 mx-auto" />
                <span className="text-xs font-yatra text-turmeric mt-2 block tracking-wider">
                  National Sporting Pride
                </span>
                <span className="text-[11px] text-paper/70 block">
                  Cultural Heritage × Modern Athletics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RangoliDivider />
    </section>
  );
};
