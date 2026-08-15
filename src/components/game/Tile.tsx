import React from 'react';
import { TILE_SIZE } from '../../data/mapData';

const TILE_STYLES: Record<string, string> = {
  'T': 'bg-[#24531e] shadow-[inset_0_2px_0_rgba(255,255,255,0.1)]', 
  'G': 'bg-[#4e8d30]', 
  'D': 'bg-[#c2a15c] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]', 
  'W': 'bg-[#316e9c] shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]', 
  'B': 'bg-[#8d6233] shadow-[inset_0_2px_0_rgba(0,0,0,0.25)] border-t border-[#5e3f1c]', 
  'S': 'bg-[#4e8d30]', 
  'E': 'bg-[#4e8d30]', 
  'X': 'bg-[#4e8d30]', 
  'P': 'bg-[#c2a15c]', 
  'K': 'bg-[#4e8d30]', 
};

// Clean SVG Renderers (No Emojis)
const renderTileGraphic = (type: string) => {
  switch (type) {
    case 'T': // Tree
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1a3d16] fill-current">
          <path d="M12 2L4 14h5v6h6v-6h5L12 2z" />
        </svg>
      );
    case 'S': // Sage (Summary)
      return (
        <div className="w-6 h-6 rounded-full bg-[#7aa2f7] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#1a1b26] shadow-md">
          S
        </div>
      );
    case 'E': // Education (Scroll)
      return (
        <div className="w-6 h-6 rounded bg-[#e0af68] border border-[#563b14] flex items-center justify-center text-[10px] font-bold text-[#1a1b26] shadow-md">
          EDU
        </div>
      );
    case 'X': // Experience (Blacksmith)
      return (
        <div className="w-6 h-6 rounded-full bg-[#f7768e] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-md">
          EXP
        </div>
      );
    case 'P': // Projects (Chest)
      return (
        <div className="w-6 h-5 rounded bg-[#e89d2d] border-2 border-[#5c3708] flex items-center justify-center text-[9px] font-extrabold text-[#1a1b26] shadow-md">
          PRJ
        </div>
      );
    case 'K': // Skills (Training)
      return (
        <div className="w-6 h-6 rounded-full bg-[#9ece6a] border-2 border-[#163a13] flex items-center justify-center text-[9px] font-bold text-[#163a13] shadow-md">
          SKL
        </div>
      );
    case 'W': // Water
      return (
        <div className="w-full h-full flex items-center justify-center opacity-30">
          <div className="w-4 h-0.5 bg-white rounded" />
        </div>
      );
    default:
      return null;
  }
};

export const Tile: React.FC<{ type: string; x: number; y: number }> = ({ type, x, y }) => {
  return (
    <div 
      className={`absolute select-none flex items-center justify-center ${TILE_STYLES[type] || 'bg-[#4e8d30]'}`}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
      }}
    >
      {renderTileGraphic(type)}
    </div>
  );
};

export default Tile;
