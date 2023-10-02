import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ImageComponent } from './ImageComponent';
import { Image } from 'types/image';

const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = useCallback(async () => {
    const response = await axios.get('/api/images');
    setImages(response.data.content);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}
    >
      {images.map((image) => (
        <ImageComponent key={image.id} image={image} className="m-2" />
      ))}
    </div>
  );
};

export default ImagesGrid;
