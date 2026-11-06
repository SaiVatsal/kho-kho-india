import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FieldModel } from './FieldModel';
import { Chaser } from './Chaser';
import { Defender } from './Defender';
import { useAppStore } from '../hooks/useAppStore';
import { sounds } from '../utils/sound';
import { ChevronDown, Play, Volume2, VolumeX, Eye, Sparkles } from 'lucide-react';

// Symmetrical 8 Cross-lane positions (spacing 2.30m)
const LANE_X_POSITIONS = [-8.05, -5.75, -3.45, -1.15, 1.15, 3.45, 5.75, 8.05];

const CameraRig = ({ cameraMode, reducedMotion }) => {
  const controlsRef = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (cameraMode === 'orbit' && controlsRef.current) {
      // Gentle cinematic slow orbit
      controlsRef.current.setAzimuthalAngle(controlsRef.current.getAzimuthalAngle() + delta * 0.12);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={12}
      maxDistance={42}
      maxPolarAngle={Math.PI / 2 - 0.05} // Do not dip below ground
      autoRotate={false}
    />
  );
};

export const Hero3D = () => {
  const { audioEnabled, toggleAudio, reducedMotion } = useAppStore();
  const [cameraView, setCameraView] = useState('orbit'); // 'orbit' | 'top' | 'pole'

  const getCameraPosition = () => {
    switch (cameraView) {
      case 'top': return [0, 28, 0.1];
      case 'pole': return [-15, 6, 8];
      default: return [0, 16, 24]; // Orbit perspective
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen bg-jaali flex flex-col justify-between overflow-hidden">
      {/* 1. Traditional Torana Marigold Garland Arch at Top */}
      <div className="torana-border shadow-sm z-30"></div>

      {/* 2. Ambient Sunlit 3D Canvas */}
      <div className="absolute inset-0 w-full h-full z-10">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-terracotta text-paper font-yatra text-2xl">
            Drawing the 27m × 16m Ground in White Chalk...
          </div>
        }>
          <Canvas shadows gl={{ antialias: true, powerPreference: 'high-performance' }} dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={getCameraPosition()} fov={45} />
            <CameraRig cameraMode={cameraView} reducedMotion={reducedMotion} />

            {/* Dusty Sunlight Environment Lighting */}
            <ambientLight intensity={0.85} color="#FFF8E7" />
            <directionalLight
              castShadow
              position={[15, 25, 12]}
              intensity={1.4}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={60}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
              color="#FFE8C2"
            />
            <directionalLight position={[-15, 12, -15]} intensity={0.4} color="#8DA4D0" />

            {/* Official 27m x 16m Field Model */}
            <FieldModel />

            {/* 8 Seated Chasers in Alternate Facing Directions */}
            {LANE_X_POSITIONS.map((xPos, idx) => (
              <Chaser
                key={idx}
                position={[xPos, 0, 0]}
                facing={idx % 2 === 0 ? 1 : -1} // Alternating left (+Z) / right (-Z)
                isActive={false}
                number={idx + 1}
                jerseyColor="#F28C28"
                shortsColor="#1B2A5A"
              />
            ))}

            {/* 1 Active Chaser poised at the West Pole (X = -12) */}
            <Chaser
              position={[-11.2, 0, 0]}
              isActive={true}
              number={9}
              jerseyColor="#F28C28"
              shortsColor="#1B2A5A"
            />

            {/* 3 Agile Defenders in the East Free Zone & Right Flank */}
            <Defender position={[10.5, 0, 3.5]} number={1} rotationY={-0.6} />
            <Defender position={[6.0, 0, -4.2]} number={2} rotationY={1.2} />
            <Defender position={[12.5, 0, -1.8]} number={3} rotationY={-2.4} />
          </Canvas>
        </Suspense>
      </div>

      {/* 3. Hero Content Overlay */}
      <div className="relative z-20 pointer-events-none flex flex-col justify-between min-h-screen px-4 sm:px-8 md:px-16 pt-10 pb-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center space-x-3 bg-paper/90 backdrop-blur-md px-4 py-2 rounded-full border border-charcoal/15 shadow-md">
            <span className="w-3 h-3 rounded-full bg-kumkum animate-ping"></span>
            <span className="text-xs uppercase tracking-widest font-bold text-indigo">
              Official 27m × 16m Court
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Camera View Switcher */}
            <div className="bg-paper/90 backdrop-blur-md p-1 rounded-full border border-charcoal/15 shadow-md flex items-center space-x-1 pointer-events-auto">
              <button
                onClick={() => setCameraView('orbit')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  cameraView === 'orbit' ? 'bg-marigold text-white' : 'text-charcoal hover:text-indigo'
                }`}
                title="Cinematic Orbit"
              >
                Orbit
              </button>
              <button
                onClick={() => setCameraView('top')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  cameraView === 'top' ? 'bg-marigold text-white' : 'text-charcoal hover:text-indigo'
                }`}
                title="Top-Down Tactical View"
              >
                Top-Down
              </button>
              <button
                onClick={() => setCameraView('pole')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  cameraView === 'pole' ? 'bg-marigold text-white' : 'text-charcoal hover:text-indigo'
                }`}
                title="Pole Turning View"
              >
                Pole
              </button>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2.5 rounded-full bg-paper/90 backdrop-blur-md border border-charcoal/15 text-indigo hover:text-kumkum shadow-md pointer-events-auto transition-transform active:scale-95"
              aria-label={audioEnabled ? "Mute audio" : "Enable sound effects"}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-kumkum" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="max-w-3xl my-auto pt-12 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-md bg-marigold/15 border border-marigold/30 text-kumkum text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-marigold" />
            <span>India's Indigenous High-Speed Tag Sport</span>
          </div>

          <div className="flex items-baseline gap-4 mb-2">
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold font-yatra text-indigo tracking-tight drop-shadow-sm">
              Kho!
            </h1>
            <span className="text-4xl sm:text-5xl md:text-7xl font-bold font-yatra text-kumkum">
              खो खो
            </span>
          </div>

          <p className="text-lg sm:text-2xl font-medium text-charcoal/90 mb-6 leading-relaxed max-w-2xl bg-paper/80 backdrop-blur-sm p-4 rounded-xl border border-charcoal/10 shadow-sm">
            Split-second decisions on red clay. 8 seated chasers, 1 active hunter, and the sacred rule: <strong className="text-kumkum">Never turn back.</strong>
          </p>

          <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
            <a
              href="#rules-demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-kumkum hover:bg-kumkum-dark text-white font-semibold text-base shadow-marigold transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>How To Play in 60s</span>
            </a>
            <a
              href="#mini-game"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-indigo hover:bg-indigo-light text-white font-semibold text-base shadow-indigo transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Play Mini-Game Arena</span>
            </a>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="flex items-center justify-between text-xs text-charcoal/70 pointer-events-auto border-t border-charcoal/15 pt-4 bg-paper/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo">Interactive 3D Field:</span> Drag to orbit camera • Pinch/scroll to zoom
          </div>
          <a
            href="#rules-demo"
            className="flex items-center gap-1.5 font-bold text-kumkum hover:underline"
          >
            <span>Scroll to see tactical play</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
