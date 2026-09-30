'use client';

import React from 'react';
import { Parcel } from '../../types/land';
import { ParcelService } from '../../lib/parcelService';
import { useLandStack } from '../../context/LandStackContext';
import { FileText, Eye, CheckCircle2, ShieldCheck, Upload, Download } from 'lucide-react';

interface ParcelDocumentsTabProps {
  parcel: Parcel;
}

export const ParcelDocumentsTab: React.FC<ParcelDocumentsTabProps> = ({ parcel }) => {
  const { setActiveDocumentModal } = useLandStack();
  const documents = ParcelService.getParcelDocuments(parcel.parcelId);
  const [uploaded, setUploaded] = React.useState<string[]>([]);
  const handleUpload = (files: FileList | null) => { if (files) setUploaded(prev => [...prev, ...Array.from(files).map(f => f.name)]); };

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center justify-between text-slate-500 mb-1">
        <span>Original / Verified Digital Land Documents:</span>
        <span className="font-bold text-slate-700">{documents.length} Records</span>
      </div>

      <div className="space-y-2.5">
        {documents.map((doc) => (
          <div
            key={doc.documentId}
            className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs leading-snug">
                    {doc.documentType}
                  </h4>
                  <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                    {doc.fileNumber}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px]">
                    <span className="text-slate-400">Date: {doc.documentDate}</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      {doc.documentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveDocumentModal(doc)}
                className="shrink-0 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-semibold rounded-lg transition-all border border-blue-200 flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                View Original / Demo
              </button>
            </div>
          </div>
        ))}
      </div>

      {uploaded.length > 0 && <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px]"><b className="text-emerald-900">Uploaded source documents</b><div className="mt-1 text-emerald-800">{uploaded.join(', ')}</div></div>}

      <div className="flex items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <div><b className="text-xs text-slate-800">Add original document copy</b><p className="text-[10px] text-slate-500 mt-0.5">Upload the source PDF/image for this parcel record.</p></div>
        <label className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-[10px] font-bold text-slate-700 cursor-pointer flex items-center gap-1.5"><Upload className="w-3.5 h-3.5"/> Upload<input hidden type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleUpload(e.target.files)} /></label>
      </div>

      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-800">
        <div className="flex items-center gap-1.5 font-bold mb-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Statutory Demo Records</span>
        </div>
        <span>
          These documents are simulated electronic land records generated for the India Land Stack demonstration.
        </span>
      </div>
    </div>
  );
};
