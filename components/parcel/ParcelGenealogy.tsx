'use client';

import React from 'react';
import { ArrowDown, GitBranch, CheckCircle2, Split, Clock, ArrowRight, UserRound } from 'lucide-react';
import { Parcel } from '../../types/land';
import { useLandStack } from '../../context/LandStackContext';
import { ParcelService } from '../../lib/parcelService';

interface ParcelGenealogyProps {
  parcel: Parcel;
}

export const ParcelGenealogy: React.FC<ParcelGenealogyProps> = ({ parcel }) => {
  const { parcels, focusParcelOnMap } = useLandStack();

  // Determine if this parcel is part of a subdivision lineage
  const isParent = parcel.status === 'Subdivided' || (parcel.childParcelIds && parcel.childParcelIds.length > 0);
  const isChild = !!parcel.parentParcelId;

  if (!isParent && !isChild) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500">
        <GitBranch className="w-5 h-5 mx-auto text-slate-400 mb-1" />
        <p className="font-medium text-slate-700">Single Cadastral Parcel Lineage</p>
        <p className="mt-1">This parcel has not undergone subdivision or consolidation mutations.</p>
      </div>
    );
  }

  // Find parent parcel and children parcels
  const parentParcel = isChild 
    ? parcels.find((p) => p.parcelId === parcel.parentParcelId) 
    : parcel;


  const pastOwners = Array.from(new Set(ParcelService.getParcelHistory(parentParcel?.parcelId || parcel.parcelId).map(e => e.previousOwnerName).filter(Boolean) as string[]));

  const childParcels = parcels.filter(
    (p) => p.parentParcelId === (parentParcel ? parentParcel.parcelId : parcel.parcelId)
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
        <GitBranch className="w-4 h-4 text-emerald-600" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Parcel Lifecycle & Genealogy Tree
        </h4>
      </div>

      <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 ml-2">
        {pastOwners.length > 0 && (
          <div className="relative mb-2">
            <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-violet-500 ring-4 ring-white" />
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 font-semibold text-violet-900 text-[11px]"><UserRound className="w-3.5 h-3.5"/> Past Owner History</div>
              <div className="text-[10px] text-violet-800 mt-1">{pastOwners.join(' → ')}</div>
            </div>
          </div>
        )}
        {/* Step 1: Original Parent Parcel */}
        <div className="relative">
          <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500">Original Parent Parcel</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                parentParcel?.status === 'Subdivided' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {parentParcel?.status || 'Active'}
              </span>
            </div>
            <div className="font-bold text-xs text-slate-800 mt-1">
              {parentParcel?.parcelId} ({parentParcel?.area.toLocaleString()} sq.ft.)
            </div>
            <div className="font-mono text-[11px] text-blue-700">
              ULPIN: {parentParcel?.ulpin}
            </div>
            {parentParcel && parentParcel.parcelId !== parcel.parcelId && (
              <button
                onClick={() => focusParcelOnMap(parentParcel.parcelId)}
                className="mt-1.5 text-[10px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                Inspect Parent Parcel <ArrowRight className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>

        {/* Step 2: Statutory Subdivision Request */}
        <div className="relative">
          <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white" />
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900 text-[11px]">
              <Split className="w-3 h-3 text-amber-700" />
              <span>Subdivision Petition Processed</span>
            </div>
            <p className="text-[10px] text-amber-800 mt-0.5">
              Citizen request for 3-way partition for family settlement.
            </p>
          </div>
        </div>

        {/* Step 3: Government Review & Sanction */}
        <div className="relative">
          <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-white" />
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-900 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Government SDM Sanction: APPROVED</span>
            </div>
            <p className="text-[10px] text-emerald-800 mt-0.5">
              Cadastral boundaries geo-referenced & partitioned into child records.
            </p>
          </div>
        </div>

        {/* Step 4: Child Parcels Created */}
        <div className="relative pt-1">
          <span className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-purple-600 ring-4 ring-white" />
          <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Derived Child Parcels ({childParcels.length})</span>
            <span className="text-[10px] font-normal text-slate-500">Click to switch</span>
          </div>

          <div className="space-y-1.5">
            {childParcels.map((child) => {
              const isCurrentChild = child.parcelId === parcel.parcelId;
              return (
                <div
                  key={child.parcelId}
                  onClick={() => focusParcelOnMap(child.parcelId)}
                  className={`p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                    isCurrentChild
                      ? 'bg-purple-50 border-purple-300 ring-1 ring-purple-400'
                      : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{child.parcelId}</span>
                    <span className="font-semibold text-purple-700 text-[10px]">
                      {child.area.toLocaleString()} sq.ft.
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-600 mt-0.5">
                    {child.ulpin}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
