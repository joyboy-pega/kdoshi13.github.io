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

    if (key === 'ArrowUp'    || key === 'w' || key === 'W') { newDir = 'up';    y -= 1; moved = true; }
    if (key === 'ArrowDown'  || key === 's' || key === 'S') { newDir = 'down';  y += 1; moved = true; }
    if (key === 'ArrowLeft'  || key === 'a' || key === 'A') { newDir = 'left';  x -= 1; moved = true; }
    if (key === 'ArrowRight' || key === 'd' || key === 'D') { newDir = 'right'; x += 1; moved = true; }

    if (moved) {
      setPlayerDir(newDir);
      if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
        const t = GAME_MAP[y][x];
        if (['G', 'D', 'B'].includes(t)) setPlayerPos({ x, y });
      }
    }

    if (key === ' ' || key === 'Enter' || key === 'e' || key === 'E') {
      let tx = playerPos.x, ty = playerPos.y;
      if (playerDir === 'up')    ty -= 1;
      if (playerDir === 'down')  ty += 1;
      if (playerDir === 'left')  tx -= 1;
      if (playerDir === 'right') tx += 1;
      if (tx >= 0 && tx < MAP_WIDTH && ty >= 0 && ty < MAP_HEIGHT) {
        const t = GAME_MAP[ty][tx];
        if (RESUME_CONTENT[t]) setDialogContent(RESUME_CONTENT[t]);
      }
    }

    if (key === 'Escape' && onExitToTerminal) onExitToTerminal();
  }, [playerPos, playerDir, dialogContent, onExitToTerminal]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      handleInput(e.key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleInput]);

  // Proximity hint
  useEffect(() => {
    const dirs = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
    let hint: string | null = null;
    for (const d of dirs) {
      const nx = playerPos.x + d.x, ny = playerPos.y + d.y;
      if (nx >= 0 && nx < MAP_WIDTH && ny >= 0 && ny < MAP_HEIGHT) {
        const t = GAME_MAP[ny][nx];
        if (RESUME_CONTENT[t]) { hint = `[Space] -- ${RESUME_CONTENT[t].title}`; break; }
      }
    }
    setActiveHint(hint);
  }, [playerPos]);

  return (
    <div
      className="flex-1 flex flex-col items-center font-mono select-none"
      style={{ background: '#0d0d0d', color: '#c8c8c8' }}
    >
      {/* Top bar */}
      <div
        className="w-full flex items-center justify-between px-2 text-xs"
        style={{ background: '#0d0d0d', borderBottom: '1px solid #3a3a3a', height: '22px' }}
      >
        <span style={{ color: '#9ece6a' }}>[ GAME MODE ] keval's legend</span>
        {onExitToTerminal && (
          <button
            onClick={onExitToTerminal}
            style={{ background: 'transparent', border: '1px solid #3a3a3a', color: '#7aa2f7', cursor: 'pointer', fontFamily: 'monospace', fontSize: '11px', padding: '0 8px', height: '18px' }}
          >
            [Esc] back to terminal
          </button>
        )}
      </div>

      {/* Game canvas */}
      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <div
          className="relative overflow-hidden"
          style={{
            width: MAP_WIDTH * TILE_SIZE,
            height: MAP_HEIGHT * TILE_SIZE,
            outline: '2px solid #7aa2f7',
            outlineOffset: '0px',
          }}
        >
          {GAME_MAP.map((row, y) =>
            row.map((tile, x) => <Tile key={`${x}-${y}`} type={tile} x={x} y={y} />)
          )}
          <Player x={playerPos.x} y={playerPos.y} dir={playerDir} />

          {/* Overlay hint: HUD */}
          {!dialogContent && (
            <div
              className="absolute top-0 left-0 text-xs px-2 py-1"
              style={{ background: '#0d0d0dcc', borderRight: '1px solid #3a3a3a', borderBottom: '1px solid #3a3a3a', color: '#7aa2f7' }}
            >
              <div>WASD / arrows: move</div>
              <div>Space / Enter: interact</div>
            </div>
          )}

          {/* Proximity interact hint */}
          {activeHint && !dialogContent && (
            <div
              className="absolute bottom-0 left-0 right-0 text-xs px-2 py-1 text-center"
              style={{ background: '#264f78', borderTop: '1px solid #7aa2f7', color: '#ffffff' }}
            >
              {activeHint}
            </div>
          )}

          {dialogContent && (
            <Dialog content={dialogContent} onClose={() => setDialogContent(null)} />
          )}
        </div>

        {/* Legend row */}
        <div
          className="flex flex-wrap gap-x-4 gap-y-0.5 px-2 py-1 text-xs"
          style={{ borderTop: '1px solid #3a3a3a', width: MAP_WIDTH * TILE_SIZE, background: '#0d0d0d', color: '#5a5a5a' }}
        >
          {[
            ['S', '#7aa2f7',  'Summary'],
            ['X', '#f7768e',  'Experience'],
            ['P', '#9ece6a',  'Projects'],
            ['K', '#bb9af7',  'Skills'],
            ['E', '#e0af68',  'Education'],
          ].map(([char, color, label]) => (
            <span key={char}>
              <span style={{ color: color as string, fontWeight: 'bold' }}>{char}</span>
              {` = ${label}`}
            </span>
          ))}
        </div>
      </div>

      <MobileControls onDirDown={(k) => handleInput(k)} onActionDown={() => handleInput(' ')} />
    </div>
  );
};

export default Game;
