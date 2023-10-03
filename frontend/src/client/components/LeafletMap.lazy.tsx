import { lazy } from 'react';

export const LeafletMapLazy = lazy(() => import('./LeafletMap'));
export const MarkerLazy = lazy(async () => {
  const module = await import('react-leaflet');
  return { default: module.Marker };
});
