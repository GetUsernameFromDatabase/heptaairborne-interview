import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ImageControllerApi } from '../../swagger/apis/image-controller-api';
import type { ImageEntity } from 'src/swagger/models';
import { returnBackendBasePath } from '../utilities/environment';

export const useImages = (pageSize = 10) => {
  const [images, setImages] = useState<ImageEntity[]>([]);
  const pageQueue = useRef<number[]>([]);
  const currentPage = useRef(0);
  const noFetching = useRef(false);

  const imageApi = useMemo(
    () => new ImageControllerApi({ basePath: returnBackendBasePath() }),
    []
  );

  const fetchImages = useCallback(async () => {
    if (noFetching.current || pageQueue.current.length === 0) return;

    noFetching.current = true;
    const page = pageQueue.current.shift()!; // should be fine due to length check
    const response = await imageApi.getAllImages(page, pageSize);
    if (response.data.last) {
      // let noFetching.current = true;
      // there is no need to fetch anymore since all has been fetched
      return;
    }

    if (!response.data.content) {
      // try again later
      // TODO: ensure it won't just start infinitely requesting the page
      //  current case is fine for tech demo -- the problem shouldn't occur
      pageQueue.current.push(page);
      return;
    }
    // response.data.content! should be good due to the check before
    setImages((prevImages) => [...prevImages, ...response.data.content!]);

    noFetching.current = false;
    if (pageQueue.current.length > 0) {
      fetchImages();
    }
  }, [imageApi, pageSize]);

  const requestNewPage = useCallback(() => {
    pageQueue.current.push(currentPage.current++);
    if (!noFetching.current) {
      fetchImages();
    }
  }, [fetchImages]);

  useEffect(() => {
    requestNewPage();
  }, [requestNewPage]);

  return { images, requestNewPage };
};
