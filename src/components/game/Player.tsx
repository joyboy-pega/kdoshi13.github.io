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
      className="absolute flex items-center justify-center transition-all duration-150 ease-out z-20 select-none pointer-events-none"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
      }}
    >
      <div className="w-6 h-6 rounded-full bg-[#7dcfff] border-2 border-[#1a1b26] flex items-center justify-center shadow-lg relative">
        {/* Direction dot */}
        <div 
          className="w-1.5 h-1.5 rounded-full bg-[#1a1b26] absolute"
          style={{
            top: dir === 'up' ? '2px' : dir === 'down' ? '12px' : '7px',
            left: dir === 'left' ? '2px' : dir === 'right' ? '12px' : '7px'
          }}
        />
      </div>
    </div>
  );
};

export default Player;
