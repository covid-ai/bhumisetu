import { Owner } from '../types/land';

export const DEMO_OWNERS: Record<string, Owner> = {
  'OWNER-001': {
    ownerId: 'OWNER-001',
    name: 'Gurpreet Singh (Demo)',
    ownershipStatus: 'Verified – Demo',
    contact: '+91 98140-XXXX1',
    aadhaarRef: 'XXXX-XXXX-3821 (Demo Hash)',
    address: 'House #412, Sector 26-E, Chandigarh'
  },
  'OWNER-002': {
    ownerId: 'OWNER-002',
    name: 'Harish Chander (Demo)',
    ownershipStatus: 'Verified – Demo',
    contact: '+91 98722-XXXX2',
    aadhaarRef: 'XXXX-XXXX-9104 (Demo Hash)',
    address: 'SCF 18, Sector 26 Market, Chandigarh'
  },
  'OWNER-003': {
    ownerId: 'OWNER-003',
    name: 'Daljit Kaur & Sons (Demo)',
    ownershipStatus: 'Verified – Demo (Joint Title)',
    contact: '+91 98881-XXXX3',
    aadhaarRef: 'XXXX-XXXX-5512 (Demo Hash)',
    address: 'Demo Rural Farmsteads, Chandigarh'
  },
  'OWNER-004': {
    ownerId: 'OWNER-004',
    name: 'Sunil Kumar Gupta (Demo)',
    ownershipStatus: 'Verified – Demo',
    contact: '+91 97793-XXXX4',
    aadhaarRef: 'XXXX-XXXX-6629 (Demo Hash)',
    address: 'Plot #90, Sector 26, Chandigarh'
  },
  // KEY DEMO OWNER: Amit Sharma
  'OWNER-005': {
    ownerId: 'OWNER-005',
    name: 'Amit Sharma (Demo)',
    ownershipStatus: 'Verified – Demo (Sole Owner)',
    contact: '+91 98150-54321',
    aadhaarRef: 'XXXX-XXXX-8924 (Demo Hash)',
    address: 'Kothi #105, Demo Village, Sector 26, Chandigarh'
  },
  // Child parcel owners post-subdivision
  'OWNER-005A': {
    ownerId: 'OWNER-005A',
    name: 'Rohit Sharma (Demo - Son)',
    ownershipStatus: 'Verified – Demo (Subdivision Allotment)',
    contact: '+91 98150-11221',
    aadhaarRef: 'XXXX-XXXX-1121 (Demo Hash)',
    address: 'Plot 45/2-A, Demo Village, Chandigarh'
  },
  'OWNER-005B': {
    ownerId: 'OWNER-005B',
    name: 'Priya Sharma (Demo - Daughter)',
    ownershipStatus: 'Verified – Demo (Subdivision Allotment)',
    contact: '+91 98150-33442',
    aadhaarRef: 'XXXX-XXXX-3342 (Demo Hash)',
    address: 'Plot 45/2-B, Demo Village, Chandigarh'
  },
  'OWNER-005C': {
    ownerId: 'OWNER-005C',
    name: 'Sunita Sharma (Demo - Spouse)',
    ownershipStatus: 'Verified – Demo (Subdivision Allotment)',
    contact: '+91 98150-77883',
    aadhaarRef: 'XXXX-XXXX-7783 (Demo Hash)',
    address: 'Plot 45/2-C, Demo Village, Chandigarh'
  },
  'OWNER-006': {
    ownerId: 'OWNER-006',
    name: 'Chandigarh Logistics Consortium (Demo)',
    ownershipStatus: 'Verified – Demo (Corporate Leasehold)',
    contact: '+91 94170-XXXX6',
    aadhaarRef: 'CIN: U45200CH2010PTC99881',
    address: 'Commercial Block 7, Purv Marg, Chandigarh'
  },
  'OWNER-007': {
    ownerId: 'OWNER-007',
    name: 'Modern Toolmakers Pvt Ltd (Demo)',
    ownershipStatus: 'Verified – Demo',
    contact: '+91 98155-XXXX7',
    aadhaarRef: 'CIN: U29100CH2005PTC12345',
    address: 'Industrial Plot 47/3, Chandigarh'
  },
  'OWNER-008': {
    ownerId: 'OWNER-008',
    name: 'Neelam Malhotra (Demo)',
    ownershipStatus: 'Verified – Demo',
    contact: '+91 98760-XXXX8',
    aadhaarRef: 'XXXX-XXXX-4421 (Demo Hash)',
    address: 'House #812, Sector 28-A, Chandigarh'
  },
  'OWNER-009': {
    ownerId: 'OWNER-009',
    name: 'Chandigarh Administration - Public Welfare (Demo)',
    ownershipStatus: 'Verified – Demo (State Govt Property)',
    contact: '+91 172-2740000',
    aadhaarRef: 'Govt Department Entity ID: CHD-DPI-09',
    address: 'Civic Centre, Sector 26, Chandigarh'
  },
  'OWNER-010': {
    ownerId: 'OWNER-010',
    name: 'Manpreet Singh Sidhu (Demo)',
    ownershipStatus: 'Verified – Demo',
    contact: '+91 98144-XXXX0',
    aadhaarRef: 'XXXX-XXXX-9912 (Demo Hash)',
    address: 'Bungalow 501, Chandigarh'
  },
  'OWNER-014': {
    ownerId: 'OWNER-014',
    name: 'Verma Brothers Partnership (Demo)',
    ownershipStatus: 'Disputed – Demo (Title Suit #14/2023)',
    contact: '+91 98141-XXXX4',
    aadhaarRef: 'XXXX-XXXX-1414 (Demo Hash)',
    address: 'Phase 1 Industrial Belt, Chandigarh'
  },
  'OWNER-020': {
    ownerId: 'OWNER-020',
    name: 'Kashmiri Lal Trust (Demo)',
    ownershipStatus: 'Disputed – Demo (Encroachment Hearing)',
    contact: '+91 98720-XXXX0',
    aadhaarRef: 'Trust Reg: CH-TR-2012-004',
    address: 'Mani Majra Peri-Urban Belt, Chandigarh'
  }
};

export const getOwnerById = (ownerId: string): Owner => {
  if (DEMO_OWNERS[ownerId]) {
    return DEMO_OWNERS[ownerId];
  }
  return {
    ownerId,
    name: `Landholder ${ownerId.replace('OWNER-', '#')} (Demo)`,
    ownershipStatus: 'Verified – Demo',
    contact: '+91 98XXX-XXXXX',
    aadhaarRef: 'XXXX-XXXX-0000 (Demo Hash)',
    address: 'Urban Estate, Chandigarh'
  };
};
