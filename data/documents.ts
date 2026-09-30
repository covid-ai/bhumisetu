import { ParcelDocument } from '../types/land';

export const DEMO_DOCUMENTS: Record<string, ParcelDocument[]> = {
  'P005': [
    {
      documentId: 'DOC-CH-005-1',
      parcelId: 'P005',
      documentType: 'Record of Rights (RoR / Jamabandi)',
      documentStatus: 'Verified – Demo',
      documentDate: '2023-11-14',
      fileNumber: 'JAMABANDI/2023/KHEWAT-45',
      issuingAuthority: 'Department of Revenue & Land Records, Chandigarh',
      summary: 'Certified extract of Jamabandi confirming sole title in the name of Amit Sharma for Khewat No. 45, Khatoni No. 98, Khasra/Survey No. 45/2 (10,000 sq.ft).'
    },
    {
      documentId: 'DOC-CH-005-2',
      parcelId: 'P005',
      documentType: 'Registered Sale Deed / Title Certificate',
      documentStatus: 'Verified – Demo',
      documentDate: '2010-03-12',
      fileNumber: 'REG/DEED/2010/Book-1/Vol-412/Page-89',
      issuingAuthority: 'Office of Sub-Registrar, Chandigarh',
      summary: 'Registered Conveyance Deed duly executed and stamped with clear consideration and mutation sanction recorded.'
    },
    {
      documentId: 'DOC-CH-005-3',
      parcelId: 'P005',
      documentType: 'Cadastral Survey Map / GeoNaksha',
      documentStatus: 'Verified – Demo',
      documentDate: '2021-08-05',
      fileNumber: 'SURVEY/GN/CH-45-2-GIS',
      issuingAuthority: 'Settlement & Land Survey Directorate, UT Chandigarh',
      summary: 'DGPS surveyed geo-referenced polygon map establishing field boundaries with GeoJSON perimeter accuracy of 99.4%.'
    },
    {
      documentId: 'DOC-CH-005-4',
      parcelId: 'P005',
      documentType: 'Municipal Building Approval Plan',
      documentStatus: 'Approved – Demo',
      documentDate: '2021-09-30',
      fileNumber: 'MC-CHD/BP/2021/998-RES',
      issuingAuthority: 'Municipal Corporation, Chandigarh',
      summary: 'Sanctioned building plan for ground + 2 floors residential structure adhering to Floor Area Ratio (FAR) and setback requirements.'
    },
    {
      documentId: 'DOC-CH-005-5',
      parcelId: 'P005',
      documentType: 'Property Tax Assessment & Receipt',
      documentStatus: 'Paid – Demo',
      documentDate: '2025-04-10',
      fileNumber: 'CHD-PT-RECEIPT-2025-00452',
      issuingAuthority: 'Property Tax Wing, Municipal Corporation Chandigarh',
      summary: 'Receipt for annual property tax payment for Financial Year 2025-26 showing zero dues and active property assessment ID.'
    }
  ]
};

export const getDocumentsByParcelId = (parcelId: string): ParcelDocument[] => {
  if (DEMO_DOCUMENTS[parcelId]) {
    return DEMO_DOCUMENTS[parcelId];
  }

  return [
    {
      documentId: `DOC-${parcelId}-1`,
      parcelId,
      documentType: 'Record of Rights (RoR / Jamabandi)',
      documentStatus: 'Verified – Demo',
      documentDate: '2022-10-10',
      fileNumber: `JAMABANDI/DEMO/${parcelId}`,
      issuingAuthority: 'Department of Revenue & Land Records, Chandigarh',
      summary: `Standard verified Record of Rights for cadastral parcel ${parcelId}.`
    },
    {
      documentId: `DOC-${parcelId}-2`,
      parcelId,
      documentType: 'Registered Sale Deed / Title Certificate',
      documentStatus: 'Verified – Demo',
      documentDate: '2016-04-18',
      fileNumber: `REG/DEED/${parcelId}/DEMO`,
      issuingAuthority: 'Sub-Registrar Office, Chandigarh',
      summary: `Registered conveyance deed for parcel ${parcelId}.`
    },
    {
      documentId: `DOC-${parcelId}-3`,
      parcelId,
      documentType: 'Cadastral Survey Map / GeoNaksha',
      documentStatus: 'Verified – Demo',
      documentDate: '2020-01-15',
      fileNumber: `SURVEY/GIS/${parcelId}`,
      issuingAuthority: 'Settlement & Land Survey Directorate, UT Chandigarh',
      summary: `Cadastral boundary map with survey coordinates for parcel ${parcelId}.`
    },
    {
      documentId: `DOC-${parcelId}-4`,
      parcelId,
      documentType: 'Property Tax Assessment & Receipt',
      documentStatus: 'Paid – Demo',
      documentDate: '2025-05-02',
      fileNumber: `PT-REC-${parcelId}-2025`,
      issuingAuthority: 'Municipal Corporation Chandigarh',
      summary: `Current financial year property tax receipt.`
    }
  ];
};
