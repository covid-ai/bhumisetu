'use client';

import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Printer, Download } from 'lucide-react';
import { ParcelDocument } from '../../types/land';

interface DocumentViewerModalProps {
  document: ParcelDocument | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm leading-tight">{document.documentType}</h3>
              <p className="text-xs text-slate-400 font-mono">{document.fileNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Body (Styled like an Indian Govt Registry Document with Watermark) */}
        <div className="p-6 overflow-y-auto relative bg-[#fffdfa] flex-1">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
            <div className="text-6xl font-black text-slate-900 rotate-[-30deg] border-8 border-slate-900 p-8 rounded-3xl">
              DEMO PROTOTYPE ONLY
            </div>
          </div>

          {/* Certificate Header */}
          <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">
              Chandigarh Administration (Demo)
            </div>
            <div className="font-serif text-lg font-bold text-slate-900">
              {document.issuingAuthority}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Integrated Land Governance Platform &bull; Digital Land Stack
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs mb-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">Record File Number:</span>
              <span className="font-mono font-bold text-slate-800">{document.fileNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Sanction / Attestation Date:</span>
              <span className="font-medium text-slate-800">{document.documentDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Cadastral Parcel Reference:</span>
              <span className="font-bold text-blue-700">{document.parcelId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Verification Status:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {document.documentStatus}
              </span>
            </div>
          </div>

          {/* Summary Text */}
          <div className="mb-6 space-y-3">
            <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider">
              Statutory Summary & Attestation
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              {document.summary}
            </p>
          </div>

          {/* Official Stamp Simulation */}
          <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-300">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Digital Cryptographic Signature: VALID (DEMO)</span>
            </div>
            <div className="text-right">
              <div className="w-24 h-12 border border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400 font-mono italic">
                [Digital Seal]
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Authorized Revenue Officer</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 italic text-[11px]">
            * Simulated demonstration document. Not an official legal instrument.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
