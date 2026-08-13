import { useState, useEffect, useCallback } from 'react';
import { GAME_MAP, MAP_WIDTH, MAP_HEIGHT, TILE_SIZE } from '../data/mapData';
import { RESUME_CONTENT } from '../data/resumeData';
import Dialog from './Dialog';
import Tile from './Tile';
import Player from './Player';
import MobileControls from './MobileControls';

export default function Game() {
  const [playerPos, setPlayerPos] = useState({ x: 9, y: 7 });
  const [playerDir, setPlayerDir] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [dialogContent, setDialogContent] = useState<{ title: string, text: string[] } | null>(null);

  const handleInput = useCallback((key: string) => {
    if (dialogContent) return;

    let { x, y } = playerPos;
    let newDir = playerDir;
    let moved = false;

    if (key === 'ArrowUp' || key === 'w') { newDir = 'up'; y -= 1; moved = true; }
    if (key === 'ArrowDown' || key === 's') { newDir = 'down'; y += 1; moved = true; }
    if (key === 'ArrowLeft' || key === 'a') { newDir = 'left'; x -= 1; moved = true; }
    if (key === 'ArrowRight' || key === 'd') { newDir = 'right'; x += 1; moved = true; }

    if (moved) {
      setPlayerDir(newDir);
      if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
        const targetTile = GAME_MAP[y][x];
        if (['G', 'D', 'B'].includes(targetTile)) {
          setPlayerPos({ x, y });
        }
      }
    }

    if (key === ' ' || key === 'Enter') {
      let tx = playerPos.x;
      let ty = playerPos.y;
      if (playerDir === 'up') ty -= 1;
      if (playerDir === 'down') ty += 1;
      if (playerDir === 'left') tx -= 1;
      if (playerDir === 'right') tx += 1;

      if (tx >= 0 && tx < MAP_WIDTH && ty >= 0 && ty < MAP_HEIGHT) {
        const targetTile = GAME_MAP[ty][tx];
        if (RESUME_CONTENT[targetTile]) {
          setDialogContent(RESUME_CONTENT[targetTile]);
        }
      }
    }
  }, [playerPos, playerDir, dialogContent]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleInput(e.key);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div 
        className="relative bg-[#78c850] scale-100 md:scale-125 lg:scale-150 transform-origin-center shadow-[0_0_0_8px_#f8f8f8,0_0_0_12px_#c8c8c8,0_20px_50px_rgba(0,0,0,0.5)] rounded-md overflow-hidden"
        style={{
          width: MAP_WIDTH * TILE_SIZE,
          height: MAP_HEIGHT * TILE_SIZE,
        }}
      >
        {GAME_MAP.map((row, y) => 
          row.map((tile, x) => (
            <Tile key={`${x}-${y}`} type={tile} x={x} y={y} />
          ))
        )}

        <Player x={playerPos.x} y={playerPos.y} dir={playerDir} />

        {!dialogContent && (
          <div className="absolute top-2 left-2 text-[#202020] opacity-95 text-xl drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)] bg-[#f8f8f8]/90 border-[3px] border-[#202020] p-2 px-3 rounded-xl flex flex-col leading-none">
            <span className="uppercase font-bold tracking-wide">Keval's Legend</span>
            <span className="text-sm mt-1">Space/Enter: Interact</span>
          </div>
        )}

        {dialogContent && (
          <Dialog 
            content={dialogContent} 
            onClose={() => setDialogContent(null)} 
          />
        )}
      </div>

      <MobileControls 
        onDirDown={(key) => handleInput(key)} 
        onActionDown={() => handleInput(' ')} 
      />
    </div>
  );
}
