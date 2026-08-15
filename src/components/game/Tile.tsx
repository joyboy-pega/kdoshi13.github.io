import React from 'react';
import { TILE_SIZE } from '../../data/mapData';

const TILE_STYLES: Record<string, string> = {
  'T': 'bg-[#2d7326] text-[20px] sm:text-[24px] flex items-center justify-center shadow-[inset_0_2px_0_rgba(255,255,255,0.15)]', 
  'G': 'bg-[#68b840]', 
  'D': 'bg-[#d8b870] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]', 
  'W': 'bg-[#4090c0] shadow-[inset_0_2px_0_rgba(255,255,255,0.3)] animate-pulse', 
  'B': 'bg-[#b88848] shadow-[inset_0_2px_0_rgba(0,0,0,0.25)] border-t border-[#885828]', 
  'S': 'bg-[#68b840] text-[20px] sm:text-[24px] flex items-center justify-center drop-shadow-md cursor-pointer hover:scale-110 transition-transform', 
  'E': 'bg-[#68b840] text-[20px] sm:text-[24px] flex items-center justify-center drop-shadow-md cursor-pointer hover:scale-110 transition-transform', 
  'X': 'bg-[#68b840] text-[20px] sm:text-[24px] flex items-center justify-center drop-shadow-md cursor-pointer hover:scale-110 transition-transform', 
  'P': 'bg-[#d8b870] text-[20px] sm:text-[24px] flex items-center justify-center drop-shadow-md cursor-pointer hover:scale-110 transition-transform', 
  'K': 'bg-[#68b840] text-[20px] sm:text-[24px] flex items-center justify-center drop-shadow-md cursor-pointer hover:scale-110 transition-transform', 
};

const TILE_EMOJIS: Record<string, string> = {
  'T': '🌲',
  'S': '🧙‍♂️',
  'E': '📜',
  'X': '⚔️',
  'P': '💎',
  'K': '🎯',
  'W': '🌊',
};

export const Tile: React.FC<{ type: string; x: number; y: number }> = ({ type, x, y }) => {
  return (
    <div 
      className={`absolute select-none ${TILE_STYLES[type] || 'bg-[#68b840]'}`}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
      }}
    >
      {TILE_EMOJIS[type] || ''}
    </div>
  );
};

export default Tile;
