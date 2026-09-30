import { Parcel } from '../types/land';
import { CHANDIGARH_DEMO_PARCELS } from './chandigarhDemo';

// Simulated cadastral boundary dataset in Chandigarh, India (Sector 26 / Demo Sector)
// Centered around 30.724° N, 76.783° E
// Geometry calibration for the demo map.
// The previous dataset used large axis-aligned rectangles.  These helpers create
// irregular cadastral-style footprints around each parcel centroid, keeping the
// map click target attached to the real Leaflet geography instead of drawing a
// decorative grid over the basemap.  Areas/records remain demo metadata.
const organicParcelGeometry = (
  centroid: [number, number],
  areaSqFt: number,
  seed: number,
  visualScale = 1.65
): Parcel['geometry'] => {
  const [lat, lng] = centroid;
  const areaM2 = Math.max(areaSqFt * 0.092903, 120);
  const aspect = 1.05 + ((seed * 17) % 35) / 100;
  const widthM = Math.sqrt(areaM2 * aspect) * visualScale;
  const heightM = (areaM2 / widthM) * visualScale;
  const latDeg = (m: number) => m / 111320;
  const lngDeg = (m: number) => m / (111320 * Math.cos((lat * Math.PI) / 180));

  // Deliberately asymmetric cadastral-style footprint. The vertices are
  // intentionally not a rectangle/square so the overlay follows a land-plot
  // visual language rather than looking like UI boxes.
  const raw = [
    [-0.60, -0.43],
    [-0.18, -0.57],
    [0.24, -0.50],
    [0.57, -0.24],
    [0.49, 0.14],
    [0.63, 0.42],
    [0.19, 0.57],
    [-0.16, 0.43],
    [-0.48, 0.52],
    [-0.66, 0.12],
  ];
  const angle = (((seed * 29) % 30) - 15) * Math.PI / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const points = raw.map(([x, y], index) => {
    const sx = x * widthM;
    const sy = y * heightM;
    const rx = sx * cos - sy * sin;
    const ry = sx * sin + sy * cos;
    const nudge = 0.96 + (((seed + index * 7) % 9) - 4) / 100;
    return [lng + lngDeg(rx * nudge), lat + latDeg(ry * nudge)] as [number, number];
  });

  points.push(points[0]);
  return { type: 'Polygon', coordinates: [points] };
};

const calibrateInitialParcelGeometries = (parcels: Parcel[]): Parcel[] =>
  parcels.map((parcel, index) => ({
    ...parcel,
    geometry: organicParcelGeometry(parcel.centroid, parcel.area, index + 1),
  }));

