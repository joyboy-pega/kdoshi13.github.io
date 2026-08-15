import React from 'react';

export const BootBanner: React.FC = () => {
  const ascii = ` _  __               _   ____            _     _ 
| |/ /_____   ____ _| | |  _ \\  ___  ___| |__ (_)
| ' // _ \\ \\ / / _\` | | | | | |/ _ \\/ __| '_ \\| |
| . \\  __/\\ V / (_| | | | |_| | (_) \\__ \\ | | | |
|_|\\_\\___| \\_/ \\__,_|_| |____/ \\___/|___/_| |_|_|`;

  return (
    <div className="mb-6 mt-2 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start text-[#a9b1d6]">
      <pre className="text-[#7aa2f7] font-bold text-xs sm:text-sm leading-tight select-none font-mono">
        {ascii}
      </pre>
      <div className="flex flex-col gap-1 text-sm font-mono">
        <div><span className="text-[#7aa2f7] font-bold">OS</span>: KevalOS v1.2 (BrowserVFS + Interactive RPG)</div>
        <div><span className="text-[#7aa2f7] font-bold">Role</span>: Test Engineer & Software QA Specialist</div>
        <div><span className="text-[#7aa2f7] font-bold">Host</span>: Starship Terminal</div>
        <div><span className="text-[#7aa2f7] font-bold">Kernel</span>: Web 5.0 (React 19 + TypeScript)</div>
        <div><span className="text-[#7aa2f7] font-bold">Status</span>: Open for Opportunities</div>
        <div><span className="text-[#7aa2f7] font-bold">Shell</span>: bash 5.2 (Starship Tokyo-Night)</div>
        <div className="flex gap-1.5 mt-1.5">
          <div className="w-4 h-4 bg-[#1a1b26] border border-[#414868] rounded-sm" title="bg"></div>
          <div className="w-4 h-4 bg-[#f7768e] rounded-sm" title="red"></div>
          <div className="w-4 h-4 bg-[#9ece6a] rounded-sm" title="green"></div>
          <div className="w-4 h-4 bg-[#e0af68] rounded-sm" title="yellow"></div>
          <div className="w-4 h-4 bg-[#7aa2f7] rounded-sm" title="blue"></div>
          <div className="w-4 h-4 bg-[#bb9af7] rounded-sm" title="magenta"></div>
          <div className="w-4 h-4 bg-[#7dcfff] rounded-sm" title="cyan"></div>
          <div className="w-4 h-4 bg-[#a9b1d6] rounded-sm" title="fg"></div>
        </div>
      </div>
    </div>
  );
};

export default BootBanner;
