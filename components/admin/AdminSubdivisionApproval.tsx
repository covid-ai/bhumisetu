'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Split, 
  User, 
  Clock, 
  AlertCircle,
  FileCheck2,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';
import { ServiceRequest } from '../../types/land';

export const AdminSubdivisionApproval: React.FC = () => {
  const { 
    serviceRequests, 
    approveSubdivisionRequest, 
    rejectSubdivisionRequest,
    focusParcelOnMap,
    setCurrentView
  } = useLandStack();

  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);
  const [rejectModalReq, setRejectModalReq] = useState<ServiceRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('Spatial setback non-compliance with Chandigarh Master Plan.');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Subdivision requests
  const subdivisionRequests = serviceRequests.filter((r) => r.requestType === 'Subdivision');
  const pendingRequests = subdivisionRequests.filter((r) => r.status === 'Pending' || r.status === 'Under Review');
  const processedRequests = subdivisionRequests.filter((r) => r.status === 'Approved' || r.status === 'Rejected');

  const handleApprove = (requestId: string) => {
    setIsProcessing(requestId);
    setTimeout(() => {
      approveSubdivisionRequest(requestId, 'SDM Chandigarh / Revenue Sub-Division');
      setIsProcessing(null);
      setSelectedReq(null);
    }, 400);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectModalReq) {
      rejectSubdivisionRequest(rejectModalReq.requestId, rejectionReason);
      setRejectModalReq(null);
      setSelectedReq(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-govnavy-900 to-slate-900 p-6 rounded-2xl text-white shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Revenue Administration &bull; Sub-Divisional Magistrate Portal</span>
          </div>
          <h1 className="text-2xl font-bold mt-1 tracking-tight">Cadastral Subdivision Approvals</h1>
          <p className="text-xs text-slate-300 mt-1">
            Review and execute statutory boundary partition petitions under the Digital Land Stack framework.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Pending Review</span>
            <span className="text-xl font-bold text-amber-400">{pendingRequests.length}</span>
          </div>
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Sanctioned</span>
            <span className="text-xl font-bold text-emerald-400">
              {subdivisionRequests.filter((r) => r.status === 'Approved').length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pending Subdivision Petitions */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Split className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-800">
                  Pending Subdivision Petitions ({pendingRequests.length})
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">SDM Revenue Docket</span>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">All Subdivision Petitions Cleared</p>
                <p className="text-xs text-slate-400 mt-1">
                  No pending requests waiting in queue. You can submit another subdivision request from any parcel on the GIS map.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {pendingRequests.map((req) => (
                  <div key={req.requestId} className="p-4 hover:bg-slate-50/80 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-blue-700">
                            {req.requestId}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            {req.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span>Parent: <strong className="text-slate-800">{req.parcelId}</strong></span>
                          <span>ULPIN: <strong className="font-mono text-slate-800">{req.ulpin}</strong></span>
                          <span>Applicant: <strong className="text-slate-800">{req.applicant}</strong></span>
                          <span>Area: <strong className="text-slate-800">{req.details.parentArea?.toLocaleString()} sq.ft.</strong></span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 italic">
                          "{req.details.reason}" &bull; Requested: {req.details.numberOfChildParcels} Child Plots
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => setSelectedReq(req)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => setRejectModalReq(req)}
                          className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => handleApprove(req.requestId)}
                          disabled={isProcessing === req.requestId}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isProcessing === req.requestId ? 'Generating...' : 'Approve & Subdivide'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Child parcels preview bar */}
                    {req.details.childProposals && (
                      <div className="mt-3 pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {req.details.childProposals.map((child, cIdx) => (
                          <div key={cIdx} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[11px]">
                            <span className="font-bold text-slate-700 block">{child.label}</span>
                            <span className="text-blue-700 font-semibold">{child.proposedArea.toLocaleString()} sq.ft.</span>
                            <span className="text-slate-500 block truncate text-[10px]">{child.proposedOwnerName}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past / Processed Requests Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Processed Subdivision Orders History</span>
            </h3>

            {processedRequests.length === 0 ? (
              <p className="text-xs text-slate-400">No past processed subdivision orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Docket ID</th>
                      <th className="py-2.5 px-3">Parent Parcel</th>
                      <th className="py-2.5 px-3">Applicant</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Action Date</th>
                      <th className="py-2.5 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {processedRequests.map((req) => (
                      <tr key={req.requestId} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{req.requestId}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{req.parcelId}</td>
                        <td className="py-2.5 px-3 text-slate-600">{req.applicant}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">{req.details.actionDate || req.date}</td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => focusParcelOnMap(req.parcelId)}
                            className="text-blue-600 hover:underline font-medium text-[11px] flex items-center gap-1"
                          >
                            Inspect on Map <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mt-6">
        <div className="flex items-center justify-between mb-3"><div><h3 className="font-bold text-sm text-slate-800">Citizen Service Intake Queue</h3><p className="text-[10px] text-slate-500 mt-1">Requests submitted by citizen accounts are visible here for administrative review.</p></div><span className="text-xs font-mono text-slate-500">{serviceRequests.filter(r => r.submittedByRole === 'citizen').length} submissions</span></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {serviceRequests.filter(r => r.submittedByRole === 'citizen').slice(0,8).map(req => <div key={req.requestId} className="border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3"><div><b className="text-xs text-slate-800">{req.requestType}</b><div className="text-[10px] text-slate-500 mt-1">{req.requestId} · {req.applicant} · {req.parcelId}</div><div className="text-[9px] text-emerald-700 mt-1">{req.details.attachmentNames?.length || 0} docs · {req.details.photoNames?.length || 0} photos</div></div><span className="text-[9px] px-2 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">{req.status}</span></div>)}
          {serviceRequests.filter(r => r.submittedByRole === 'citizen').length === 0 && <div className="text-xs text-slate-400 py-4">No citizen submissions yet.\</div>}
        </div>
      </div>

      {/* Right Column: Workflow Guidance & Selected Request Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Demo Workflow Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 shadow-sm text-xs">
            <div className="flex items-center gap-2 mb-2 font-bold text-blue-900">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Hackathon Demonstration Flow</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 text-[11px] leading-relaxed">
              <li>Open <strong>GIS Map</strong> and select parcel <strong>P005</strong>.</li>
              <li>Click <strong>Apply for Subdivision</strong> to register a petition.</li>
              <li>Switch here to <strong>Admin Portal</strong> to see <strong>SUB-2026-0001</strong>.</li>
              <li>Click <strong>Approve & Subdivide</strong> above.</li>
              <li>Return to <strong>GIS Map</strong>: child parcels <strong>P005-A, P005-B, P005-C</strong> are created with new ULPINs!</li>
            </ol>
            <div className="mt-3 pt-2 border-t border-blue-200">
              <button
                onClick={() => setCurrentView('map')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <span>Jump to GIS Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Selected Request Detail Drawer (if open) */}
          {selectedReq && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800">Petition Details: {selectedReq.requestId}</span>
                <button
                  onClick={() => setSelectedReq(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-2 text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Parent Parcel</span>
                  <span className="font-bold text-slate-900">{selectedReq.parcelId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Parent ULPIN</span>
                  <span className="font-mono text-blue-700">{selectedReq.ulpin}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Applicant Details</span>
                  <span className="font-medium text-slate-800">{selectedReq.applicant} ({selectedReq.applicantContact})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Reason for Partition</span>
                  <span className="text-slate-800">{selectedReq.details.reason}</span>
                </div>
              </div>

              {selectedReq.status === 'Pending' && (
                <div className="pt-2 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => handleApprove(selectedReq.requestId)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow transition-colors"
                  >
                    Sanction Approval
                  </button>
                  <button
                    onClick={() => setRejectModalReq(selectedReq)}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs transition-colors border border-rose-200"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reject Reason Modal Dialog */}
      {rejectModalReq && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Reject Subdivision Petition</span>
            </div>
            <p className="text-xs text-slate-600">
              Provide a statutory reason for rejecting subdivision docket <strong>{rejectModalReq.requestId}</strong>.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason for Rejection
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRejectModalReq(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
