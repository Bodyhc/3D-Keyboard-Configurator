'use client';
import * as THREE from "three";
import { useEffect, useRef, useState } from 'react';
import { Group } from "three";
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshStandardMaterial, Color } from 'three';
import { useTexture } from "@react-three/drei";

import { KeyboardConfig } from '@/lib/types';
import { Box, Text } from '@react-three/drei';

interface KeyboardKey {
  position: [number, number, number];
  label: string;
  arLabel?: string;
  size?: [number, number];
}

interface Keyboard3DProps {
  config: KeyboardConfig;
}

export const LAYOUTS: Record<string, KeyboardKey[]> = {
  '60percent': [
    // First row (numbers)
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => ({
      position: [-4.5 + i, 0.25, -1.5] as [number, number, number],
      label: num.toString(),
      arLabel: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'][i],
    })),
    // Second row (QWERTY/Arabic)
    ...['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter, i) => ({
      position: [-4.5 + i, 0.25, -0.5] as [number, number, number],
      label: letter,
      arLabel: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'][i],
    })),
    // Third row (ASDF/Arabic)
    ...['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter, i) => ({
      position: [-4 + i, 0.25, 0.5] as [number, number, number],
      label: letter,
      arLabel: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م'][i],
    })),
    // Fourth row (ZXCV/Arabic)
    ...['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, i) => ({
      position: [-3.5 + i, 0.25, 1.5] as [number, number, number],
      label: letter,
      arLabel: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة'][i],
    })),
    // Space bar
    {
      position: [0, 0.25, 2.5] as [number, number, number],
      label: 'SPACE',
      arLabel: 'مسافة',
      size: [5, 1],
    },
  ],
  '75percent': [
    // First row (numbers + function keys)
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => ({
      position: [-4.5 + i, 0.25, -2.5] as [number, number, number],
      label: num.toString(),
      arLabel: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'][i],
    })),
    // Function keys
    ...['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((key, i) => ({
      position: [-5.5 + i, 0.25, -3.5] as [number, number, number],
      label: key,
      arLabel: key,
    })),
    // Second row (QWERTY/Arabic)
    ...['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter, i) => ({
      position: [-4.5 + i, 0.25, -1.5] as [number, number, number],
      label: letter,
      arLabel: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'][i],
    })),
    // Third row (ASDF/Arabic)
    ...['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter, i) => ({
      position: [-4 + i, 0.25, -0.5] as [number, number, number],
      label: letter,
      arLabel: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م'][i],
    })),
    // Fourth row (ZXCV/Arabic)
    ...['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, i) => ({
      position: [-3.5 + i, 0.25, 0.5] as [number, number, number],
      label: letter,
      arLabel: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة'][i],
    })),
    // Space bar
    {
      position: [0, 0.25, 1.5] as [number, number, number],
      label: 'SPACE',
      arLabel: 'مسافة',
      size: [5, 1],
    },
    // Navigation keys
    {
      position: [6, 0.25, -0.5] as [number, number, number],
      label: '↑',
      arLabel: '↑',
    },
    {
      position: [5, 0.25, 0.5] as [number, number, number],
      label: '←',
      arLabel: '←',
    },
    {
      position: [6, 0.25, 0.5] as [number, number, number],
      label: '↓',
      arLabel: '↓',
    },
    {
      position: [7, 0.25, 0.5] as [number, number, number],
      label: '→',
      arLabel: '→',
    },
  ],
  'tkl': [
    // Function keys
    ...['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((key, i) => ({
      position: [-5.5 + i, 0.25, -3.5] as [number, number, number],
      label: key,
      arLabel: key,
    })),
    // First row (numbers)
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => ({
      position: [-4.5 + i, 0.25, -2.5] as [number, number, number],
      label: num.toString(),
      arLabel: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'][i],
    })),
    // Second row (QWERTY/Arabic)
    ...['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter, i) => ({
      position: [-4.5 + i, 0.25, -1.5] as [number, number, number],
      label: letter,
      arLabel: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'][i],
    })),
    // Third row (ASDF/Arabic)
    ...['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter, i) => ({
      position: [-4 + i, 0.25, -0.5] as [number, number, number],
      label: letter,
      arLabel: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م'][i],
    })),
    // Fourth row (ZXCV/Arabic)
    ...['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, i) => ({
      position: [-3.5 + i, 0.25, 0.5] as [number, number, number],
      label: letter,
      arLabel: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة'][i],
    })),
    // Space bar
    {
      position: [0, 0.25, 1.5] as [number, number, number],
      label: 'SPACE',
      arLabel: 'مسافة',
      size: [5, 1],
    },
    // Navigation cluster
    {
      position: [8, 0.25, -2.5] as [number, number, number],
      label: 'INS',
      arLabel: 'إدخال',
    },
    {
      position: [9, 0.25, -2.5] as [number, number, number],
      label: 'HOME',
      arLabel: 'بداية',
    },
    {
      position: [10, 0.25, -2.5] as [number, number, number],
      label: 'PGUP',
      arLabel: 'صفحة↑',
    },
    {
      position: [8, 0.25, -1.5] as [number, number, number],
      label: 'DEL',
      arLabel: 'حذف',
    },
    {
      position: [9, 0.25, -1.5] as [number, number, number],
      label: 'END',
      arLabel: 'نهاية',
    },
    {
      position: [10, 0.25, -1.5] as [number, number, number],
      label: 'PGDN',
      arLabel: 'صفحة↓',
    },
    // Arrow keys
    {
      position: [9, 0.25, 0.5] as [number, number, number],
      label: '↑',
      arLabel: '↑',
    },
    {
      position: [8, 0.25, 1.5] as [number, number, number],
      label: '←',
      arLabel: '←',
    },
    {
      position: [9, 0.25, 1.5] as [number, number, number],
      label: '↓',
      arLabel: '↓',
    },
    {
      position: [10, 0.25, 1.5] as [number, number, number],
      label: '→',
      arLabel: '→',
    },
  ],
  'full': [
    // Function keys
    ...['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((key, i) => ({
      position: [-5.5 + i, 0.25, -3.5] as [number, number, number],
      label: key,
      arLabel: key,
    })),
    // First row (numbers)
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => ({
      position: [-4.5 + i, 0.25, -2.5] as [number, number, number],
      label: num.toString(),
      arLabel: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'][i],
    })),
    // Second row (QWERTY/Arabic)
    ...['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter, i) => ({
      position: [-4.5 + i, 0.25, -1.5] as [number, number, number],
      label: letter,
      arLabel: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'][i],
    })),
    // Third row (ASDF/Arabic)
    ...['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter, i) => ({
      position: [-4 + i, 0.25, -0.5] as [number, number, number],
      label: letter,
      arLabel: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م'][i],
    })),
    // Fourth row (ZXCV/Arabic)
    ...['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, i) => ({
      position: [-3.5 + i, 0.25, 0.5] as [number, number, number],
      label: letter,
      arLabel: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة'][i],
    })),
    // Space bar
    {
      position: [0, 0.25, 1.5] as [number, number, number],
      label: 'SPACE',
      arLabel: 'مسافة',
      size: [5, 1],
    },
    // Navigation cluster
    {
      position: [8, 0.25, -2.5] as [number, number, number],
      label: 'INS',
      arLabel: 'إدخال',
    },
    {
      position: [9, 0.25, -2.5] as [number, number, number],
      label: 'HOME',
      arLabel: 'بداية',
    },
    {
      position: [10, 0.25, -2.5] as [number, number, number],
      label: 'PGUP',
      arLabel: 'صفحة↑',
    },
    {
      position: [8, 0.25, -1.5] as [number, number, number],
      label: 'DEL',
      arLabel: 'حذف',
    },
    {
      position: [9, 0.25, -1.5] as [number, number, number],
      label: 'END',
      arLabel: 'نهاية',
    },
    {
      position: [10, 0.25, -1.5] as [number, number, number],
      label: 'PGDN',
      arLabel: 'صفحة↓',
    },
    // Arrow keys
    {
      position: [9, 0.25, 0.5] as [number, number, number],
      label: '↑',
      arLabel: '↑',
    },
    {
      position: [8, 0.25, 1.5] as [number, number, number],
      label: '←',
      arLabel: '←',
    },
    {
      position: [9, 0.25, 1.5] as [number, number, number],
      label: '↓',
      arLabel: '↓',
    },
    {
      position: [10, 0.25, 1.5] as [number, number, number],
      label: '→',
      arLabel: '→',
    },
    // Numpad
    ...[7, 8, 9].map((num, i) => ({
      position: [12 + i, 0.25, -1.5] as [number, number, number],
      label: num.toString(),
      arLabel: ['٧', '٨', '٩'][i],
    })),
    ...[4, 5, 6].map((num, i) => ({
      position: [12 + i, 0.25, -0.5] as [number, number, number],
      label: num.toString(),
      arLabel: ['٤', '٥', '٦'][i],
    })),
    ...[1, 2, 3].map((num, i) => ({
      position: [12 + i, 0.25, 0.5] as [number, number, number],
      label: num.toString(),
      arLabel: ['١', '٢', '٣'][i],
    })),
    {
      position: [13, 0.25, 1.5] as [number, number, number],
      label: '0',
      arLabel: '٠',
      size: [2, 1],
    },
  ],
};

