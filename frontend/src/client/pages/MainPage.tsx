import React, { Suspense } from 'react';
import ImagesGrid from '../components/ImagesComponent';
import { ClientOnly } from '../components/ClientOnly';

// const MapComponent = React.lazy(() => import('../components/MapComponent'));

const MainPage: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
    <div style={{ flex: 1 }}>
      <ImagesGrid />
    </div>
    <div style={{ flex: 1 }}>
      <ClientOnly
        fallback={<div>Loading...</div>}
        component={() => import('../components/MapComponent')}
      ></ClientOnly>
    </div>
  </div>
);

export default MainPage;
