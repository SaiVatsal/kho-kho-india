import React from 'react';

// Procedural Low-Poly Defender built strictly from Three.js primitives
// Team Color: Peacock Teal (#0E7C7B)

export const Defender = ({
  position = [0, 0, 0],
  tagged = false,
  number = 1,
  rotationY = 0
}) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Dodging Evasion Ground Shadow */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.42, 24]} />
        <meshBasicMaterial
          color={tagged ? '#C8341C' : '#0E7C7B'}
          opacity={tagged ? 0.3 : 0.6}
          transparent
        />
      </mesh>

      {/* Athletic Legs in Low Evasive Stride */}
      <mesh position={[0.14, 0.3, 0.05]} rotation={[0.3, 0, 0.15]}>
        <cylinderGeometry args={[0.055, 0.045, 0.65, 10]} />
        <meshStandardMaterial color="#D69466" />
      </mesh>
      <mesh position={[-0.14, 0.3, -0.05]} rotation={[-0.3, 0, -0.15]}>
        <cylinderGeometry args={[0.055, 0.045, 0.65, 10]} />
        <meshStandardMaterial color="#D69466" />
      </mesh>

      {/* White Shorts with Peacock Stripe */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.34, 0.22, 0.28]} />
        <meshStandardMaterial color="#FFF6E5" roughness={0.7} />
      </mesh>

      {/* Torso in Peacock Teal Jersey */}
      <mesh castShadow position={[0, 0.98, 0]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.38, 0.44, 0.24]} />
        <meshStandardMaterial
          color={tagged ? '#555555' : '#0E7C7B'}
          roughness={0.5}
        />
      </mesh>

      {/* Front Badge */}
      <mesh position={[0, 0.98, 0.125]} rotation={[0.2, 0, 0]}>
        <planeGeometry args={[0.14, 0.14]} />
        <meshBasicMaterial color="#F5B700" />
      </mesh>

      {/* Arms in Balance/Defensive Guard */}
      <mesh position={[0.24, 0.9, 0.1]} rotation={[-0.5, 0, 0.4]}>
        <cylinderGeometry args={[0.04, 0.035, 0.4, 8]} />
        <meshStandardMaterial color="#D69466" />
      </mesh>
      <mesh position={[-0.24, 0.9, -0.1]} rotation={[0.5, 0, -0.4]}>
        <cylinderGeometry args={[0.04, 0.035, 0.4, 8]} />
        <meshStandardMaterial color="#D69466" />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 1.4, 0.08]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#D69466" roughness={0.6} />
      </mesh>

      {/* Teal Headband */}
      <mesh position={[0, 1.43, 0.08]}>
        <cylinderGeometry args={[0.125, 0.125, 0.035, 16]} />
        <meshBasicMaterial color={tagged ? '#C8341C' : '#F5B700'} />
      </mesh>
    </group>
  );
};
