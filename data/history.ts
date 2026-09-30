import { ParcelHistoryEvent } from '../types/land';

export const DEMO_HISTORY: Record<string, ParcelHistoryEvent[]> = {
  'P005': [
    {
      historyId: 'HIST-005-1',
      parcelId: 'P005',
      event: 'Original Parcel Delineation & Cadastral Survey',
      date: '2010-03-12',
      description: 'Cadastral parcel surveyed during National Land Records Modernization Programme (NLRMP). Khewat 45, Survey No. 45/2 assigned (10,000 sq.ft).',
      officerRef: 'Tehsildar Settlement, Chandigarh',
      previousOwnerName: 'Rajinder Sharma (Demo)'
    },
    {
      historyId: 'HIST-005-2',
      parcelId: 'P005',
      event: 'Bhu-Aadhaar / ULPIN Allotment',
      date: '2015-08-20',
      description: '14-digit Unique Land Parcel Identification Number (ULPIN: IN-CH-DEMO-000005) generated using geo-coordinate centroid hashing.',
      officerRef: 'Director Land Records, UT Chandigarh'
    },
    {
      historyId: 'HIST-005-3',
      parcelId: 'P005',
      event: 'Registered Title Deed Execution & RoR Mutation',
      date: '2020-11-14',
      description: 'Mutation entry approved in favour of Amit Sharma following registered deed transfer. Clean encumbrance verified.',
      officerRef: 'Revenue Officer Circle 3',
      previousOwnerName: 'Rajinder Sharma (Demo)'
    },
    {
      historyId: 'HIST-005-4',
      parcelId: 'P005',
      event: 'Digital Cadastral Geo-Reference Verification',
      date: '2025-01-10',
      description: 'High-precision DGPS drone resurvey validation completed. Spatial discrepancy within 0.2m tolerance.',
      officerRef: 'Survey of India / UT Cadastral Wing'
    }
  ],
  'P005-A': [
    {
      historyId: 'HIST-005A-1',
      parcelId: 'P005-A',
      event: 'Child Parcel Creation via Statutory Subdivision',
      date: '2026-03-25',
      description: 'Created as Child Plot A (3,000 sq.ft) derived from parent parcel P005 (IN-CH-DEMO-000005) under Subdivision Sanction SUB-2026-0001.',
      officerRef: 'Competent Authority - Land Revenue SDM'
    },
    {
      historyId: 'HIST-005A-2',
      parcelId: 'P005-A',
      event: 'Independent ULPIN Generated',
      date: '2026-03-25',
      description: 'ULPIN IN-CH-DEMO-000005-A assigned with child cadastral geometry.',
      officerRef: 'NIC GIS Land Registry Engine'
    }
  ],
  'P005-B': [
    {
      historyId: 'HIST-005B-1',
      parcelId: 'P005-B',
      event: 'Child Parcel Creation via Statutory Subdivision',
      date: '2026-03-25',
      description: 'Created as Child Plot B (3,000 sq.ft) derived from parent parcel P005 under Subdivision Sanction SUB-2026-0001.',
      officerRef: 'Competent Authority - Land Revenue SDM'
    }
  ],
  'P005-C': [
    {
      historyId: 'HIST-005C-1',
      parcelId: 'P005-C',
      event: 'Child Parcel Creation via Statutory Subdivision',
      date: '2026-03-25',
      description: 'Created as Child Plot C (4,000 sq.ft) derived from parent parcel P005 under Subdivision Sanction SUB-2026-0001.',
      officerRef: 'Competent Authority - Land Revenue SDM'
    }
  ]
};

export const getHistoryByParcelId = (parcelId: string): ParcelHistoryEvent[] => {
  if (DEMO_HISTORY[parcelId]) {
    return DEMO_HISTORY[parcelId];
  }

  return [
    {
      historyId: `HIST-${parcelId}-1`,
      parcelId,
      event: 'Original Parcel Delineation',
      date: '2015-05-10',
      description: `Initial cadastral boundary settlement and survey number assignment for parcel ${parcelId}.`,
      officerRef: 'Revenue Officer'
    },
    {
      historyId: `HIST-${parcelId}-2`,
      parcelId,
      event: 'Bhu-Aadhaar ULPIN Tagging',
      date: '2021-09-12',
      description: `Geospatial coordinate ULPIN issued and integrated with State Land Record Registry.`,
      officerRef: 'NIC Land Records'
    },
    {
      historyId: `HIST-${parcelId}-3`,
      parcelId,
      event: 'Annual RoR Jamabandi Renewal',
      date: '2024-10-01',
      description: `Routine four-yearly Jamabandi revision cycle completed without dispute note.`,
      officerRef: 'Patwari Circle'
    }
  ];
};
