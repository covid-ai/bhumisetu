'use client';

import React from 'react';
import { Polygon, Tooltip } from 'react-leaflet';
import { Parcel } from '../../types/land';
import { useLandStack } from '../../context/LandStackContext';
import { getOwnerById } from '../../data/owners';

interface ParcelLayerProps {
  parcels: Parcel[];
}

export const ParcelLayer: React.FC<ParcelLayerProps> = ({ parcels }) => {
  const { 
    selectedParcelId, 
    selectParcel, 
    activeLayer 
  } = useLandStack();

  const getParcelStyle = (parcel: Parcel, isSelected: boolean) => {
    // If selected, prominent highlight
    if (isSelected) {
      return {
        color: '#ea580c', // Vibrant saffron / orange
        weight: 3.5,
        fillColor: '#f97316',
        fillOpacity: 0.38,
        dashArray: undefined,
      };
    }

    // Land use color mode
    if (activeLayer === 'landuse') {
      const landUseColors: Record<string, string> = {
        Residential: '#3b82f6',
        Commercial: '#f59e0b',
        Agricultural: '#10b981',
        Industrial: '#8b5cf6',
        Public: '#06b6d4',
      };
      const color = landUseColors[parcel.landUse] || '#64748b';
      return {
        color: color,
        weight: 2.2,
        fillColor: color,
        fillOpacity: 0.28,
      };
    }

    // Status-specific styling
    if (parcel.status === 'Subdivided') {
      // Subdivided parent parcel: ghost boundary
      return {
        color: '#94a3b8',
        weight: 1.5,
        fillColor: '#cbd5e1',
        fillOpacity: 0.05,
        dashArray: '4, 4',
      };
    }

    if (parcel.status === 'Disputed') {
      return {
        color: '#dc2626',
        weight: 2.4,
        fillColor: '#ef4444',
        fillOpacity: 0.28,
      };
    }

    // Child parcel (derived from subdivision)
    if (parcel.parentParcelId) {
      return {
        color: '#059669', // Emerald green
        weight: 2.5,
        fillColor: '#10b981',
        fillOpacity: 0.30,
      };
    }

    // Default active parcel
    return {
      color: '#1d4ed8', // Dark blue
      weight: 2.2,
      fillColor: '#2563eb',
      fillOpacity: 0.28,
    };
  };

  // Convert GeoJSON [[lng, lat]] to Leaflet [[lat, lng]]
  const getLeafletPositions = (parcel: Parcel): [number, number][] => {
    return parcel.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
  };

  return (
    <>
      {parcels.map((parcel) => {
        const isSelected = selectedParcelId === parcel.parcelId;
        const positions = getLeafletPositions(parcel);
        const owner = getOwnerById(parcel.ownerId);
        const style = getParcelStyle(parcel, isSelected);

        return (
          <Polygon
            key={parcel.parcelId}
            positions={positions}
            pathOptions={style}
            smoothFactor={0.35}
            bubblingMouseEvents={false}
            eventHandlers={{
              click: (e) => {
                // Prevent map click propagation
                e.originalEvent.stopPropagation();
                selectParcel(parcel.parcelId);
              },
            }}
          >
            {/* Tooltip on hover / selected */}
            <Tooltip
              direction="center"
              permanent={isSelected}
              className="cadastral-parcel-tooltip"
              opacity={0.95}
            >
              <div className="text-center font-sans">
                <div className={`font-bold text-xs ${isSelected ? 'text-orange-700' : 'text-slate-800'}`}>
                  {parcel.parcelId}
                </div>
                {isSelected ? (
                  <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">
                    <div className="font-mono font-medium">{parcel.ulpin}</div>
                    <div className="text-slate-700 font-semibold">{owner.name}</div>
                  </div>
                ) : (
                  <div className="text-[9px] text-slate-500">
                    {parcel.surveyNumber}
                  </div>
                )}
              </div>
            </Tooltip>
          </Polygon>
        );
      })}
    </>
  );
};
