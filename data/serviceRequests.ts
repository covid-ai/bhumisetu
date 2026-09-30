import { ServiceRequest } from '../types/land';

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    requestId: 'SUB-2026-0001',
    parcelId: 'P005',
    ulpin: 'IN-CH-DEMO-000005',
    requestType: 'Subdivision',
    applicant: 'Amit Sharma (Demo)',
    applicantContact: '+91 98150-54321',
    date: '2026-03-24',
    status: 'Pending',
    details: {
      reason: 'Family Division & Inheritance Settlement (Demo)',
      parentArea: 10000,
      numberOfChildParcels: 3,
      childProposals: [
        { label: 'Child 1', proposedArea: 3000, purpose: 'Residential / Family Allotment A', proposedOwnerName: 'Rohit Sharma (Son)' },
        { label: 'Child 2', proposedArea: 3000, purpose: 'Residential / Family Allotment B', proposedOwnerName: 'Priya Sharma (Daughter)' },
        { label: 'Child 3', proposedArea: 4000, purpose: 'Residential / Retained Portion C', proposedOwnerName: 'Sunita Sharma (Spouse)' }
      ],
      notes: 'Cadastral demarcation report submitted along with NOC from co-sharers.'
    },
    submittedByRole: 'admin', submittedByUsername: 'deepak.admin', submittedByName: 'Deepak (Demo Admin / SDM)'
  },
  {
    requestId: 'REQ-2026-0102',
    parcelId: 'P002',
    ulpin: 'IN-CH-DEMO-000002',
    requestType: 'Building Permission',
    applicant: 'Harish Chander (Demo)',
    applicantContact: '+91 98722-XXXX2',
    date: '2026-03-20',
    status: 'Under Review',
    details: {
      reason: 'Commercial Facade Modernization & Rooftop Solar installation.',
      officerName: 'SDO Municipal Building Branch'
    },
    submittedByRole: 'admin', submittedByUsername: 'deepak.admin', submittedByName: 'Deepak (Demo Admin / SDM)'
  },
  {
    requestId: 'REQ-2026-0089',
    parcelId: 'P008',
    ulpin: 'IN-CH-DEMO-000008',
    requestType: 'Ownership Verification',
    applicant: 'Neelam Malhotra (Demo)',
    applicantContact: '+91 98760-XXXX8',
    date: '2026-03-18',
    status: 'Completed',
    details: {
      reason: 'Bhu-Aadhaar linkage confirmation and mutation record seal.',
      officerName: 'Tehsildar Central Circle'
    },
    submittedByRole: 'admin', submittedByUsername: 'deepak.admin', submittedByName: 'Deepak (Demo Admin / SDM)'
  },
  {
    requestId: 'REQ-2026-0074',
    parcelId: 'P014',
    ulpin: 'IN-CH-DEMO-000014',
    requestType: 'Encumbrance Verification',
    applicant: 'Verma Brothers Partnership (Demo)',
    applicantContact: '+91 98141-XXXX4',
    date: '2026-03-12',
    status: 'Rejected',
    details: {
      reason: 'Verification for bank refinance facility.',
      rejectionReason: 'Court injunction status quo in Suit #14/2023 active. Certificate cannot be issued until clearance.',
      actionDate: '2026-03-15',
      officerName: 'Sub-Registrar CHD'
    },
    submittedByRole: 'admin', submittedByUsername: 'deepak.admin', submittedByName: 'Deepak (Demo Admin / SDM)'
  },
  {
    requestId: 'REQ-2026-0061',
    parcelId: 'P011',
    ulpin: 'IN-CH-DEMO-000011',
    requestType: 'Property Tax Information',
    applicant: 'Commercial Holdings (Demo)',
    applicantContact: '+91 98721-XXXX1',
    date: '2026-03-08',
    status: 'Completed',
    details: {
      reason: 'Annual digital tax clearance statement generation.',
      actionDate: '2026-03-09',
      officerName: 'Tax Superintendent'
    },
    submittedByRole: 'admin', submittedByUsername: 'deepak.admin', submittedByName: 'Deepak (Demo Admin / SDM)'
  },
  {
    requestId: 'REQ-2026-0050',
    parcelId: 'P001',
    ulpin: 'IN-CH-DEMO-000001',
    requestType: 'Land Record Correction',
    applicant: 'Gurpreet Singh (Demo)',
    applicantContact: '+91 98140-XXXX1',
    date: '2026-02-28',
    status: 'Approved',
    details: {
      reason: 'Spelling correction in father\'s name in RoR digital ledger.',
      actionDate: '2026-03-02',
      officerName: 'Naib Tehsildar'
    },
    submittedByRole: 'admin', submittedByUsername: 'deepak.admin', submittedByName: 'Deepak (Demo Admin / SDM)'
  }
];
