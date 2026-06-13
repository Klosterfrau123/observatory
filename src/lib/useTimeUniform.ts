import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import type * as THREE from 'three';

/** Drives a shader material's `u_time` uniform from the shared frame clock. */
export function useTimeUniform(matRef: RefObject<THREE.ShaderMaterial | null>) {
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.u_time.value = clock.getElapsedTime();
  });
}
