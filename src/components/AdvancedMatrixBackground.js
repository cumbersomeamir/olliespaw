"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AdvancedMatrixBackground() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const linesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 1000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 500;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Advanced Particle System
    const particleCount = 5000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const color = new THREE.Color(0x00ff41);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions in 3D space
      positions[i3] = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i3 + 2] = (Math.random() - 0.5) * 2000;

      // Colors with variation
      const hue = 0.33 + (Math.random() - 0.5) * 0.1;
      color.setHSL(hue, 1, 0.5 + Math.random() * 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Sizes
      sizes[i] = Math.random() * 3 + 1;

      // Velocities
      velocities[i3] = (Math.random() - 0.5) * 0.5;
      velocities[i3 + 1] = Math.random() * 2 + 0.5;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mouse;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Add wave motion
          pos.x += sin(time * 0.5 + position.y * 0.01) * 10.0;
          pos.z += cos(time * 0.3 + position.x * 0.01) * 10.0;
          
          // Mouse interaction
          vec2 mouseInfluence = (mouse - vec2(pos.x, pos.y)) * 0.001;
          pos.xy += mouseInfluence * 50.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    particlesRef.current = { system: particleSystem, velocities, positions };

    // Complex Line Network
    const lineGeometry = new THREE.BufferGeometry();
    const lineCount = 2000;
    const linePositions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const startX = (Math.random() - 0.5) * 2000;
      const startY = (Math.random() - 0.5) * 2000;
      const startZ = (Math.random() - 0.5) * 2000;

      linePositions[i6] = startX;
      linePositions[i6 + 1] = startY;
      linePositions[i6 + 2] = startZ;
      linePositions[i6 + 3] = startX + (Math.random() - 0.5) * 200;
      linePositions[i6 + 4] = startY + (Math.random() - 0.5) * 200;
      linePositions[i6 + 5] = startZ + (Math.random() - 0.5) * 200;

      const intensity = Math.random();
      color.setHSL(0.33, 1, 0.3 + intensity * 0.7);
      lineColors[i6] = color.r;
      lineColors[i6 + 1] = color.g;
      lineColors[i6 + 2] = color.b;
      lineColors[i6 + 3] = color.r * 0.5;
      lineColors[i6 + 4] = color.g * 0.5;
      lineColors[i6 + 5] = color.b * 0.5;
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    linesRef.current = lines;

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Update particles
      if (particlesRef.current) {
        const { system, velocities, positions } = particlesRef.current;
        const posArray = system.geometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Update positions with velocities
          posArray[i3] += velocities[i3];
          posArray[i3 + 1] += velocities[i3 + 1];
          posArray[i3 + 2] += velocities[i3 + 2];

          // Wrap around
          if (posArray[i3 + 1] > 1000) {
            posArray[i3 + 1] = -1000;
            posArray[i3] = (Math.random() - 0.5) * 2000;
            posArray[i3 + 2] = (Math.random() - 0.5) * 2000;
          }
        }
        
        system.geometry.attributes.position.needsUpdate = true;
        system.material.uniforms.time.value = time;
        system.material.uniforms.mouse.value.set(
          mouseRef.current.x * 500,
          mouseRef.current.y * 500
        );
      }

      // Rotate camera slightly
      camera.position.x += (mouseRef.current.x * 100 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 100 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particles.dispose();
      lineGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}





