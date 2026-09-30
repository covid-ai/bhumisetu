'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Parcel, ServiceRequest, ParcelDocument, SubdivisionChildProposal } from '../types/land';
import { INITIAL_PARCELS, P005_CHILD_PARCELS } from '../data/parcels';
import { INITIAL_SERVICE_REQUESTS } from '../data/serviceRequests';
import { SubdivisionService } from '../lib/subdivision';
import { DEMO_ACCOUNTS } from '../data/demoAccounts';

export type UserRole = 'citizen' | 'admin';

export interface CurrentUser {
  name: string;
  username: string;
  role: UserRole;
}

export type AppView = 
  | 'dashboard' 
  | 'map' 
  | 'my-parcels' 
  | 'service-requests' 
  | 'subdivision' 
  | 'land-records' 
  | 'analytics' 
  | 'admin' 
  | 'settings';

export type MapLayerType = 'cadastral' | 'satellite' | 'landuse' | 'infrastructure';

interface LandStackContextType {
  parcels: Parcel[];
  selectedParcelId: string | null;
  selectedParcel: Parcel | null;
  currentView: AppView;
  activeLayer: MapLayerType;
  showInfrastructure: boolean;
  serviceRequests: ServiceRequest[];
  mapCenter: [number, number];
  mapZoom: number;
  activeDocumentModal: ParcelDocument | null;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  currentUser: CurrentUser | null;
  login: (user: CurrentUser) => void;
  logout: () => void;
  
  // Actions
  selectParcel: (parcelId: string | null) => void;
  setCurrentView: (view: AppView) => void;
  setActiveLayer: (layer: MapLayerType) => void;
  setShowInfrastructure: (show: boolean) => void;
  focusParcelOnMap: (parcelId: string) => void;
  resetMapToChandigarh: () => void;
  submitServiceRequest: (input: {
    parcelId: string;
    requestType: import('../types/land').ServiceRequestType;
    reason: string;
    applicantName: string;
    applicantContact: string;
    attachmentNames?: string[];
    photoNames?: string[];
  }) => ServiceRequest;
  submitSubdivisionRequest: (
    parentParcelId: string,
    applicantName: string,
    applicantContact: string,
    numberOfChildParcels: number,
    reason: string,
    childProposals: SubdivisionChildProposal[]
  ) => ServiceRequest;
  approveSubdivisionRequest: (requestId: string, officerName?: string) => void;
  rejectSubdivisionRequest: (requestId: string, rejectionReason: string) => void;
  setActiveDocumentModal: (doc: ParcelDocument | null) => void;
  clearNotification: () => void;
  resetToInitialData: () => void;
}

const LandStackContext = createContext<LandStackContextType | undefined>(undefined);

const STORAGE_KEY_PARCELS = 'landstack_parcels_v1';
const STORAGE_KEY_REQUESTS = 'landstack_requests_v1';

