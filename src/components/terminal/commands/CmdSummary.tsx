import React from 'react';
import { summaryText } from '../../../data/portfolioData';

export const CmdSummary: React.FC = () => {
  // Split text into ~72-char wrapped lines for TUI feel
  const wrap = (text: string, width: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      if ((current + (current ? ' ' : '') + word).length > width) {
        if (current) lines.push(current);
        current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  const lines = wrap(summaryText, 72);

  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌─[ SUMMARY.TXT ]' + '─'.repeat(44) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a', padding: '4px 8px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: '#c8c8c8' }}>{line}</div>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default CmdSummary;
