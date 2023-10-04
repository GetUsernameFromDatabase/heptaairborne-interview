import React, { useEffect, useRef, useState } from 'react';
import { PicsumImageComponentMemo } from './PicsumImageComponent';
import { changePicsumUrlSize } from '../utilities/picsum';
import { useImages } from '../hooks/useImages';
import Masonry from 'react-masonry-css';
import { ImageOverlayComponent } from './ImageOverlayComponent'; // Import the ImageOverlayComponent
import type { ImageEntity } from 'src/swagger/models';

const ImagesGrid: React.FC = () => {
  const { images, requestNewPage } = useImages(10);
  const [selectedImage, setSelectedImage] = useState<ImageEntity | null>(null); // State to store clicked image

  const loader = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const widthPx = 300;

  // Infinite Scroller
  useEffect(() => {
    /*global IntersectionObserverInit, a*/
    const options: IntersectionObserverInit = {
      root: scrollContainer.current,
      rootMargin: '500px',
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
      observer.disconnect();
    };
  }, [requestNewPage]);

  const breakpointColumnsObj = {
    default: 3, // Adjust the number of columns to your preference
    800: 2,
    500: 1,
  };

  // Function to handle image click
  const handleImageClick = (image: ImageEntity) => {
    setSelectedImage(image); // Store clicked image information
  };

  return (
    <div ref={scrollContainer} className="h-full overflow-x-hidden p-4">
      {selectedImage && (
        <ImageOverlayComponent
          image={selectedImage}
          show={true} // Show the overlay
          onClose={() => setSelectedImage(null)} // Close the overlay when the image is clicked
        />
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="m-2 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleImageClick(image)} // Handle image click
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
      <div ref={loader}></div>
    </div>
  );
};

export default ImagesGrid;
