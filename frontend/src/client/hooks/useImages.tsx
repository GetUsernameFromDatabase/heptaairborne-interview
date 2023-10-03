import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image } from 'types/image';

export const useImages = (pageSize = 10) => {
  const [images, setImages] = useState<Image[]>([]);
  const pageQueue = useRef<number[]>([]);
  const currentPage = useRef(0);
  const isFetching = useRef(false);

  const fetchImages = useCallback(async () => {
    if (!isFetching.current && pageQueue.current.length > 0) {
      isFetching.current = true;
      const page = pageQueue.current.shift();
      const response = await axios.get(
        `/api/images?page=${page}&size=${pageSize}`
      );

      setImages((prevImages) => [...prevImages, ...response.data.content]);
      isFetching.current = false;
      if (pageQueue.current.length > 0) {
        fetchImages();
      }
    }
  }, [pageSize]);

  const requestNewPage = useCallback(() => {
    pageQueue.current.push(currentPage.current++);
    if (!isFetching.current) {
      fetchImages();
    }
  }, [fetchImages]);

  useEffect(() => {
    requestNewPage();
  }, [requestNewPage]);

  return { images, requestNewPage };
};
