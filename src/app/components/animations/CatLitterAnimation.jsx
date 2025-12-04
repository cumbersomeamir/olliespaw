"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CatLitterAnimation({ color = "#00e0ff" }) {
  const boxRef = useRef();
  const particlesRef = useRef([]);
  const [particleCounts, setParticleCounts] = useState({ inside: 12, outside: 8 });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCounts({
      inside: isMobile ? 6 : 12,
      outside: isMobile ? 4 : 8
    });
  }, []);

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta * 0.2;
      boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
    
    // Animate particles
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        const time = state.clock.elapsedTime;
        particle.position.y = Math.sin(time * 2 + i) * 0.3;
        particle.rotation.x += delta * 0.5;
        particle.rotation.z += delta * 0.3;
      }
    });
  });

  const boxColor = new THREE.Color(color);

  return (
    <group>
      {/* Main Box */}
      <group ref={boxRef} position={[0, 0, 0]}>
        {/* Box Container */}
        <mesh>
          <boxGeometry args={[1.2, 1, 0.8]} />
          <meshStandardMaterial
            color={boxColor}
            emissive={boxColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Box Lid */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.3, 0.1, 0.9]} />
          <meshStandardMaterial
            color={boxColor}
            emissive={boxColor}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Particles inside box */}
        {Array.from({ length: particleCounts.inside }).map((_, i) => {
          const x = (Math.random() - 0.5) * 0.8;
          const y = (Math.random() - 0.5) * 0.6;
          const z = (Math.random() - 0.5) * 0.5;
          return (
            <mesh
              key={i}
              ref={(el) => {
                if (el) particlesRef.current[i] = el;
              }}
              position={[x, y, z]}
            >
              <sphereGeometry args={[0.08, 6, 6]} />
              <meshStandardMaterial
                color={boxColor}
                emissive={boxColor}
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Floating particles outside */}
      {Array.from({ length: particleCounts.outside }).map((_, i) => {
        const angle = (i / particleCounts.outside) * Math.PI * 2;
        const radius = 1.8;
        return (
          <mesh
            key={`outer-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 3) * 0.4,
              Math.sin(angle) * radius,
            ]}
          >
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial
              color={boxColor}
              emissive={boxColor}
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

