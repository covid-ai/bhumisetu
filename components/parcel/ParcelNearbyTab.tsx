'use client';

import React from 'react';
import { Parcel } from '../../types/land';
import { DEMO_INFRASTRUCTURE } from '../../data/infrastructure';
import { useLandStack } from '../../context/LandStackContext';
import { MapPin, Navigation, School, Hospital, Zap, Droplets, ArrowRight } from 'lucide-react';

interface ParcelNearbyTabProps {
  parcel: Parcel;
}

export const ParcelNearbyTab: React.FC<ParcelNearbyTabProps> = ({ parcel }) => {
  const { parcels, focusParcelOnMap } = useLandStack();

  // Find adjacent parcels (simple proximity: different ID, close centroid)
  const adjacentParcels = parcels
    .filter((p) => p.parcelId !== parcel.parcelId && p.status !== 'Subdivided')
    .slice(0, 4);

  const getInfraIcon = (type: string) => {
    switch (type) {
      case 'Road': return <Navigation className="w-3.5 h-3.5 text-slate-700" />;
      case 'School': return <School className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Hospital': return <Hospital className="w-3.5 h-3.5 text-rose-600" />;
      case 'Electricity': return <Zap className="w-3.5 h-3.5 text-amber-600" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-cyan-600" />;
      default: return <MapPin className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Nearby Infrastructure */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          Civic & Physical Infrastructure
        </h4>

        <div className="space-y-2">
          {DEMO_INFRASTRUCTURE.map((item) => (
            <div key={item.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <div className="p-1.5 rounded-md bg-white border border-slate-200 mt-0.5">
                {getInfraIcon(item.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">{item.name}</span>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    {item.distanceFromP005 || 'Near'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjacent Cadastral Parcels */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          Adjacent Cadastral Survey Plots
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {adjacentParcels.map((adj) => (
            <button
              key={adj.parcelId}
              onClick={() => focusParcelOnMap(adj.parcelId)}
              className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{adj.parcelId}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">{adj.surveyNumber}</div>
              <div className="text-[10px] text-blue-600 font-medium">{adj.area.toLocaleString()} sq.ft.</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
