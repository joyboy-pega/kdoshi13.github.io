import React from 'react';

interface MobileControlsProps {
  onDirDown: (key: string) => void;
  onActionDown: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirDown, onActionDown }) => {
  return (
    <div className="fixed bottom-4 left-0 w-full px-6 flex justify-between items-end z-40 md:hidden select-none pointer-events-auto">
      {/* D-Pad */}
      <div className="flex flex-col items-center gap-1 bg-[#1a1b26]/70 p-2 rounded-2xl border border-[#414868]/60 backdrop-blur-sm shadow-xl">
        <button 
          aria-label="Up"
          className="w-12 h-12 bg-[#2e344e] border-b-4 border-r-2 border-[#1a1b26] rounded-lg flex items-center justify-center text-xl active:bg-[#414868] active:border-b-0 active:translate-y-1 text-[#7aa2f7] font-bold shadow-md"
          onPointerDown={(e) => { e.preventDefault(); onDirDown('w'); }}
        >
          ▲
        </button>
        <div className="flex gap-1">
          <button 
            aria-label="Left"
            className="w-12 h-12 bg-[#2e344e] border-b-4 border-r-2 border-[#1a1b26] rounded-lg flex items-center justify-center text-xl active:bg-[#414868] active:border-b-0 active:translate-y-1 text-[#7aa2f7] font-bold shadow-md"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('a'); }}
          >
            ◀
          </button>
          <button 
            aria-label="Down"
            className="w-12 h-12 bg-[#2e344e] border-b-4 border-r-2 border-[#1a1b26] rounded-lg flex items-center justify-center text-xl active:bg-[#414868] active:border-b-0 active:translate-y-1 text-[#7aa2f7] font-bold shadow-md"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('s'); }}
          >
            ▼
          </button>
          <button 
            aria-label="Right"
            className="w-12 h-12 bg-[#2e344e] border-b-4 border-r-2 border-[#1a1b26] rounded-lg flex items-center justify-center text-xl active:bg-[#414868] active:border-b-0 active:translate-y-1 text-[#7aa2f7] font-bold shadow-md"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('d'); }}
          >
            ▶
          </button>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="flex flex-col items-center gap-1">
        <button 
          aria-label="Action / Interact"
          className="w-16 h-16 bg-[#f7768e] border-b-4 border-[#c53b53] rounded-full flex flex-col items-center justify-center font-bold active:bg-[#c53b53] active:border-b-0 active:translate-y-1 text-white shadow-2xl"
          onPointerDown={(e) => { e.preventDefault(); onActionDown(); }}
        >
          <span className="text-xl">A</span>
          <span className="text-[10px] uppercase tracking-wider opacity-90">Talk</span>
        </button>
      </div>
    </div>
  );
};

export default MobileControls;
