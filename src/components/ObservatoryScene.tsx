'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { PROJECTS, type ProjectId, type Project } from '@/lib/projects';
import { CameraRig }      from './CameraRig';
import { ProjectObject }  from './ProjectObject';
import { Particles }      from './Particles';
import { Nebula }         from './Nebula';
import { PostProcessing } from './PostProcessing';
import { InfoPanel }      from './InfoPanel';

export default function ObservatoryScene() {
  const [selected, setSelected] = useState<ProjectId | null>(null);

  const selectedProject: Project | null =
    selected ? PROJECTS.find(p => p.id === selected) ?? null : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100svh' }}>
      <Canvas
        camera={{ position: [0, 1.5, 12], fov: 55 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          antialias: true,
        }}
        style={{ background: '#04030f' }}
        onClick={() => setSelected(null)}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[10, 10, 10]} intensity={0.4} />

        <CameraRig selected={selected} />

        {PROJECTS.map(p => (
          <ProjectObject
            key={p.id}
            project={p}
            selected={selected}
            onSelect={setSelected}
          />
        ))}

        <Nebula />
        <Particles />
        <PostProcessing />
      </Canvas>

      {/* Top-left label */}
      <div style={{
        position: 'absolute', top: '2rem', left: '2rem',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        <div style={{
          fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 700,
          color: 'rgba(140,160,255,0.88)', letterSpacing: '0.12em',
        }}>
          OBSERVATORY
        </div>
        <div style={{
          fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.15em',
          color: 'rgba(100,120,220,0.45)', marginTop: '0.3rem',
        }}>
          React Three Fiber · Three.js · WebGL
        </div>
      </div>

      {/* Hint */}
      {!selected && (
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'monospace', fontSize: '0.55rem', letterSpacing: '0.18em',
          color: 'rgba(120,140,220,0.35)', textTransform: 'uppercase',
          pointerEvents: 'none', userSelect: 'none',
          animation: 'fadeHint 3s ease-in forwards',
        }}>
          Klicke ein Objekt · Orbit mit Drag
        </div>
      )}

      <InfoPanel project={selectedProject} onClose={() => setSelected(null)} />
    </div>
  );
}
