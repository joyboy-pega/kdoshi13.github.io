import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  borderColor?: string;
  titleColor?: string;
}

export const AsciiBox: React.FC<CardProps> = ({ 
  title, 
  children, 
  borderColor = '#292e42', 
  titleColor = '#7aa2f7' 
}) => (
  <div className="w-full mb-4 font-mono text-sm sm:text-base rounded-lg border bg-[#1f2335]/60 overflow-hidden" style={{ borderColor }}>
    <div className="px-3.5 py-1.5 bg-[#16161e] border-b flex items-center justify-between" style={{ borderColor }}>
      <span className="font-bold text-xs uppercase tracking-wider" style={{ color: titleColor }}>
        {title}
      </span>
      <span className="text-[10px] text-[#565f89]">system.out</span>
    </div>
    <div className="p-3.5">
      {children}
    </div>
  </div>
);

export default AsciiBox;
