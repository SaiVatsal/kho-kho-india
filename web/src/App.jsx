import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Hero3D } from './components/Hero3D';
import { RulesDemo } from './components/RulesDemo';
import { Timeline } from './components/Timeline';
import { IndiaMap } from './components/IndiaMap';
import { MiniGame } from './components/MiniGame';
import { StatsSection } from './components/StatsSection';
import { CollegePlayers } from './components/CollegePlayers';
import { LatestNews } from './components/LatestNews';
import { Footer } from './components/Footer';
import { PresentationModal } from './components/PresentationModal';
import { Loader } from './components/Loader';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-paper text-charcoal font-poppins selection:bg-marigold selection:text-white">
      {/* 1. Warli Animated Loading Screen */}
      {isLoading && <Loader onLoaded={() => setIsLoading(false)} />}

      {/* 2. Sticky Kolam Progress Navigation */}
      <NavBar />

      {/* 3. Main Page Sections */}
      <main>
        {/* Section 1: Hero 3D Pitch */}
        <Hero3D />

        {/* Section 2: How It's Played (Interactive Tactical Demo) */}
        <RulesDemo />

        {/* Section 3: History Timeline (Legend vs Documented History) */}
        <Timeline />

        {/* Section 4: India Map (Regional Heartlands & Academies) */}
        <IndiaMap />

        {/* Section 5: Play It - Mini-Game Arena (60s Tag Challenge) */}
        <MiniGame />

        {/* Section 6: Stats, 2025 World Cup Results & Arjuna Legends */}
        <StatsSection />

        {/* Section 7: KLU & National Collegiate Athletes Roster (Till 2026) */}
        <CollegePlayers />

        {/* Section 8: Latest News & The Olympic Vision */}
        <LatestNews />
      </main>

      {/* 4. Footer & Primary Citations */}
      <Footer />

      {/* 5. In-Browser 14-Slide Presentation Deck */}
      <PresentationModal />
    </div>
  );
}

export default App;
