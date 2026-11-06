import { create } from 'zustand';
import { sounds } from '../utils/sound';
import { triggerMarigoldConfetti } from '../utils/confetti';

const COURT_WIDTH = 27; // -13.5 to 13.5
const COURT_HEIGHT = 16; // -8 to 8
const POST_X = 12.0;

const INITIAL_DEFENDERS = [
  { id: 1, x: 5, y: 3, vx: 0.12, vy: 0.08, tagged: false, name: "Defender 1" },
  { id: 2, x: -4, y: -4, vx: -0.10, vy: 0.11, tagged: false, name: "Defender 2" },
  { id: 3, x: 8, y: -2, vx: 0.09, vy: -0.12, tagged: false, name: "Defender 3" }
];

export const useGameStore = create((set, get) => ({
  gameState: 'idle', // 'idle' | 'playing' | 'won' | 'lost'
  score: 0,
  highScore: parseInt(localStorage.getItem('kho_high_score') || '0', 10),
  timeLeft: 60,
  difficulty: 'normal', // 'easy' | 'normal' | 'pro'
  chaserPos: { x: -POST_X, y: 0 },
  chaserDir: 1, // 1 = moving right towards +X, -1 = moving left towards -X
  activeLane: 0,
  defenders: INITIAL_DEFENDERS,
  speedBoost: false,
  foulAlert: null,

  setDifficulty: (diff) => set({ difficulty: diff }),

  startGame: () => {
    sounds.playWhistle();
    set({
      gameState: 'playing',
      score: 0,
      timeLeft: 60,
      chaserPos: { x: -POST_X, y: 0 },
      chaserDir: 1,
      speedBoost: false,
      foulAlert: null,
      defenders: [
        { id: 1, x: 4, y: 3, vx: 0.12, vy: 0.08, tagged: false, name: "Defender 1" },
        { id: 2, x: -3, y: -4, vx: -0.10, vy: 0.11, tagged: false, name: "Defender 2" },
        { id: 3, x: 7, y: -2, vx: 0.09, vy: -0.12, tagged: false, name: "Defender 3" }
      ]
    });
  },

  giveKho: () => {
    const { gameState, chaserPos, chaserDir } = get();
    if (gameState !== 'playing') return;

    sounds.playKho();
    // Swap direction & reposition to closest cross-lane chaser block with speed boost
    const newDir = chaserDir === 1 ? -1 : 1;
    set({
      chaserDir: newDir,
      speedBoost: true,
      foulAlert: null
    });

    setTimeout(() => {
      set({ speedBoost: false });
    }, 1200);
  },

  triggerFoul: (reason) => {
    sounds.playFoul();
    set({ foulAlert: reason });
    setTimeout(() => {
      set((s) => (s.foulAlert === reason ? { foulAlert: null } : {}));
    }, 1800);
  },

  updateChaserPosition: (dx, dy) => {
    const { gameState, chaserPos, chaserDir, speedBoost, triggerFoul } = get();
    if (gameState !== 'playing') return;

    // Direction rule verification:
    // If chaser is outside free zone (abs(x) < POST_X), cannot move backward opposite to chaserDir
    const isInsideCourt = Math.abs(chaserPos.x) < POST_X;
    if (isInsideCourt) {
      if ((chaserDir === 1 && dx < -0.01) || (chaserDir === -1 && dx > 0.01)) {
        triggerFoul("FOUL! Cannot reverse direction mid-lane without taking a post or giving Kho!");
        return;
      }
    }

    const mult = speedBoost ? 1.6 : 1.0;
    const nx = Math.max(-13, Math.min(13, chaserPos.x + dx * mult));
    const ny = Math.max(-7.5, Math.min(7.5, chaserPos.y + dy * mult));

    // When reaching the post free zones, can turn direction freely
    let nextDir = chaserDir;
    if (nx >= POST_X) {
      nextDir = -1; // Turned around east pole
    } else if (nx <= -POST_X) {
      nextDir = 1; // Turned around west pole
    }

    set({ chaserPos: { x: nx, y: ny }, chaserDir: nextDir });
    get().checkCollisions();
  },

  checkCollisions: () => {
    const { chaserPos, defenders, score, timeLeft } = get();
    let newlyTagged = false;
    let newScore = score;

    const nextDefenders = defenders.map((d) => {
      if (d.tagged) return d;
      const dist = Math.hypot(d.x - chaserPos.x, d.y - chaserPos.y);
      if (dist < 1.4) {
        newlyTagged = true;
        newScore += 100 + timeLeft * 5;
        sounds.playDhol();
        return { ...d, tagged: true };
      }
      return d;
    });

    if (newlyTagged) {
      const allTagged = nextDefenders.every((d) => d.tagged);
      const prevHigh = get().highScore;
      const finalHigh = Math.max(prevHigh, newScore);
      localStorage.setItem('kho_high_score', finalHigh.toString());

      set({
        defenders: nextDefenders,
        score: newScore,
        highScore: finalHigh
      });

      if (allTagged) {
        sounds.playVictory();
        triggerMarigoldConfetti();
        set({ gameState: 'won' });
      }
    }
  },

  tickTimer: () => {
    const { gameState, timeLeft } = get();
    if (gameState !== 'playing') return;

    if (timeLeft <= 1) {
      sounds.playWhistle();
      set({ gameState: 'lost', timeLeft: 0 });
    } else {
      set({ timeLeft: timeLeft - 1 });
      get().updateDefenders();
    }
  },

  updateDefenders: () => {
    const { defenders, difficulty, chaserPos } = get();
    const speedScale = difficulty === 'easy' ? 0.08 : difficulty === 'pro' ? 0.16 : 0.12;

    const updated = defenders.map((d) => {
      if (d.tagged) return d;

      // Intelligent evasion from chaser
      const distToChaser = Math.hypot(d.x - chaserPos.x, d.y - chaserPos.y);
      let vx = d.vx;
      let vy = d.vy;

      if (distToChaser < 4) {
        // Run away
        const angle = Math.atan2(d.y - chaserPos.y, d.x - chaserPos.x);
        vx = Math.cos(angle) * speedScale * 1.3;
        vy = Math.sin(angle) * speedScale * 1.3;
      }

      let nx = d.x + vx;
      let ny = d.y + vy;

      // Bounce off field boundaries
      if (nx > 12.5 || nx < -12.5) vx = -vx;
      if (ny > 7.0 || ny < -7.0) vy = -vy;

      return {
        ...d,
        x: Math.max(-12.5, Math.min(12.5, nx)),
        y: Math.max(-7.0, Math.min(7.0, ny)),
        vx,
        vy
      };
    });

    set({ defenders: updated });
    get().checkCollisions();
  }
}));
