import type { Metadata } from 'next';
import './globals.css';
import { LandStackProvider } from '../context/LandStackContext';

export const metadata: Metadata = {
  title: 'Land Stack – Integrated Land Governance Platform | India DPI Prototype',
  description: 'Hackathon prototype demonstrating integrated land governance in India with real OpenStreetMap, simulated cadastral parcels, Bhu-Aadhaar ULPINs, and end-to-end statutory subdivision.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className="bg-slate-100 text-slate-900 font-sans antialiased min-h-screen">
        <LandStackProvider>
          {children}
        </LandStackProvider>
      </body>
    </html>
  );
}
