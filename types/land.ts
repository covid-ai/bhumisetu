export type LandUseType = 
  | 'Residential' 
  | 'Commercial' 
  | 'Agricultural' 
  | 'Industrial' 
  | 'Public';

export type ParcelStatus = 
  | 'Active' 
  | 'Subdivided' 
  | 'Pending Subdivision' 
  | 'Disputed';

export interface GeoJsonPolygon {
  type: 'Polygon';
  coordinates: number[][][]; // [[[lng, lat], [lng, lat], ...]]
}

export interface Parcel {
  parcelId: string;
  ulpin: string;
  surveyNumber: string;
  ownerId: string;
  area: number; // in sq.ft.
  landUse: LandUseType;
  zone: string;
  status: ParcelStatus;
  location: string;
  geometry: GeoJsonPolygon;
  centroid: [number, number]; // [lat, lng] for quick centering
  createdDate: string;
  parentParcelId?: string;
  childParcelIds?: string[];
  subdividedDate?: string;
}

export interface Owner {
  ownerId: string;
  name: string;
  ownershipStatus: string;
  contact: string;
  aadhaarRef: string;
  address: string;
}

export interface LegalAdministrativeInfo {
  parcelId: string;
  roRStatus: string;
  registrationStatus: string;
  buildingPermission: string;
  mortgageStatus: string;
  propertyTaxStatus: string;
  restrictions: string;
  lastTaxPaymentDate?: string;
  registrationOffice?: string;
}

export interface ParcelDocument {
  documentId: string;
  parcelId: string;
  documentType: string;
  documentStatus: string;
  documentDate: string;
  fileNumber: string;
  issuingAuthority: string;
  summary: string;
}

export interface ParcelHistoryEvent {
  historyId: string;
  parcelId: string;
  event: string;
  date: string;
  description: string;
  officerRef?: string;
  previousOwnerName?: string;
}

export type ServiceRequestType = 
  | 'Subdivision' 
  | 'Ownership Verification' 
  | 'Land Record Correction' 
  | 'Property Tax Information' 
  | 'Building Permission' 
  | 'Encumbrance Verification'
  | 'NOC / Land Permission'
  | 'Grievance / Dispute';

export type RequestStatus = 
  | 'Pending' 
  | 'Under Review' 
  | 'Approved' 
  | 'Rejected' 
  | 'Completed';

export interface SubdivisionChildProposal {
  label: string; // e.g., 'Child A'
  proposedArea: number; // in sq.ft.
  purpose: string;
  proposedOwnerName?: string;
}

export interface ServiceRequest {
  requestId: string;
  parcelId: string;
  ulpin: string;
  requestType: ServiceRequestType;
  applicant: string;
  applicantContact: string;
  date: string;
  status: RequestStatus;
  details: {
    reason?: string;
    parentArea?: number;
    numberOfChildParcels?: number;
    childProposals?: SubdivisionChildProposal[];
    rejectionReason?: string;
    actionDate?: string;
    officerName?: string;
    notes?: string;
    attachmentNames?: string[];
    photoNames?: string[];
  };
  submittedByRole?: 'citizen' | 'admin';
  submittedByUsername?: string;
  submittedByName?: string;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  type: 'Road' | 'School' | 'Hospital' | 'Electricity' | 'Water';
  location: [number, number]; // [lat, lng]
  description: string;
  distanceFromP005?: string;
}

export interface AIIntelligenceInsights {
  landUseCompliance: {
    status: 'Compliant' | 'Warning' | 'Attention';
    details: string;
  };
  documentCompleteness: {
    ratio: string;
    score: number;
    details: string;
  };
  developmentInsight: {
    status: 'Favorable' | 'Conditional' | 'Restricted';
    details: string;
  };
  infrastructureProximity: {
    roadDistance: string;
    utilitiesDistance: string;
    details: string;
  };
}
