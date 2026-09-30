'use client';

import React, { useState } from 'react';
import { X, Split, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Parcel, SubdivisionChildProposal } from '../../types/land';
import { useLandStack } from '../../context/LandStackContext';
import { ParcelService } from '../../lib/parcelService';

interface SubdivisionRequestModalProps {
  parcel: Parcel;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (requestId: string) => void;
}

export const SubdivisionRequestModal: React.FC<SubdivisionRequestModalProps> = ({
  parcel,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { submitSubdivisionRequest, setCurrentView } = useLandStack();
  const owner = ParcelService.getParcelOwner(parcel.ownerId);

  const [numChildren, setNumChildren] = useState<number>(3);
  const [reason, setReason] = useState<string>('Family Division & Inheritance Settlement (Demo)');
  const [applicantName, setApplicantName] = useState<string>(owner.name);
  const [applicantContact, setApplicantContact] = useState<string>(owner.contact);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);

  // Default proposed splits for P005: 3000, 3000, 4000
  const [proposals, setProposals] = useState<SubdivisionChildProposal[]>([
    { label: 'Child Plot 1', proposedArea: 3000, purpose: 'Residential / Family Allotment A', proposedOwnerName: 'Rohit Sharma (Demo - Son)' },
    { label: 'Child Plot 2', proposedArea: 3000, purpose: 'Residential / Family Allotment B', proposedOwnerName: 'Priya Sharma (Demo - Daughter)' },
    { label: 'Child Plot 3', proposedArea: 4000, purpose: 'Residential / Retained Portion C', proposedOwnerName: 'Sunita Sharma (Demo - Spouse)' },
  ]);

  if (!isOpen) return null;

  const handleNumChange = (newCount: number) => {
    setNumChildren(newCount);
    const totalArea = parcel.area;
    const baseArea = Math.floor(totalArea / newCount);
    const newProps: SubdivisionChildProposal[] = [];

    for (let i = 0; i < newCount; i++) {
      const isLast = i === newCount - 1;
      const area = isLast ? totalArea - baseArea * (newCount - 1) : baseArea;
      newProps.push({
        label: `Child Plot ${i + 1}`,
        proposedArea: area,
        purpose: 'Residential Development',
        proposedOwnerName: `Beneficiary ${i + 1} (Demo)`
      });
    }
    setProposals(newProps);
  };

  const handleAreaChange = (index: number, area: number) => {
    const next = [...proposals];
    next[index] = { ...next[index], proposedArea: area };
    setProposals(next);
  };

  const currentTotalProposed = proposals.reduce((acc, curr) => acc + (Number(curr.proposedArea) || 0), 0);
  const isAreaBalanced = currentTotalProposed === parcel.area;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = submitSubdivisionRequest(
      parcel.parcelId,
      applicantName,
      applicantContact,
      numChildren,
      reason,
      proposals
    );
    setSubmittedRequestId(req.requestId);
    if (onSuccess) {
      onSuccess(req.requestId);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Split className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Apply for Cadastral Subdivision</h3>
              <p className="text-xs text-slate-400">Statutory Land Parcel Partition Form &bull; Demo Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedRequestId ? (
          /* Success Confirmation Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900">Subdivision Request Registered!</h4>
              <p className="text-xs text-slate-600 mt-1">
                Your petition has been forwarded to the Revenue Authority for demarcation and administrative approval.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Request Token:</span>
                <span className="font-mono font-bold text-blue-700">{submittedRequestId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Parent Parcel:</span>
                <span className="font-bold text-slate-800">{parcel.parcelId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Parent ULPIN:</span>
                <span className="font-mono text-slate-700">{parcel.ulpin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Pending Review (SDM)
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  setCurrentView('admin');
                }}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Switch to Admin View to Approve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-colors"
              >
                Return to Map
              </button>
            </div>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
            {/* Parent Parcel Details Box */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5">
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-blue-900 mb-2">
                Parent Parcel Metadata
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Parcel ID:</span>
                  <span className="font-bold text-slate-900 text-xs">{parcel.parcelId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Parent ULPIN:</span>
                  <span className="font-mono font-bold text-blue-700 text-xs">{parcel.ulpin}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Current Total Area:</span>
                  <span className="font-bold text-slate-900 text-xs">{parcel.area.toLocaleString()} sq.ft.</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Survey Number:</span>
                  <span className="font-medium text-slate-800 text-xs">{parcel.surveyNumber}</span>
                </div>
              </div>
            </div>

            {/* Applicant Information */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                  Applicant Name
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                  Applicant Contact
                </label>
                <input
                  type="text"
                  value={applicantContact}
                  onChange={(e) => setApplicantContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Subdivision Reason */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                Reason for Subdivision
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Family Division & Inheritance Settlement (Demo)">Family Division & Inheritance Settlement</option>
                <option value="Sale / Partial Alienation (Demo)">Sale / Partial Commercial Alienation</option>
                <option value="Development & Construction Demarcation (Demo)">Development & Residential Construction</option>
                <option value="Mutual Partition by Co-Sharers (Demo)">Mutual Partition by Co-Sharers</option>
              </select>
            </div>

            {/* Child Parcels Configuration */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-slate-700 text-[11px]">
                  Number of Child Parcels
                </label>
                <div className="flex items-center gap-1.5">
                  {[2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => handleNumChange(count)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        numChildren === count
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Proposed Child Parcels Breakdown */}
              <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Proposed Child Plot Allocation</span>
                  <span className={isAreaBalanced ? 'text-emerald-700 font-semibold' : 'text-rose-600 font-bold'}>
                    Sum: {currentTotalProposed.toLocaleString()} / {parcel.area.toLocaleString()} sq.ft.
                  </span>
                </div>

                {proposals.map((prop, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4 font-bold text-slate-800 text-[11px]">
                      {prop.label}
                    </div>
                    <div className="col-span-4">
                      <div className="relative">
                        <input
                          type="number"
                          value={prop.proposedArea}
                          onChange={(e) => handleAreaChange(idx, Number(e.target.value))}
                          className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-semibold text-slate-800"
                          step={100}
                          min={500}
                        />
                        <span className="absolute right-2 top-1 text-[10px] text-slate-400">sq.ft.</span>
                      </div>
                    </div>
                    <div className="col-span-4 text-[10px] text-slate-500 truncate" title={prop.proposedOwnerName}>
                      {prop.proposedOwnerName}
                    </div>
                  </div>
                ))}

                {!isAreaBalanced && (
                  <div className="flex items-center gap-1.5 text-[11px] text-rose-600 font-semibold mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Total proposed area must exactly equal parent area ({parcel.area.toLocaleString()} sq.ft.)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isAreaBalanced}
                className={`px-5 py-2 rounded-xl text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 ${
                  isAreaBalanced
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-slate-400 cursor-not-allowed opacity-70'
                }`}
              >
                <Split className="w-3.5 h-3.5" />
                <span>Submit Subdivision Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
