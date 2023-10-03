import React, { useState } from 'react';
import { Image } from 'types/image';
import { changePicsumUrlSize, parsePicsumUrl } from '../utilities/picsum';
import { LoadingImage } from './LoadingImage';

export interface ImageComponentProps {
  image: Image;
  className?: string;
}

// React.memo To prevent re-rendering
export const ImageComponent: React.FC<ImageComponentProps> = React.memo(
  ({ image, className }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOverlayLoading, setIsOverlayLoading] = useState(true);

    const { height, width } = parsePicsumUrl(image.imageUrl);
    const smallestSize = Math.min(height, width);

    const handleImageLoad = () => {
      setIsLoading(false);
    };
    const handleOverlayImageLoad = () => {
      setIsOverlayLoading(false);
    };

    return (
      <div key={image.id} className={className}>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingImage width={smallestSize} />
          </div>
        ) : null}
        <img
          src={image.imageUrl}
          alt={image.description}
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
            {isOverlayLoading ? (
              <div className="flex justify-center">
                <LoadingImage />
              </div>
            ) : null}
            <img
              src={changePicsumUrlSize(
                image.imageUrl,
                image.width,
                image.height
              )}
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
  }
);

ImageComponent.displayName = 'ImageComponent';
