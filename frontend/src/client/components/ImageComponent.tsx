import React, { useState, useCallback } from 'react';
import type { ImageEntity } from 'src/swagger/models';
import { changePicsumUrlSize, parsePicsumUrl } from '../utilities/picsum';
import { LoadingImage } from './LoadingImage';

export interface ImageComponentProps {
  image: ImageEntity;
  className?: string;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  image,
  className,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayLoading, setIsOverlayLoading] = useState(true);

  const { height, width } = parsePicsumUrl(image.imageUrl);
  const smallestSize = Math.min(height, width);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleOverlayImageLoad = useCallback(() => {
    setIsOverlayLoading(false);
  }, []);

  return (
    <div key={image.id} className={className}>
      {isLoading && (
        <div className="flex justify-center">
          <LoadingImage width={smallestSize} />
        </div>
      )}
      <img
        src={image.imageUrl}
        alt={image.description}
        width={width}
        height={height}
        onClick={() => setShowOverlay(true)}
        onLoad={handleImageLoad}
        className={`transition-opacity duration-500 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {showOverlay && (
        <div
          className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-500 ease-in-out"
          onClick={() => setShowOverlay(false)}
        >
          {isOverlayLoading && (
            <div className="flex justify-center">
              <LoadingImage />
            </div>
          )}
          <img
            src={changePicsumUrlSize(image.imageUrl, image.width, image.height)}
            alt={image.description}
            onLoad={handleOverlayImageLoad}
            className={`transition-opacity duration-500 ease-in-out ${
              isOverlayLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
      )}
    </div>
  );
};

ImageComponent.displayName = 'ImageComponent';

export const ImageComponentMemo = React.memo(ImageComponent);
