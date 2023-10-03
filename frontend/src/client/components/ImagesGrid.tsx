import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { ImageComponent } from './ImageComponent';
import { Image } from 'types/image';
import { changePicsumUrlSize } from '../utilities/picsum';

const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(0);
  const loader = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const fetchImages = useCallback(async () => {
    const response = await axios.get(`/api/images?page=${page}&size=10`);
    setImages((prevImages) => [...prevImages, ...response.data.content]);
  }, [page]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: scrollContainer.current,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      // cleanup on unmount
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, page]);

  const widthPx = 150;

  return (
    <div
      ref={scrollContainer}
      style={{
        maxHeight: '100%',
        overflowY: 'scroll',
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${widthPx}px, 1fr))`,
      }}
    >
      {images.map((image, index) => (
        <ImageComponent
          key={index}
          image={{
            ...image,
            imageUrl: changePicsumUrlSize(image.imageUrl, widthPx),
          }}
          className="m-2"
        />
      ))}
      <div ref={loader} />
    </div>
  );
};

export default ImagesGrid;
