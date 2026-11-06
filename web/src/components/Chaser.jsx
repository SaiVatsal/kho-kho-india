import React from 'react';

// Procedural Low-Poly Kho Kho Chaser built strictly from Three.js primitives
// Mode: "sitting" (in the cross lane squares) or "active" (sprinting / tagger)

export const Chaser = ({
  position = [0, 0, 0],
  facing = 1, // 1 = facing +Z (left), -1 = facing -Z (right)
  isActive = false,
  number = 1,
  jerseyColor = "#F28C28", // Marigold
  shortsColor = "#1B2A5A"  // Deep Indigo
}) => {
  // If active, upright sprinter stance
  if (isActive) {
    return (
      <group position={position}>
        {/* Active Golden Aura Ground Ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 32]} />
          <meshBasicMaterial color="#F5B700" opacity={0.8} transparent />
        </mesh>

        {/* Legs in dynamic sprint stride */}
        <mesh castShadow position={[0.15, 0.35, 0.1]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.7, 12]} />
          <meshStandardMaterial color="#E8A678" />
        </mesh>
        <mesh castShadow position={[-0.15, 0.35, -0.1]} rotation={[-0.4, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.7, 12]} />
          <meshStandardMaterial color="#E8A678" />
        </mesh>

        {/* Athletic Shorts */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.36, 0.25, 0.3]} />
          <meshStandardMaterial color={shortsColor} roughness={0.7} />
        </mesh>

        {/* Torso in Marigold Jersey */}
        <mesh castShadow position={[0, 1.05, 0]}>
          <boxGeometry args={[0.4, 0.48, 0.26]} />
          <meshStandardMaterial color={jerseyColor} roughness={0.5} />
        </mesh>

        {/* Jersey Number on Back */}
        <mesh position={[0, 1.05, -0.135]}>
          <planeGeometry args={[0.16, 0.16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Sprinting Arms */}
        <mesh position={[0.26, 0.95, -0.12]} rotation={[-0.7, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.04, 0.45, 8]} />
          <meshStandardMaterial color="#E8A678" />
        </mesh>
        <mesh position={[-0.26, 0.95, 0.12]} rotation={[0.7, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.04, 0.45, 8]} />
          <meshStandardMaterial color="#E8A678" />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.34, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 10]} />
          <meshStandardMaterial color="#E8A678" />
        </mesh>

        {/* Head */}
        <mesh castShadow position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#E8A678" roughness={0.6} />
        </mesh>

        {/* White Athletic Headband */}
        <mesh position={[0, 1.53, 0]}>
          <cylinderGeometry args={[0.135, 0.135, 0.04, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
    );
  }

  // Seated Chaser (Alternate Facing posture inside sitting square)
  const rotationY = facing > 0 ? 0 : Math.PI;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Sitting Shadow Box */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.32, 0.005, 0.28]} />
        <meshBasicMaterial color="#2B150A" opacity={0.3} transparent />
      </mesh>

      {/* Folded Knees / Legs resting on ground */}
      <mesh position={[-0.12, 0.12, 0.06]} rotation={[Math.PI / 2, 0, 0.2]}>
        <capsuleGeometry args={[0.055, 0.22, 4, 8]} />
        <meshStandardMaterial color="#E8A678" />
      </mesh>
      <mesh position={[0.12, 0.12, 0.06]} rotation={[Math.PI / 2, 0, -0.2]}>
        <capsuleGeometry args={[0.055, 0.22, 4, 8]} />
        <meshStandardMaterial color="#E8A678" />
      </mesh>

      {/* Shorts */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.32, 0.2, 0.26]} />
        <meshStandardMaterial color={shortsColor} />
      </mesh>

      {/* Seated Torso (Ready to explode upwards) */}
      <mesh castShadow position={[0, 0.42, -0.02]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.34, 0.36, 0.24]} />
        <meshStandardMaterial color={jerseyColor} roughness={0.6} />
      </mesh>

      {/* Back Patch (Target for "Kho!" tap) */}
      <mesh position={[0, 0.42, -0.145]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[0.18, 0.18]} />
        <meshBasicMaterial color="#FFF6E5" />
      </mesh>

      {/* Hands resting on knees */}
      <mesh position={[-0.2, 0.3, 0.08]} rotation={[0.4, 0, -0.3]}>
        <cylinderGeometry args={[0.04, 0.035, 0.32, 8]} />
        <meshStandardMaterial color="#E8A678" />
      </mesh>
      <mesh position={[0.2, 0.3, 0.08]} rotation={[0.4, 0, 0.3]}>
        <cylinderGeometry args={[0.04, 0.035, 0.32, 8]} />
        <meshStandardMaterial color="#E8A678" />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 0.72, 0.02]}>
        <sphereGeometry args={[0.11, 14, 14]} />
        <meshStandardMaterial color="#E8A678" />
      </mesh>

      {/* Headband */}
      <mesh position={[0, 0.75, 0.02]}>
        <cylinderGeometry args={[0.115, 0.115, 0.03, 14]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};
