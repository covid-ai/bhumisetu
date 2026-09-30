'use client';

import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { DEMO_INFRASTRUCTURE } from '../../data/infrastructure';

// Custom lightweight SVG div icons for infrastructure items
const createCustomIcon = (type: string) => {
  let bgColor = 'bg-blue-600';
  let symbol = '📍';

  switch (type) {
    case 'Road':
      bgColor = 'bg-slate-700';
      symbol = '🛣️';
      break;
    case 'School':
      bgColor = 'bg-indigo-600';
      symbol = '🏫';
      break;
    case 'Hospital':
      bgColor = 'bg-rose-600';
      symbol = '🏥';
      break;
    case 'Electricity':
      bgColor = 'bg-amber-600';
      symbol = '⚡';
      break;
    case 'Water':
      bgColor = 'bg-cyan-600';
      symbol = '💧';
      break;
  }

  return L.divIcon({
    className: 'custom-infra-icon',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border: 2px solid ${type === 'Hospital' ? '#e11d48' : '#2563eb'};
        font-size: 14px;
        cursor: pointer;
      ">
        ${symbol}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

export const InfrastructureLayer: React.FC = () => {
  return (
    <>
      {DEMO_INFRASTRUCTURE.map((item) => (
        <Marker
          key={item.id}
          position={item.location}
          icon={createCustomIcon(item.type)}
        >
          <Tooltip direction="top" offset={[0, -14]} opacity={0.95}>
            <div className="text-xs p-1">
              <div className="font-bold text-slate-800">{item.name}</div>
              <div className="text-slate-500 text-[10px]">{item.description}</div>
              {item.distanceFromP005 && (
                <div className="text-blue-600 text-[10px] font-medium mt-0.5">
                  Proximity: {item.distanceFromP005}
                </div>
              )}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </>
  );
};
