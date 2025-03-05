'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import Keyboard3D from '@/components/keyboard-3d';
import { CustomizationPanel } from '@/components/customization-panel';
import { KeyboardConfig } from '@/lib/types';
import { useTexture } from "@react-three/drei";

export default function KeyboardCustomizer() {
  const [config, setConfig] = useState<KeyboardConfig>({
    layout: '60percent',
    switches: 'cherry-red',
    keycaps: 'pbt-black',
    backgroundImage: '',
    language: 'en',
    color: 'black',
  });

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <Canvas shadows camera={{ position: [0, 5, 100], fov: 50 }}>
          <color attach="background" args={['#1a1a1a']} />
          <fog attach="fog" args={['#1a1a1a', 10, 20]} />
          
          <Suspense fallback={null}>
            <Keyboard3D config={config} />
            <Environment preset="city" />
          </Suspense>

          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          <OrbitControls
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={15}
          />
        </Canvas>
      </div>
      <CustomizationPanel config={config} onChange={setConfig} />
    </div>
  );
}
