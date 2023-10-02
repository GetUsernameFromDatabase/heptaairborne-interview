import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface Image {
  id: number;
  imageUrl: string;
  width: number;
  height: number;
  description: string;
}

interface ImageComponentProps {
  image: Image;
  className?: string;
}

// To prevent re-rendering
const ImageComponent: React.FC<ImageComponentProps> = React.memo(
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
