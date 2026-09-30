'use client';

import React from 'react';
import { Database, RotateCcw, ShieldAlert, Server, Code, CheckCircle2 } from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';

export const SettingsView: React.FC = () => {
  const { resetToInitialData, parcels, serviceRequests } = useLandStack();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Platform Configuration & Architecture</h1>
        <p className="text-xs text-slate-500 mt-1">
          Technical specifications, state management, and migration pathways for the Digital Land Stack platform.
        </p>
      </div>

      {/* Demo State Control */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <RotateCcw className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm text-slate-800">Demo State Reset</h3>
        </div>
        <p className="text-xs text-slate-600">
          Restore all simulated parcels, owners, documents, and service requests back to their initial state. Use this before starting a live presentation demo.
        </p>
        <button
          onClick={resetToInitialData}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* PostgreSQL / PostGIS Architecture Section (Section 24) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Database className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-800">Future PostgreSQL / PostGIS Integration Pathway</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The service layer in <code className="bg-slate-100 px-1 rounded text-blue-700">lib/parcelService.ts</code> and <code className="bg-slate-100 px-1 rounded text-blue-700">lib/subdivision.ts</code> is architected to be swapped directly with Supabase or PostgreSQL / PostGIS tables without frontend modifications.
        </p>

        <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto space-y-2">
          <div className="text-emerald-400 font-bold">-- Planned PostGIS DDL Schema:</div>
          <div>CREATE EXTENSION IF NOT EXISTS postgis;</div>
          <div className="text-slate-400">CREATE TABLE cadastral_parcels (</div>
          <div className="pl-4">parcel_id VARCHAR(32) PRIMARY KEY,</div>
          <div className="pl-4">ulpin VARCHAR(32) UNIQUE NOT NULL,</div>
          <div className="pl-4">survey_number VARCHAR(64) NOT NULL,</div>
          <div className="pl-4">geom GEOMETRY(Polygon, 4326) NOT NULL,</div>
          <div className="pl-4">area_sqft NUMERIC(12, 2) NOT NULL,</div>
          <div className="pl-4">land_use VARCHAR(32),</div>
          <div className="pl-4">parent_parcel_id VARCHAR(32) REFERENCES cadastral_parcels(parcel_id)</div>
          <div className="text-slate-400">);</div>
        </div>
      </div>
    </div>
  );
};
