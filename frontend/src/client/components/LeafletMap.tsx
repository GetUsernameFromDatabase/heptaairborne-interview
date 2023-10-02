import { MapOptions, Marker, icon } from 'leaflet';
import React, { FC, ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

Marker.prototype.options.icon = icon({
  iconUrl: '/static/leaflet/marker-icon.png',
  iconRetinaUrl: '/static/leaflet/marker-icon.png',
  shadowUrl: '/static/leaflet/marker-shadow.png',
  shadowRetinaUrl: '/static/leaflet/marker-shadow.png',
});

const LeafletMap: FC<
  {
    children: ReactNode;
  } & MapOptions
> = ({ children, ...options }) => {
  return (
    <MapContainer className="h-full w-full relative" maxZoom={18} {...options}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      {children}
    </MapContainer>
  );
};

export default LeafletMap;
