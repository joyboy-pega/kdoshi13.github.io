import { useState, useEffect, useCallback } from 'react';

interface DialogProps {
  content: { title: string; text: string[] };
  onClose: () => void;
}

export default function Dialog({ content, onClose }: DialogProps) {
  const [page, setPage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullText = content.text[page];

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
    }, 25);

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
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); 
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext]);

  return (
    <div 
      className="absolute bottom-4 left-4 right-4 bg-[#203858] border-[6px] border-[#f8f8f8] p-4 text-[#f8f8f8] z-50 shadow-lg rounded-xl cursor-pointer min-h-[140px] font-vt323" 
      onClick={handleNext}
    >
      <div className="text-[#88d860] mb-1 uppercase tracking-widest text-2xl font-bold flex items-center gap-2 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
        {content.title}
      </div>
      <div className="text-2xl leading-tight whitespace-pre-wrap drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
        {displayedText}
      </div>
      {!isTyping && (
        <div className="absolute bottom-2 right-4 text-[#88d860] animate-pulse text-2xl drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
          ▼
        </div>
      )}
    </div>
  );
}
