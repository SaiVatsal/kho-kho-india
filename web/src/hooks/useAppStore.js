import { create } from 'zustand';
import { sounds } from '../utils/sound';

export const useAppStore = create((set) => ({
  audioEnabled: false,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  presentationOpen: false,
  activeSection: 'hero',
  glossaryOpen: false,

  toggleAudio: () =>
    set((state) => {
      const next = !state.audioEnabled;
      sounds.setMuted(!next);
      if (next) sounds.playWhistle();
      return { audioEnabled: next };
    }),

  toggleReducedMotion: () =>
    set((state) => ({ reducedMotion: !state.reducedMotion })),

  setPresentationOpen: (open) => set({ presentationOpen: open }),
  setActiveSection: (sec) => set({ activeSection: sec }),
  setGlossaryOpen: (open) => set({ glossaryOpen: open })
}));
