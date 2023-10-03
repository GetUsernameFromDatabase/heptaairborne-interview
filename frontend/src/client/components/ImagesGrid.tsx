import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ImageComponent } from './ImageComponent';
import { Image } from 'types/image';
import { changePicsumUrlSize } from '../utilities/picsum';

const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = useCallback(async () => {
    const response = await axios.get('/api/images');
    setImages(response.data.content);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const widthPx = 150;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${widthPx}px, 1fr))`,
      }}
    >
      {images.map((image) => (
        <ImageComponent
          key={image.id}
          image={{
            ...image,
            imageUrl: changePicsumUrlSize(image.imageUrl, widthPx),
          }}
          className="m-2"
        />
      ))}
    </div>
  );
};

export default ImagesGrid;
