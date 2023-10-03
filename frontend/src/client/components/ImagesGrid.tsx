import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { ImageComponent } from './ImageComponent';
import { Image } from 'types/image';
import { changePicsumUrlSize } from '../utilities/picsum';

const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const loader = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const page = useRef(0);

  const fetchImages = useCallback(async (page: number) => {
    const response = await axios.get(`/api/images?page=${page}&size=10`);
    setImages((prevImages) => [...prevImages, ...response.data.content]);
  }, []);

  useEffect(() => {
    const options = {
      root: scrollContainer.current,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        fetchImages(page.current);
        page.current += 1;
      }
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      // cleanup on unmount
      observer.disconnect();
    };
  }, [fetchImages]);

  useEffect(() => {
    fetchImages(page.current);
    page.current += 1;
  }, [fetchImages]);

  const widthPx = 150;

  return (
    <div
      ref={scrollContainer}
      style={{
        maxHeight: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
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
      <div ref={loader} />
    </div>
  );
};

export default ImagesGrid;
