"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function DryFoodAnimation({ color = "#00ff95" }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const [particleCount, setParticleCount] = useState(6);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? 3 : 6);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const boneColor = new THREE.Color(color);

  return (
    <group ref={groupRef}>
      {/* Main Bone Shape */}
      <group ref={meshRef} position={[0, 0, 0]}>
        {/* Bone Center */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1.2, 12]} />
          <meshStandardMaterial color={boneColor} emissive={boneColor} emissiveIntensity={0.5} />
        </mesh>
        
        {/* Bone End 1 */}
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshStandardMaterial color={boneColor} emissive={boneColor} emissiveIntensity={0.5} />
        </mesh>
        
        {/* Bone End 2 */}
        <mesh position={[0, -0.7, 0]}>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshStandardMaterial color={boneColor} emissive={boneColor} emissiveIntensity={0.5} />
        </mesh>
        
        {/* Glow Effect */}
        <Sphere args={[0.8, 16, 16]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={boneColor}
            transparent
            opacity={0.2}
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </group>
      
      {/* Floating Particles */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshStandardMaterial
              color={boneColor}
              emissive={boneColor}
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

