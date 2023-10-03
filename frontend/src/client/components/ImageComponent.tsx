import React, { useState } from 'react';
import { Image } from 'types/image';
import { changePicsumUrlSize } from '../utilities/picsum';

export interface ImageComponentProps {
  image: Image;
  className?: string;
}

// React.memo To prevent re-rendering
export const ImageComponent: React.FC<ImageComponentProps> = React.memo(
  ({ image, className }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
      <div key={image.id} className={className}>
        <img
          src={image.imageUrl}
          alt={image.description}
          width={image.width}
          height={image.height}
          onClick={() => setShowOverlay(true)}
        />
        {showOverlay && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
            onClick={() => setShowOverlay(false)}
          >
            <img
              src={changePicsumUrlSize(
                image.imageUrl,
                image.width,
                image.height
              )}
              alt={image.description}
            />
          </div>
        )}
      </div>
    );
  }
);

ImageComponent.displayName = 'ImageComponent';