export const SWITCH_COLORS = {
  'cherry-red': '#ff0000',
  'cherry-blue': '#0000ff',
  'cherry-brown': '#8b4513',
  'gateron-yellow': '#ffff00',
  'gateron-green': '#00ff00',
  'gateron-black': '#222222',
  'kailh-box-white': '#ffffff',
  'optical-purple': '#800080',
}as const;

export const KEYCAP_MATERIALS = {
  'pbt-black': { color: '#2d2d2d', roughness: 0.7, metalness: 0 },
  'abs-white': { color: '#ffffff', roughness: 0.5, metalness: 0.1 },
  'pudding': { color: '#ffffff', roughness: 0.3, metalness: 0.2, opacity: 0.8, transparent: true },
  'doubleshot': { color: '#3d3d3d', roughness: 0.6, metalness: 0.1 },
  'metal-silver': { color: '#c0c0c0', roughness: 0.3, metalness: 0.8 },
  'metal-gold': { color: '#ffd700', roughness: 0.3, metalness: 0.8 },
  'crystal': { color: '#ffffff', roughness: 0.1, metalness: 0.3, opacity: 0.6, transparent: true },
  'rgb': { color: '#ffffff', roughness: 0.3, metalness: 0.5, emissive: '#ffffff' },
};

export const KEYBOARD_COLORS = {
  'black': '#222222',
  'white': '#ffffff',
  'silver': '#c0c0c0',
  'space-gray': '#4a4a4a',
  'navy': '#000080',
  'rose-gold': '#b76e79',
  'mint': '#98ff98',
  'purple': '#800080',
  'red': '#ff0000',
  'blue': '#0000ff',
  'green': '#00ff00',
  'yellow': '#ffff00',
  'orange': '#ffa500',
  'pink': '#ffc0cb',
  'teal': '#008080',
  'gold': '#ffd700',
};

