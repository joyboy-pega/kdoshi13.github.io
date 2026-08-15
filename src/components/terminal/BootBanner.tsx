import React from 'react';

export const BootBanner: React.FC = () => {
  return (
    <div className="mb-6 mt-2 p-4 rounded-lg bg-[#1f2335]/50 border border-[#292e42] text-[#a9b1d6] font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292e42] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#9ece6a]" />
          <span className="font-bold text-[#c0caf5] text-sm sm:text-base">KEVAL DOSHI</span>
          <span className="text-xs text-[#565f89]">|</span>
          <span className="text-xs text-[#7aa2f7]">Test Engineer & QA Automation</span>
        </div>
        <div className="text-xs text-[#565f89]">KevalOS v1.2</div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-4 text-xs">
        <div><span className="text-[#565f89]">OS:</span> KevalOS 1.2 (BrowserVFS)</div>
        <div><span className="text-[#565f89]">Host:</span> Starship Terminal</div>
        <div><span className="text-[#565f89]">Kernel:</span> Web 5.0 (React 19)</div>
        <div><span className="text-[#565f89]">Status:</span> Available for Hire</div>
        <div><span className="text-[#565f89]">Shell:</span> bash 5.2</div>
        <div><span className="text-[#565f89]">Theme:</span> Tokyo Night</div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#292e42]/60">
        <span className="text-[10px] text-[#565f89] mr-1">Palette:</span>
        <div className="w-3.5 h-3.5 bg-[#1a1b26] border border-[#414868] rounded-xs" />
        <div className="w-3.5 h-3.5 bg-[#f7768e] rounded-xs" />
        <div className="w-3.5 h-3.5 bg-[#9ece6a] rounded-xs" />
        <div className="w-3.5 h-3.5 bg-[#e0af68] rounded-xs" />
        <div className="w-3.5 h-3.5 bg-[#7aa2f7] rounded-xs" />
        <div className="w-3.5 h-3.5 bg-[#bb9af7] rounded-xs" />
        <div className="w-3.5 h-3.5 bg-[#7dcfff] rounded-xs" />
        <div className="w-3.5 h-3.5 bg-[#a9b1d6] rounded-xs" />
      </div>
    </div>
  );
};

export default BootBanner;
