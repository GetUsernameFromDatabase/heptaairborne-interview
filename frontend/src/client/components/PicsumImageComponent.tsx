import React, { useState, useCallback } from 'react';
import type { ImageEntity } from 'src/swagger/models';
import { changePicsumUrlSize, parsePicsumUrl } from '../utilities/picsum';
import { LoadingImage } from './LoadingImage';
import { ImageOverlayComponent } from './ImageOverlayComponent';

export interface ImageComponentProps {
  image: ImageEntity;
  className?: string;
}

export const PicsumImageComponent: React.FC<ImageComponentProps> = ({
  image,
  className,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { height, width } = parsePicsumUrl(image.imageUrl);
  const smallestSize = Math.min(height, width);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
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
        className={`transition-opacity duration-200 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <ImageOverlayComponent
        image={{
          ...image,
          imageUrl: changePicsumUrlSize(
            image.imageUrl,
            image.width,
            image.height
          ),
        }}
        show={showOverlay}
        onClose={() => setShowOverlay(false)}
      />
    </div>
  );
};

PicsumImageComponent.displayName = 'ImageComponent';

export const ImageComponentMemo = React.memo(PicsumImageComponent);
