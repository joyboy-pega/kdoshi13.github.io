import React from 'react';

interface AsciiBoxProps {
  title: string;
  children: React.ReactNode;
  borderColor?: string;
  titleColor?: string;
}

export const AsciiBox: React.FC<AsciiBoxProps> = ({ 
  title, 
  children, 
  borderColor = '#414868', 
  titleColor = '#9ece6a' 
}) => (
  <div className="flex flex-col w-full mb-4 font-mono text-sm sm:text-base">
    <div className="flex select-none" style={{ color: borderColor }}>
      <span>+--[&nbsp;</span>
      <span style={{ color: titleColor, fontWeight: 'bold' }}>{title}</span>
      <span>&nbsp;]</span>
      <span className="flex-1 overflow-hidden" style={{ textOverflow: 'clip', whiteSpace: 'nowrap' }}>
        {'-'.repeat(200)}
      </span>
      <span>+</span>
    </div>
    <div className="px-3 py-2 bg-[#1a1b26]/50" style={{ borderLeft: `1px solid ${borderColor}`, borderRight: `1px solid ${borderColor}` }}>
      {children}
    </div>
    <div className="flex select-none" style={{ color: borderColor }}>
      <span>+</span>
      <span className="flex-1 overflow-hidden" style={{ textOverflow: 'clip', whiteSpace: 'nowrap' }}>
        {'-'.repeat(200)}
      </span>
      <span>+</span>
    </div>
  </div>
);

export default AsciiBox;
