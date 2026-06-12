'use client';

import { useMemo, useRef } from 'react';
import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DustParticles() {
  const ref    = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, count } = useMemo(() => {
    const count = 500;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = 8 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions: pos, count };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" count={count} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ u_time: { value: 0 } }}
        vertexShader={`
          uniform float u_time;
          void main() {
            vec3 p = position;
            float s = sin(u_time * 0.18 + p.x * 0.4) * 0.3;
            p.y += s;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = 1.6;
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            gl_FragColor = vec4(0.55, 0.52, 0.78, 0.35 * (1.0 - d * 2.0));
          }
        `}
      />
    </points>
  );
}

export function Particles() {
  return (
    <>
      <Stars radius={90} depth={60} count={3500} factor={4} saturation={0} fade speed={0.4} />
      <DustParticles />
    </>
  );
}
