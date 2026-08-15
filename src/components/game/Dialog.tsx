import React, { useState, useEffect, useCallback } from 'react';

interface DialogProps {
  content: { title: string; text: string[] };
  onClose: () => void;
}

export const Dialog: React.FC<DialogProps> = ({ content, onClose }) => {
  const [page, setPage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullText = content.text[page] || '';

  useEffect(() => {
    let i = 0;
    setIsTyping(true);
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) { clearInterval(interval); setIsTyping(false); }
    }, 18);
    return () => clearInterval(interval);
  }, [fullText]);

  const handleNext = useCallback(() => {
    if (isTyping) { setIsTyping(false); setDisplayedText(fullText); }
    else if (page < content.text.length - 1) setPage(p => p + 1);
    else onClose();
  }, [isTyping, fullText, page, content.text.length, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleNext(); }
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, onClose]);

  const line = '─'.repeat(56);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 font-mono text-sm cursor-pointer select-none"
      style={{ background: '#0d0d0d', border: '1px solid #7aa2f7', zIndex: 50 }}
      onClick={handleNext}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-2 py-0.5" style={{ background: '#264f78', color: '#fff', borderBottom: '1px solid #7aa2f7' }}>
        <span style={{ color: '#ffffff' }}>{'[ ' + content.title + ' ]'}</span>
        <span style={{ color: '#88c0d0', fontSize: '11px' }}>{page + 1} / {content.text.length}</span>
      </div>

      {/* Text content */}
      <div className="px-3 py-2" style={{ minHeight: '80px', color: '#c8c8c8' }}>
        <pre className="whitespace-pre-wrap font-mono text-sm" style={{ margin: 0 }}>
          {displayedText}
          {isTyping && <span className="cursor-blink">_</span>}
        </pre>
      </div>

      {/* Bottom status */}
      <div className="flex items-center justify-between px-2 py-0.5" style={{ borderTop: '1px solid #3a3a3a', color: '#5a5a5a', fontSize: '11px' }}>
        <span>[Space] / [Enter] to continue  &mdash;  [Esc] to close</span>
        {!isTyping && (
          <span style={{ color: '#9ece6a' }}>
            {page < content.text.length - 1 ? '[ NEXT > ]' : '[ CLOSE ]'}
          </span>
        )}
      </div>
    </div>
  );
};

export default Dialog;
