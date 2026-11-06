import React from 'react';

// Authentic Warli stick figures and cultural motifs in crisp SVG

export const WarliRunner = ({ className = "w-6 h-6", color = "#F28C28" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head */}
    <circle cx="50" cy="18" r="10" fill={color} />
    {/* Neck */}
    <line x1="50" y1="28" x2="50" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Upper Torso Triangle */}
    <polygon points="50,35 32,55 68,55" fill={color} />
    {/* Lower Torso Triangle */}
    <polygon points="50,72 32,55 68,55" fill={color} />
    {/* Running Arms */}
    <line x1="50" y1="42" x2="25" y2="34" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="25" y1="34" x2="16" y2="48" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="42" x2="74" y2="45" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="74" y1="45" x2="86" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Running Legs */}
    <line x1="50" y1="72" x2="30" y2="82" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="30" y1="82" x2="18" y2="94" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="72" x2="72" y2="84" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="72" y1="84" x2="84" y2="76" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const WarliSeatedChaser = ({ className = "w-6 h-6", color = "#1B2A5A" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head */}
    <circle cx="50" cy="24" r="10" fill={color} />
    {/* Torso triangles */}
    <polygon points="50,38 35,56 65,56" fill={color} />
    <polygon points="50,74 35,56 65,56" fill={color} />
    {/* Seated folded knees */}
    <line x1="50" y1="74" x2="32" y2="85" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="32" y1="85" x2="52" y2="92" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="74" x2="68" y2="85" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="68" y1="85" x2="48" y2="92" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Arms resting on knees */}
    <line x1="50" y1="45" x2="28" y2="60" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="60" x2="36" y2="80" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="45" x2="72" y2="60" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="72" y1="60" x2="64" y2="80" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const RangoliDivider = ({ className = "w-full h-8" }) => (
  <div className={`flex items-center justify-center my-8 ${className}`}>
    <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-marigold to-kumkum opacity-40"></div>
    <div className="mx-4 flex items-center space-x-2">
      <span className="w-2.5 h-2.5 rotate-45 bg-kumkum"></span>
      <span className="w-4 h-4 rotate-45 border-2 border-marigold bg-paper"></span>
      <span className="w-5 h-5 rounded-full border-2 border-peacock flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-turmeric"></span>
      </span>
      <span className="w-4 h-4 rotate-45 border-2 border-marigold bg-paper"></span>
      <span className="w-2.5 h-2.5 rotate-45 bg-kumkum"></span>
    </div>
    <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-marigold to-kumkum opacity-40"></div>
  </div>
);

export const MadhubaniPeacock = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Tail feathers fan */}
    <path d="M60,60 C30,30 20,60 10,50 C5,45 15,30 35,35 C20,15 45,15 50,30 C60,10 80,20 70,40" stroke="#0E7C7B" strokeWidth="2.5" fill="#0E7C7B" fillOpacity="0.1" />
    <circle cx="24" cy="42" r="4" fill="#F5B700" stroke="#1B2A5A" strokeWidth="1.5" />
    <circle cx="42" cy="24" r="4" fill="#F5B700" stroke="#1B2A5A" strokeWidth="1.5" />
    <circle cx="68" cy="28" r="4" fill="#F5B700" stroke="#1B2A5A" strokeWidth="1.5" />
    {/* Body */}
    <path d="M55,60 C55,48 70,42 75,50 C80,58 75,75 65,85 C58,92 50,90 52,80 Z" fill="#1B2A5A" />
    {/* Neck and Head */}
    <path d="M72,48 C74,40 70,35 76,30 C78,28 82,32 80,36 C78,40 76,46 72,48 Z" fill="#1B2A5A" />
    {/* Crest feathers */}
    <line x1="77" y1="29" x2="84" y2="22" stroke="#F28C28" strokeWidth="2" />
    <circle cx="85" cy="21" r="2" fill="#C8341C" />
    <line x1="78" y1="28" x2="80" y2="19" stroke="#F28C28" strokeWidth="2" />
    <circle cx="80" cy="18" r="2" fill="#C8341C" />
    {/* Beak */}
    <polygon points="80,33 87,35 80,37" fill="#F5B700" />
    {/* Eye */}
    <circle cx="76" cy="33" r="1.5" fill="#FFFFFF" />
    {/* Chest decorative strokes */}
    <path d="M62,65 Q68,68 64,74" stroke="#FFF6E5" strokeWidth="1.5" />
    <path d="M58,72 Q64,75 60,80" stroke="#FFF6E5" strokeWidth="1.5" />
  </svg>
);
