import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Terminal } from './components/terminal/Terminal';
import { Game } from './components/game/Game';
import { auth, googleProvider } from './services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { createInitialVFS } from './services/vfs';
import { VFSNode } from './types';

export default function App() {
  const [mode, setMode] = useState<'terminal' | 'game'>('terminal');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [vfs, setVfs] = useState<Record<string, VFSNode>>(() => createInitialVFS(() => setMode('game')));

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setCurrentUser);
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } catch (e) { console.error(e); }
  };
  const handleLogout = async () => {
    try { await signOut(auth); } catch (e) { console.error(e); }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-mono"
      style={{ background: '#0d0d0d', color: '#c8c8c8' }}
    >
      <h1 className="sr-only">Keval Doshi - Test Engineer &amp; Software QA Specialist Portfolio</h1>

      <Navbar
        mode={mode}
        onToggleMode={setMode}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
        {mode === 'terminal' ? (
          <Terminal
            vfs={vfs}
            setVfs={setVfs}
            currentUser={currentUser}
            onLaunchGame={() => setMode('game')}
          />
        ) : (
          <Game onExitToTerminal={() => setMode('terminal')} />
        )}
      </main>
    </div>
  );
}
