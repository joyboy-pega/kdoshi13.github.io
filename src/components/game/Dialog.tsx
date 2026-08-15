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
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleNext = useCallback(() => {
    if (isTyping) {
      setIsTyping(false);
      setDisplayedText(fullText);
    } else {
      if (page < content.text.length - 1) {
        setPage(prev => prev + 1);
      } else {
        onClose();
      }
    }
  }, [isTyping, fullText, page, content.text.length, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        if (e.key === 'Escape') {
          onClose();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, onClose]);

  return (
    <div 
      className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#1b2b44]/95 border-2 border-[#f0f0f0] p-3 sm:p-4 text-[#f8f8f8] z-50 shadow-2xl rounded-lg cursor-pointer min-h-[130px] font-mono select-none" 
      onClick={handleNext}
    >
      <div className="text-[#88d860] mb-1.5 uppercase tracking-wider text-sm sm:text-base font-bold flex items-center justify-between border-b border-[#88d860]/30 pb-1">
        <span>{content.title}</span>
        <span className="text-xs text-[#a9b1d6] font-normal">Page {page + 1}/{content.text.length}</span>
      </div>
      <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-mono">
        {displayedText}
      </div>
      <div className="flex justify-between items-center mt-2 text-xs text-[#7aa2f7]">
        <span>Click or [Space / Enter] to continue</span>
        {!isTyping && (
          <span className="text-[#88d860] font-bold">
            {page < content.text.length - 1 ? '[NEXT >]' : '[CLOSE]'}
          </span>
        )}
      </div>
    </div>
  );
};

export default Dialog;
