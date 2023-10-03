import React from 'react';

export interface LoadingImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export const LoadingImage: React.FC<LoadingImageProps> = ({
  src = 'static/loading.png',
  alt = 'Loading...',
  width,
  height,
}) => (
  <img src={src} alt={alt} className="animate-spin" style={{ width, height }} />
);

LoadingImage.displayName = 'LoadingImage';
