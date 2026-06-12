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
  const introDone   = useRef(false);

  useEffect(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;

    // Cinematic intro: start far out and slowly drift to the overview
    if (!introDone.current) {
      introDone.current = true;
      ctrl.setLookAt(0, 14, 40, 0, 0, 0, false);
      ctrl.smoothTime = 2.2;
      ctrl.setLookAt(...OVERVIEW.position, ...OVERVIEW.target, true);
      const id = setTimeout(() => { ctrl.smoothTime = 0.25; }, 3200);
      return () => clearTimeout(id);
    }

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
