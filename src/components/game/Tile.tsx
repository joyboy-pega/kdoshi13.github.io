import React from 'react';
import { TILE_SIZE } from '../../data/mapData';

// Flat color palette per tile type — no gradients
const TILE_BG: Record<string, string> = {
  T: '#1a3d16',   // dark tree green
  G: '#2a5a1a',   // grass
  D: '#6b4f28',   // dirt path
  W: '#1a3a5c',   // water
  B: '#5c3a14',   // bridge
  S: '#2a5a1a',   // sage NPC on grass
  E: '#2a5a1a',   // scroll NPC on grass
  X: '#2a5a1a',   // blacksmith NPC
  P: '#6b4f28',   // project chest on dirt
  K: '#2a5a1a',   // skills target
};

// ASCII representation of each special tile
const TILE_CHAR: Record<string, string> = {
  T: '#',  // tree as hash (dense)
  S: 'S',
  E: 'E',
  X: 'X',
  P: 'P',
  K: 'K',
  W: '~',
  B: '=',
};

const TILE_FG: Record<string, string> = {
  T: '#3a7a2a',
  S: '#7aa2f7',
  E: '#e0af68',
  X: '#f7768e',
  P: '#9ece6a',
  K: '#bb9af7',
  W: '#7dcfff',
  B: '#c8a060',
};

export const Tile: React.FC<{ type: string; x: number; y: number }> = ({ type, x, y }) => {
  const bg = TILE_BG[type] || '#2a5a1a';
  const char = TILE_CHAR[type] || ' ';
  const fg = TILE_FG[type] || '#c8c8c8';

  return (
    <div
      className="absolute flex items-center justify-center font-mono select-none"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
        background: bg,
        fontSize: TILE_SIZE * 0.5,
        color: fg,
        // Use ASCII border between tiles via box-shadow outline
        outline: '1px solid rgba(0,0,0,0.15)',
        outlineOffset: '-1px',
        fontWeight: ['S','E','X','P','K'].includes(type) ? 'bold' : 'normal',
      }}
    >
      {char}
    </div>
  );
};

export default Tile;
