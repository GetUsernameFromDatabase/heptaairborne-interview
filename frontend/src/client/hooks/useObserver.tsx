import React, { useEffect } from 'react';

export const useInfiniteScrollerObserver = (
  scrollContainer: React.MutableRefObject<HTMLDivElement | null>,
  loader: React.MutableRefObject<HTMLDivElement | null>,
  shouldLoadMore: () => void
) => {
  useEffect(() => {
    const currentLoader = loader.current;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      console.log(entities);
      const target = entities[0];
      if (target.isIntersecting) {
        shouldLoadMore();
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: scrollContainer.current,
      threshold: 0,
    });

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loader, scrollContainer, shouldLoadMore]);
};
