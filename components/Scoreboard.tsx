
import React from 'react';
import { HeartIcon } from './icons/HeartIcon';
import { StarIcon } from './icons/StarIcon';

interface ScoreboardProps {
  score: number;
  lives: number;
  totalLives: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, lives, totalLives }) => {
  return (
    <div className="flex justify-between items-center w-full p-2">
      <div className="flex items-center space-x-2">
        <StarIcon className="w-8 h-8 text-amber-400" />
        <span className="text-3xl font-bold text-white">{score}</span>
      </div>
      <div className="flex items-center space-x-1.5">
        {Array.from({ length: totalLives }).map((_, i) => (
          <HeartIcon
            key={i}
            className={`w-7 h-7 transition-all duration-300 ${i < lives ? 'text-red-500' : 'text-slate-600'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
