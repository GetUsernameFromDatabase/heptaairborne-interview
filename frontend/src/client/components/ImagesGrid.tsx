import React, { useEffect, useRef } from 'react';
import { ImageComponentMemo } from './PicsumImageComponent';
import { changePicsumUrlSize } from '../utilities/picsum';
import { useImages } from '../hooks/useImages';

const ImagesGrid: React.FC = () => {
  const { images, requestNewPage } = useImages(10);
  const loader = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  // Infinite Scroller
  useEffect(() => {
    /*global IntersectionObserverInit, a*/
    const options: IntersectionObserverInit = {
      root: scrollContainer.current,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        requestNewPage();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [requestNewPage]);

  const widthPx = 150;

  return (
    <div
      ref={scrollContainer}
      style={{
        maxHeight: '100%',
        overflowX: 'hidden',
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${widthPx}px, 1fr))`,
      }}
    >
      {images.map((image) => (
        <ImageComponentMemo
          key={image.id}
          image={{
            ...image,
            imageUrl: changePicsumUrlSize(image.imageUrl, widthPx),
          }}
          className="m-2"
        />
      ))}
      <div ref={loader} />
    </div>
  );
};

export default ImagesGrid;
