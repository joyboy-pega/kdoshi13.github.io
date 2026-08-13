import { TILE_SIZE } from '../data/mapData';

export default function Player({ x, y, dir }: { x: number, y: number, dir: string }) {
  return (
    <div 
      className="absolute flex items-center justify-center text-[24px] transition-all duration-150 ease-linear z-10 select-none"
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
}
