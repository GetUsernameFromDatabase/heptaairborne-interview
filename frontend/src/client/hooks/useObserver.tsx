import React, { useEffect } from 'react';

interface InfiniteScrollerOptions {
  loader: React.MutableRefObject<HTMLElement | null>;
  onIntersect: () => void;
  // eslint-disable-next-line no-undef
  IntersectionObserverOptions?: IntersectionObserverInit;
}

export const useInfiniteScrollerObserver = (
  options: InfiniteScrollerOptions
) => {
  useEffect(() => {
    const currentLoader = options.loader.current;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        options.onIntersect();
      }
    };
    const observer = new IntersectionObserver(
      handleObserver,
      options.IntersectionObserverOptions
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [options]);
};
