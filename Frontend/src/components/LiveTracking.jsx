import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const Recenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.panTo(position);
    }
  }, [position, map]);
  return null;
};

const ZoomButtons = () => {
  const map = useMap();
  return (
    <div className="absolute bottom-24 right-4 z-[9999] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="bg-white rounded-md shadow-md py-2 px-2.5 text-2xl font-bold"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="bg-white rounded-md shadow-md py-2 px-2.5 text-2xl font-bold"
      >
        −
      </button>
    </div>
  );
};

const LiveTracking = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    setPosition([latitude, longitude]);
  },
  (err) => {
    console.warn('Geolocation error:', err.message);
  },
  { enableHighAccuracy: true } 
);

  }, []);

  return (
    <div className="w-full h-full relative z-0">
      {position && (
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
          <Recenter position={position} />
          <ZoomButtons />
        </MapContainer>
      )}
    </div>
  );
};

export default LiveTracking;
