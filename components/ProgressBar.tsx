
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="w-full bg-slate-700 rounded-full h-4">
      <div
        className="bg-cyan-500 h-4 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
