interface MobileControlsProps {
  onDirDown: (key: string) => void;
  onActionDown: () => void;
}

export default function MobileControls({ onDirDown, onActionDown }: MobileControlsProps) {
  return (
    <div className="fixed bottom-4 left-0 w-full px-6 flex justify-between items-end z-40 md:hidden select-none">
      <div className="flex flex-col items-center gap-1 opacity-80">
        <button 
          className="w-14 h-14 bg-[#d8d8d8] border-b-4 border-r-4 border-[#a8a8a8] rounded flex items-center justify-center text-3xl active:bg-[#b8b8b8] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 text-[#404040] font-bold"
          onPointerDown={(e) => { e.preventDefault(); onDirDown('w'); }}
        >▲</button>
        <div className="flex gap-1">
          <button 
            className="w-14 h-14 bg-[#d8d8d8] border-b-4 border-r-4 border-[#a8a8a8] rounded flex items-center justify-center text-3xl active:bg-[#b8b8b8] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 text-[#404040] font-bold"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('a'); }}
          >◀</button>
          <button 
            className="w-14 h-14 bg-[#d8d8d8] border-b-4 border-r-4 border-[#a8a8a8] rounded flex items-center justify-center text-3xl active:bg-[#b8b8b8] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 text-[#404040] font-bold"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('s'); }}
          >▼</button>
          <button 
            className="w-14 h-14 bg-[#d8d8d8] border-b-4 border-r-4 border-[#a8a8a8] rounded flex items-center justify-center text-3xl active:bg-[#b8b8b8] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 text-[#404040] font-bold"
            onPointerDown={(e) => { e.preventDefault(); onDirDown('d'); }}
          >▶</button>
        </div>
      </div>
      
      <button 
        className="w-20 h-20 bg-[#f84848] border-b-4 border-[#b82020] rounded-full flex items-center justify-center text-3xl font-bold active:bg-[#d83838] active:border-b-0 active:translate-y-1 text-white shadow-lg"
        onPointerDown={(e) => { e.preventDefault(); onActionDown(); }}
      >
        A
      </button>
    </div>
  );
}
