import { Parcel } from '../types/land';

// Demonstration-only Chandigarh coverage. These records are synthetic and are
// intentionally distributed across representative Chandigarh sectors so the
// map feels like a city-wide cadastral workspace. They are not official parcel
// boundaries or government land records.
export const CHANDIGARH_ADMIN = {
  ut: 'Chandigarh',
  district: 'Chandigarh',
  subDivisions: ['Central', 'East', 'South'],
  tehsil: 'Chandigarh Sadar',
  sectors: [
    'Sector 8', 'Sector 10', 'Sector 17', 'Sector 19', 'Sector 22', 'Sector 26',
    'Sector 27', 'Sector 28', 'Sector 32', 'Sector 34', 'Sector 42', 'Sector 45',
    'Sector 52', 'Sector 56', 'Manimajra', 'Kishangarh', 'Daria', 'Hallomajra',
    'Mauli Jagran', 'Palsora'
  ]
} as const;

const sectorCenters: Array<{ sector: string; lat: number; lng: number; use: Parcel['landUse'] }> = [
  { sector: 'Sector 8', lat: 30.7444, lng: 76.7940, use: 'Residential' },
  { sector: 'Sector 10', lat: 30.7550, lng: 76.7865, use: 'Public' },
  { sector: 'Sector 17', lat: 30.7405, lng: 76.7822, use: 'Commercial' },
  { sector: 'Sector 19', lat: 30.7362, lng: 76.7748, use: 'Residential' },
  { sector: 'Sector 22', lat: 30.7334, lng: 76.7670, use: 'Commercial' },
  { sector: 'Sector 26', lat: 30.7285, lng: 76.7808, use: 'Residential' },
  { sector: 'Sector 27', lat: 30.7240, lng: 76.7732, use: 'Residential' },
  { sector: 'Sector 28', lat: 30.7185, lng: 76.7850, use: 'Residential' },
  { sector: 'Sector 32', lat: 30.7077, lng: 76.7780, use: 'Public' },
  { sector: 'Sector 34', lat: 30.7160, lng: 76.7580, use: 'Commercial' },
  { sector: 'Sector 42', lat: 30.6902, lng: 76.7560, use: 'Residential' },
  { sector: 'Sector 45', lat: 30.6808, lng: 76.7658, use: 'Residential' },
  { sector: 'Sector 52', lat: 30.6598, lng: 76.7480, use: 'Agricultural' },
  { sector: 'Sector 56', lat: 30.6420, lng: 76.7490, use: 'Agricultural' },
  { sector: 'Manimajra', lat: 30.7335, lng: 76.8400, use: 'Residential' },
  { sector: 'Kishangarh', lat: 30.7525, lng: 76.8290, use: 'Agricultural' },
  { sector: 'Daria', lat: 30.7045, lng: 76.8200, use: 'Commercial' },
  { sector: 'Hallomajra', lat: 30.6975, lng: 76.8240, use: 'Industrial' },
  { sector: 'Mauli Jagran', lat: 30.7100, lng: 76.8480, use: 'Residential' },
  { sector: 'Palsora', lat: 30.6620, lng: 76.7580, use: 'Agricultural' }
];

const polygon = (lat: number, lng: number, i: number): Parcel['geometry'] => {
  // Map-locked cadastral-style footprints. These are deliberately irregular,
  // non-overlapping land shapes rather than UI rectangles. They are synthetic
  // demo geometry and should not be represented as official parcel boundaries.
  const slot = i % 3;
  const sectorIndex = Math.floor(i / 3);
  const rotation = (((sectorIndex * 17) % 28) - 14) * Math.PI / 180;
  const scale = 0.00058 + (sectorIndex % 4) * 0.000045;

  // Three adjoining, survey-like footprints. Their shared edges make the
  // cluster read as one real land fabric while each parcel remains clickable.
  const templates: Array<Array<[number, number]>> = [
    [
      [-1.55, -0.72], [-0.65, -0.92], [-0.08, -0.38], [-0.18, 0.42],
      [-0.88, 0.70], [-1.52, 0.42], [-1.72, -0.12]
    ],
    [
      [-0.65, -0.92], [0.42, -0.78], [0.78, -0.25], [0.60, 0.58],
      [-0.18, 0.42], [-0.08, -0.38]
    ],
    [
      [0.42, -0.78], [1.45, -0.48], [1.68, 0.06], [1.18, 0.74],
      [0.60, 0.58], [0.78, -0.25]
    ]
  ];

  const points = templates[slot].map(([x, y], index) => {
    const nudgeX = 1 + ((((i + index * 3) % 7) - 3) * 0.018);
    const nudgeY = 1 + ((((i + index * 5) % 9) - 4) * 0.016);
    const px = x * scale * nudgeX;
    const py = y * scale * nudgeY;
    const rx = px * Math.cos(rotation) - py * Math.sin(rotation);
    const ry = px * Math.sin(rotation) + py * Math.cos(rotation);
    return [lng + rx, lat + ry] as [number, number];
  });

  points.push(points[0]);
  return { type: 'Polygon', coordinates: [points] };
};

const statusFor = (i: number): Parcel['status'] => {
  if (i % 13 === 0) return 'Disputed';
  if (i % 17 === 0) return 'Pending Subdivision';
  return 'Active';
};

export const CHANDIGARH_DEMO_PARCELS: Parcel[] = sectorCenters.flatMap((s, sectorIndex) => {
  return [0, 1, 2].map((slot) => {
    const i = sectorIndex * 3 + slot;
    const lat = s.lat + (slot - 1) * 0.00105;
    const lng = s.lng + (slot - 1) * 0.00135;
    const landUse = slot === 1 && sectorIndex % 4 === 0 ? 'Commercial' : s.use;
    return {
      parcelId: `CHD-${String(i + 1).padStart(3, '0')}`,
      ulpin: `IN-CH-DEMO-${String(100 + i).padStart(6, '0')}`,
      surveyNumber: `${100 + sectorIndex}/${slot + 1}`,
      ownerId: `CHD-OWNER-${String(i + 1).padStart(3, '0')}`,
      area: 1800 + ((i * 733) % 7600),
      landUse,
      zone: landUse === 'Residential' ? 'Urban Residential' : landUse === 'Commercial' ? 'Local Commercial' : landUse === 'Agricultural' ? 'Peri-Urban Green' : landUse === 'Industrial' ? 'Light Engineering' : 'Civic / Public Use',
      status: statusFor(i),
      location: `${s.sector}, Chandigarh, Chandigarh UT`,
      centroid: [lat, lng],
      geometry: polygon(lat, lng, i),
      createdDate: `202${(i % 6) + 1}-0${(i % 8) + 1}-15`
    } satisfies Parcel;
  });
});
