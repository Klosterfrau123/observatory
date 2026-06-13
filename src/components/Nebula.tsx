'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useTimeUniform } from '@/lib/useTimeUniform';

const VERT = `
varying vec3 v_pos;
void main() {
  v_pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
uniform float u_time;
varying vec3 v_pos;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash2(i), f), dot(hash2(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
             mix(dot(hash2(i + vec2(0, 1)), f - vec2(0, 1)), dot(hash2(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = rot * p; a *= 0.5; }
  return v;
}

void main() {
  // Direction on the sphere → 2D coords for noise
  vec3 d = normalize(v_pos);
  vec2 p = vec2(atan(d.x, d.z) * 1.2, d.y * 2.2);
  float t = u_time * 0.012;

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float f = fbm(p + 2.5 * q + t * 0.5) * 0.5 + 0.5;

  // Very dark palette: deep blue → violet → faint magenta wisps
  vec3 col = vec3(0.012, 0.008, 0.045) * f;
  col += vec3(0.045, 0.012, 0.075) * smoothstep(0.45, 0.85, f);
  col += vec3(0.06, 0.025, 0.045) * smoothstep(0.65, 0.95, f) * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function Nebula() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useTimeUniform(matRef);

  return (
    <mesh scale={[120, 120, 120]}>
      <sphereGeometry args={[1, 48, 32]} />
      <shaderMaterial
        ref={matRef}
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={{ u_time: { value: 0 } }}
        vertexShader={VERT}
        fragmentShader={FRAG}
      />
    </mesh>
  );
}
