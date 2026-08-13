import { TILE_SIZE } from '../data/mapData';

const TILE_STYLES: Record<string, string> = {
  'T': 'bg-[#389030] text-[24px] flex items-center justify-center shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]', 
  'G': 'bg-[#78c850]', 
  'D': 'bg-[#e8c880]', 
  'W': 'bg-[#50a0d0] shadow-[inset_0_2px_0_rgba(255,255,255,0.3)]', 
  'B': 'bg-[#c89858] shadow-[inset_0_2px_0_rgba(0,0,0,0.2)]', 
  'S': 'bg-[#78c850] text-[24px] flex items-center justify-center drop-shadow-md', 
  'E': 'bg-[#78c850] text-[24px] flex items-center justify-center drop-shadow-md', 
  'X': 'bg-[#78c850] text-[24px] flex items-center justify-center drop-shadow-md', 
  'P': 'bg-[#e8c880] text-[24px] flex items-center justify-center drop-shadow-md', 
  'K': 'bg-[#78c850] text-[24px] flex items-center justify-center drop-shadow-md', 
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

export default function Tile({ type, x, y }: { type: string, x: number, y: number }) {
  return (
    <div 
      className={`absolute select-none ${TILE_STYLES[type] || 'bg-[#78c850]'}`}
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
}
