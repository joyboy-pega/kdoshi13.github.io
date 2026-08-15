import React from 'react';
import { contactInfo } from '../../data/portfolioData';

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
  onLogout
}) => {
  return (
    <header className="w-full bg-[#16161e]/90 border-b border-[#24283b] backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 select-none font-mono">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#9ece6a]" />
        <div>
          <span className="font-bold text-[#c0caf5] text-sm sm:text-base tracking-wide">
            {contactInfo.name}
          </span>
          <span className="hidden md:inline-block ml-2 text-xs text-[#565f89]">
            | {contactInfo.title}
          </span>
        </div>
      </div>

      {/* Mode Switcher Buttons */}
      <div className="flex items-center bg-[#1f2335] p-1 rounded-lg border border-[#292e42]">
        <button
          onClick={() => onToggleMode('terminal')}
          className={`px-3 py-1 rounded text-xs sm:text-sm font-medium transition-all ${
            mode === 'terminal'
              ? 'bg-[#7aa2f7] text-[#1a1b26] font-bold'
              : 'text-[#a9b1d6] hover:text-white hover:bg-[#24283b]'
          }`}
        >
          [Terminal]
        </button>

        <button
          onClick={() => onToggleMode('game')}
          className={`px-3 py-1 rounded text-xs sm:text-sm font-medium transition-all ${
            mode === 'game'
              ? 'bg-[#9ece6a] text-[#1a1b26] font-bold'
              : 'text-[#a9b1d6] hover:text-white hover:bg-[#24283b]'
          }`}
        >
          [RPG Adventure]
        </button>
      </div>

      {/* Action Links & Auth */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs">
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#24283b] hover:bg-[#414868] text-[#7dcfff] px-2.5 py-1.5 rounded border border-[#3b4261] transition-colors"
        >
          GitHub
        </a>

        <a
          href={contactInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#24283b] hover:bg-[#414868] text-[#7aa2f7] px-2.5 py-1.5 rounded border border-[#3b4261] transition-colors"
        >
          LinkedIn
        </a>

        <a
          href={`mailto:${contactInfo.email}`}
          className="bg-[#24283b] hover:bg-[#414868] text-[#ff9e64] px-2.5 py-1.5 rounded border border-[#3b4261] transition-colors"
        >
          Contact
        </a>

        {currentUser ? (
          <button
            onClick={onLogout}
            className="bg-[#f7768e]/20 hover:bg-[#f7768e]/30 text-[#f7768e] px-2.5 py-1.5 rounded border border-[#f7768e]/40 transition-colors"
          >
            Logout ({currentUser.displayName?.split(' ')[0] || 'User'})
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="bg-[#9ece6a]/20 hover:bg-[#9ece6a]/30 text-[#9ece6a] px-2.5 py-1.5 rounded border border-[#9ece6a]/40 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
