'use client';

import React from 'react';
import { Split, ArrowRight, ShieldCheck, MapPin, CheckCircle2, Clock, GitBranch } from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';

export const SubdivisionPortalView: React.FC = () => {
  const { focusParcelOnMap, setCurrentView, serviceRequests } = useLandStack();

  const subdivisionRequests = serviceRequests.filter((r) => r.requestType === 'Subdivision');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Cadastral Subdivision & Partition Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Statutory framework for partitioning land parcels into independent geo-referenced child units with distinct Bhu-Aadhaar ULPINs.
          </p>
        </div>

        <button
          onClick={() => focusParcelOnMap('P005')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow transition-colors flex items-center gap-1.5 self-start sm:self-center"
        >
          <Split className="w-4 h-4" />
          <span>Start Subdivision on Map (P005)</span>
        </button>
      </div>

      {/* 5-Step Process Explainer Cards */}
      <div className="bg-gradient-to-r from-blue-900 to-govnavy-900 text-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 flex items-center gap-2">
          <GitBranch className="w-4 h-4" />
          <span>Statutory 5-Step Digital Subdivision Workflow</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { step: '1', title: 'Select Parcel', desc: 'Identify parent plot (e.g. P005) on OpenStreetMap basemap.' },
            { step: '2', title: 'Specify Splits', desc: 'Configure child areas (e.g. 3,000 + 3,000 + 4,000 sq.ft.).' },
            { step: '3', title: 'Submit Petition', desc: 'Generate digital request token (e.g. SUB-2026-0001).' },
            { step: '4', title: 'SDM Sanction', desc: 'Revenue Officer reviews setback & approves partition docket.' },
            { step: '5', title: 'Child ULPINs', desc: 'P005-A, P005-B, P005-C render live on GIS cadastral map.' },
          ].map((s) => (
            <div key={s.step} className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                {s.step}
              </span>
              <h4 className="font-bold text-xs text-white mb-1">{s.title}</h4>
              <p className="text-[11px] text-slate-300 leading-tight">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Subdivision Requests */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-800">
            Registered Subdivision Petitions ({subdivisionRequests.length})
          </h3>
          <button
            onClick={() => setCurrentView('admin')}
            className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Open Admin Approval Desk</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {subdivisionRequests.map((req) => (
            <div key={req.requestId} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-700">{req.requestId}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <div className="text-slate-700 mt-1 font-medium">
                  Parent: {req.parcelId} ({req.ulpin}) &bull; Applicant: {req.applicant}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Proposed: {req.details.numberOfChildParcels} Child Plots &bull; Reason: {req.details.reason}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {req.status === 'Pending' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow transition-colors"
                  >
                    Review in Admin Desk
                  </button>
                )}
                <button
                  onClick={() => focusParcelOnMap(req.parcelId)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium"
                >
                  Locate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
