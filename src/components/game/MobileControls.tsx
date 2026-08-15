import React from 'react';

interface MobileControlsProps {
  onDirDown: (key: string) => void;
  onActionDown: () => void;
}

const btn = (label: string, onClick: () => void) => (
  <button
    aria-label={label}
    onPointerDown={(e) => { e.preventDefault(); onClick(); }}
    style={{
      width: '48px',
      height: '48px',
      background: '#1a1a1a',
      border: '1px solid #3a3a3a',
      color: '#7aa2f7',
      fontFamily: 'monospace',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
    }}
  >
    {label}
  </button>
);

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirDown, onActionDown }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-between items-end px-4 pb-2 md:hidden select-none pointer-events-auto"
      style={{ background: '#0d0d0d', borderTop: '1px solid #3a3a3a', zIndex: 40 }}
    >
      {/* D-Pad */}
      <div>
        <div className="flex justify-center mb-0.5">
          {btn('^', () => onDirDown('w'))}
        </div>
        <div className="flex">
          {btn('<', () => onDirDown('a'))}
          {btn('v', () => onDirDown('s'))}
          {btn('>', () => onDirDown('d'))}
        </div>
      </div>

      {/* Action */}
      <button
        aria-label="Interact"
        onPointerDown={(e) => { e.preventDefault(); onActionDown(); }}
        style={{
          width: '64px',
          height: '64px',
          background: '#264f78',
          border: '1px solid #7aa2f7',
          color: '#ffffff',
          fontFamily: 'monospace',
          fontSize: '13px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        ACT
      </button>
    </div>
  );
};

export default MobileControls;
