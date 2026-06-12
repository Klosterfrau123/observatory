'use client';

import { useRef } from 'react';
import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Project, ProjectId } from '@/lib/projects';

interface Props {
  project: Project;
  selected: ProjectId | null;
  onSelect: (id: ProjectId) => void;
}

export function ProjectObject({ project, selected, onSelect }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null);

  const isSelected = selected === project.id;
  const isDimmed   = selected !== null && !isSelected;

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return;
    const targetIntensity = isSelected ? 2.8 : isDimmed ? 0.2 : 0.9;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity, targetIntensity, delta * 3
    );
  });

  return (
    <Float
      speed={project.floatSpeed}
      rotationIntensity={0.5}
      floatIntensity={0.4}
      floatingRange={[-0.12, 0.12]}
    >
      <mesh
        ref={meshRef}
        position={project.position}
        onClick={(e) => { e.stopPropagation(); onSelect(project.id); }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {project.geometry === 'torusKnot'   && <torusKnotGeometry   args={[0.6, 0.22, 200, 16]} />}
        {project.geometry === 'icosahedron' && <icosahedronGeometry args={[1, 4]} />}
        {project.geometry === 'octahedron'  && <octahedronGeometry  args={[1, 0]} />}
        <meshStandardMaterial
          ref={matRef}
          color="#0a0816"
          emissive={project.emissiveColor}
          emissiveIntensity={0.9}
          metalness={0.85}
          roughness={0.12}
        />
      </mesh>
    </Float>
  );
}
