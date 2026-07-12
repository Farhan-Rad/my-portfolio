'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, shape, speed }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0);
      case 'octahedron': return new THREE.OctahedronGeometry(1, 0);
      case 'torus': return new THREE.TorusGeometry(1, 0.4, 16, 32);
      default: return new THREE.IcosahedronGeometry(1, 0);
    }
  }, [shape]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position} geometry={geometry}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.4}
          roughness={0.3}
          metalness={0.1}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Shapes({ isMobile }: { isMobile: boolean }) {
  const scale = isMobile ? 0.6 : 1;
  const shapes = useMemo(() => [
    { position: [-4 * scale, 1, -3], color: '#2a7eff', shape: 'icosahedron', speed: 0.8 },
    { position: [4 * scale, -1, -4], color: '#a683ff', shape: 'octahedron', speed: 0.6 },
    { position: [-3 * scale, -2, -5], color: '#f861b4', shape: 'torus', speed: 0.7 },
    { position: [3 * scale, 2, -3], color: '#00c850', shape: 'icosahedron', speed: 0.5 },
    { position: [0, -3, -6], color: '#2a7eff', shape: 'octahedron', speed: 0.9 },
  ], [scale]);

  return shapes.map((s, i) => <FloatingShape key={i} {...s} />);
}

function ParticleField({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 80 : 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points>
      <primitive object={geometry} />
      <pointsMaterial size={0.03} color="#2a7eff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 0, 8);
    } else {
      camera.position.set(0, 0, 6);
    }
  }, [isMobile, camera]);

  return (
    <>
      <Shapes isMobile={isMobile} />
      <ParticleField isMobile={isMobile} />
    </>
  );
}

export function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
