import React, { useEffect, useRef, useState } from 'react';
import { PicsumImageComponentMemo } from './PicsumImageComponent';
import { changePicsumUrlSize } from '../utilities/picsum';
import { useImages } from '../hooks/useImages';
import Masonry from 'react-masonry-css';
import { ImageOverlayComponent } from './ImageOverlayComponent';
import type { ImageEntity } from 'src/swagger/models';
import ProgressBar from './ProgressBar';

const ImagesGrid: React.FC = () => {
  const { images, requestNewPage, totalImages } = useImages(10);
  const [selectedImage, setSelectedImage] = useState<ImageEntity | null>(null);

  const loader = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const widthPx = 300;
  const breakpointColumnsObj = {
    default: 3,
    800: 2,
    500: 1,
  };

  const handleImageClick = (image: ImageEntity) => {
    setSelectedImage(image);
  };

  // Infinite Scroller
  useEffect(() => {
    /*global IntersectionObserverInit, a*/
    const options: IntersectionObserverInit = {
      root: scrollContainer.current,
      rootMargin: '200px',
      threshold: 0.1,
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
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [requestNewPage]);

  return (
    <div className="h-full w-full flex flex-col">
      <ProgressBar current={images.length} total={totalImages}></ProgressBar>

      {selectedImage && (
        <ImageOverlayComponent
          image={selectedImage}
          show={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <div ref={scrollContainer} className="h-full overflow-x-hidden">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="m-2 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              onClick={() => handleImageClick(image)}
            >
              <PicsumImageComponentMemo
                image={{
                  ...image,
                  imageUrl: changePicsumUrlSize(image.imageUrl, widthPx),
                }}
                className="w-full h-auto"
              />
            </div>
          ))}
        </Masonry>
        <div id="loader" ref={loader} className="h-4"></div>
      </div>
    </div>
  );
};

export default ImagesGrid;