const BASE_PARCELS: Parcel[] = [
  {
    parcelId: 'P001',
    ulpin: 'IN-CH-DEMO-000001',
    surveyNumber: '42/1',
    ownerId: 'OWNER-001',
    area: 3200,
    landUse: 'Residential',
    zone: 'Zone R-1 (Low Density)',
    status: 'Active',
    location: 'Sector 26-E, Chandigarh',
    centroid: [30.7285, 76.7795],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7780, 30.7295],
        [76.7810, 30.7295],
        [76.7810, 30.7275],
        [76.7780, 30.7275],
        [76.7780, 30.7295]
      ]]
    },
    createdDate: '2012-04-15'
  },
  {
    parcelId: 'P002',
    ulpin: 'IN-CH-DEMO-000002',
    surveyNumber: '42/2',
    ownerId: 'OWNER-002',
    area: 4500,
    landUse: 'Commercial',
    zone: 'Zone C-1 (Local Commercial)',
    status: 'Active',
    location: 'Sector 26-E Market, Chandigarh',
    centroid: [30.7285, 76.7825],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7810, 30.7295],
        [76.7840, 30.7295],
        [76.7840, 30.7275],
        [76.7810, 30.7275],
        [76.7810, 30.7295]
      ]]
    },
    createdDate: '2014-06-20'
  },
  {
    parcelId: 'P003',
    ulpin: 'IN-CH-DEMO-000003',
    surveyNumber: '43/1',
    ownerId: 'OWNER-003',
    area: 5800,
    landUse: 'Agricultural',
    zone: 'Zone A-PeriUrban Green',
    status: 'Active',
    location: 'Demo Village Greenbelt, Chandigarh',
    centroid: [30.7285, 76.7855],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7840, 30.7295],
        [76.7870, 30.7295],
        [76.7870, 30.7275],
        [76.7840, 30.7275],
        [76.7840, 30.7295]
      ]]
    },
    createdDate: '2010-01-11'
  },
  {
    parcelId: 'P004',
    ulpin: 'IN-CH-DEMO-000004',
    surveyNumber: '44/1',
    ownerId: 'OWNER-004',
    area: 2800,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Demo Village, Sector 26, Chandigarh',
    centroid: [30.7250, 76.7795],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7780, 30.7265],
        [76.7810, 30.7265],
        [76.7810, 30.7235],
        [76.7780, 30.7235],
        [76.7780, 30.7265]
      ]]
    },
    createdDate: '2015-08-19'
  },
  // KEY DEMO PARCEL: P005 (Amit Sharma) - 10,000 sq.ft.
  {
    parcelId: 'P005',
    ulpin: 'IN-CH-DEMO-000005',
    surveyNumber: '45/2',
    ownerId: 'OWNER-005',
    area: 10000,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Demo Village, Chandigarh',
    centroid: [30.7250, 76.7835],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7820, 30.7265],
        [76.7850, 30.7265],
        [76.7850, 30.7235],
        [76.7820, 30.7235],
        [76.7820, 30.7265]
      ]]
    },
    createdDate: '2010-03-12'
  },
  {
    parcelId: 'P006',
    ulpin: 'IN-CH-DEMO-000006',
    surveyNumber: '46/1',
    ownerId: 'OWNER-006',
    area: 6200,
    landUse: 'Commercial',
    zone: 'Zone C-2 (Commercial Corridor)',
    status: 'Active',
    location: 'Purv Marg Junction, Chandigarh',
    centroid: [30.7250, 76.7865],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7850, 30.7265],
        [76.7880, 30.7265],
        [76.7880, 30.7235],
        [76.7850, 30.7235],
        [76.7850, 30.7265]
      ]]
    },
    createdDate: '2016-11-04'
  },
  {
    parcelId: 'P007',
    ulpin: 'IN-CH-DEMO-000007',
    surveyNumber: '47/3',
    ownerId: 'OWNER-007',
    area: 4100,
    landUse: 'Industrial',
    zone: 'Zone I-1 (Light Engineering)',
    status: 'Active',
    location: 'Industrial Pocket Demo, Chandigarh',
    centroid: [30.7215, 76.7795],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7780, 30.7230],
        [76.7810, 30.7230],
        [76.7810, 30.7200],
        [76.7780, 30.7200],
        [76.7780, 30.7230]
      ]]
    },
    createdDate: '2013-09-22'
  },
  {
    parcelId: 'P008',
    ulpin: 'IN-CH-DEMO-000008',
    surveyNumber: '48/1',
    ownerId: 'OWNER-008',
    area: 3600,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Demo Village Enclave, Chandigarh',
    centroid: [30.7215, 76.7825],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7810, 30.7230],
        [76.7840, 30.7230],
        [76.7840, 30.7200],
        [76.7810, 30.7200],
        [76.7810, 30.7230]
      ]]
    },
    createdDate: '2018-05-30'
  },
  {
    parcelId: 'P009',
    ulpin: 'IN-CH-DEMO-000009',
    surveyNumber: '49/2',
    ownerId: 'OWNER-009',
    area: 7500,
    landUse: 'Public',
    zone: 'Zone P-Civic Community',
    status: 'Active',
    location: 'Community Center Complex, Chandigarh',
    centroid: [30.7215, 76.7855],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7840, 30.7230],
        [76.7870, 30.7230],
        [76.7870, 30.7200],
        [76.7840, 30.7200],
        [76.7840, 30.7230]
      ]]
    },
    createdDate: '2008-07-14'
  },
  {
    parcelId: 'P010',
    ulpin: 'IN-CH-DEMO-000010',
    surveyNumber: '50/1',
    ownerId: 'OWNER-010',
    area: 2400,
    landUse: 'Residential',
    zone: 'Zone R-1 (Low Density)',
    status: 'Active',
    location: 'Sector 26-W Pocket, Chandigarh',
    centroid: [30.7320, 76.7795],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7780, 30.7330],
        [76.7810, 30.7330],
        [76.7810, 30.7305],
        [76.7780, 30.7305],
        [76.7780, 30.7330]
      ]]
    },
    createdDate: '2019-12-05'
  },
  {
    parcelId: 'P011',
    ulpin: 'IN-CH-DEMO-000011',
    surveyNumber: '51/4',
    ownerId: 'OWNER-011',
    area: 3100,
    landUse: 'Commercial',
    zone: 'Zone C-1 (Local Commercial)',
    status: 'Active',
    location: 'Madhya Marg Extension, Chandigarh',
    centroid: [30.7320, 76.7825],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7810, 30.7330],
        [76.7840, 30.7330],
        [76.7840, 30.7305],
        [76.7810, 30.7305],
        [76.7810, 30.7330]
      ]]
    },
    createdDate: '2017-02-18'
  },
  {
    parcelId: 'P012',
    ulpin: 'IN-CH-DEMO-000012',
    surveyNumber: '52/1',
    ownerId: 'OWNER-012',
    area: 4900,
    landUse: 'Agricultural',
    zone: 'Zone A-PeriUrban Green',
    status: 'Active',
    location: 'Kishangarh Link Area, Chandigarh',
    centroid: [30.7320, 76.7855],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7840, 30.7330],
        [76.7870, 30.7330],
        [76.7870, 30.7305],
        [76.7840, 30.7305],
        [76.7840, 30.7330]
      ]]
    },
    createdDate: '2011-08-25'
  },
  {
    parcelId: 'P013',
    ulpin: 'IN-CH-DEMO-000013',
    surveyNumber: '53/2',
    ownerId: 'OWNER-013',
    area: 2900,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Sector 26-E Residential, Chandigarh',
    centroid: [30.7285, 76.7885],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7870, 30.7295],
        [76.7900, 30.7295],
        [76.7900, 30.7275],
        [76.7870, 30.7275],
        [76.7870, 30.7295]
      ]]
    },
    createdDate: '2021-03-10'
  },
  {
    parcelId: 'P014',
    ulpin: 'IN-CH-DEMO-000014',
    surveyNumber: '54/1',
    ownerId: 'OWNER-014',
    area: 5200,
    landUse: 'Industrial',
    zone: 'Zone I-1 (Light Engineering)',
    status: 'Disputed',
    location: 'Plot 14 Industrial Phase 1, Chandigarh',
    centroid: [30.7250, 76.7895],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7880, 30.7265],
        [76.7910, 30.7265],
        [76.7910, 30.7235],
        [76.7880, 30.7235],
        [76.7880, 30.7265]
      ]]
    },
    createdDate: '2009-11-17'
  },
  {
    parcelId: 'P015',
    ulpin: 'IN-CH-DEMO-000015',
    surveyNumber: '55/3',
    ownerId: 'OWNER-015',
    area: 3400,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Sector 28-A Border, Chandigarh',
    centroid: [30.7215, 76.7885],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7870, 30.7230],
        [76.7900, 30.7230],
        [76.7900, 30.7200],
        [76.7870, 30.7200],
        [76.7870, 30.7230]
      ]]
    },
    createdDate: '2020-04-12'
  },
  {
    parcelId: 'P016',
    ulpin: 'IN-CH-DEMO-000016',
    surveyNumber: '56/2',
    ownerId: 'OWNER-016',
    area: 4300,
    landUse: 'Commercial',
    zone: 'Zone C-2 (Commercial Corridor)',
    status: 'Active',
    location: 'Main Bazar Pocket, Chandigarh',
    centroid: [30.7180, 76.7795],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7780, 30.7195],
        [76.7810, 30.7195],
        [76.7810, 30.7165],
        [76.7780, 30.7165],
        [76.7780, 30.7195]
      ]]
    },
    createdDate: '2015-10-09'
  },
  {
    parcelId: 'P017',
    ulpin: 'IN-CH-DEMO-000017',
    surveyNumber: '57/1',
    ownerId: 'OWNER-017',
    area: 2600,
    landUse: 'Residential',
    zone: 'Zone R-1 (Low Density)',
    status: 'Active',
    location: 'Sector 28-C Enclave, Chandigarh',
    centroid: [30.7180, 76.7825],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7810, 30.7195],
        [76.7840, 30.7195],
        [76.7840, 30.7165],
        [76.7810, 30.7165],
        [76.7810, 30.7195]
      ]]
    },
    createdDate: '2019-01-27'
  },
  {
    parcelId: 'P018',
    ulpin: 'IN-CH-DEMO-000018',
    surveyNumber: '58/2',
    ownerId: 'OWNER-018',
    area: 8200,
    landUse: 'Public',
    zone: 'Zone P-Civic Community',
    status: 'Active',
    location: 'Govt Dispensary & Park, Chandigarh',
    centroid: [30.7180, 76.7855],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7840, 30.7195],
        [76.7870, 30.7195],
        [76.7870, 30.7165],
        [76.7840, 30.7165],
        [76.7840, 30.7195]
      ]]
    },
    createdDate: '2006-03-05'
  },
  {
    parcelId: 'P019',
    ulpin: 'IN-CH-DEMO-000019',
    surveyNumber: '59/1',
    ownerId: 'OWNER-019',
    area: 3900,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Sector 28-D Avenue, Chandigarh',
    centroid: [30.7180, 76.7885],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7870, 30.7195],
        [76.7900, 30.7195],
        [76.7900, 30.7165],
        [76.7870, 30.7165],
        [76.7870, 30.7195]
      ]]
    },
    createdDate: '2016-08-14'
  },
  {
    parcelId: 'P020',
    ulpin: 'IN-CH-DEMO-000020',
    surveyNumber: '60/4',
    ownerId: 'OWNER-020',
    area: 3100,
    landUse: 'Agricultural',
    zone: 'Zone A-PeriUrban Green',
    status: 'Disputed',
    location: 'Mani Majra Peri-Urban Belt, Chandigarh',
    centroid: [30.7350, 76.7825],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7810, 30.7360],
        [76.7840, 30.7360],
        [76.7840, 30.7335],
        [76.7810, 30.7335],
        [76.7810, 30.7360]
      ]]
    },
    createdDate: '2012-07-29'
  },
  {
    parcelId: 'P021',
    ulpin: 'IN-CH-DEMO-000021',
    surveyNumber: '61/1',
    ownerId: 'OWNER-021',
    area: 2500,
    landUse: 'Residential',
    zone: 'Zone R-1 (Low Density)',
    status: 'Active',
    location: 'Sector 26 North Pocket, Chandigarh',
    centroid: [30.7350, 76.7855],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7840, 30.7360],
        [76.7870, 30.7360],
        [76.7870, 30.7335],
        [76.7840, 30.7335],
        [76.7840, 30.7360]
      ]]
    },
    createdDate: '2022-02-14'
  },
  {
    parcelId: 'P022',
    ulpin: 'IN-CH-DEMO-000022',
    surveyNumber: '62/3',
    ownerId: 'OWNER-022',
    area: 6800,
    landUse: 'Industrial',
    zone: 'Zone I-1 (Light Engineering)',
    status: 'Active',
    location: 'Industrial Area Phase 1 North, Chandigarh',
    centroid: [30.7350, 76.7885],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7870, 30.7360],
        [76.7900, 30.7360],
        [76.7900, 30.7335],
        [76.7870, 30.7335],
        [76.7870, 30.7360]
      ]]
    },
    createdDate: '2014-11-20'
  },
  {
    parcelId: 'P023',
    ulpin: 'IN-CH-DEMO-000023',
    surveyNumber: '63/2',
    ownerId: 'OWNER-023',
    area: 2700,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Sector 27 Border East, Chandigarh',
    centroid: [30.7150, 76.7825],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7810, 30.7160],
        [76.7840, 30.7160],
        [76.7840, 30.7135],
        [76.7810, 30.7135],
        [76.7810, 30.7160]
      ]]
    },
    createdDate: '2023-05-18'
  },
  {
    parcelId: 'P024',
    ulpin: 'IN-CH-DEMO-000024',
    surveyNumber: '64/1',
    ownerId: 'OWNER-024',
    area: 5400,
    landUse: 'Commercial',
    zone: 'Zone C-1 (Local Commercial)',
    status: 'Active',
    location: 'Sector 28 Commercial Hub, Chandigarh',
    centroid: [30.7150, 76.7855],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7840, 30.7160],
        [76.7870, 30.7160],
        [76.7870, 30.7135],
        [76.7840, 30.7135],
        [76.7840, 30.7160]
      ]]
    },
    createdDate: '2017-09-08'
  },
  {
    parcelId: 'P025',
    ulpin: 'IN-CH-DEMO-000025',
    surveyNumber: '65/2',
    ownerId: 'OWNER-025',
    area: 3300,
    landUse: 'Residential',
    zone: 'Zone R-1 (Low Density)',
    status: 'Active',
    location: 'Sukhna Enclave Demo, Chandigarh',
    centroid: [30.7285, 76.7915],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.7900, 30.7295],
        [76.7930, 30.7295],
        [76.7930, 30.7275],
        [76.7900, 30.7275],
        [76.7900, 30.7295]
      ]]
    },
    createdDate: '2018-03-21'
  }
];

