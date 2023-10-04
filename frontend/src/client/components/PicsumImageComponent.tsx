import React, { useState, useCallback } from 'react';
import { LoadingImage } from './LoadingImage';
import type { ImageEntity } from 'src/swagger/models';
import { parsePicsumUrl } from '../utilities/picsum';

export interface ImageComponentProps {
  image: ImageEntity;
  className?: string;
  onClick?: () => void; // Make onClick optional by adding "?"
}

export const PicsumImageComponent: React.FC<ImageComponentProps> = ({
  image,
  className,
  onClick, // Destructure the onClick prop
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const { height, width } = parsePicsumUrl(image.imageUrl);
  const smallestSize = Math.min(height, width);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleClick = () => {
    // Call the onClick prop if it's provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <div key={image.id} className={className}>
      {isLoading && (
        <div className="flex justify-center items-center">
          <LoadingImage width={smallestSize} />
        </div>
      )}
      <img
        src={image.imageUrl}
        alt={image.description}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        className={`transition-opacity duration-200 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClick} // Call handleClick when the image is clicked
      />
    </div>
  );
};

PicsumImageComponent.displayName = 'ImageComponent';

export const PicsumImageComponentMemo = React.memo(PicsumImageComponent);
