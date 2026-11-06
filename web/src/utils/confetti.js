import confetti from 'canvas-confetti';

export const triggerMarigoldConfetti = () => {
  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const colors = ['#F28C28', '#F5B700', '#C8341C', '#FFF6E5'];

  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.7 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2,
    ticks: 200,
    gravity: 0.8
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });
  }, 250);
};
