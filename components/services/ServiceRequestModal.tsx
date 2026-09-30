'use client';

import React, { useMemo, useState } from 'react';
import { X, Upload, FileText, Camera, Send, ShieldCheck } from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';
import { ServiceRequestType } from '../../types/land';

interface Props { open: boolean; onClose: () => void; parcelId?: string; initialType?: ServiceRequestType; }

const TYPES: ServiceRequestType[] = ['Building Permission','Land Record Correction','Ownership Verification','NOC / Land Permission','Property Tax Information','Encumbrance Verification','Grievance / Dispute'];

export const ServiceRequestModal: React.FC<Props> = ({ open, onClose, parcelId, initialType = 'Building Permission' }) => {
  const { parcels, currentUser, submitServiceRequest } = useLandStack();
  const [type, setType] = useState<ServiceRequestType>(initialType);
  const [selectedParcel, setSelectedParcel] = useState(parcelId || parcels[0]?.parcelId || '');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('+91 98XXXXXX00');
  const [docs, setDocs] = useState<File[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const needsPhoto = type === 'Grievance / Dispute';
  const docHint = useMemo(() => {
    if (type === 'Building Permission') return 'Ownership proof, sanctioned/site plan, architect/structural documents';
    if (type === 'Land Record Correction') return 'RoR/Jamabandi, identity proof, supporting correction document';
    if (type === 'Ownership Verification') return 'Sale deed/title document, identity proof, mutation/ownership proof';
    if (type === 'NOC / Land Permission') return 'Ownership proof, site plan, purpose-specific supporting documents';
    if (type === 'Property Tax Information') return 'Latest tax receipt, property assessment document';
    if (type === 'Encumbrance Verification') return 'Title deed and supporting registration records';
    return 'Any supporting record, notice, or evidence';
  }, [type]);

  if (!open) return null;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParcel || !reason.trim() || (needsPhoto && photos.length === 0)) return;
    setBusy(true);
    submitServiceRequest({ parcelId: selectedParcel, requestType: type, reason, applicantName: currentUser?.name || 'Citizen Demo', applicantContact: contact, attachmentNames: docs.map(f => f.name), photoNames: photos.map(f => f.name) });
    setBusy(false); setReason(''); setDocs([]); setPhotos([]); onClose();
  };

  return <div className="bs-modal-backdrop" onMouseDown={onClose}>
    <div className="bs-request-modal" onMouseDown={e => e.stopPropagation()}>
      <div className="bs-request-head"><div><span>Citizen Service Request</span><b>{type}</b></div><button onClick={onClose}><X size={18}/></button></div>
      <form onSubmit={submit} className="bs-request-form">
        <div className="bs-request-role"><ShieldCheck size={15}/><span>Signed in as <b>{currentUser?.name}</b> · {currentUser?.role === 'admin' ? 'Admin / SDM' : 'Citizen / Client'}</span><small>{currentUser?.role === 'admin' ? 'Admin queue' : 'Admin receives this submission'}</small></div>
        <label>Request Type<select value={type} onChange={e => setType(e.target.value as ServiceRequestType)}>{TYPES.map(t => <option key={t}>{t}</option>)}</select></label>
        <label>Parcel / ULPIN<select value={selectedParcel} onChange={e => setSelectedParcel(e.target.value)}>{parcels.slice(0,80).map(p => <option key={p.parcelId} value={p.parcelId}>{p.parcelId} · {p.ulpin}</option>)}</select></label>
        <label>Reason / Description<textarea required rows={3} value={reason} onChange={e => setReason(e.target.value)} placeholder="Describe the request clearly..." /></label>
        <label>Registered Contact<input value={contact} onChange={e => setContact(e.target.value)} /></label>
        <div className="bs-upload-grid">
          <label className="bs-upload-box"><FileText size={18}/><b>Upload Documents</b><small>{docHint}</small><input multiple type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e => setDocs(Array.from(e.target.files || []))}/><span><Upload size={13}/> Choose files</span>{docs.length > 0 && <em>{docs.length} file(s) selected</em>}</label>
          <label className={`bs-upload-box ${needsPhoto ? 'required' : ''}`}><Camera size={18}/><b>Upload Photos {needsPhoto ? '(required)' : '(optional)'}</b><small>Site condition / issue evidence</small><input multiple type="file" accept="image/*" onChange={e => setPhotos(Array.from(e.target.files || []))}/><span><Upload size={13}/> Add photos</span>{photos.length > 0 && <em>{photos.length} photo(s) selected</em>}</label>
        </div>
        <div className="bs-request-foot"><button type="button" onClick={onClose}>Cancel</button><button className="primary" disabled={busy}><Send size={14}/> {busy ? 'Submitting...' : 'Submit Request'}</button></div>
      </form>
    </div>
  </div>;
};
