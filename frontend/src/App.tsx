import React, { useEffect, useState } from 'react';
import './App.css'

interface Image {
  id: number;
  imageUrl: string;
  width: number;
  height: number;
  description: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetch('/api/images')
      .then(response => response.json())
      .then(data => setImages(data.content));
  }, []);

  return (
    <div className="flex justify-between space-x-2">
      <div className="w-1/2 grid grid-cols-3 gap-4 border border-gray-300 p-4">
        {images.map(image => (
          <img key={image.id} src={image.imageUrl} alt={image.description} className="w-full h-auto" />
        ))}
      </div>
      <div className="w-1/2 border border-gray-300 p-4">
        <img src="map_placeholder.png" alt="Map" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default App;