import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { useAppStore } from '../hooks/useAppStore';
import { Play, RotateCcw, Trophy, Timer, Zap, Share2, AlertTriangle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { RangoliDivider } from '../utils/warliIcons';

export const MiniGame = () => {
  const {
    gameState,
    score,
    highScore,
    timeLeft,
    difficulty,
    chaserPos,
    chaserDir,
    defenders,
    speedBoost,
    foulAlert,
    setDifficulty,
    startGame,
    giveKho,
    updateChaserPosition,
    tickTimer
  } = useGameStore();

  const [shareCopied, setShareCopied] = useState(false);
  const touchStartRef = useRef(null);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, tickTimer]);

  // Keyboard navigation listener (Arrow keys / WASD / Spacebar for Kho)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;

      const step = 0.8;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          updateChaserPosition(0, step);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          updateChaserPosition(0, -step);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          updateChaserPosition(-step, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          updateChaserPosition(step, 0);
          break;
        case ' ': // Spacebar = give Kho
          e.preventDefault();
          giveKho();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, updateChaserPosition, giveKho]);

  // Share score
  const handleShare = () => {
    const text = `I scored ${score} pts in Kho Kho Chaser Arena! Can you tag all 3 defenders before 60s? Play Kho Kho 3D!`;
    if (navigator.share) {
      navigator.share({
        title: 'Kho Kho Chaser Arena',
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Convert court coords (-13.5 to 13.5, -8 to 8) to percentage (0% to 100%)
  const toPctX = (x) => ((x + 13.5) / 27) * 100;
  const toPctY = (y) => (1 - (y + 8) / 16) * 100;

  return (
    <section id="mini-game" className="relative py-20 px-4 sm:px-8 md:px-16 bg-jaali border-b border-charcoal/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-kumkum/15 text-kumkum text-xs font-bold uppercase tracking-wider mb-2">
            60-Second Challenge
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-yatra text-indigo">
            Kho Chaser Arena
          </h2>
          <p className="mt-2 text-sm sm:text-base text-charcoal/80">
            Hunt down 3 elusive defenders. Follow the Direction Rule: you cannot reverse backward mid-lane without taking a post or giving <span className="font-bold text-kumkum">"Kho!"</span>
          </p>
        </div>

        {/* Dashboard Bar */}
        <div className="bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-4 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Difficulty selector */}
          <div className="flex items-center space-x-1 bg-paper-dark p-1 rounded-full text-xs font-bold">
            {(['easy', 'normal', 'pro']).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                disabled={gameState === 'playing'}
                className={`px-3 py-1 rounded-full capitalize transition-all ${
                  difficulty === diff ? 'bg-marigold text-white shadow' : 'text-charcoal hover:text-indigo'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Stats: Score, Timer, High Score */}
          <div className="flex items-center space-x-6 text-sm font-semibold">
            <div className="flex items-center gap-1.5 text-indigo">
              <Timer className="w-4 h-4 text-kumkum" />
              <span>Time: </span>
              <strong className="text-base font-yatra text-kumkum">{timeLeft}s</strong>
            </div>

            <div className="flex items-center gap-1.5 text-indigo">
              <Zap className="w-4 h-4 text-turmeric" />
              <span>Score: </span>
              <strong className="text-base font-yatra text-indigo">{score}</strong>
            </div>

            <div className="flex items-center gap-1.5 text-charcoal/70 hidden sm:flex">
              <Trophy className="w-4 h-4 text-marigold" />
              <span>Best: </span>
              <strong className="text-base font-yatra text-charcoal">{highScore}</strong>
            </div>
          </div>

          {/* Start / Reset / Kho Buttons */}
          <div className="flex items-center space-x-2">
            {gameState !== 'playing' ? (
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-kumkum hover:bg-kumkum-dark text-white font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{gameState === 'idle' ? 'Start Match' : 'Play Again'}</span>
              </button>
            ) : (
              <button
                onClick={giveKho}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-marigold hover:bg-marigold-dark text-white font-bold text-xs shadow-marigold animate-bounce transition-transform active:scale-95"
              >
                <span>Shout "KHO!" (Space)</span>
              </button>
            )}
          </div>
        </div>

        {/* Tactical Arena Court */}
        <div className="relative w-full aspect-[16/9] min-h-[340px] sm:min-h-[460px] rounded-2xl clay-ground border-4 border-white/80 shadow-2xl overflow-hidden select-none">
          {/* Central Lane */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-7 border-y-2 border-dashed border-white/70 bg-white/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
              Central Lane — Direction Locks Active
            </span>
          </div>

          {/* Posts */}
          <div className="absolute top-1/2 left-6 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-turmeric border-2 border-indigo shadow-lg ring-2 ring-white"></div>
            <span className="text-[9px] font-bold text-white bg-indigo/80 px-1 rounded mt-1">West Pole</span>
          </div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-turmeric border-2 border-indigo shadow-lg ring-2 ring-white"></div>
            <span className="text-[9px] font-bold text-white bg-indigo/80 px-1 rounded mt-1">East Pole</span>
          </div>

          {/* 8 Cross Lanes */}
          {[14, 24, 34, 44, 54, 64, 74, 84].map((pct, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-8 -translate-x-1/2 border-x border-white/20"
              style={{ left: `${pct}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded bg-indigo/60 border border-white/30 text-[8px] text-white flex items-center justify-center">
                {i % 2 === 0 ? '▲' : '▼'}
              </div>
            </div>
          ))}

          {/* Current Running Direction Indicator */}
          <div className="absolute top-3 left-4 bg-paper/90 px-3 py-1 rounded-full text-xs font-bold text-indigo shadow flex items-center gap-1.5 z-10">
            <span>Heading: </span>
            <span className="text-kumkum">
              {chaserDir === 1 ? 'Eastward (Towards Right Pole →)' : 'Westward (Towards Left Pole ←)'}
            </span>
          </div>

          {/* Foul Alert Banner Overlay */}
          {foulAlert && (
            <div className="absolute inset-0 bg-kumkum/85 flex flex-col items-center justify-center text-white p-4 z-40 animate-pulse text-center">
              <AlertTriangle className="w-12 h-12 text-turmeric mb-2" />
              <div className="text-2xl font-bold font-yatra tracking-wide">
                FOUL CALLED!
              </div>
              <p className="text-xs sm:text-sm max-w-md mt-1 text-paper font-semibold">
                {foulAlert}
              </p>
              <span className="text-[11px] text-turmeric mt-2 font-bold">
                Tip: Press 'Kho!' (or Space) to switch direction legally!
              </span>
            </div>
          )}

          {/* Active Chaser Token */}
          <div
            className="absolute transition-transform duration-100 ease-linear z-30"
            style={{
              left: `${toPctX(chaserPos.x)}%`,
              top: `${toPctY(chaserPos.y)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-marigold border-2 border-white shadow-xl flex items-center justify-center text-white text-base font-bold ring-4 ${
              speedBoost ? 'ring-turmeric scale-125' : 'ring-marigold/40'
            }`}>
              🏃
            </div>
            <span className="text-[9px] font-bold text-white bg-kumkum px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap block text-center">
              You (Chaser)
            </span>
          </div>

          {/* Defenders Tokens */}
          {defenders.map((d) => (
            <div
              key={d.id}
              className="absolute transition-all duration-300 ease-out z-20"
              style={{
                left: `${toPctX(d.x)}%`,
                top: `${toPctY(d.y)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ${
                d.tagged ? 'bg-charcoal/80 ring-2 ring-charcoal line-through' : 'bg-peacock ring-4 ring-peacock/40 animate-pulse'
              }`}>
                {d.tagged ? '💥' : '🛡️'}
              </div>
              <span className="text-[9px] font-bold text-white bg-peacock-dark px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap block text-center">
                {d.tagged ? 'Tagged!' : d.name}
              </span>
            </div>
          ))}

          {/* Game Over / Won Overlays */}
          {gameState === 'won' && (
            <div className="absolute inset-0 bg-indigo/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 z-40 text-center animate-fade-in">
              <span className="text-5xl mb-2">🎉</span>
              <h3 className="text-4xl sm:text-5xl font-bold font-yatra text-turmeric mb-1">
                Shabaash! (शाबाश!)
              </h3>
              <p className="text-base text-paper mb-4 max-w-md">
                Masterclass execution! You tagged all 3 defenders using legal direction cuts in {60 - timeLeft} seconds!
              </p>
              <div className="text-2xl font-bold text-marigold mb-6 font-yatra">
                Final Score: {score} Points
              </div>
              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-full bg-marigold hover:bg-marigold-dark text-white font-bold text-xs shadow-lg"
                >
                  Play Again
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-2.5 rounded-full bg-paper text-indigo font-bold text-xs shadow-lg flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shareCopied ? 'Score Copied!' : 'Share Score'}</span>
                </button>
              </div>
            </div>
          )}

          {gameState === 'lost' && (
            <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 z-40 text-center">
              <span className="text-5xl mb-2">⏱️</span>
              <h3 className="text-3xl sm:text-4xl font-bold font-yatra text-kumkum mb-1">
                Turn Time Expired!
              </h3>
              <p className="text-sm text-paper mb-4 max-w-md">
                The defenders survived the 60-second turn clock. Use the "Kho!" button more frequently to pivot direction quickly!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-full bg-marigold hover:bg-marigold-dark text-white font-bold text-xs shadow-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-6 z-40 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold font-yatra text-turmeric mb-2">
                Ready to Chase?
              </h3>
              <p className="text-xs sm:text-sm text-paper mb-4 max-w-sm">
                Use Arrow Keys / WASD to chase. Press Spacebar to shout "KHO!" and reverse direction.
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3 rounded-full bg-kumkum hover:bg-kumkum-dark text-white font-bold text-sm shadow-xl active:scale-95 transition-all"
              >
                Enter Field
              </button>
            </div>
          )}
        </div>

        {/* Mobile On-Screen D-Pad & Controls (Visible on mobile/tablets) */}
        <div className="mt-6 flex flex-col sm:hidden items-center bg-paper p-4 rounded-2xl border border-charcoal/15 shadow-sm">
          <div className="text-xs font-bold text-charcoal/70 mb-3 uppercase tracking-wider">
            Mobile Touch Controls
          </div>
          <div className="grid grid-cols-3 gap-2 w-48 mb-4">
            <div></div>
            <button
              onClick={() => updateChaserPosition(0, 1.2)}
              className="h-12 rounded-xl bg-indigo text-white flex items-center justify-center active:bg-indigo-light shadow"
              aria-label="Move Up"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <div></div>
            <button
              onClick={() => updateChaserPosition(-1.2, 0)}
              className="h-12 rounded-xl bg-indigo text-white flex items-center justify-center active:bg-indigo-light shadow"
              aria-label="Move Left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={giveKho}
              className="h-12 rounded-xl bg-kumkum text-white font-bold text-xs flex items-center justify-center active:bg-kumkum-dark shadow"
              aria-label="Give Kho"
            >
              KHO!
            </button>
            <button
              onClick={() => updateChaserPosition(1.2, 0)}
              className="h-12 rounded-xl bg-indigo text-white flex items-center justify-center active:bg-indigo-light shadow"
              aria-label="Move Right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div></div>
            <button
              onClick={() => updateChaserPosition(0, -1.2)}
              className="h-12 rounded-xl bg-indigo text-white flex items-center justify-center active:bg-indigo-light shadow"
              aria-label="Move Down"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
            <div></div>
          </div>
        </div>
      </div>

      <RangoliDivider />
    </section>
  );
};
