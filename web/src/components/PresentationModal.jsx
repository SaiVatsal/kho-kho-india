import React, { useState, useEffect } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, FileText, Download, Sparkles } from 'lucide-react';
import { MadhubaniPeacock, RangoliDivider, WarliRunner } from '../utils/warliIcons';

export const PresentationModal = () => {
  const { presentationOpen, setPresentationOpen } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Kho Kho (खो खो): India's Ground Game",
      subtitle: "The Indigenous Tag Sport Born on Clay, Evolving to the World Stage",
      tagline: "Speed • Deception • Sacred Direction Rule",
      points: [
        "Traditional Indian tag sport played on a 27m × 16m earthen pitch.",
        "8 seated chasers facing alternate directions, 1 active hunter.",
        "Inaugural 2025 World Cup in New Delhi won by Team India.",
        "Collegiate excellence powered by universities across India, notably KL University (KLU)."
      ],
      notes: "Welcome everyone. Today we explore Kho Kho—one of India's oldest and fastest indigenous sports. Unlike regular tag, Kho Kho is a strategic puzzle played at 30 km/h where you can never turn back mid-lane.",
      badge: "Title Slide"
    },
    {
      id: 2,
      title: "Why This Sport Matters: 30 km/h Chess",
      subtitle: "The Purest Test of Human Anaerobic Agility",
      points: [
        "Peak sprint velocities exceed 32 km/h across 2.30m short intervals.",
        "Reaction times under 0.20 seconds to dodge direction feints.",
        "Requires zero expensive equipment: only chalk lines, earth, and two teak poles.",
        "164 Million viewers tuned into Ultimate Kho Kho Season 1 on national television."
      ],
      notes: "Kho Kho represents pure athletic kineticism. It requires no costly racquets, padding, or helmets. It tests the human nervous system's capacity to decelerate and pivot in fractions of a second.",
      badge: "The Thesis"
    },
    {
      id: 3,
      title: "The Ground & Official Dimensions",
      subtitle: "KKFI Codified Specifications (Senior & Junior)",
      points: [
        "Playing Area: Exactly 27 meters in length × 16 meters in width.",
        "Central Lane: 24 meters between wooden poles × 30 centimeters wide.",
        "8 Cross Lanes: 16m length × 35cm width, spaced at 2.30m intervals.",
        "Two Posts: 120cm–125cm height, 9cm–10cm diameter smooth cylindrical teak.",
        "Free Zones: 1.5m behind each post allowing legal direction rotation."
      ],
      notes: "Here is the exact pitch layout. The central lane is a forbidden barrier: active chasers cannot step across it. To reach the defender on the opposite side, the chaser must either run around a pole or give 'Kho!' to a seated teammate.",
      badge: "Court Geometry"
    },
    {
      id: 4,
      title: "Rules in 60 Seconds: The 4 Core Mechanics",
      subtitle: "How Chasers Tag and How Defenders Survive",
      points: [
        "1. Giving Kho: Active chaser taps teammate's back and shouts 'Kho!' aloud.",
        "2. Immediate Direction: The tapped chaser must burst in their seated direction.",
        "3. Strict Direction Rule: Chasers cannot turn back mid-lane without circling a post.",
        "4. Defender Dismissal: Clean hand touch or out-of-bounds yields 1 point."
      ],
      notes: "The handover is electric: the chaser slaps the sitting teammate's back with a loud 'Kho!' vocalization. The seated player explodes forward instantly. If anyone tries to reverse mid-lane, the whistle blows for a red foul.",
      badge: "Rulebook"
    },
    {
      id: 5,
      title: "Scoring Systems: Traditional vs. Modern League",
      subtitle: "The Acrobatic Evolution of Ultimate Kho Kho (UKK)",
      points: [
        "Traditional KKFI: 1 point per dismissed defender; 2 innings of 9-min turns.",
        "UKK League Innovation: 2 points for a normal touch.",
        "Sky Dive & Pole Dive: 3 points awarded for full aerial acrobatic lunges.",
        "Dream Run: Bonus points when defenders survive over 2m 30s.",
        "Wazir: Designated super-attacker allowed to run in both directions freely."
      ],
      notes: "While traditional tournaments award 1 point per touch, modern televised leagues introduced 3-point Sky Dives and Pole Dives, turning Kho Kho into a gravity-defying spectator phenomenon.",
      badge: "Scoring Models"
    },
    {
      id: 6,
      title: "Legend vs. Documented History",
      subtitle: "Separating Oral Tradition from Codified Reality",
      points: [
        "Tradition & Legend: Ancient folklore links evasive tactics to Mahabharata chariot warfare ('Rathachera') and rural Maharashtra Akhadas.",
        "Documented History: 1914 Deccan Gymkhana (Pune) drafts the first formal rulebook.",
        "1955: Kho Kho Federation of India (KKFI) established.",
        "1959–60: First National Championship hosted in Vijayawada, Andhra Pradesh."
      ],
      notes: "It is crucial to separate folklore from documented history. Stories of chariot warfare drills in antiquity reflect beloved oral tradition. The verifiable modern sport began in 1914 when Pune's Deccan Gymkhana club wrote down the first formal rulebook.",
      badge: "Historiography"
    },
    {
      id: 7,
      title: "Timeline of National Milestones",
      subtitle: "From Gymkhana Era to Civilian Honors",
      points: [
        "1914: First formalized rules at Deccan Gymkhana, Pune.",
        "1955: KKFI established as national apex body.",
        "1959: First Men's National Championship in Vijayawada (AP).",
        "1970: Sudhir Parab wins the inaugural Arjuna Award in Kho Kho.",
        "1982: Demonstration sport at IX Asian Games, New Delhi.",
        "2020 & 2023: Sarika Kale & Nasreen Shaikh honored with Arjuna Awards."
      ],
      notes: "Over the last century, Kho Kho moved from rural playgrounds to university circuits, culminating in prestigious Arjuna Awards for stars like Sudhir Parab, Sarika Kale, and Nasreen Shaikh.",
      badge: "Milestones"
    },
    {
      id: 8,
      title: "Governing Bodies & Structure",
      subtitle: "Who Governs the Earthen Ground",
      points: [
        "KKFI (Kho Kho Federation of India): Manages national championships & state bodies.",
        "AKKF (Asian Kho Kho Federation): Founded 1987, oversees Asian tournaments.",
        "IKKF (International Kho Kho Federation): Promotes global Olympic eligibility.",
        "AIU (Association of Indian Universities): Drives collegiate inter-university circuits."
      ],
      notes: "Governance is coordinated across four tiers: the national federation KKFI, regional body AKKF, the international body IKKF, and AIU which oversees the massive university pipeline.",
      badge: "Governance"
    },
    {
      id: 9,
      title: "Regional Strongholds & Collegiate Hubs",
      subtitle: "Where the Talent Pipeline Originates",
      points: [
        "Maharashtra: Historical heartland with 32+ national titles.",
        "Andhra Pradesh: 1959 host; home to KL University (KLU) sports academy.",
        "Karnataka & Kerala: Dominant defenders and South Zone university champions.",
        "Odisha & Gujarat: Inaugural and Season 2 Ultimate Kho Kho champions."
      ],
      notes: "While Maharashtra remains the historic heartland, southern states like Andhra Pradesh and Karnataka produce exceptional collegiate talent through universities like KLU, Mysore, and Calicut.",
      badge: "Geography"
    },
    {
      id: 10,
      title: "KL University (KLU) & Collegiate Champions",
      subtitle: "Developing National & State Roster Athletes (Till 2026)",
      points: [
        "KLEF (Vaddeswaram & Aziz Nagar) offers elite sports science & coaching.",
        "Multiple student selections to All India Inter-University & Khelo India Games.",
        "Student-athletes like Sai Vardhan Reddy, Harshitha Devi, Tarun Teja, Ramana Murthy representing Senior State & National squads.",
        "Balancing top-tier engineering/management academics with competitive sport."
      ],
      notes: "Colleges are the lifeblood of Indian Kho Kho. KL University in particular has built a dedicated pipeline, enabling student engineers and managers to win medals at national and state championships.",
      badge: "University Pipeline"
    },
    {
      id: 11,
      title: "2025 Kho Kho World Cup, New Delhi",
      subtitle: "Historic Double Gold for Team India (Jan 13–19, 2025)",
      points: [
        "Venue: Indira Gandhi Indoor Stadium, New Delhi with 24 participating nations.",
        "Men's Final: India 54 – 36 Nepal (Undefeated tournament run).",
        "Women's Final: India 78 – 40 Nepal (Led by Captain Nasreen Shaikh).",
        "Broadcast to over 30 countries, validating global appeal."
      ],
      notes: "In January 2025, New Delhi hosted the first-ever Kho Kho World Cup. 24 countries competed, and India proved its global supremacy by taking both men's and women's gold medals.",
      badge: "World Cup 2025"
    },
    {
      id: 12,
      title: "The Ultimate Kho Kho (UKK) Revolution",
      subtitle: "Franchise Leagues & Broadcast Modernization",
      points: [
        "Season 1 (2022) Champions: Odisha Juggernauts (46–45 vs Telugu Yoddhas).",
        "Season 2 (2024) Champions: Gujarat Giants (31–26 vs Chennai Quick Guns).",
        "Mat surfaces, sensor lines, television prime-time, and athlete salaries.",
        "Transforming rural youth into recognized professional sports figures."
      ],
      notes: "Ultimate Kho Kho professionalized the sport with indoor synthetic mats, video reviews, and franchise sponsorships, giving athletes sustainable sports careers.",
      badge: "UKK League"
    },
    {
      id: 13,
      title: "Challenges & The Road to the Olympics",
      subtitle: "Overcoming Grassroots Barriers to Olympic Stardom",
      points: [
        "Expanding synthetic indoor mats to rural schools and district talims.",
        "Targeting medal demonstration status at the 2026 Aichi-Nagoya Asian Games.",
        "Global federation expansion across 40+ national Olympic committees.",
        "Grassroots digital scoring and standardized referee video assist."
      ],
      notes: "The ultimate dream is Olympic inclusion. To get there, the sport must expand synthetic mat infrastructure to school grounds and demonstrate active competition across all continents.",
      badge: "The Future"
    },
    {
      id: 14,
      title: "Closing: Dhanyavaad / Thank You (धन्यवाद)",
      subtitle: "Kho Kho: India's Traditional Tag Sport on the Global Stage",
      points: [
        "Explore the full 3D interactive court and test your skills in the Mini-Game.",
        "Search all KLU & national collegiate athlete profiles in the live web portal.",
        "Support local academies and traditional sports grassroots initiatives.",
        "धन्यवाद • Thank You!"
      ],
      notes: "Thank you for your time. Kho Kho is a living symbol of India's cultural ingenuity and athletic excellence. We invite you to experience the interactive 3D field and mini-game online.",
      badge: "Closing"
    }
  ];

  const current = slides[currentSlide];

  // Keyboard arrow keys for slide navigation
  useEffect(() => {
    if (!presentationOpen) return;
    const handleKeys = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        setPresentationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [presentationOpen, slides.length, setPresentationOpen]);

  if (!presentationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/85 backdrop-blur-md flex flex-col justify-between p-2 sm:p-6 select-none animate-fade-in">
      {/* Top Header Bar */}
      <div className="bg-paper rounded-2xl p-4 border border-charcoal/15 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-marigold flex items-center justify-center text-white font-yatra font-bold text-sm shadow">
            खो
          </div>
          <div>
            <h3 className="font-yatra text-base sm:text-lg font-bold text-indigo">
              Kho Kho Masterclass Presentation Deck
            </h3>
            <span className="text-[11px] text-charcoal/60 font-semibold">
              Slide {currentSlide + 1} of {slides.length} • {current.badge}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              showNotes ? 'bg-indigo text-white border-indigo' : 'bg-paper-dark text-charcoal border-charcoal/20'
            }`}
          >
            <FileText className="w-3.5 h-3.5 inline mr-1" />
            <span>Speaker Notes</span>
          </button>

          {/* Close Deck */}
          <button
            onClick={() => setPresentationOpen(false)}
            className="p-2 rounded-full text-charcoal hover:text-kumkum hover:bg-paper-dark transition-all"
            aria-label="Close presentation deck"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Card Container */}
      <div className="my-auto w-full max-w-5xl mx-auto aspect-[16/9] max-h-[75vh] bg-paper-pure rounded-3xl border-4 border-marigold/60 shadow-2xl p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Slide Torana Header */}
        <div className="torana-border absolute top-0 left-0 right-0 h-3"></div>

        {/* Slide Content */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-kumkum uppercase tracking-widest bg-kumkum/10 px-2.5 py-0.5 rounded-full">
              {current.badge}
            </span>
            <span className="text-xs font-bold font-yatra text-indigo">
              0{currentSlide + 1} / 14
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-yatra text-indigo mb-1">
            {current.title}
          </h2>

          <div className="text-xs sm:text-base font-semibold text-marigold-dark mb-6">
            {current.subtitle}
          </div>

          {/* Bullet Points */}
          <div className="space-y-3 max-w-3xl">
            {current.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-kumkum shrink-0 mt-1.5 shadow-sm"></span>
                <p className="text-xs sm:text-base text-charcoal/90 font-medium leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Footer */}
        <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between text-xs text-charcoal/60">
          <span className="font-semibold">Kho Kho: India's Ground Game • Masterclass Deck</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-peacock"></span>
            <span>All Data Verified from KKFI & IKKF Archives</span>
          </div>
        </div>

        {/* Optional Speaker Notes Overlay Drawer */}
        {showNotes && (
          <div className="absolute inset-x-0 bottom-0 bg-indigo/95 backdrop-blur-md text-white p-5 rounded-t-2xl border-t-2 border-turmeric animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-turmeric uppercase tracking-wider flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Speaker Presentation Notes (80–120 Words)</span>
              </span>
              <button onClick={() => setShowNotes(false)} className="text-white/60 hover:text-white text-xs font-bold">
                Hide
              </button>
            </div>
            <p className="text-xs sm:text-sm text-paper leading-relaxed">
              "{current.notes}"
            </p>
          </div>
        )}
      </div>

      {/* Slide Navigation Controls */}
      <div className="bg-paper rounded-2xl p-4 border border-charcoal/15 shadow-xl flex items-center justify-between max-w-xl mx-auto w-full">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo text-white text-xs font-bold disabled:opacity-30 disabled:pointer-events-none hover:bg-indigo-light transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Slide dots */}
        <div className="flex items-center space-x-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-6 bg-kumkum' : 'w-2 bg-charcoal/20 hover:bg-marigold'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={currentSlide === slides.length - 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-marigold text-white text-xs font-bold disabled:opacity-30 disabled:pointer-events-none hover:bg-marigold-dark transition-all shadow"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
