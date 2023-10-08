import React, { useRef, useState } from 'react';
import { PicsumImageComponentMemo } from './PicsumImageComponent';
import { changePicsumUrlSize } from '../utilities/picsum';
import { useImages } from '../hooks/useImages';
import Masonry from 'react-masonry-css';
import { ImageOverlayComponent } from './ImageOverlayComponent';
import type { ImageEntity } from 'src/swagger/models';
import ProgressBar from './ProgressBar';
import { useInfiniteScrollerObserver } from '../hooks/useObserver';

const ImagesGrid: React.FC = () => {
  const { images, requestNewPage, totalImages } = useImages(10);
  const [selectedImage, setSelectedImage] = useState<ImageEntity | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  const widthPx = 300;
  const breakpointColumnsObj = {
    default: 3,
    800: 2,
    500: 1,
  };

  useInfiniteScrollerObserver({ loader, onIntersect: requestNewPage });

  const handleImageClick = (image: ImageEntity) => {
    setSelectedImage(image);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center space-x-2 m-2">
        <ProgressBar current={images.length} total={totalImages}></ProgressBar>

        <div className="flex">
          <button
            type="button"
            className="bg-blue-500 text-white w-24 h-6 rounded"
            onClick={requestNewPage}
          >
            Load More
          </button>
        </div>
      </div>

      {selectedImage && (
        <ImageOverlayComponent
          image={selectedImage}
          show={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <div className="h-full overflow-x-hidden">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="w-fit m-2 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              onClick={() => handleImageClick(image)}
            >
              <PicsumImageComponentMemo
                image={{
                  ...image,
                  imageUrl: changePicsumUrlSize(image.imageUrl, widthPx),
                }}
              />
            </div>
          ))}
          <div
            ref={loader}
            className="InfiniteScrollerObserverLoader h-32"
          ></div>
        </Masonry>
      </div>
    </div>
  );
};

export default ImagesGrid;