const Keyboard3D: React.FC<Keyboard3DProps> = ({ config }) => {
  const meshRef = useRef<Group>(null);
  
  // تحميل صورة الخلفية أو استخدام صورة افتراضية
  const texture = useTexture(config.backgroundImage || "/textures/default.jpg");    const loader = new TextureLoader();
  
const keys = LAYOUTS[config.layout as keyof typeof LAYOUTS] || LAYOUTS['60percent'];
const switchColor = SWITCH_COLORS[config.switches as keyof typeof SWITCH_COLORS] || SWITCH_COLORS['cherry-red'];
const keycapMaterial = KEYCAP_MATERIALS[config.keycaps as keyof typeof KEYCAP_MATERIALS] || KEYCAP_MATERIALS['pbt-black'];
const keyboardColor = KEYBOARD_COLORS[config.color as keyof typeof KEYBOARD_COLORS] || KEYBOARD_COLORS['black'];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <group ref={meshRef}>
      {/* Keyboard base */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[config.layout === 'full' ? 16 : 12, 0.5, config.layout === '60percent' ? 6 : 8]} />
        <meshStandardMaterial
          color={keyboardColor}
          map={texture}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Keys */}
      {keys.map((key, index) => (
        <group key={index} position={key.position}>
          {/* Switch */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.8, 0.3, 0.8]} />
            <meshStandardMaterial color={switchColor} metalness={0.5} roughness={0.5} />
          </mesh>

          {/* Keycap */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[key.size?.[0] || 0.9, 0.2, key.size?.[1] || 0.9]} />
            <meshStandardMaterial {...keycapMaterial} />
          </mesh>

          {/* Key label */}
          <Text
            position={[0, 0.45, 0]}
            fontSize={0.3}
            color={keycapMaterial.color === '#ffffff' ? '#000000' : '#ffffff'}
            anchorX="center"
            anchorY="middle"
          >
            {config.language === 'ar' ? (key.arLabel || key.label) : key.label}
          </Text>
        </group>
      ))}

      {/* RGB Lighting Effect */}
      {config.keycaps === 'rgb' && (
        <pointLight
          position={[0, -0.2, 0]}
          intensity={0.5}
          color={new Color().setHSL((Date.now() % 2000) / 2000, 1, 0.5)}
        />
      )}

      {/* Ambient Lighting */}
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.3} />
      <pointLight position={[-5, 5, -5]} intensity={0.3} />
    </group>
  );

}
export default Keyboard3D;
