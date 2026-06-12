import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Observatory — Interactive 3D Portfolio',
  description: 'Interactive 3D scene built with React Three Fiber — explore projects floating in space',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
