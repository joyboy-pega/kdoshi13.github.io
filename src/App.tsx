import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Terminal } from './components/terminal/Terminal';
import { Game } from './components/game/Game';
import { ChatPanel } from './components/common/ChatPanel';
import { createInitialVFS } from './services/vfs';
import { VFSNode } from './types';

export default function App() {
  const [mode, setMode] = useState<'terminal' | 'game'>('terminal');
  const [chatOpen, setChatOpen] = useState(false);
  const [vfs, setVfs] = useState<Record<string, VFSNode>>(() => createInitialVFS(() => setMode('game')));

  return (
    <div
      className="min-h-screen flex flex-col font-mono"
      style={{ background: '#0d0d0d', color: '#c8c8c8' }}
    >
      <h1 className="sr-only">Keval Doshi - Test Engineer &amp; Software QA Specialist Portfolio</h1>

      <Navbar
        mode={mode}
        onToggleMode={setMode}
        chatOpen={chatOpen}
        onToggleChat={() => setChatOpen(o => !o)}
      />

      <main className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
        {mode === 'terminal' ? (
          <Terminal
            vfs={vfs}
            setVfs={setVfs}
            onLaunchGame={() => setMode('game')}
          />
        ) : (
          <Game onExitToTerminal={() => setMode('terminal')} />
        )}
      </main>

      {/* Chat panel overlay */}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </div>
  );
}
