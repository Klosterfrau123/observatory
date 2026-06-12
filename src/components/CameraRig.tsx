'use client';

import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import type { ProjectId } from '@/lib/projects';
import { PROJECTS } from '@/lib/projects';

const OVERVIEW = {
  position: [0, 1.5, 12] as [number, number, number],
  target:   [0, 0,    0] as [number, number, number],
};

interface Props { selected: ProjectId | null; }

export function CameraRig({ selected }: Props) {
  const controlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    if (selected) {
      const p = PROJECTS.find(pr => pr.id === selected)!;
      ctrl.setLookAt(
        p.position[0], p.position[1], p.position[2] + 3.5,
        p.position[0], p.position[1], p.position[2],
        true
      );
    } else {
      ctrl.setLookAt(...OVERVIEW.position, ...OVERVIEW.target, true);
    }
  }, [selected]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      enabled={selected === null}
      minDistance={3}
      maxDistance={22}
      dampingFactor={0.06}
    />
  );
}
