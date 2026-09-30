'use client';

import React from 'react';
import { Parcel } from '../../types/land';
import { ParcelService } from '../../lib/parcelService';
import { ParcelGenealogy } from './ParcelGenealogy';
import { Clock, Calendar, UserCheck } from 'lucide-react';

interface ParcelHistoryTabProps {
  parcel: Parcel;
}

export const ParcelHistoryTab: React.FC<ParcelHistoryTabProps> = ({ parcel }) => {
  const historyEvents = ParcelService.getParcelHistory(parcel.parcelId);

  return (
    <div className="space-y-5 text-xs">
      {/* Parcel Genealogy Section */}
      <ParcelGenealogy parcel={parcel} />

      {/* Vertical Timeline */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-100">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          Parcel Mutation & Survey Timeline (Demo)
        </h4>

        <div className="relative pl-5 border-l-2 border-blue-200 space-y-4 ml-1">
          {historyEvents.map((evt, idx) => (
            <div key={evt.historyId || idx} className="relative">
              <span className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs">{evt.event}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" />
                    {evt.date}
                  </span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                  {evt.description}
                </p>
                {evt.previousOwnerName && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-violet-50 border border-violet-100 text-[10px] text-violet-800">
                    <span className="font-bold">Past Owner:</span> {evt.previousOwnerName}
                  </div>
                )}
                {evt.officerRef && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <UserCheck className="w-3 h-3 text-emerald-600" />
                    <span>Attesting Officer: {evt.officerRef}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
