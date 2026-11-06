import React from 'react';
import { ExternalLink, Heart, ShieldAlert, Award, FileCode, Github, Sparkles } from 'lucide-react';
import { MadhubaniPeacock, RangoliDivider } from '../utils/warliIcons';

export const Footer = () => {
  const verifiedSources = [
    { title: "Kho Kho Federation of India (KKFI)", url: "https://khokhoindia.in", desc: "Official court rules, national championships & affiliated state associations." },
    { title: "Asian Kho Kho Federation (AKKF)", url: "https://asiankhokhofederation.com", desc: "International history, Deccan Gymkhana 1914 codification & Asian Games roadmap." },
    { title: "Olympics.com — 2025 World Cup Records", url: "https://olympics.com/en/news/kho-kho-world-cup-2025-schedule-scores-results-india", desc: "Final scores, participating nations, and double gold results in New Delhi." },
    { title: "Ministry of Youth Affairs and Sports (MYAS)", url: "https://yas.nic.in", desc: "Arjuna Award recipient citations (1970–2024)." },
    { title: "Ultimate Kho Kho Official League (UKK)", url: "https://ultimatekhokho.com", desc: "Franchise seasons, Wazir rules, Sky Dive metrics, and broadcast viewership." },
    { title: "KL Deemed to be University (KLEF) Sports Portal", url: "https://kluniversity.in", desc: "University student-athletes selected for South Zone & All India Inter-University meets." }
  ];

  return (
    <footer id="footer" className="relative bg-paper-pure border-t-2 border-charcoal/15 text-charcoal pt-16 pb-12 px-4 sm:px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Madhubani Peacock Motif & Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 border-b border-charcoal/15">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <MadhubaniPeacock className="w-16 h-16 shrink-0" />
            <div>
              <h3 className="font-yatra text-2xl sm:text-3xl font-bold text-indigo">
                Kho Kho (खो खो): India's Traditional Tag Sport
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70">
                A Creative Computing & Cultural Heritage Masterclass Built with Pure WebGL & Code
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-kumkum/15 text-kumkum text-xs font-bold">
              100% Procedural 3D
            </span>
            <span className="px-3 py-1 rounded-full bg-peacock/15 text-peacock-dark text-xs font-bold">
              Zero External 3D Models
            </span>
          </div>
        </div>

        {/* Note on Tradition vs Documented History */}
        <div className="my-10 p-5 rounded-2xl bg-paper border border-charcoal/15 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-sm font-bold text-indigo block">
                Historiographical Clarification: Tradition vs. Documented History
              </strong>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                In adherence to strict sports historical scholarship, this experience clearly distinguishes oral folkloric narratives from codified modern history. Legends referencing chariot warfare maneuvers (*Rathachera*) during the Mahabharata era and rural gymnasiums represent cherished folk traditions. Verifiable modern sports history began in 1914 with the Deccan Gymkhana (Pune) rulebook committee, followed by the establishment of the KKFI in 1955 and the inaugural 1959 Vijayawada National Championship.
              </p>
            </div>
          </div>
        </div>

        {/* Sources Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-marigold"></span>
            <h4 className="font-yatra text-lg font-bold text-indigo">
              Verified Primary Sources & Citations
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verifiedSources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-paper border border-charcoal/10 hover:border-marigold transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-xs font-bold text-indigo group-hover:text-kumkum transition-colors">
                      {src.title}
                    </strong>
                    <ExternalLink className="w-3.5 h-3.5 text-charcoal/40 group-hover:text-kumkum transition-colors shrink-0" />
                  </div>
                  <p className="text-[11px] text-charcoal/70 leading-relaxed">
                    {src.desc}
                  </p>
                </div>
                <span className="text-[10px] text-marigold-dark font-semibold mt-2 block truncate">
                  {src.url}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Creator & Student Architect Attribution Banner */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-paper-pure via-paper to-paper-dark border-2 border-marigold/50 shadow-clay flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-indigo text-turmeric font-yatra font-bold text-xl flex items-center justify-center shadow-md shrink-0">
              SV
            </div>
            <div>
              <span className="text-[11px] font-bold text-kumkum uppercase tracking-widest block">
                Project Architect & Lead Developer
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-yatra text-indigo">
                Polimera Sai Vatsal
              </h4>
              <p className="text-xs text-charcoal/80 font-medium">
                Student ID / Roll No: <strong className="text-indigo font-bold">2500040224</strong> • KL Deemed to be University (KLEF)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-marigold/15 text-marigold-dark text-xs font-bold border border-marigold/30">
              KLU Sports Computing
            </span>
            <span className="px-3 py-1 rounded-full bg-peacock/15 text-peacock-dark text-xs font-bold border border-peacock/30">
              Kho Kho 3D Masterclass
            </span>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-charcoal/15 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/60 gap-4">
          <div className="flex items-center space-x-1">
            <span>Crafted by <strong>Polimera Sai Vatsal (2500040224)</strong> with</span>
            <Heart className="w-3.5 h-3.5 text-kumkum fill-kumkum inline mx-0.5" />
            <span>for sports scholars worldwide.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Built with React + R3F + Tailwind + GSAP</span>
            <span>•</span>
            <a href="docs/SOURCES.md" className="hover:text-kumkum underline">SOURCES.md</a>
            <span>•</span>
            <a href="docs/DESIGN.md" className="hover:text-kumkum underline">DESIGN.md</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
