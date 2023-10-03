import React, { Suspense } from 'react';
import ImagesGrid from '../components/ImagesGrid';
import { LeafletMapLazy, MarkerLazy } from '../components/LeafletMap.lazy';

const MainPage: React.FC = () => {
  const center = { lat: 58.5953, lng: 25.0136 };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}
      className="p-4 space-x-2"
    >
      <div style={{ flex: 1 }} className="-my-2">
        <ImagesGrid />
      </div>
      <div style={{ flex: 1 }}>
        <Suspense fallback={<></>}>
          <LeafletMapLazy center={center} zoom={7}>
            <Suspense fallback={<></>}>
              <MarkerLazy position={center}>
              </MarkerLazy>
            </Suspense>
          </LeafletMapLazy>
        </Suspense>
      </div>
    </div>
  );
};

export default MainPage;
