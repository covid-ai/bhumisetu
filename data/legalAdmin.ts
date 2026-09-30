import { LegalAdministrativeInfo } from '../types/land';

export const DEMO_LEGAL_ADMIN: Record<string, LegalAdministrativeInfo> = {
  'P005': {
    parcelId: 'P005',
    roRStatus: 'Verified – Demo (Jamabandi Year 2023-24)',
    registrationStatus: 'Registered – Demo (Sub-Registrar CHD / Deed #4521)',
    buildingPermission: 'Approved – Demo (Municipal Corp CHD / BP-2021-998)',
    mortgageStatus: 'None / Clear Title – Demo',
    propertyTaxStatus: 'Paid – Demo (Receipt #CHD-PT-2025-00452, FY 2025-26)',
    restrictions: 'None – Demo (Standard Residential Byelaws Apply)',
    lastTaxPaymentDate: '2025-04-10',
    registrationOffice: 'Tehsil & Sub-Registrar Office, Sector 17, Chandigarh'
  },
  'P005-A': {
    parcelId: 'P005-A',
    roRStatus: 'Verified – Demo (Partition Mutation Entry #M-901)',
    registrationStatus: 'Registered – Demo (Subdivision Sanction #CHD-SUB-2026-0001)',
    buildingPermission: 'Subject to Plot Boundary Sanction – Demo',
    mortgageStatus: 'None / Clear Title – Demo',
    propertyTaxStatus: 'Provisional Assessment Assigned – Demo',
    restrictions: 'None – Demo (Subdivided Plot)',
    lastTaxPaymentDate: '2026-03-25',
    registrationOffice: 'Sub-Registrar Office, Chandigarh'
  },
  'P005-B': {
    parcelId: 'P005-B',
    roRStatus: 'Verified – Demo (Partition Mutation Entry #M-902)',
    registrationStatus: 'Registered – Demo (Subdivision Sanction #CHD-SUB-2026-0001)',
    buildingPermission: 'Subject to Plot Boundary Sanction – Demo',
    mortgageStatus: 'None / Clear Title – Demo',
    propertyTaxStatus: 'Provisional Assessment Assigned – Demo',
    restrictions: 'None – Demo (Subdivided Plot)',
    lastTaxPaymentDate: '2026-03-25',
    registrationOffice: 'Sub-Registrar Office, Chandigarh'
  },
  'P005-C': {
    parcelId: 'P005-C',
    roRStatus: 'Verified – Demo (Partition Mutation Entry #M-903)',
    registrationStatus: 'Registered – Demo (Subdivision Sanction #CHD-SUB-2026-0001)',
    buildingPermission: 'Subject to Plot Boundary Sanction – Demo',
    mortgageStatus: 'None / Clear Title – Demo',
    propertyTaxStatus: 'Provisional Assessment Assigned – Demo',
    restrictions: 'None – Demo (Subdivided Plot)',
    lastTaxPaymentDate: '2026-03-25',
    registrationOffice: 'Sub-Registrar Office, Chandigarh'
  },
  'P014': {
    parcelId: 'P014',
    roRStatus: 'Under Dispute Annotation – Demo (Suit #14/2023)',
    registrationStatus: 'Conditional – Demo',
    buildingPermission: 'Withheld Pending Court Disposal – Demo',
    mortgageStatus: 'Encumbered – Bank Lien Registered (Demo)',
    propertyTaxStatus: 'Arrears Outstanding – Demo (₹45,200)',
    restrictions: 'Interim Status Quo Order by Dist Court – Demo',
    lastTaxPaymentDate: '2022-03-31',
    registrationOffice: 'Sub-Registrar Office, Chandigarh'
  }
};

export const getLegalAdminByParcelId = (parcelId: string): LegalAdministrativeInfo => {
  if (DEMO_LEGAL_ADMIN[parcelId]) {
    return DEMO_LEGAL_ADMIN[parcelId];
  }

  return {
    parcelId,
    roRStatus: 'Verified – Demo',
    registrationStatus: 'Registered – Demo',
    buildingPermission: 'Approved – Demo',
    mortgageStatus: 'None – Demo',
    propertyTaxStatus: 'Paid – Demo',
    restrictions: 'None – Demo',
    lastTaxPaymentDate: '2025-05-15',
    registrationOffice: 'Sub-Registrar Office, Chandigarh'
  };
};
