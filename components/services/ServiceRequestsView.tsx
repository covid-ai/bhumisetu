'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowRight,
  Split,
  Building,
  Shield,
  CreditCard
} from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';
import { ServiceRequestType, RequestStatus } from '../../types/land';
import { ServiceRequestModal } from './ServiceRequestModal';

export const ServiceRequestsView: React.FC = () => {
  const { serviceRequests, focusParcelOnMap, setCurrentView, currentUser } = useLandStack();
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const visibleRequests = currentUser?.role === 'admin' ? serviceRequests : serviceRequests.filter(r => r.submittedByUsername === currentUser?.username);
  const filteredRequests = visibleRequests.filter((req) => {
    if (statusFilter !== 'ALL' && req.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && req.requestType !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = req.requestId.toLowerCase().includes(q);
      const matchUlpin = req.ulpin.toLowerCase().includes(q);
      const matchApplicant = req.applicant.toLowerCase().includes(q);
      const matchParcel = req.parcelId.toLowerCase().includes(q);
      if (!matchId && !matchUlpin && !matchApplicant && !matchParcel) return false;
    }
    return true;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Citizen & Departmental Service Requests
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track, review, and initiate digital land mutations, partition petitions, and title attestations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentUser?.role === 'admin') setCurrentView('admin'); else setRequestModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{currentUser?.role === 'admin' ? 'Review Citizen Queue' : 'New Service Request'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Request ID, ULPIN, Applicant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px]">Filters:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Request Types</option>
            <option value="Subdivision">Subdivision</option>
            <option value="Ownership Verification">Ownership Verification</option>
            <option value="Land Record Correction">Land Record Correction</option>
            <option value="Building Permission">Building Permission</option>
            <option value="Encumbrance Verification">Encumbrance Verification</option>
            <option value="Property Tax Information">Property Tax Information</option><option value="NOC / Land Permission">NOC / Land Permission</option><option value="Grievance / Dispute">Grievance / Dispute</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Parcel / ULPIN</th>
                <th className="py-3 px-4">Service Type</th>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No matching service requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.requestId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {req.requestId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800">{req.parcelId}</div>
                      <div className="font-mono text-[10px] text-slate-400">{req.ulpin}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {req.requestType}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{req.applicant}</div>
                      <div className="text-[10px] text-slate-400">{req.applicantContact}</div><div className="text-[9px] text-emerald-700">{req.details.attachmentNames?.length || 0} docs · {req.details.photoNames?.length || 0} photos</div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {req.date}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {req.requestType === 'Subdivision' && (
                          <button
                            onClick={() => setCurrentView('admin')}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold rounded-lg border border-amber-200 transition-colors"
                          >
                            Admin Desk
                          </button>
                        )}
                        <button
                          onClick={() => focusParcelOnMap(req.parcelId)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-medium rounded-lg border border-blue-200 transition-all flex items-center gap-1"
                        >
                          <span>Locate</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ServiceRequestModal open={requestModalOpen} onClose={() => setRequestModalOpen(false)} />
    </div>
  );
};
