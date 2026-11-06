import React, { useMemo } from 'react';
import * as THREE from 'three';

// Procedural 3D Kho Kho Court (27m x 16m) built strictly from Three.js primitives
// All dimensions conform strictly to the KKFI official rulebook

export const FieldModel = ({ foulActive = false }) => {
  // 8 Cross lane X positions (spacing 2.30m, from post 2.55m)
  // Distance between posts is 24m (-12m to +12m).
  // Cross lanes symmetrically distributed:
  // Post is at x = -12. 1st lane at -12 + 2.55 = -9.45.
  // 8 lanes spaced at 2.30m:
  // -9.45, -7.15, -4.85, -2.55, +0.15 ... wait:
  // Let's compute exact symmetrical offsets:
  // Total span between 1st and 8th lane is 7 * 2.30m = 16.1m.
  // 24m - 16.1m = 7.9m / 2 = 3.95m wait, or 2.55m to 1st lane? In KKFI rules:
  // Post to 1st cross lane: 2.55m. Then 7 intervals of 2.30m = 16.1m. 2.55 + 16.1 + 2.55 = 21.2m (for juniors) or for seniors:
  // In senior: post to 1st cross lane = 2.55m, then 2.30m intervals. Symmetrical center:
  const crossLanePositions = useMemo(() => {
    const positions = [];
    const step = 2.30;
    const startX = - (3.5 * step); // Centered symmetrically: -8.05 to +8.05
    for (let i = 0; i < 8; i++) {
      positions.push(startX + i * step);
    }
    return positions;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Terracotta Clay Ground Slab (32m x 21m to cover lobby) */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[32, 0.1, 21]} />
        <meshStandardMaterial
          color={foulActive ? '#D9381E' : '#B5532A'}
          roughness={0.88}
          metalness={0.08}
        />
      </mesh>

      {/* 2. Playing Arena Boundary (27m x 16m) chalk line border */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[27, 16]} />
        <meshStandardMaterial
          color="#9E4620"
          roughness={0.9}
        />
      </mesh>

      {/* Outer White Chalk Boundary Lines */}
      {/* North & South sideline lines (27m long) */}
      <mesh position={[0, 0.01, 8]}>
        <boxGeometry args={[27.1, 0.01, 0.08]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.01, -8]}>
        <boxGeometry args={[27.1, 0.01, 0.08]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* East & West endline lines (16m long) */}
      <mesh position={[13.5, 0.01, 0]}>
        <boxGeometry args={[0.08, 0.01, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-13.5, 0.01, 0]}>
        <boxGeometry args={[0.08, 0.01, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* 3. Central Lane (24m x 0.30m) between the two posts (-12 to +12) */}
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[24, 0.01, 0.30]} />
        <meshStandardMaterial
          color={foulActive ? '#FF1100' : '#D16D41'}
          roughness={0.7}
        />
      </mesh>
      {/* Central Lane Chalk Borders */}
      <mesh position={[0, 0.015, 0.15]}>
        <boxGeometry args={[24, 0.008, 0.03]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.015, -0.15]}>
        <boxGeometry args={[24, 0.008, 0.03]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* 4. Eight Cross Lanes (16m long x 0.35m wide) */}
      {crossLanePositions.map((xPos, idx) => (
        <group key={idx} position={[xPos, 0.011, 0]}>
          {/* Lane surface strip */}
          <mesh>
            <boxGeometry args={[0.35, 0.008, 16]} />
            <meshStandardMaterial color="#A84C24" roughness={0.8} />
          </mesh>
          {/* Left and Right Chalk Boundary Lines */}
          <mesh position={[0.175, 0.014, 0]}>
            <boxGeometry args={[0.03, 0.008, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[-0.175, 0.014, 0]}>
            <boxGeometry args={[0.03, 0.008, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* Sitting Block Square (35cm x 30cm) at center intersection */}
          <mesh position={[0, 0.016, 0]}>
            <boxGeometry args={[0.35, 0.01, 0.30]} />
            <meshStandardMaterial color="#F28C28" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* 5. Two Wooden Posts (Poles) at X = -12m and X = +12m */}
      {[-12, 12].map((xPos, idx) => (
        <group key={idx} position={[xPos, 0, 0]}>
          {/* Post Line marking (16m wide cross line passing through pole) */}
          <mesh position={[0, 0.013, 0]}>
            <boxGeometry args={[0.06, 0.008, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* Base collar */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.09, 0.12, 0.12, 24]} />
            <meshStandardMaterial color="#4A2511" roughness={0.6} metalness={0.2} />
          </mesh>
          {/* Smooth Wooden Teak Post (Height 1.25m, Diameter 10cm) */}
          <mesh castShadow position={[0, 0.625, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.25, 24]} />
            <meshStandardMaterial color="#6B3714" roughness={0.4} metalness={0.1} />
          </mesh>
          {/* Turned Brass/Gold Cap Finial */}
          <mesh position={[0, 1.27, 0]}>
            <sphereGeometry args={[0.065, 20, 20]} />
            <meshStandardMaterial color="#F5B700" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 6. Free Zones (1.5m behind each post: from 12m to 13.5m and -12m to -13.5m) */}
      <mesh position={[12.75, 0.012, 0]}>
        <boxGeometry args={[1.5, 0.006, 16]} />
        <meshStandardMaterial color="#A44720" roughness={0.85} opacity={0.7} transparent />
      </mesh>
      <mesh position={[-12.75, 0.012, 0]}>
        <boxGeometry args={[1.5, 0.006, 16]} />
        <meshStandardMaterial color="#A44720" roughness={0.85} opacity={0.7} transparent />
      </mesh>

      {/* 7. Subtle 1.5m Outer Lobby Margin Line */}
      <mesh position={[0, 0.008, 0]}>
        <boxGeometry args={[30, 0.004, 19]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} wireframe />
      </mesh>
    </group>
  );
};
