import React, { useState, useEffect } from 'react';
import rulesData from '../data/rules.json';
import glossaryData from '../data/glossary.json';
import { sounds } from '../utils/sound';
import { useAppStore } from '../hooks/useAppStore';
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, BookOpen, ChevronRight, X } from 'lucide-react';
import { RangoliDivider, WarliRunner, WarliSeatedChaser } from '../utils/warliIcons';

export const RulesDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [foulFlash, setFoulFlash] = useState(false);
  const [foulMessage, setFoulMessage] = useState('');
  const [glossaryModal, setGlossaryModal] = useState(false);
  const { reducedMotion } = useAppStore();

  const steps = [
    {
      id: "approach",
      title: "Step 1: The Active Pursuit",
      chaserX: 20,
      chaserY: 48,
      activeIdx: 3,
      defenderX: 75,
      defenderY: 25,
      description: "The active chaser sprints along the central lane, keeping eyes fixed on the evasive defender in the right corridor. The chaser cannot cross the central line to enter that corridor directly.",
      tacticalTip: "Rule 1: Active chaser is barred from stepping over the central dividing line."
    },
    {
      id: "give_kho",
      title: "Step 2: Giving 'Kho!' on the Back",
      chaserX: 42,
      chaserY: 48,
      activeIdx: 3,
      defenderX: 72,
      defenderY: 28,
      description: "The chaser approaches seated teammate #4 from behind, taps them on the back between waist and shoulder, and utters 'Kho!' aloud.",
      tacticalTip: "Rule 2: Touch must be on the back accompanied by a clear, simultaneous vocal call."
    },
    {
      id: "swap_sprint",
      title: "Step 3: Immediate Forward Sprint",
      chaserX: 45,
      chaserY: 15, // Teammate sprinted into corridor
      activeIdx: 4,
      defenderX: 68,
      defenderY: 18,
      description: "The tapped teammate instantly stands and bursts into an explosive sprint in the exact direction they were seated facing! The previous tagger sits down in the square.",
      tacticalTip: "Rule 3: Tapped chaser must move immediately in their seated direction."
    },
    {
      id: "foul_demo",
      title: "Step 4: The Direction Foul (Red Flash)",
      chaserX: 52,
      chaserY: 15,
      activeIdx: 4,
      defenderX: 45,
      defenderY: 22,
      isFoul: true,
      description: "Defender suddenly feints and cuts backward. If the chaser tries to turn back mid-lane, the umpire blows a FOUL! The court flashes red, and advantage is voided.",
      tacticalTip: "Rule 4: Never turn backward mid-lane without circling a post in the free zone!"
    },
    {
      id: "dismissal",
      title: "Step 5: Legal Touch & Dismissal",
      chaserX: 62,
      chaserY: 22,
      activeIdx: 4,
      defenderX: 63,
      defenderY: 22,
      isTagged: true,
      description: "Chaser executes a clean reaching touch without committing any direction violation. The defender is declared OUT! Chasing team earns 1 point.",
      tacticalTip: "Rule 5: Tagged defender exits to the sitting lobby; next defender batch prepares."
    }
  ];

  // Step advancement
  const handleNext = () => {
    const next = (currentStep + 1) % steps.length;
    setCurrentStep(next);

    if (steps[next].id === 'give_kho') {
      sounds.playKho();
    } else if (steps[next].id === 'foul_demo') {
      triggerFoulAction("SUDDEN DIRECTION REVERSAL FOUL! A chaser cannot turn back mid-lane.");
    } else if (steps[next].id === 'dismissal') {
      sounds.playDhol();
    } else {
      sounds.playWhistle();
    }
  };

  const triggerFoulAction = (msg) => {
    sounds.playFoul();
    setFoulFlash(true);
    setFoulMessage(msg);
    setTimeout(() => {
      setFoulFlash(false);
    }, 1500);
  };

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % steps.length;
        if (steps[next].id === 'give_kho') sounds.playKho();
        if (steps[next].id === 'foul_demo') triggerFoulAction("SUDDEN DIRECTION REVERSAL FOUL!");
        if (steps[next].id === 'dismissal') sounds.playDhol();
        return next;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const step = steps[currentStep];

  return (
    <section id="rules-demo" className="relative py-20 px-4 sm:px-8 md:px-16 bg-paper-pure border-t border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-kumkum/10 text-kumkum text-xs font-bold uppercase tracking-wider mb-2">
            Interactive Tactical Simulator
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-yatra text-indigo">
            How It's Played: The Anatomy of a Tag
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal/80">
            Kho Kho is not simple backyard tag—it is chess played at 30 km/h with strict geometric constraints.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Tactical Board (8 Cols) */}
          <div className="lg:col-span-8 bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-charcoal/10 pb-4 flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-marigold">
                  Phase {currentStep + 1} of {steps.length}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-yatra text-indigo">
                  {step.title}
                </h3>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo text-white hover:bg-indigo-light transition-all"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
                </button>
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-marigold text-white hover:bg-marigold-dark transition-all shadow-sm"
                >
                  <span>Next Move</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentStep(0)}
                  className="p-1.5 rounded-full text-charcoal hover:text-kumkum border border-charcoal/20"
                  title="Reset demo"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tactical Pitch Canvas (2.5D Court View) */}
            <div
              className={`relative w-full h-72 sm:h-96 rounded-xl transition-all duration-300 clay-ground overflow-hidden border-2 ${
                foulFlash ? 'ring-8 ring-kumkum border-kumkum' : 'border-white/50'
              }`}
            >
              {/* Central Lane (30cm proportional strip) */}
              <div className={`absolute top-1/2 left-8 right-8 -translate-y-1/2 h-8 border-y-2 border-dashed border-white transition-colors duration-200 ${
                foulFlash ? 'bg-kumkum/60' : 'bg-terracotta-light/40'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/60 tracking-widest uppercase">
                  Central Lane (24m × 30cm) — No Crossing Zone
                </div>
              </div>

              {/* Posts at East and West Ends */}
              <div className="absolute top-1/2 left-8 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-turmeric border-2 border-indigo shadow-md"></div>
                <span className="text-[9px] font-bold text-white bg-indigo/80 px-1 rounded mt-1">West Pole</span>
              </div>
              <div className="absolute top-1/2 right-8 -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-turmeric border-2 border-indigo shadow-md"></div>
                <span className="text-[9px] font-bold text-white bg-indigo/80 px-1 rounded mt-1">East Pole</span>
              </div>

              {/* 8 Cross Lanes and Seated Chasers */}
              {[15, 25, 35, 45, 55, 65, 75, 85].map((pct, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 w-8 -translate-x-1/2 border-x border-white/30"
                  style={{ left: `${pct}%` }}
                >
                  {/* Seated Chaser Avatar (Alternating facing North vs South) */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white transition-transform ${
                      idx === 3 && currentStep >= 2
                        ? 'bg-kumkum scale-110 ring-2 ring-white'
                        : 'bg-indigo'
                    }`}
                    title={`Chaser #${idx + 1}`}
                  >
                    {idx % 2 === 0 ? '▲' : '▼'}
                  </div>
                </div>
              ))}

              {/* Active Chaser Moving */}
              <div
                className="absolute transition-all duration-700 ease-out flex flex-col items-center z-20"
                style={{
                  left: `${step.chaserX}%`,
                  top: `${step.chaserY}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-8 h-8 rounded-full bg-marigold border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ring-4 ring-marigold/40 animate-pulse">
                  🏃
                </div>
                <span className="text-[10px] font-bold text-white bg-kumkum px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  Active Chaser
                </span>
              </div>

              {/* Defender Moving */}
              <div
                className="absolute transition-all duration-700 ease-out flex flex-col items-center z-20"
                style={{
                  left: `${step.defenderX}%`,
                  top: `${step.defenderY}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ${
                  step.isTagged ? 'bg-charcoal/80 line-through' : 'bg-peacock ring-4 ring-peacock/40'
                }`}>
                  {step.isTagged ? '💥' : '🛡️'}
                </div>
                <span className="text-[10px] font-bold text-white bg-peacock-dark px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  {step.isTagged ? 'Tagged Out!' : 'Defender'}
                </span>
              </div>

              {/* Foul Alert Overlay Notification */}
              {foulFlash && (
                <div className="absolute inset-0 bg-kumkum/75 flex flex-col items-center justify-center text-white p-4 z-30 animate-pulse">
                  <AlertTriangle className="w-12 h-12 mb-2 text-turmeric" />
                  <div className="text-xl sm:text-2xl font-bold font-yatra tracking-wider text-center">
                    FOUL: DIRECTION RULE VIOLATED!
                  </div>
                  <p className="text-xs sm:text-sm text-center max-w-md mt-1 text-paper">
                    Chasers cannot turn back mid-lane. They must run in their chosen direction until reaching the post free zone.
                  </p>
                </div>
              )}
            </div>

            {/* Explanation & Tactical Tip */}
            <div className="mt-5 space-y-3">
              <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed font-medium">
                {step.description}
              </p>
              <div className="flex items-start gap-2 bg-turmeric/15 border-l-4 border-marigold p-3 rounded-r-lg">
                <CheckCircle2 className="w-5 h-5 text-kumkum shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-charcoal">
                  {step.tacticalTip}
                </span>
              </div>
            </div>

            {/* Step Selector Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-charcoal/10 gap-2 overflow-x-auto">
              {steps.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => setCurrentStep(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    currentStep === i
                      ? 'bg-marigold text-white shadow-sm'
                      : 'bg-paper-dark text-charcoal hover:bg-paper'
                  }`}
                >
                  {i + 1}. {st.title.split(':')[1] || st.title}
                </button>
              ))}
            </div>
          </div>

          {/* Side Panel: "Rules in 60 Seconds" (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-6">
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 mb-4">
                <h3 className="text-xl font-bold font-yatra text-indigo flex items-center gap-2">
                  <span>Rules in 60 Seconds</span>
                </h3>
                <span className="text-[10px] font-bold bg-marigold/20 text-kumkum px-2 py-0.5 rounded-full">
                  Official KKFI
                </span>
              </div>

              {/* Verified Quick Numbers */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-charcoal/5">
                  <span className="text-charcoal/70">Court Size:</span>
                  <strong className="text-indigo font-bold">27m × 16m</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-charcoal/5">
                  <span className="text-charcoal/70">Squad Composition:</span>
                  <strong className="text-indigo font-bold">12 Players (9 on Court)</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-charcoal/5">
                  <span className="text-charcoal/70">Chasers Seated:</span>
                  <strong className="text-indigo font-bold">8 Alternate Facing</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-charcoal/5">
                  <span className="text-charcoal/70">Defenders Entry:</span>
                  <strong className="text-indigo font-bold">Batches of 3</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-charcoal/5">
                  <span className="text-charcoal/70">Senior Turn Time:</span>
                  <strong className="text-indigo font-bold">9 Minutes Each</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-charcoal/5">
                  <span className="text-charcoal/70">Match Structure:</span>
                  <strong className="text-indigo font-bold">2 Innings (4 Turns)</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-charcoal/5">
                  <span className="text-charcoal/70">Traditional Point:</span>
                  <strong className="text-kumkum font-bold">1 Point / Tag</strong>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-charcoal/70">UKK Acrobatic Dive:</span>
                  <strong className="text-kumkum font-bold">3 Points (Sky/Pole Dive)</strong>
                </div>
              </div>

              {/* Open Glossary Button */}
              <button
                onClick={() => setGlossaryModal(true)}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo text-white font-semibold text-xs hover:bg-indigo-light transition-all shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Kho Kho Glossary (12 Terms)</span>
              </button>
            </div>

            {/* Test Illegal Move Button */}
            <div className="bg-kumkum/10 border-2 border-dashed border-kumkum/30 rounded-2xl p-5 text-center">
              <h4 className="font-bold text-sm text-kumkum mb-1">Interactive Foul Test</h4>
              <p className="text-xs text-charcoal/80 mb-3">
                Experience what happens when an active chaser cuts across the line or turns back.
              </p>
              <button
                onClick={() => triggerFoulAction("ILLEGAL CUT! Active chaser stepped over the central lane boundary.")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-kumkum text-white text-xs font-bold hover:bg-kumkum-dark transition-all shadow"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Trigger Illegal Move Foul</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Glossary Modal Dialog */}
      {glossaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
          <div className="bg-paper w-full max-w-2xl max-h-[85vh] rounded-2xl border-2 border-indigo shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-indigo text-white flex items-center justify-between">
              <div>
                <h3 className="font-yatra text-xl font-bold">Official Kho Kho Glossary</h3>
                <span className="text-xs text-turmeric">Codified Terms & Regional Terminology</span>
              </div>
              <button
                onClick={() => setGlossaryModal(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-charcoal/10">
              {glossaryData.terms.map((item, i) => (
                <div key={i} className="pt-3 first:pt-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <strong className="text-indigo font-bold text-base">{item.term}</strong>
                    <span className="text-xs font-yatra text-kumkum">{item.hindi}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-paper-dark border-t border-charcoal/10 text-right">
              <button
                onClick={() => setGlossaryModal(false)}
                className="px-4 py-1.5 rounded-lg bg-indigo text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <RangoliDivider />
    </section>
  );
};
