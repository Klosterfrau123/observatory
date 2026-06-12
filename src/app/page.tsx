'use client';

import dynamic from 'next/dynamic';

const ObservatoryScene = dynamic(
  () => import('@/components/ObservatoryScene'),
  { ssr: false }
);

export default function Home() {
  return <ObservatoryScene />;
}
