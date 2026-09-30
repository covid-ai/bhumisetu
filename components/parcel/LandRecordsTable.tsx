'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';
import { ParcelService } from '../../lib/parcelService';
import { LandUseType } from '../../types/land';

export const LandRecordsTable: React.FC = () => {
  const { parcels, focusParcelOnMap } = useLandStack();

  const [search, setSearch] = useState('');
  const [landUseFilter, setLandUseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = parcels.filter((p) => {
    if (landUseFilter !== 'ALL' && p.landUse !== landUseFilter) return false;
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;

    if (search) {
      const q = search.toLowerCase();
      const owner = ParcelService.getParcelOwner(p.ownerId);
      const matchUlpin = p.ulpin.toLowerCase().includes(q);
      const matchId = p.parcelId.toLowerCase().includes(q);
      const matchSurvey = p.surveyNumber.toLowerCase().includes(q);
      const matchOwner = owner.name.toLowerCase().includes(q);
      if (!matchUlpin && !matchId && !matchSurvey && !matchOwner) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Digital Cadastral Land Records Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Master Jamabandi & Bhu-Aadhaar Register for Sector 26 Pilot Zone, Chandigarh (Demo Dataset).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-200">
            Total Records: {filtered.length} of {parcels.length}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by ULPIN, Survey No, Owner, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px]">Filters:</span>
          </div>

          <select
            value={landUseFilter}
            onChange={(e) => setLandUseFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Land Uses</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Industrial">Industrial</option>
            <option value="Public">Public</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Subdivided">Subdivided</option>
            <option value="Pending Subdivision">Pending Subdivision</option>
            <option value="Disputed">Disputed</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Parcel ID / ULPIN</th>
                <th className="py-3 px-4">Survey No.</th>
                <th className="py-3 px-4">Owner Name</th>
                <th className="py-3 px-4">Area (sq.ft.)</th>
                <th className="py-3 px-4">Land Use</th>
                <th className="py-3 px-4">RoR (Jamabandi)</th>
                <th className="py-3 px-4">Registration</th>
                <th className="py-3 px-4">Tax Status</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">GIS Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No parcels found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((parcel) => {
                  const owner = ParcelService.getParcelOwner(parcel.ownerId);
                  const legal = ParcelService.getParcelLegalAdmin(parcel.parcelId);

                  return (
                    <tr 
                      key={parcel.parcelId} 
                      onClick={() => focusParcelOnMap(parcel.parcelId)}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                          <span>{parcel.parcelId}</span>
                          {parcel.parentParcelId && (
                            <span className="text-[9px] bg-purple-100 text-purple-800 font-semibold px-1 rounded">
                              Child
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">{parcel.ulpin}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {parcel.surveyNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{owner.name}</div>
                        <div className="text-[10px] text-slate-400">{owner.ownershipStatus}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-700">
                        {parcel.area.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          parcel.landUse === 'Residential' ? 'bg-blue-50 text-blue-700' :
                          parcel.landUse === 'Commercial' ? 'bg-amber-50 text-amber-700' :
                          parcel.landUse === 'Agricultural' ? 'bg-emerald-50 text-emerald-700' :
                          parcel.landUse === 'Industrial' ? 'bg-purple-50 text-purple-700' :
                          'bg-cyan-50 text-cyan-700'
                        }`}>
                          {parcel.landUse}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {legal.roRStatus}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {legal.registrationStatus}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {legal.propertyTaxStatus}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          parcel.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : parcel.status === 'Subdivided'
                            ? 'bg-amber-100 text-amber-800'
                            : parcel.status === 'Pending Subdivision'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {parcel.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            focusParcelOnMap(parcel.parcelId);
                          }}
                          className="px-2.5 py-1 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-700 text-[11px] font-semibold rounded-lg border border-blue-200 transition-all inline-flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>View on Map</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
