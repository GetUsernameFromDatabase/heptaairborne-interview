import React from 'react';
import type { ImageEntity } from 'src/swagger/models';
import { parsePicsumUrl } from '../utilities/picsum';

export interface ImageComponentProps {
  image: ImageEntity;
  className?: string;
  onClick?: () => void;
}

export const PicsumImageComponent: React.FC<ImageComponentProps> = ({
  image,
  className = '',
  onClick,
}) => {
  const { height, width } = parsePicsumUrl(image.imageUrl);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <img
      key={image.id}
      src={image.imageUrl}
      alt={image.description}
      height={height}
      width={width}
      className={className}
      onClick={handleClick}
    />
  );
};

PicsumImageComponent.displayName = 'ImageComponent';

export const PicsumImageComponentMemo = React.memo(PicsumImageComponent);
