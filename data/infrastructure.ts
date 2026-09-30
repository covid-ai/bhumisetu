import { InfrastructureItem } from '../types/land';

export const DEMO_INFRASTRUCTURE: InfrastructureItem[] = [
  {
    id: 'INF-ROAD-1',
    name: 'Purv Marg Arterial Corridor (Demo)',
    type: 'Road',
    location: [30.7245, 76.7805],
    description: '6-lane major dual-carriageway with 30m right-of-way and pedestrian walkway.',
    distanceFromP005: '120m West'
  },
  {
    id: 'INF-ROAD-2',
    name: 'Sector 26 Internal 60ft Sectoral Road (Demo)',
    type: 'Road',
    location: [30.7268, 76.7832],
    description: 'Paved sectoral bitumen road providing immediate access to plots.',
    distanceFromP005: '35m North'
  },
  {
    id: 'INF-SCH-1',
    name: 'Government Model Senior Secondary School (Demo)',
    type: 'School',
    location: [30.7290, 76.7815],
    description: 'Public education facility with sports grounds and solar rooftop installation.',
    distanceFromP005: '480m North-West'
  },
  {
    id: 'INF-SCH-2',
    name: 'Chandigarh High School (Demo)',
    type: 'School',
    location: [30.7225, 76.7870],
    description: 'Private secondary school affiliated with CBSE.',
    distanceFromP005: '520m South-East'
  },
  {
    id: 'INF-HOSP-1',
    name: 'Civil Dispensary & Primary Health Centre (Demo)',
    type: 'Hospital',
    location: [30.7190, 76.7845],
    description: '24/7 emergency first aid, outpatient wing, and immunization center.',
    distanceFromP005: '650m South'
  },
  {
    id: 'INF-UTIL-1',
    name: '66kV 24x7 Electric Feeder Substation (Demo)',
    type: 'Electricity',
    location: [30.7215, 76.7802],
    description: 'Underground high-tension distribution ring network with smart metering.',
    distanceFromP005: '410m South-West'
  },
  {
    id: 'INF-UTIL-2',
    name: 'Municipal Water Boosting & Reservoir Unit (Demo)',
    type: 'Water',
    location: [30.7275, 76.7865],
    description: 'Potable water supply pumping station operating under 24x7 pressurized network.',
    distanceFromP005: '380m North-East'
  }
];