export const INITIAL_PARCELS: Parcel[] = [
  ...calibrateInitialParcelGeometries(BASE_PARCELS),
  ...CHANDIGARH_DEMO_PARCELS
];

// Definition of simulated child parcels when P005 is subdivided
// P005 bounds: lng 76.7820 to 76.7850, lat 30.7235 to 30.7265
// Divided into 3 parcels:
// Child A: 3,000 sq.ft. (approx 30% width: 76.7820 to 76.7829)
// Child B: 3,000 sq.ft. (approx 30% width: 76.7829 to 76.7838)
// Child C: 4,000 sq.ft. (approx 40% width: 76.7838 to 76.7850)
export const P005_CHILD_PARCELS: Parcel[] = [
  {
    parcelId: 'P005-A',
    ulpin: 'IN-CH-DEMO-000005-A',
    surveyNumber: '45/2-A',
    ownerId: 'OWNER-005A',
    area: 3000,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Demo Village, Sector 26 (Subdivision Plot A), Chandigarh',
    parentParcelId: 'P005',
    centroid: [30.72500, 76.78324],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.78320, 30.72497],
        [76.78324, 30.72485],
        [76.78342, 30.72486],
        [76.78349, 30.72494],
        [76.78345, 30.72505],
        [76.78326, 30.72507],
        [76.78320, 30.72497]
      ]]
    },
    createdDate: '2026-03-25'
  },
  {
    parcelId: 'P005-B',
    ulpin: 'IN-CH-DEMO-000005-B',
    surveyNumber: '45/2-B',
    ownerId: 'OWNER-005B',
    area: 3000,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Demo Village, Sector 26 (Subdivision Plot B), Chandigarh',
    parentParcelId: 'P005',
    centroid: [30.72500, 76.78376],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.78345, 30.72494],
        [76.78349, 30.72486],
        [76.78362, 30.72489],
        [76.78368, 30.72501],
        [76.78363, 30.72512],
        [76.78347, 30.72505],
        [76.78345, 30.72494]
      ]]
    },
    createdDate: '2026-03-25'
  },
  {
    parcelId: 'P005-C',
    ulpin: 'IN-CH-DEMO-000005-C',
    surveyNumber: '45/2-C',
    ownerId: 'OWNER-005C',
    area: 4000,
    landUse: 'Residential',
    zone: 'Zone R-2 (Urban Residential)',
    status: 'Active',
    location: 'Demo Village, Sector 26 (Subdivision Plot C), Chandigarh',
    parentParcelId: 'P005',
    centroid: [30.72488, 76.78485],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [76.78368, 30.72501],
        [76.78374, 30.72493],
        [76.78382, 30.72503],
        [76.78378, 30.72513],
        [76.78363, 30.72512],
        [76.78368, 30.72501]
      ]]
    },
    createdDate: '2026-03-25'
  }
];
