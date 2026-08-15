import React from 'react';
import { TILE_SIZE } from '../../data/mapData';

interface PlayerProps {
  x: number;
  y: number;
  dir: 'up' | 'down' | 'left' | 'right';
}

// Directional ASCII glyphs
const DIR_CHAR: Record<string, string> = {
  up:    '^',
  down:  'v',
  left:  '<',
  right: '>',
};

export const Player: React.FC<PlayerProps> = ({ x, y, dir }) => {
  return (
    <div
      className="absolute font-mono flex items-center justify-center z-20 select-none pointer-events-none"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
        fontSize: TILE_SIZE * 0.55,
        fontWeight: 'bold',
        color: '#ffffff',
        background: '#264f78',
        outline: '1px solid #7aa2f7',
        outlineOffset: '-1px',
        transition: 'left 0.1s linear, top 0.1s linear',
      }}
    >
      {DIR_CHAR[dir]}
    </div>
  );
};

export default Player;
