'use client';

import React from 'react';
import { Layers, MapPin, Eye, Building2, Trees, Factory, School, Zap, Droplets, RotateCcw } from 'lucide-react';
import { useLandStack, MapLayerType } from '../../context/LandStackContext';

interface MapControlsProps {
  onResetView?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({ onResetView }) => {
  const { 
    activeLayer, 
    setActiveLayer, 
    showInfrastructure, 
    setShowInfrastructure,
    parcels,
    selectedParcel
  } = useLandStack();

  const layerOptions: { id: MapLayerType; label: string; icon: any }[] = [
    { id: 'cadastral', label: 'Cadastral (Standard)', icon: MapPin },
    { id: 'landuse', label: 'Land Use Classification', icon: Building2 },
    { id: 'satellite', label: 'Satellite (Demo Hybrid)', icon: Layers },
  ];

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      {/* Layer Selector Card */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 rounded-xl p-3 pointer-events-auto transition-all">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Map Layers</span>
          </div>
          {onResetView && (
            <button
              onClick={onResetView}
              title="Show Chandigarh-wide demo coverage"
              className="text-[11px] flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-blue-50 px-2 py-0.5 rounded"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Center
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          {layerOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeLayer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveLayer(opt.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span className="flex-1">{opt.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Infrastructure Toggle */}
        <div className="mt-3 pt-2 border-t border-slate-100">
          <label className="flex items-center justify-between cursor-pointer text-xs font-medium text-slate-700">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Infrastructure Assets
            </span>
            <input
              type="checkbox"
              checked={showInfrastructure}
              onChange={(e) => setShowInfrastructure(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Dynamic Legend */}
      <div className="bg-white/95 backdrop-blur-md shadow-md border border-slate-200 rounded-xl p-3 pointer-events-auto text-xs">
        <span className="font-semibold text-slate-800 block mb-1.5 text-[11px] uppercase tracking-wider">
          {activeLayer === 'landuse' ? 'Land Use Legend' : 'Cadastral Legend'}
        </span>

        {activeLayer === 'landuse' ? (
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
              <span>Residential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" />
              <span>Commercial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
              <span>Agricultural</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 inline-block" />
              <span>Industrial</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block" />
              <span>Public / Civic</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border-2 border-blue-600 bg-blue-500/20" />
              <span>Active Demo Parcel</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border-2 border-amber-500 bg-amber-500/40" />
              <span>Selected Parcel</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border-2 border-emerald-600 bg-emerald-500/30" />
              <span>Child Parcel (Subdivided)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border-2 border-red-500 bg-red-500/20" />
              <span>Disputed Parcel</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