export const LandStackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [parcels, setParcels] = useState<Parcel[]>(INITIAL_PARCELS);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('satellite');
  const [showInfrastructure, setShowInfrastructure] = useState<boolean>(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.7165, 76.7860]);
  const [mapZoom, setMapZoom] = useState<number>(12.8);
  const [activeDocumentModal, setActiveDocumentModal] = useState<ParcelDocument | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('landstack_demo_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as CurrentUser;
        const valid = DEMO_ACCOUNTS.some((account) => account.username === parsed.username && account.role === parsed.role);
        if (valid) setCurrentUser(parsed);
        else localStorage.removeItem('landstack_demo_user');
      }
    } catch {}
  }, []);

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
    try { localStorage.setItem('landstack_demo_user', JSON.stringify(user)); } catch {}
    setNotification({ type: 'success', message: `Signed in as ${user.name} — ${user.role === 'admin' ? 'Admin / SDM' : 'Citizen / Client'} demo.` });
  };

  const logout = () => {
    setCurrentUser(null);
    try { localStorage.removeItem('landstack_demo_user'); } catch {}
    setNotification({ type: 'info', message: 'Demo session signed out.' });
  };

  // Load persisted demo modifications if available
  useEffect(() => {
    try {
      const savedParcels = localStorage.getItem(STORAGE_KEY_PARCELS);
      if (savedParcels) {
        const parsed = JSON.parse(savedParcels) as Parcel[];
        const canonical = new Map(
          [...INITIAL_PARCELS, ...P005_CHILD_PARCELS].map((parcel) => [parcel.parcelId, parcel])
        );

        // Preserve the user's demo workflow/state, but always use the calibrated
        // geographic footprint for known demo parcels. This prevents old localStorage
        // rectangles from reappearing after the map geometry is upgraded.
        const migratedExisting = parsed.map((parcel) => {
          const reference = canonical.get(parcel.parcelId);
          return reference
            ? { ...parcel, geometry: reference.geometry, centroid: reference.centroid }
            : parcel;
        });
        const existingIds = new Set(migratedExisting.map((parcel) => parcel.parcelId));
        const migrated = [
          ...migratedExisting,
          ...[...INITIAL_PARCELS, ...P005_CHILD_PARCELS].filter((parcel) => !existingIds.has(parcel.parcelId))
        ];

        setParcels(migrated);
        localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(migrated));
      }
      const savedReqs = localStorage.getItem(STORAGE_KEY_REQUESTS);
      if (savedReqs) {
        setServiceRequests(JSON.parse(savedReqs));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const saveParcels = (newParcels: Parcel[]) => {
    setParcels(newParcels);
    try {
      localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(newParcels));
    } catch {}
  };

  const saveRequests = (newReqs: ServiceRequest[]) => {
    setServiceRequests(newReqs);
    try {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(newReqs));
    } catch {}
  };

  const selectedParcel = parcels.find((p) => p.parcelId === selectedParcelId) || null;

  const selectParcel = (parcelId: string | null) => {
    setSelectedParcelId(parcelId);
    if (parcelId) {
      const p = parcels.find((item) => item.parcelId === parcelId);
      if (p) {
        setMapCenter(p.centroid);
      }
    }
  };

  const resetMapToChandigarh = () => {
    setSelectedParcelId(null);
    setMapCenter([30.7165, 76.7860]);
    setMapZoom(12.8);
    setCurrentView('map');
  };

  const focusParcelOnMap = (parcelId: string) => {
    const p = parcels.find((item) => item.parcelId === parcelId);
    if (p) {
      setSelectedParcelId(parcelId);
      setMapCenter(p.centroid);
      setMapZoom(16);
      setCurrentView('map');
    }
  };

  const submitServiceRequest = (input: {
    parcelId: string;
    requestType: import('../types/land').ServiceRequestType;
    reason: string;
    applicantName: string;
    applicantContact: string;
    attachmentNames?: string[];
    photoNames?: string[];
  }): ServiceRequest => {
    const parcel = parcels.find((p) => p.parcelId === input.parcelId);
    if (!parcel) throw new Error(`Parcel ${input.parcelId} not found`);
    const requestId = `REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const request: ServiceRequest = {
      requestId, parcelId: parcel.parcelId, ulpin: parcel.ulpin, requestType: input.requestType,
      applicant: input.applicantName, applicantContact: input.applicantContact,
      date: new Date().toISOString().slice(0,10), status: 'Pending',
      details: { reason: input.reason, attachmentNames: input.attachmentNames || [], photoNames: input.photoNames || [] },
      submittedByRole: currentUser?.role || 'citizen', submittedByUsername: currentUser?.username, submittedByName: currentUser?.name
    };
    saveRequests([request, ...serviceRequests]);
    setNotification({ type: 'success', message: `${input.requestType} request ${requestId} submitted. It is now visible in the Admin / SDM queue.` });
    return request;
  };

  const submitSubdivisionRequest = (
    parentParcelId: string,
    applicantName: string,
    applicantContact: string,
    numberOfChildParcels: number,
    reason: string,
    childProposals: SubdivisionChildProposal[]
  ): ServiceRequest => {
    const parent = parcels.find((p) => p.parcelId === parentParcelId);
    if (!parent) {
      throw new Error(`Parent parcel ${parentParcelId} not found`);
    }

    const newReq = SubdivisionService.createSubdivisionRequest(
      parent,
      applicantName,
      applicantContact,
      numberOfChildParcels,
      reason,
      childProposals
    );

    const taggedRequest: ServiceRequest = {
      ...newReq,
      submittedByRole: currentUser?.role || 'citizen',
      submittedByUsername: currentUser?.username,
      submittedByName: currentUser?.name,
    };
    const updatedRequests = [taggedRequest, ...serviceRequests];
    saveRequests(updatedRequests);

    // Update parent parcel status to 'Pending Subdivision'
    const updatedParcels = parcels.map((p) => 
      p.parcelId === parentParcelId ? { ...p, status: 'Pending Subdivision' as const } : p
    );
    saveParcels(updatedParcels);

    setNotification({
      type: 'success',
      message: `Subdivision request ${newReq.requestId} submitted successfully! Awaiting Administrative SDM review.`
    });

    return newReq;
  };

  const approveSubdivisionRequest = (requestId: string, officerName?: string) => {
    try {
      const result = SubdivisionService.processApproval(
        requestId,
        parcels,
        serviceRequests,
        officerName || 'Sub-Divisional Magistrate (SDM) / Revenue Officer'
      );

      saveParcels(result.updatedParcels);
      saveRequests(result.updatedRequests);

      // Select the first child parcel so user immediately sees it
      if (result.newChildParcels.length > 0) {
        setSelectedParcelId(result.newChildParcels[0].parcelId);
        setMapCenter(result.newChildParcels[0].centroid);
        setMapZoom(16);
      }

      setNotification({
        type: 'success',
        message: `Subdivision approved! Parent parcel ${result.parentParcelId} subdivided into ${result.newChildParcels.length} new child parcels (${result.newChildParcels.map(c => c.parcelId).join(', ')}). Boundaries updated on GIS Map.`
      });
    } catch (err: any) {
      setNotification({
        type: 'warning',
        message: `Approval failed: ${err.message}`
      });
    }
  };

  const rejectSubdivisionRequest = (requestId: string, rejectionReason: string) => {
    const updatedRequests = SubdivisionService.processRejection(
      requestId,
      rejectionReason,
      serviceRequests
    );
    saveRequests(updatedRequests);

    // Revert parent parcel from 'Pending Subdivision' to 'Active'
    const targetReq = serviceRequests.find((r) => r.requestId === requestId);
    if (targetReq) {
      const updatedParcels = parcels.map((p) => 
        p.parcelId === targetReq.parcelId ? { ...p, status: 'Active' as const } : p
      );
      saveParcels(updatedParcels);
    }

    setNotification({
      type: 'info',
      message: `Subdivision request ${requestId} was rejected.`
    });
  };

  const clearNotification = () => setNotification(null);

  const resetToInitialData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_PARCELS);
      localStorage.removeItem(STORAGE_KEY_REQUESTS);
    } catch {}
    setParcels(INITIAL_PARCELS);
    setServiceRequests(INITIAL_SERVICE_REQUESTS);
    setSelectedParcelId(null);
    setMapCenter([30.7165, 76.7860]);
    setMapZoom(12.8);
    setNotification({
      type: 'info',
      message: 'Platform state reset to initial demo dataset.'
    });
  };

  return (
    <LandStackContext.Provider
      value={{
        parcels,
        selectedParcelId,
        selectedParcel,
        currentView,
        activeLayer,
        showInfrastructure,
        serviceRequests,
        mapCenter,
        mapZoom,
        activeDocumentModal,
        notification,
        currentUser,
        login,
        logout,
        selectParcel,
        setCurrentView,
        setActiveLayer,
        setShowInfrastructure,
        focusParcelOnMap,
        resetMapToChandigarh,
        submitServiceRequest,
        submitSubdivisionRequest,
        approveSubdivisionRequest,
        rejectSubdivisionRequest,
        setActiveDocumentModal,
        clearNotification,
        resetToInitialData
      }}
    >
      {children}
    </LandStackContext.Provider>
  );
};

export const useLandStack = () => {
  const context = useContext(LandStackContext);
  if (!context) {
    throw new Error('useLandStack must be used within a LandStackProvider');
  }
  return context;
};
