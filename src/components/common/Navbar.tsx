import React from 'react';
import { contactInfo } from '../../data/portfolioData';
import { LogoBanner } from './LogoBanner';

interface NavbarProps {
  mode: 'terminal' | 'game';
  onToggleMode: (mode: 'terminal' | 'game') => void;
  currentUser?: any;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onToggleMode,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

  return (
    <header
      className="w-full font-mono text-xs select-none"
      style={{ background: '#0d0d0d', borderBottom: '1px solid #3a3a3a' }}
    >
      {/* ── Wireframe name logo ── */}
      <LogoBanner />

      {/* ── Top status bar ── */}
      <div
        className="flex items-center justify-between px-2 py-0"
        style={{ background: '#1e1e1e', borderBottom: '1px solid #3a3a3a', height: '20px' }}
      >
        {/* Left: path breadcrumb */}
        <div style={{ color: '#888' }}>
          <span style={{ color: '#5a5a5a' }}>~/portfolio/</span>
          <span style={{ color: '#9ece6a' }}>{contactInfo.name.toLowerCase().replace(/\s/g, '-')}</span>
        </div>

        {/* Right: clock */}
        <div style={{ color: '#5a5a5a' }}>
          {dateStr} &nbsp; {timeStr}
        </div>
      </div>

      {/* ── Main menu bar ── */}
      <div className="flex items-center justify-between px-2" style={{ height: '24px' }}>
        {/* Left: mode tabs */}
        <div className="flex items-center">
          <button
            onClick={() => onToggleMode('terminal')}
            className="px-3 h-full flex items-center text-xs font-mono"
            style={{
              background: mode === 'terminal' ? '#264f78' : 'transparent',
              color: mode === 'terminal' ? '#ffffff' : '#888',
              border: 'none',
              borderRight: '1px solid #3a3a3a',
              cursor: 'pointer',
              height: '24px',
            }}
          >
            [1] TERMINAL
          </button>
          <button
            onClick={() => onToggleMode('game')}
            className="px-3 h-full flex items-center text-xs font-mono"
            style={{
              background: mode === 'game' ? '#264f78' : 'transparent',
              color: mode === 'game' ? '#ffffff' : '#888',
              border: 'none',
              borderRight: '1px solid #3a3a3a',
              cursor: 'pointer',
              height: '24px',
            }}
          >
            [2] RPG
          </button>
        </div>

        {/* Center: title */}
        <div style={{ color: '#5a5a5a' }}>
          kevalos v1.2 &mdash; {contactInfo.title}
        </div>

        {/* Right: links + auth */}
        <div className="flex items-center" style={{ gap: '1px' }}>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-xs font-mono"
            style={{ color: '#7aa2f7', textDecoration: 'none', borderLeft: '1px solid #3a3a3a', height: '24px', display: 'flex', alignItems: 'center' }}
          >
            github
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-xs font-mono"
            style={{ color: '#7aa2f7', textDecoration: 'none', borderLeft: '1px solid #3a3a3a', height: '24px', display: 'flex', alignItems: 'center' }}
          >
            linkedin
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="px-2 text-xs font-mono"
            style={{ color: '#ff9e64', textDecoration: 'none', borderLeft: '1px solid #3a3a3a', height: '24px', display: 'flex', alignItems: 'center' }}
          >
            mail
          </a>
          {currentUser ? (
            <button
              onClick={onLogout}
              className="px-2 text-xs font-mono"
              style={{ color: '#f7768e', background: 'transparent', border: 'none', borderLeft: '1px solid #3a3a3a', cursor: 'pointer', height: '24px' }}
            >
              logout [{currentUser.displayName?.split(' ')[0] || 'user'}]
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="px-2 text-xs font-mono"
              style={{ color: '#9ece6a', background: 'transparent', border: 'none', borderLeft: '1px solid #3a3a3a', cursor: 'pointer', height: '24px' }}
            >
              login
            </button>
          )}
        </div>
      </div>

      {/* ── Bottom bar: mode indicator ── */}
      <div
        className="flex items-center px-2"
        style={{ background: '#0d0d0d', borderTop: '1px solid #3a3a3a', height: '18px' }}
      >
        <span
          className="px-2 text-xs font-bold font-mono"
          style={{
            background: mode === 'terminal' ? '#9ece6a' : '#7aa2f7',
            color: '#0d0d0d',
            marginRight: '8px',
          }}
        >
          {mode === 'terminal' ? ' NORMAL ' : ' GAME '}
        </span>
        <span style={{ color: '#5a5a5a', fontSize: '10px' }}>
          {mode === 'terminal'
            ? 'type a command or use quick-run bar &mdash; press [Tab] to autocomplete &mdash; [Arrow Up/Down] for history'
            : 'WASD / arrow keys to move &mdash; [Space] or [Enter] to interact &mdash; [Esc] to return to terminal'}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
