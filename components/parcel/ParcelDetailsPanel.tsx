'use client';

import React, { useState } from 'react';
import { 
  X, 
  Split, 
  MapPin, 
  FileText, 
  Clock, 
  Sparkles, 
  Building, 
  Share2, 
  ChevronRight,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Parcel } from '../../types/land';
import { useLandStack } from '../../context/LandStackContext';
import { ParcelInfoTab } from './ParcelInfoTab';
import { ParcelHistoryTab } from './ParcelHistoryTab';
import { ParcelDocumentsTab } from './ParcelDocumentsTab';
import { ParcelNearbyTab } from './ParcelNearbyTab';
import { ParcelAITab } from './ParcelAITab';
import { SubdivisionRequestModal } from '../subdivision/SubdivisionRequestModal';
import { ServiceRequestModal } from '../services/ServiceRequestModal';

interface ParcelDetailsPanelProps {
  parcel: Parcel | null;
  onClose: () => void;
}

export const ParcelDetailsPanel: React.FC<ParcelDetailsPanelProps> = ({ parcel, onClose }) => {
  const { focusParcelOnMap } = useLandStack();
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'documents' | 'nearby' | 'ai'>('info');
  const [isSubdivisionModalOpen, setIsSubdivisionModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  if (!parcel) return null;

  const isSubdivided = parcel.status === 'Subdivided';
  const isChild = !!parcel.parentParcelId;

  return (
    <>
      <aside 
        className="w-full md:w-[440px] xl:w-[480px] h-full bg-white border-l border-slate-200 flex flex-col shadow-2xl z-30 transition-all duration-300 animate-in slide-in-from-right"
        aria-label="Parcel Details Panel"
      >
        {/* Panel Header */}
        <div className="bg-slate-900 text-white p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Parcel Details
              </span>
              <span className="text-[10px] bg-slate-800 text-amber-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                DEMO
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Parcel Key Summary Card */}
          <div className="mt-3 bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {parcel.parcelId}
                  </h2>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    parcel.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : parcel.status === 'Subdivided'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : parcel.status === 'Pending Subdivision'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {parcel.status}
                  </span>
                </div>
                <div className="font-mono text-xs text-blue-300 mt-1 flex items-center gap-1.5">
                  <span>ULPIN:</span>
                  <span className="font-bold select-all">{parcel.ulpin}</span>
                </div>
              </div>

              {/* Focus Button */}
              <button
                onClick={() => focusParcelOnMap(parcel.parcelId)}
                title="Center on GIS Map"
                className="text-slate-400 hover:text-blue-400 bg-slate-700/60 hover:bg-slate-700 p-2 rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-400 block">Survey No.</span>
                <span className="font-bold text-white">{parcel.surveyNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Area</span>
                <span className="font-bold text-white">{parcel.area.toLocaleString()} sq.ft.</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Land Use</span>
                <span className="font-semibold text-white">{parcel.landUse}</span>
              </div>
            </div>

            {/* If Child Parcel, show parent link */}
            {isChild && parcel.parentParcelId && (
              <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-[11px] flex items-center justify-between text-purple-300">
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Derived from Parent Parcel: {parcel.parentParcelId}</span>
                </span>
                <button
                  onClick={() => focusParcelOnMap(parcel.parentParcelId!)}
                  className="underline hover:text-white"
                >
                  View Parent
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button: Apply for Subdivision */}
          <div className="mt-3">
            {isSubdivided ? (
              <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-2.5 text-xs text-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Split className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Subdivided into child parcels</span>
                </div>
                {parcel.childParcelIds && parcel.childParcelIds.length > 0 && (
                  <button
                    onClick={() => focusParcelOnMap(parcel.childParcelIds![0])}
                    className="text-[11px] font-bold bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1 rounded-lg transition-colors"
                  >
                    View Children
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSubdivisionModalOpen(true)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Split className="w-4 h-4" />
                <span>Apply for Subdivision</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-200 ml-auto" />
              </button>
            )}
          </div>
          <button onClick={() => setIsReportModalOpen(true)} className="mt-2 w-full py-2 px-3 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" /> Report land issue / encroachment + upload photo
          </button>
        </div>

        {/* Tab Navigation Header */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'info', label: 'Parcel Info', icon: Building },
            { id: 'history', label: 'History & Tree', icon: Clock },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'nearby', label: 'Nearby', icon: MapPin },
            { id: 'ai', label: 'AI Intel', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-all ${
                  isTabActive
                    ? 'border-blue-600 text-blue-700 bg-white shadow-sm'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isTabActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {activeTab === 'info' && <ParcelInfoTab parcel={parcel} />}
          {activeTab === 'history' && <ParcelHistoryTab parcel={parcel} />}
          {activeTab === 'documents' && <ParcelDocumentsTab parcel={parcel} />}
          {activeTab === 'nearby' && <ParcelNearbyTab parcel={parcel} />}
          {activeTab === 'ai' && <ParcelAITab parcel={parcel} />}
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-[10px] text-slate-500 text-center">
          Prototype / Demo Data: All records, boundaries, and ULPINs are simulated for demonstration.
        </div>
      </aside>

      {/* Subdivision Request Dialog */}
      <SubdivisionRequestModal
        parcel={parcel}
        isOpen={isSubdivisionModalOpen}
        onClose={() => setIsSubdivisionModalOpen(false)}
      />
      <ServiceRequestModal parcelId={parcel.parcelId} initialType="Grievance / Dispute" open={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </>
  );
};
