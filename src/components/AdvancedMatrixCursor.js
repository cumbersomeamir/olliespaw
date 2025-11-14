"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AdvancedMatrixCursor() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      0.1,
      1000
    );
    camera.position.z = 1;
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

    // Create particle trail
    const createParticle = (x, y) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(3);
      positions[0] = x - window.innerWidth / 2;
      positions[1] = -y + window.innerHeight / 2;
      positions[2] = 0;
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          life: { value: 1.0 },
        },
        vertexShader: `
          uniform float time;
          uniform float life;
          void main() {
            vec3 pos = position;
            pos.xy += sin(time * 10.0) * 5.0 * life;
            gl_PointSize = 8.0 * life;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float life;
          void main() {
            float dist = distance(gl_PointCoord, vec2(0.5));
            float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * life;
            vec3 color = vec3(0.0, 1.0, 0.25);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      const particle = new THREE.Points(geometry, material);
      scene.add(particle);
      
      return {
        particle,
        life: 1.0,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
      };
    };

    // Mouse tracking
    let lastMouseX = 0;
    let lastMouseY = 0;
    let particleTimer = 0;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Create particles along cursor path
      particleTimer++;
      if (particleTimer % 2 === 0) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const steps = Math.min(Math.floor(distance / 10), 5);
          for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const x = lastMouseX + dx * t;
            const y = lastMouseY + dy * t;
            particlesRef.current.push(createParticle(x, y));
          }
        }
      }

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 0.02;
        p.particle.material.uniforms.life.value = p.life;
        p.particle.material.uniforms.time.value = time;

        if (p.life <= 0) {
          scene.remove(p.particle);
          p.particle.geometry.dispose();
          p.particle.material.dispose();
          return false;
        }
        return true;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.left = -window.innerWidth / 2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = -window.innerHeight / 2;
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
      particlesRef.current.forEach((p) => {
        scene.remove(p.particle);
        p.particle.geometry.dispose();
        p.particle.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}


