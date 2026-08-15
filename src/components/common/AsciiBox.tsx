import React from 'react';

// TUI box-drawing characters
// Top:    ┌─┐
// Mid:    │ │
// Bottom: └─┘
// With title: ┌─[ TITLE ]──┐

interface TuiBoxProps {
  title?: string;
  children: React.ReactNode;
  titleColor?: string;
  borderColor?: string;
  className?: string;
}

export const TuiBox: React.FC<TuiBoxProps> = ({
  title,
  children,
  titleColor = '#7aa2f7',
  borderColor = '#3a3a3a',
  className = '',
}) => {
  return (
    <div className={`w-full font-mono text-sm ${className}`} style={{ color: '#c8c8c8' }}>
      {/* Top border */}
      <div className="flex items-center overflow-hidden whitespace-nowrap select-none" style={{ color: borderColor }}>
        <span>&#x250C;</span>
        {title ? (
          <>
            <span>&#x2500;</span>
            <span style={{ color: titleColor }}>[ {title} ]</span>
            <span className="flex-1 overflow-hidden" style={{ letterSpacing: 0 }}>
              {'─'.repeat(120)}
            </span>
          </>
        ) : (
          <span className="flex-1 overflow-hidden">{'─'.repeat(120)}</span>
        )}
        <span>&#x2510;</span>
      </div>

      {/* Content */}
      <div className="px-3 py-2" style={{ borderLeft: `1px solid ${borderColor}`, borderRight: `1px solid ${borderColor}` }}>
        {children}
      </div>

      {/* Bottom border */}
      <div className="flex items-center overflow-hidden whitespace-nowrap select-none" style={{ color: borderColor }}>
        <span>&#x2514;</span>
        <span className="flex-1 overflow-hidden">{'─'.repeat(120)}</span>
        <span>&#x2518;</span>
      </div>
    </div>
  );
};

// Keep AsciiBox as alias for backward compat
export const AsciiBox = TuiBox;
export default TuiBox;
