import React, { Suspense, lazy } from 'react';

export const LazyLeafletMap = lazy(() => import('./LeafletMap'));
export const LazyMarker = lazy(async () => {
  const module = await import('react-leaflet');
  return { default: module.Marker };
});
