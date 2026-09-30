'use client';

import React from 'react';
import { UserCheck, MapPin, Split, FileText, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';
import { ParcelService } from '../../lib/parcelService';

export const MyParcelsView: React.FC = () => {
  const { parcels, focusParcelOnMap, selectParcel } = useLandStack();

  // Highlight Amit Sharma's holdings (P005 or children P005-A, P005-B, P005-C)
  const myParcels = parcels.filter((p) => 
    p.ownerId === 'OWNER-005' || 
    p.ownerId === 'OWNER-005A' || 
    p.ownerId === 'OWNER-005B' || 
    p.ownerId === 'OWNER-005C' ||
    p.parcelId.startsWith('P005')
  );

  return (
    <div className="space-y-6">
      {/* Citizen Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Amit Sharma (Demo Citizen)</h1>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Bhu-Aadhaar Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Citizen ID: IND-CHD-8924 &bull; Registered Landholdings in Sector 26, Chandigarh
            </p>
          </div>
        </div>

        <button
          onClick={() => focusParcelOnMap('P005')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow transition-colors flex items-center gap-1.5 self-start sm:self-center"
        >
          <MapPin className="w-4 h-4" />
          <span>Locate on GIS Map</span>
        </button>
      </div>

      {/* Parcels Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <span>Registered Land Parcels ({myParcels.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myParcels.map((parcel) => {
            const isSubdivided = parcel.status === 'Subdivided';
            const isChild = !!parcel.parentParcelId;

            return (
              <div
                key={parcel.parcelId}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-slate-900">{parcel.parcelId}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      parcel.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : parcel.status === 'Subdivided'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {parcel.status}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-blue-700 font-semibold mt-1">
                    {parcel.ulpin}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Survey No.</span>
                      <span className="font-bold text-slate-800">{parcel.surveyNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Area</span>
                      <span className="font-bold text-slate-800">{parcel.area.toLocaleString()} sq.ft.</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Land Use</span>
                      <span className="font-medium text-slate-800">{parcel.landUse}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">RoR Status</span>
                      <span className="font-medium text-emerald-700">Verified</span>
                    </div>
                  </div>

                  {isChild && (
                    <div className="mt-2 text-[11px] text-purple-700 font-medium">
                      &bull; Derived from Parent {parcel.parentParcelId}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => focusParcelOnMap(parcel.parcelId)}
                    className="flex-1 py-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>View on Map</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
