import React, { useState, useCallback } from 'react';
import { LoadingImage } from './LoadingImage';
import type { ImageEntity } from 'src/swagger/models';

export interface ImageOverlayComponentProps {
  image: ImageEntity;
  show: boolean;
  onClose: () => void;
}

export const ImageOverlayComponent: React.FC<ImageOverlayComponentProps> = ({
  image,
  show,
  onClose,
}) => {
  const [isOverlayLoading, setIsOverlayLoading] = useState(true);

  const handleOverlayImageLoad = useCallback(() => {
    setIsOverlayLoading(false);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-500 ease-in-out"
      onClick={onClose}
    >
      {isOverlayLoading && (
        <div className="flex justify-center absolute">
          <LoadingImage />
        </div>
      )}
      <img
        src={image.imageUrl}
        alt={image.description}
        onLoad={handleOverlayImageLoad}
        className={`transition-opacity duration-500 ease-in-out max-h-screen opacity-100`}
      />
    </div>
  );
};
