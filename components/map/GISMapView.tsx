'use client';

import React from 'react';
import { LandMap } from './LandMap';
import { ParcelDetailsPanel } from '../parcel/ParcelDetailsPanel';
import { useLandStack } from '../../context/LandStackContext';
import { MapPin, Sparkles, Split, Info } from 'lucide-react';

export const GISMapView: React.FC = () => {
  const { selectedParcel, selectParcel, focusParcelOnMap } = useLandStack();

  return (
    <div className="relative w-full h-[calc(100vh-105px)] flex flex-col md:flex-row overflow-hidden bg-slate-100">
      {/* Top Floating Helper Banner on Map */}
      <div className="absolute top-4 left-4 z-[999] pointer-events-none hidden sm:block">
        <div className="bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 rounded-xl px-3.5 py-2 pointer-events-auto flex items-center gap-2.5 text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800">
            Click any parcel to inspect &bull; Demo Parcel:
          </span>
          <button
            onClick={() => focusParcelOnMap('P005')}
            className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] shadow-sm transition-all"
          >
            P005 (Amit Sharma)
          </button>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="flex-1 w-full h-full relative">
        <LandMap />
      </div>

      {/* Right Side Parcel Details Panel */}
      {selectedParcel && (
        <ParcelDetailsPanel
          parcel={selectedParcel}
          onClose={() => selectParcel(null)}
        />
      )}
    </div>
  );
};
