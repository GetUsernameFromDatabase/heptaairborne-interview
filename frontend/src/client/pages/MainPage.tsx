import React, { Suspense } from 'react';
import ImagesGrid from '../components/ImagesGrid';
import { LazyLeafletMap, LazyMarker } from '../components/LeafletMap.lazy';

// const MapComponent = React.lazy(() => import('../components/MapComponent'));

const MainPage: React.FC = () => (
  <div
    style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}
    className="p-4 space-x-2"
  >
    <div style={{ flex: 1 }} className="-my-2">
      <ImagesGrid />
    </div>
    <div style={{ flex: 1 }}>
      <Suspense fallback={<></>}>
        <LazyLeafletMap center={{ lat: 58.5953, lng: 25.0136 }} zoom={7}>
          <Suspense fallback={<></>}>
            {[{ lat: 58.5953, lng: 25.0136 }].map((position, index) => (
              <LazyMarker key={index} position={position} />
            ))}
          </Suspense>
        </LazyLeafletMap>
      </Suspense>
    </div>
  </div>
);

export default MainPage;
