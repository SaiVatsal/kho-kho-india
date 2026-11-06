import React, { useState, useEffect } from 'react';
import { WarliRunner } from '../utils/warliIcons';

export const Loader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoaded?.(), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 bg-paper-pure flex flex-col items-center justify-center p-6 select-none transition-opacity duration-500">
      {/* Warli Figures Running in a Circle */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-8">
        {/* Outer Rotating Warli Ring */}
        <div className="absolute inset-0 animate-spin-slow flex items-center justify-center">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                transform: `rotate(${deg}deg) translate(70px) rotate(-${deg}deg)`
              }}
            >
              <WarliRunner className="w-8 h-8" color={i % 2 === 0 ? '#F28C28' : '#C8341C'} />
            </div>
          ))}
        </div>

        {/* Central Emblematical Devanagari "Kho" */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-paper border-4 border-dashed border-marigold flex flex-col items-center justify-center shadow-clay">
          <span className="font-yatra text-2xl font-bold text-indigo">खो</span>
          <span className="text-[10px] font-bold text-kumkum">{progress}%</span>
        </div>
      </div>

      {/* Chalk-Line Progress Bar */}
      <div className="w-64 max-w-full h-3 bg-paper-dark rounded-full overflow-hidden p-0.5 border border-charcoal/20 mb-3 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-marigold via-kumkum to-turmeric rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="font-yatra text-lg font-bold text-indigo tracking-wide">
        Marking Court with Fresh Lime Chalk...
      </div>
      <p className="text-xs text-charcoal/60 mt-1">
        27m × 16m Ground • 8 Seated Chasers • Ready for Action
      </p>
    </div>
  );
};
