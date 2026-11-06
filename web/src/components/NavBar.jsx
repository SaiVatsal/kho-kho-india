import React, { useState, useEffect } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import { Volume2, VolumeX, Eye, EyeOff, Presentation, Menu, X } from 'lucide-react';

export const NavBar = () => {
  const {
    audioEnabled,
    toggleAudio,
    reducedMotion,
    toggleReducedMotion,
    setPresentationOpen
  } = useAppStore();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ground 3D', href: '#hero' },
    { label: 'How to Play', href: '#rules-demo' },
    { label: 'History', href: '#history' },
    { label: 'India Map', href: '#map' },
    { label: 'Mini-Game', href: '#mini-game' },
    { label: 'Stats & Stars', href: '#stats' },
    { label: 'KLU & Colleges', href: '#colleges' },
    { label: 'News & Future', href: '#news' },
    { label: 'Sources', href: '#footer' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-b border-charcoal/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Kolam Progress Ring */}
        <div className="flex items-center space-x-3">
          {/* Kolam Progress Ring */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background Ring */}
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#D8CCB5"
                strokeWidth="2.5"
                strokeDasharray="2, 2"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#F28C28"
                strokeWidth="2.8"
                strokeDasharray="94.2"
                strokeDashoffset={94.2 - (94.2 * scrollProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            </svg>
            <span className="absolute text-[10px] font-yatra font-bold text-kumkum">
              खो
            </span>
          </div>

          <a href="#hero" className="flex flex-col">
            <span className="font-yatra text-lg font-bold text-indigo tracking-tight leading-none">
              Kho Kho (खो खो)
            </span>
            <span className="text-[10px] font-semibold text-charcoal/60 uppercase tracking-wider">
              India's Tag Sport
            </span>
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-5 text-xs font-semibold text-charcoal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-kumkum transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Quick Utility Actions */}
        <div className="flex items-center space-x-2">
          {/* PPT Deck Launcher */}
          <button
            onClick={() => setPresentationOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo hover:bg-indigo-light text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
            title="Open 14-Slide Presentation Deck"
          >
            <Presentation className="w-3.5 h-3.5 text-turmeric" />
            <span className="hidden sm:inline">PPT Deck</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full text-indigo hover:text-kumkum hover:bg-paper-dark border border-charcoal/15 transition-all"
            aria-label={audioEnabled ? "Mute audio" : "Enable sound"}
            title={audioEnabled ? "Sound ON (Whistles & Kho Calls)" : "Sound MUTED"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-kumkum" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={toggleReducedMotion}
            className={`p-2 rounded-full border transition-all ${
              reducedMotion
                ? 'bg-kumkum/15 border-kumkum text-kumkum'
                : 'border-charcoal/15 text-indigo hover:text-marigold'
            }`}
            aria-label="Toggle reduced motion"
            title={reducedMotion ? "Reduced Motion: ACTIVE" : "Reduced Motion: OFF"}
          >
            {reducedMotion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full lg:hidden text-indigo hover:bg-paper-dark"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper-pure border-b border-charcoal/15 px-6 py-4 space-y-3 animate-slide-down">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-charcoal hover:text-kumkum py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-charcoal/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPresentationOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo text-white text-xs font-bold"
            >
              <Presentation className="w-4 h-4 text-turmeric" />
              <span>Open 14-Slide Presentation Deck</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
