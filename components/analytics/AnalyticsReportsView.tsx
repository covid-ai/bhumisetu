'use client';

import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Split, 
  ShieldCheck, 
  Map, 
  Download 
} from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';

export const AnalyticsReportsView: React.FC = () => {
  const { parcels, serviceRequests } = useLandStack();

  // Calculate distributions
  const landUseCounts: Record<string, number> = {
    Residential: 0,
    Commercial: 0,
    Agricultural: 0,
    Industrial: 0,
    Public: 0,
  };

  parcels.forEach((p) => {
    if (landUseCounts[p.landUse] !== undefined) {
      landUseCounts[p.landUse]++;
    }
  });

  const total = parcels.length;
  const verifiedCount = parcels.filter((p) => p.status === 'Active').length;
  const pendingCount = parcels.filter((p) => p.status === 'Pending Subdivision').length;
  const disputedCount = parcels.filter((p) => p.status === 'Disputed').length;
  const subdividedCount = parcels.filter((p) => p.status === 'Subdivided').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Land Governance Analytics & Cadastral Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated geospatial metrics, zoning distributions, mutation turnaround times, and statutory registry KPIs.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-center"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Digital Land Area</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
            {parcels.reduce((acc, p) => acc + p.area, 0).toLocaleString()} <span className="text-xs font-normal text-slate-500">sq.ft.</span>
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">100% vector surveyed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Avg. Subdivision Turnaround</span>
          <span className="text-2xl font-extrabold text-blue-600 mt-1 block">
            3.4 <span className="text-xs font-normal text-slate-500">Days</span>
          </span>
          <span className="text-[11px] text-blue-600 font-medium">&darr; 84% vs paper process</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">ULPIN Geo-Tag Compliance</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
            100%
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">Zero coordinate collisions</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Title Integrity Rate</span>
          <span className="text-2xl font-extrabold text-indigo-600 mt-1 block">
            92.8%
          </span>
          <span className="text-[11px] text-slate-500 font-medium">2 parcels under adjudication</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Land Use Classification Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800">Parcels by Land Use Classification</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">{total} Parcels</span>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(landUseCounts).map(([type, count]) => {
              const pct = Math.round((count / total) * 100);
              const colorMap: Record<string, string> = {
                Residential: 'bg-blue-600',
                Commercial: 'bg-amber-500',
                Agricultural: 'bg-emerald-600',
                Industrial: 'bg-purple-600',
                Public: 'bg-cyan-600',
              };
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">{type}</span>
                    <span className="text-slate-500">{count} plots ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${colorMap[type] || 'bg-slate-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification & Title Status Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-800">Title & Registry Status Breakdown</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">DPI Verification</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs text-emerald-800 font-semibold block">Active & Verified</span>
              <span className="text-2xl font-bold text-emerald-900 mt-1 block">{verifiedCount}</span>
              <span className="text-[10px] text-emerald-700">Clear marketable titles</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-xs text-amber-800 font-semibold block">Under Subdivision</span>
              <span className="text-2xl font-bold text-amber-900 mt-1 block">{pendingCount + subdividedCount}</span>
              <span className="text-[10px] text-amber-700">Active or completed splits</span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-xs text-rose-800 font-semibold block">Disputed / Injunction</span>
              <span className="text-2xl font-bold text-rose-900 mt-1 block">{disputedCount}</span>
              <span className="text-[10px] text-rose-700">Flagged court caveats</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs text-blue-800 font-semibold block">Total Service Petitions</span>
              <span className="text-2xl font-bold text-blue-900 mt-1 block">{serviceRequests.length}</span>
              <span className="text-[10px] text-blue-700">Processed this quarter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
