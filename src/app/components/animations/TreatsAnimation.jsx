"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function TreatsAnimation({ color = "#7c5cff" }) {
  const treatsRef = useRef([]);
  const groupRef = useRef();
  const [particleCount, setParticleCount] = useState(10);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? 5 : 10);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    
    treatsRef.current.forEach((treat, i) => {
      if (treat) {
        const time = state.clock.elapsedTime;
        const offset = i * 0.5;
        treat.position.y = Math.sin(time * 1.5 + offset) * 0.3;
        treat.rotation.x += delta * 0.8;
        treat.rotation.y += delta * 0.6;
        treat.rotation.z += delta * 0.4;
      }
    });
  });

  const treatColor = new THREE.Color(color);

  return (
    <group ref={groupRef}>
      {/* Main Treat Cluster */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (i % 2 === 0 ? 1 : -1) * 0.2;
        
        return (
          <group
            key={i}
            ref={(el) => {
              if (el) treatsRef.current[i] = el;
            }}
            position={[x, y, z]}
          >
            {/* Treat Shape - Irregular blob */}
            <mesh>
              <dodecahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial
                color={treatColor}
                emissive={treatColor}
                emissiveIntensity={0.6}
              />
            </mesh>
            
            {/* Glow around each treat */}
            <Sphere args={[0.35, 12, 12]}>
              <MeshDistortMaterial
                color={treatColor}
                transparent
                opacity={0.15}
                distort={0.2}
                speed={1.5}
              />
            </Sphere>
          </group>
        );
      })}
      
      {/* Floating particles */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 1.2;
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 4) * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial
              color={treatColor}
              emissive={treatColor}
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

