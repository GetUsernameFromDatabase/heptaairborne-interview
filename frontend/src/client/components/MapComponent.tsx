import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

interface Position {
  lat: number;
  lng: number;
}

const position: Position = { lat: 58.5953, lng: 25.0136 }; // Coordinates for Estonia

const ChangeView: React.FC<{ center: Position; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapComponent: React.FC = () => (
  <MapContainer style={{ height: '100%', width: '100%' }}>
    <ChangeView center={position} zoom={7} />
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={position}>
      <Popup>Estonia</Popup>
    </Marker>
  </MapContainer>
);

export default MapComponent;
