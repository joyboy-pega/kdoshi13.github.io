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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b26] text-[#a9b1d6] font-mono selection:bg-[#7aa2f7]/30 selection:text-white">
      {/* Top Navigation & Mode Switcher */}
      <Navbar 
        mode={mode} 
        onToggleMode={setMode} 
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {mode === 'terminal' ? (
          <Terminal 
            vfs={vfs}
            setVfs={setVfs}
            currentUser={currentUser}
            onLaunchGame={() => setMode('game')}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
            <Game onExitToTerminal={() => setMode('terminal')} />
          </div>
        )}
      </main>
    </div>
  );
}
