import React from 'react';
import { Image } from 'types/image';

export interface ImageComponentProps {
  image: Image;
  className?: string;
}

// React.memo To prevent re-rendering
export const ImageComponent: React.FC<ImageComponentProps> = React.memo(
  ({ image, className }) => (
    <div key={image.id} className={className}>
      <img
        src={image.imageUrl}
        alt={image.description}
        width={image.width}
        height={image.height}
      />
    </div>
  )
);
ImageComponent.displayName = 'ImageComponent';
