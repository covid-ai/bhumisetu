'use client';

import React from 'react';
import { Parcel } from '../../types/land';
import { ParcelService } from '../../lib/parcelService';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

interface ParcelAITabProps {
  parcel: Parcel;
}

export const ParcelAITab: React.FC<ParcelAITabProps> = ({ parcel }) => {
  const insights = ParcelService.getAIInsights(parcel);

  return (
    <div className="space-y-3.5 text-xs">
      {/* Banner */}
      <div className="p-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <h4 className="font-bold text-xs uppercase tracking-wider text-amber-200">
            AI Land Intelligence & Compliance Engine
          </h4>
        </div>
        <p className="text-[11px] text-blue-100 leading-relaxed">
          Automated multi-layer geospatial cross-reference between Cadastral Vector Layers, Master Plan 2031, RoR Ledgers, and Utility Corridors.
        </p>
      </div>

      {/* Insight 1: Land Use Compliance */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
            1. Land Use Compliance
          </span>
          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 ${
            insights.landUseCompliance.status === 'Compliant'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}>
            {insights.landUseCompliance.status === 'Compliant' ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-rose-600" />
            )}
            {insights.landUseCompliance.status} – Demo
          </span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          {insights.landUseCompliance.details}
        </p>
      </div>

      {/* Insight 2: Document Completeness */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
            2. Document Completeness
          </span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${insights.documentCompleteness.score}%` }} 
              />
            </div>
            <span className="font-bold text-slate-800 text-[11px]">
              {insights.documentCompleteness.ratio}
            </span>
          </div>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          {insights.documentCompleteness.details}
        </p>
      </div>

      {/* Insight 3: Development Potential */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
            3. Development Insight & FAR
          </span>
          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
            insights.developmentInsight.status === 'Favorable'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {insights.developmentInsight.status}
          </span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          {insights.developmentInsight.details}
        </p>
      </div>

      {/* Insight 4: Infrastructure Proximity */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
        <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1.5">
          4. Infrastructure Proximity
        </div>
        <div className="space-y-1 text-slate-600 text-[11px]">
          <div>• Road Network: <span className="font-semibold text-slate-800">{insights.infrastructureProximity.roadDistance}</span></div>
          <div>• Power & Water: <span className="font-semibold text-slate-800">{insights.infrastructureProximity.utilitiesDistance}</span></div>
          <div className="text-slate-500 mt-1 italic">{insights.infrastructureProximity.details}</div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-[10px] text-slate-500 leading-tight">
        <span className="font-bold text-slate-700">Notice: </span>
        AI-generated demonstration insight – not an official legal determination. Actual approvals require statutory revenue vetting.
      </div>
    </div>
  );
};
