import React, { useState, useEffect, useCallback } from 'react';
import { GAME_MAP, MAP_WIDTH, MAP_HEIGHT, TILE_SIZE } from '../../data/mapData';
import { RESUME_CONTENT } from '../../data/resumeData';
import Dialog from './Dialog';
import Tile from './Tile';
import Player from './Player';
import MobileControls from './MobileControls';

interface GameProps {
  onExitToTerminal?: () => void;
}

export const Game: React.FC<GameProps> = ({ onExitToTerminal }) => {
  const [playerPos, setPlayerPos] = useState({ x: 9, y: 7 });
  const [playerDir, setPlayerDir] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [dialogContent, setDialogContent] = useState<{ title: string; text: string[] } | null>(null);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  const handleInput = useCallback((key: string) => {
    if (dialogContent) return;

    let { x, y } = playerPos;
    let newDir = playerDir;
    let moved = false;

    if (key === 'ArrowUp' || key === 'w' || key === 'W') { newDir = 'up'; y -= 1; moved = true; }
    if (key === 'ArrowDown' || key === 's' || key === 'S') { newDir = 'down'; y += 1; moved = true; }
    if (key === 'ArrowLeft' || key === 'a' || key === 'A') { newDir = 'left'; x -= 1; moved = true; }
    if (key === 'ArrowRight' || key === 'd' || key === 'D') { newDir = 'right'; x += 1; moved = true; }

    if (moved) {
      setPlayerDir(newDir);
      if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
        const targetTile = GAME_MAP[y][x];
        if (['G', 'D', 'B'].includes(targetTile)) {
          setPlayerPos({ x, y });
        }
      }
    }

    if (key === ' ' || key === 'Enter' || key === 'e' || key === 'E') {
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

    if (key === 'Escape' && onExitToTerminal) {
      onExitToTerminal();
    }
  }, [playerPos, playerDir, dialogContent, onExitToTerminal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      handleInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  // Check if player is adjacent to any NPC/Chest to show prompt
  useEffect(() => {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];

    let foundHint: string | null = null;
    for (const dir of directions) {
      const nx = playerPos.x + dir.x;
      const ny = playerPos.y + dir.y;
      if (nx >= 0 && nx < MAP_WIDTH && ny >= 0 && ny < MAP_HEIGHT) {
        const tile = GAME_MAP[ny][nx];
        if (RESUME_CONTENT[tile]) {
          foundHint = `Press SPACE to inspect ${RESUME_CONTENT[tile].title}`;
          break;
        }
      }
    }
    setActiveHint(foundHint);
  }, [playerPos]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      
      {/* Top Game Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-2 text-xs sm:text-sm font-mono">
        <div className="flex items-center gap-2 text-[#9ece6a] bg-[#1a1b26]/80 px-3 py-1.5 rounded-lg border border-[#414868]">
          <span>🎮</span>
          <span className="font-bold">Keval's Legend (RPG Mode)</span>
        </div>
        {onExitToTerminal && (
          <button 
            onClick={onExitToTerminal}
            className="flex items-center gap-1.5 bg-[#24283b] hover:bg-[#414868] text-[#7aa2f7] hover:text-white px-3 py-1.5 rounded-lg border border-[#414868] transition-all font-semibold"
          >
            <span>💻</span>
            <span>Back to Terminal</span>
            <span className="text-[10px] text-[#565f89] hidden sm:inline">[ESC]</span>
          </button>
        )}
      </div>

      {/* Game Viewport Canvas */}
      <div 
        className="relative bg-[#68b840] shadow-[0_0_0_6px_#24283b,0_0_0_10px_#414868,0_20px_50px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden max-w-full"
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

        {/* Legend / Overlay banner */}
        {!dialogContent && (
          <div className="absolute top-2 left-2 text-[#f8f8f8] bg-[#1a1b26]/90 border-2 border-[#414868] p-2 sm:p-2.5 rounded-lg flex flex-col gap-0.5 text-xs font-mono shadow-md backdrop-blur-xs">
            <span className="font-bold text-[#7dcfff] flex items-center gap-1">
              <span>🧭</span> WASD / Arrow Keys to Move
            </span>
            <span className="text-[#a9b1d6]">
              Space / Enter: Interact with NPCs & Chests
            </span>
          </div>
        )}

        {/* Proximity Interaction Hint */}
        {activeHint && !dialogContent && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#7aa2f7] text-[#1a1b26] font-bold px-3 py-1 rounded-full text-xs font-mono shadow-lg animate-bounce z-30">
            {activeHint}
          </div>
        )}

        {/* Dialog Modal */}
        {dialogContent && (
          <Dialog 
            content={dialogContent} 
            onClose={() => setDialogContent(null)} 
          />
        )}
      </div>

      {/* Touch / Mobile Controls */}
      <MobileControls 
        onDirDown={(key) => handleInput(key)} 
        onActionDown={() => handleInput(' ')} 
      />

      {/* Bottom Quick Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-[#a9b1d6] font-mono">
        <span className="flex items-center gap-1 bg-[#1f2335] px-2 py-1 rounded border border-[#292e42]">
          <span>🧙‍♂️</span> Sage = Summary
        </span>
        <span className="flex items-center gap-1 bg-[#1f2335] px-2 py-1 rounded border border-[#292e42]">
          <span>⚔️</span> Blacksmith = Experience
        </span>
        <span className="flex items-center gap-1 bg-[#1f2335] px-2 py-1 rounded border border-[#292e42]">
          <span>💎</span> Chest = Projects
        </span>
        <span className="flex items-center gap-1 bg-[#1f2335] px-2 py-1 rounded border border-[#292e42]">
          <span>🎯</span> Target = Skills
        </span>
        <span className="flex items-center gap-1 bg-[#1f2335] px-2 py-1 rounded border border-[#292e42]">
          <span>📜</span> Scroll = Education
        </span>
      </div>
    </div>
  );
};

export default Game;
