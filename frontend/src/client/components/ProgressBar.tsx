import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden relative">
      <div
        className="h-full bg-blue-500"
        style={{
          width: `${progress}%`,
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-black">
        {`${current}/${total}`}
      </div>
    </div>
  );
};

export default ProgressBar;
