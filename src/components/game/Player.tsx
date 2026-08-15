import React from 'react';
import { TILE_SIZE } from '../../data/mapData';

interface PlayerProps {
  x: number;
  y: number;
  dir: 'up' | 'down' | 'left' | 'right';
}

export const Player: React.FC<PlayerProps> = ({ x, y, dir }) => {
  return (
    <div 
      className="absolute flex items-center justify-center text-[22px] transition-all duration-150 ease-out z-20 select-none pointer-events-none drop-shadow-md"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
        transform: dir === 'left' ? 'scaleX(-1)' : 'none',
      }}
    >
      🧝‍♂️
    </div>
  );
};

export default Player;
