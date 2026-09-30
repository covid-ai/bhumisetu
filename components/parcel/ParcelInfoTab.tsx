'use client';

import React from 'react';
import { Parcel } from '../../types/land';
import { ParcelService } from '../../lib/parcelService';
import { Shield, FileCheck, Building, Landmark, CheckCircle, AlertTriangle } from 'lucide-react';

interface ParcelInfoTabProps {
  parcel: Parcel;
}

export const ParcelInfoTab: React.FC<ParcelInfoTabProps> = ({ parcel }) => {
  const owner = ParcelService.getParcelOwner(parcel.ownerId);
  const legalAdmin = ParcelService.getParcelLegalAdmin(parcel.parcelId);

  return (
    <div className="space-y-4 text-xs">
      {/* Parcel General Specs */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-blue-600" />
          Parcel Attributes (Demo)
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-slate-400 block text-[10px]">ULPIN (Bhu-Aadhaar)</span>
            <span className="font-mono font-bold text-slate-900 text-xs break-all">{parcel.ulpin}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Survey / Khasra No.</span>
            <span className="font-bold text-slate-900 text-xs">{parcel.surveyNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Cadastral Area</span>
            <span className="font-bold text-slate-900 text-xs">{parcel.area.toLocaleString()} sq.ft.</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Land Use</span>
            <span className="font-medium text-slate-900 text-xs">{parcel.landUse}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Zoning Master Plan</span>
            <span className="font-medium text-slate-900 text-xs">{parcel.zone}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Creation Date</span>
            <span className="font-medium text-slate-900 text-xs">{parcel.createdDate}</span>
          </div>
          <div className="col-span-2">
            <span className="text-slate-400 block text-[10px]">Location Address</span>
            <span className="font-medium text-slate-800 text-xs">{parcel.location}</span>
          </div>
        </div>
      </div>

      {/* Ownership Information Section */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-indigo-600" />
          Ownership Information
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Current Owner:</span>
            <span className="font-bold text-slate-900 text-xs">{owner.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Ownership Status:</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle className="w-3 h-3" />
              {owner.ownershipStatus}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Digital Identity Ref:</span>
            <span className="font-mono text-slate-600 text-[11px]">{owner.aadhaarRef}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Registered Contact:</span>
            <span className="font-mono text-slate-600 text-[11px]">{owner.contact}</span>
          </div>
        </div>
      </div>

      {/* Legal & Administrative Information Section */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 text-blue-700" />
          Legal & Administrative Information
        </h4>
        <div className="space-y-2 divide-y divide-slate-100">
          <div className="pt-1.5 first:pt-0 flex items-center justify-between">
            <span className="text-slate-500">Record of Rights (RoR):</span>
            <span className="font-medium text-emerald-800 text-right">{legalAdmin.roRStatus}</span>
          </div>
          <div className="pt-1.5 flex items-center justify-between">
            <span className="text-slate-500">Registration:</span>
            <span className="font-medium text-slate-800 text-right">{legalAdmin.registrationStatus}</span>
          </div>
          <div className="pt-1.5 flex items-center justify-between">
            <span className="text-slate-500">Building Permission:</span>
            <span className="font-medium text-slate-800 text-right">{legalAdmin.buildingPermission}</span>
          </div>
          <div className="pt-1.5 flex items-center justify-between">
            <span className="text-slate-500">Mortgage / Encumbrance:</span>
            <span className={`font-semibold text-right ${
              parcel.status === 'Disputed' ? 'text-rose-600' : 'text-emerald-700'
            }`}>
              {legalAdmin.mortgageStatus}
            </span>
          </div>
          <div className="pt-1.5 flex items-center justify-between">
            <span className="text-slate-500">Property Tax:</span>
            <span className="font-medium text-emerald-800 text-right">{legalAdmin.propertyTaxStatus}</span>
          </div>
          <div className="pt-1.5 flex items-center justify-between">
            <span className="text-slate-500">Land Use / Zoning:</span>
            <span className="font-medium text-slate-800 text-right">{parcel.landUse} – Demo</span>
          </div>
          <div className="pt-1.5 flex items-center justify-between">
            <span className="text-slate-500">Statutory Restrictions:</span>
            <span className="font-medium text-slate-800 text-right">{legalAdmin.restrictions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
