'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLandStack } from '../../context/LandStackContext';
import { ParcelLayer } from './ParcelLayer';
import { InfrastructureLayer } from './InfrastructureLayer';
import { MapControls } from './MapControls';

// Subcomponent to reactively adjust view when mapCenter or mapZoom changes
const MapViewController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [center, zoom, map]);

  return null;
};

// Map click handler to clear selection if empty area clicked
const MapClickHandler: React.FC = () => {
  const map = useMap();
  const { selectParcel } = useLandStack();

  useEffect(() => {
    const handleClick = () => {
      // Intentionally don't clear if user wants to keep panel open, or can clear
    };
    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, selectParcel]);

  return null;
};

export const LeafletMapInner: React.FC = () => {
  const { 
    parcels, 
    activeLayer, 
    showInfrastructure, 
    mapCenter, 
    mapZoom,
    resetMapToChandigarh
  } = useLandStack();

  const handleResetView = () => {
    resetMapToChandigarh();
  };

  const isSatellite = activeLayer === 'satellite';

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-slate-100">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={12}
        maxZoom={19}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ height: '100%', width: '100%', outline: 'none' }}
      >
        <MapViewController center={mapCenter} zoom={mapZoom} />
        <MapClickHandler />

        {isSatellite ? (
          <TileLayer
            key="esri-satellite"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
          />
        ) : (
          <TileLayer
            key="osm-standard"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors | India Land Stack Demo'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        )}

        {/* Real Cadastral Parcel Polygons */}
        <ParcelLayer parcels={parcels} />

        {/* Real Infrastructure Layers */}
        {showInfrastructure && <InfrastructureLayer />}
      </MapContainer>

      {/* Floating Layer Selector & Legend */}
      <MapControls onResetView={handleResetView} />

      {/* Map Bottom-Left Location Indicator */}
      <div className="absolute bottom-6 left-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-md text-xs pointer-events-auto flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-slate-800">Chandigarh, India</span>
        <span className="text-slate-400">|</span>
        <span className="font-mono text-slate-600 text-[11px]">30.7250° N, 76.7835° E</span>
        <span className="text-slate-400">|</span>
        <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">DEMO CADASTRAL OVERLAY</span>
      </div>
    </div>
  );
};
