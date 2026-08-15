import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  onClose: () => void;
}

// Thin word-wrapper for TUI display
function wrapText(text: string, width: number): string[] {
  const lines: string[] = [];
  for (const rawLine of text.split('\n')) {
    if (rawLine.length <= width) { lines.push(rawLine); continue; }
    const words = rawLine.split(' ');
    let cur = '';
    for (const w of words) {
      if ((cur + (cur ? ' ' : '') + w).length > width) {
        if (cur) lines.push(cur);
        cur = w;
      } else {
        cur = cur ? `${cur} ${w}` : w;
      }
    }
    if (cur) lines.push(cur);
  }
  return lines;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json() as { text?: string; error?: string };
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.text || data.error || 'No response.' },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '[error] Failed to reach chat API.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
    if (e.key === 'Escape') onClose();
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Hello. Ask me anything.' }]);
  };

  const WRAP = 48;

  return (
    <div
      className="fixed top-0 right-0 bottom-0 flex flex-col font-mono text-xs z-50"
      style={{
        width: '360px',
        background: '#0d0d0d',
        borderLeft: '1px solid #7aa2f7',
        color: '#c8c8c8',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-2 flex-shrink-0"
        style={{ background: '#264f78', borderBottom: '1px solid #7aa2f7', height: '22px' }}
      >
        <span style={{ color: '#ffffff' }}>[ AI CHAT ]</span>
        <div className="flex items-center gap-x-2">
          <button
            onClick={clearChat}
            style={{ background: 'transparent', border: 'none', color: '#88c0d0', cursor: 'pointer', fontFamily: 'monospace', fontSize: '11px' }}
          >
            clear
          </button>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#f7768e', cursor: 'pointer', fontFamily: 'monospace', fontSize: '11px' }}
          >
            [x]
          </button>
        </div>
      </div>

      {/* Message list */}
      <div
        className="flex-1 overflow-y-auto px-2 py-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#3a3a3a #0d0d0d' }}
      >
        {messages.map((msg, i) => {
          const isUser = msg.role === 'user';
          const prefix = isUser ? 'you > ' : 'ai  > ';
          const prefixColor = isUser ? '#9ece6a' : '#7aa2f7';
          const lines = wrapText(msg.content, WRAP);
          return (
            <div key={i} className="mb-3">
              {lines.map((line, li) => (
                <div key={li} className="flex">
                  <span
                    style={{
                      color: prefixColor,
                      minWidth: '6ch',
                      flexShrink: 0,
                      opacity: li === 0 ? 1 : 0,   // only show prefix on first line
                      userSelect: 'none',
                    }}
                  >
                    {li === 0 ? prefix : '      '}
                  </span>
                  <span style={{ color: isUser ? '#e0af68' : '#c8c8c8', wordBreak: 'break-word' }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          );
        })}

        {loading && (
          <div className="flex mb-2">
            <span style={{ color: '#7aa2f7', minWidth: '6ch' }}>ai  &gt; </span>
            <span style={{ color: '#5a5a5a' }}>
              {'...'}
              <span className="cursor-blink">_</span>
            </span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #3a3a3a', color: '#3a3a3a', padding: '0 8px' }}>
        {'─'.repeat(50)}
      </div>

      {/* Input row */}
      <div
        className="flex items-center px-2 flex-shrink-0"
        style={{ height: '28px', borderTop: '1px solid #3a3a3a' }}
      >
        <span style={{ color: '#9ece6a', marginRight: '4px', flexShrink: 0 }}>you &gt;</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 font-mono text-xs"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e0af68',
            caretColor: '#9ece6a',
          }}
          placeholder="type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            background: 'transparent',
            border: '1px solid #3a3a3a',
            color: loading || !input.trim() ? '#3a3a3a' : '#7aa2f7',
            cursor: loading || !input.trim() ? 'default' : 'pointer',
            fontFamily: 'monospace',
            fontSize: '11px',
            padding: '0 6px',
            height: '18px',
            flexShrink: 0,
          }}
        >
          send
        </button>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center px-2 flex-shrink-0"
        style={{ background: '#0d0d0d', borderTop: '1px solid #3a3a3a', height: '16px', color: '#5a5a5a', fontSize: '10px' }}
      >
        [Enter] send &nbsp; [Esc] close &nbsp; powered by Groq / qwen3.6-27b
      </div>
    </div>
  );
};

export default ChatPanel;
