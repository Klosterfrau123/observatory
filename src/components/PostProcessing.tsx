'use client';

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.82}
        luminanceSmoothing={0.025}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.12} darkness={0.65} />
    </EffectComposer>
  );
}
