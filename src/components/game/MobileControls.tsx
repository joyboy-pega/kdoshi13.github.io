import React from 'react';

interface MobileControlsProps {
  onDirDown: (key: string) => void;
  onActionDown: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirDown, onActionDown }) => {
  return (
    <div className="fixed bottom-4 left-0 w-full px-6 flex justify-between items-end z-40 md:hidden select-none pointer-events-auto">
      {/* D-Pad */}
      <div className="flex flex-col items-center gap-1 bg-[#1a1b26]/80 p-2 rounded-lg border border-[#414868]/60 shadow-xl">
        <button 
          aria-label="Up"
          className="w-12 h-12 bg-[#2e344e] border-b-2 border-r-2 border-[#1a1b26] rounded flex items-center justify-center text-sm active:bg-[#414868] text-[#7aa2f7] font-bold shadow-md"
          onPointerDown={(e) => { e.preventDefault(); onDirDown('w'); }}
        >
          UP
        </button>
        <div className="flex gap-1">
          <button 
            aria-label="Left"
            className="w-12 h-12 bg-[#2e344e] border-b-2 border-r-2 border-[#1a1b26] rounded flex items-center justify-center text-sm active:bg-[#414868] text-[#7aa2f7] font-bold shadow-md"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('a'); }}
          >
            LEFT
          </button>
          <button 
            aria-label="Down"
            className="w-12 h-12 bg-[#2e344e] border-b-2 border-r-2 border-[#1a1b26] rounded flex items-center justify-center text-sm active:bg-[#414868] text-[#7aa2f7] font-bold shadow-md"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('s'); }}
          >
            DOWN
          </button>
          <button 
            aria-label="Right"
            className="w-12 h-12 bg-[#2e344e] border-b-2 border-r-2 border-[#1a1b26] rounded flex items-center justify-center text-sm active:bg-[#414868] text-[#7aa2f7] font-bold shadow-md"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('d'); }}
          >
            RIGHT
          </button>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="flex flex-col items-center gap-1">
        <button 
          aria-label="Action / Interact"
          className="w-16 h-16 bg-[#f7768e] border-b-2 border-[#c53b53] rounded-full flex flex-col items-center justify-center font-bold active:bg-[#c53b53] text-white shadow-2xl"
          onPointerDown={(e) => { e.preventDefault(); onActionDown(); }}
        >
          <span className="text-base">ACT</span>
          <span className="text-[9px] uppercase tracking-wider opacity-90">Talk</span>
        </button>
      </div>
    </div>
  );
};

export default MobileControls;
