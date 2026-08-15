import React, { useState, useRef, useEffect } from 'react';
import { HistoryItem, VFSNode } from '../../types';
import { StarshipPrompt } from './StarshipPrompt';
import { BootBanner } from './BootBanner';
import { CmdWhoami } from './commands/CmdWhoami';
import { CmdSummary } from './commands/CmdSummary';
import { CmdExperience } from './commands/CmdExperience';
import { CmdProjects } from './commands/CmdProjects';
import { CmdSkills } from './commands/CmdSkills';
import { CmdEducation } from './commands/CmdEducation';
import { CmdContact } from './commands/CmdContact';
import { executeCommand, resolvePath, getNode } from '../../services/vfs';

interface TerminalProps {
  vfs: Record<string, VFSNode>;
  setVfs: React.Dispatch<React.SetStateAction<Record<string, VFSNode>>>;
  onLaunchGame: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  vfs, setVfs, onLaunchGame,
}) => {
  const [cwd, setCwd] = useState('/home/guest/portfolio');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [input, setInput] = useState('');

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 0,
      type: 'output',
      content: (
        <div className="mb-3">
          <div className="text-xs mb-2" style={{ color: '#5a5a5a' }}>
            Last login: {new Date().toDateString()} on pts/0
          </div>
          <BootBanner />
          <div className="text-sm mt-2" style={{ color: '#c8c8c8' }}>
            Type{' '}
            <span style={{ color: '#9ece6a', background: '#1a1a1a', padding: '0 4px', border: '1px solid #3a3a3a' }}>help</span>
            {' '}to list commands &mdash; type{' '}
            <span style={{ color: '#7aa2f7', background: '#1a1a1a', padding: '0 4px', border: '1px solid #3a3a3a' }}>game</span>
            {' '}to enter RPG mode
          </div>
        </div>
      ),
    },
    { id: 1,  type: 'input',  content: 'whoami',           cwd: '/home/guest/portfolio' },
    { id: 2,  type: 'output', content: <CmdWhoami /> },
    { id: 3,  type: 'input',  content: 'summary',          cwd: '/home/guest/portfolio' },
    { id: 4,  type: 'output', content: <CmdSummary /> },
    { id: 5,  type: 'input',  content: './experience.sh',  cwd: '/home/guest/portfolio' },
    { id: 6,  type: 'output', content: <CmdExperience /> },
    { id: 7,  type: 'input',  content: './projects.sh',    cwd: '/home/guest/portfolio' },
    { id: 8,  type: 'output', content: <CmdProjects /> },
    { id: 9,  type: 'input',  content: 'cat skills.yml',   cwd: '/home/guest/portfolio' },
    { id: 10, type: 'output', content: <CmdSkills /> },
    { id: 11, type: 'input',  content: './education.sh',   cwd: '/home/guest/portfolio' },
    { id: 12, type: 'output', content: <CmdEducation /> },
    { id: 13, type: 'input',  content: 'cat contact.json', cwd: '/home/guest/portfolio' },
    { id: 14, type: 'output', content: <CmdContact /> },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Only auto-scroll after a user-submitted command, never on initial render
  const shouldScroll = useRef(false);

  useEffect(() => {
    if (shouldScroll.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' });
      shouldScroll.current = false;
    }
  }, [history]);

  const handleTerminalClick = () => inputRef.current?.focus();

  const runCmd = async (cmd: string) => {
    if (!cmd.trim()) return;
    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIdx(-1);
    shouldScroll.current = true;

    const cmdId = Date.now();
    const snapshot: HistoryItem[] = [...history, { id: cmdId, type: 'input', content: cmd, cwd }];

    if (cmd.trim().toLowerCase() === 'clear') { setHistory([]); return; }

    const loadingId = cmdId + 1;
    setHistory([
      ...snapshot,
      {
        id: loadingId,
        type: 'output',
        content: <span className="text-xs" style={{ color: '#5a5a5a' }}>executing...</span>,
      },
    ]);

    const output = await executeCommand({ cmdStr: cmd, cwd, setCwd, vfs, setVfs, cmdHistory, onLaunchGame });

    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== loadingId);
      return output !== null ? [...filtered, { id: Date.now(), type: 'output', content: output }] : filtered;
    });
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input;
      setInput('');
      if (!cmd.trim()) {
        setHistory(prev => [...prev, { id: Date.now(), type: 'input', content: '', cwd }]);
        return;
      }
      await runCmd(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const idx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const idx = historyIdx + 1;
        if (idx >= cmdHistory.length) { setHistoryIdx(-1); setInput(''); }
        else { setHistoryIdx(idx); setInput(cmdHistory[idx]); }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(' ');
      const lastPart = parts[parts.length - 1];
      if (lastPart.length > 0) {
        const prefixDir = lastPart.includes('/') ? lastPart.substring(0, lastPart.lastIndexOf('/') + 1) : '';
        const searchPrefix = lastPart.includes('/') ? lastPart.substring(lastPart.lastIndexOf('/') + 1) : lastPart;
        const node = getNode(vfs, resolvePath(cwd, prefixDir || '.'));
        if (node && node.type === 'dir' && node.children) {
          const matches = Object.keys(node.children).filter(k => k.startsWith(searchPrefix));
          if (matches.length === 1) {
            let comp = matches[0];
            if (node.children[comp].type === 'dir') comp += '/';
            parts[parts.length - 1] = prefixDir + comp;
            setInput(parts.join(' '));
          }
        }
      }
    }
  };

  const quickCmds = [
    'help', 'summary', 'experience', 'projects', 'skills', 'education', 'contact', 'game', 'clear',
  ];

  const userLabel = 'guest';

  return (
    <div
      className="flex-1 w-full font-mono cursor-text"
      style={{ background: '#0d0d0d', color: '#c8c8c8' }}
      onClick={handleTerminalClick}
    >
      {/* Quick-run chip bar */}
      <div
        className="flex flex-wrap items-center px-2 py-1 gap-x-1 gap-y-0.5 select-none"
        style={{ background: '#0d0d0d', borderBottom: '1px solid #3a3a3a' }}
      >
        <span className="text-xs mr-2" style={{ color: '#5a5a5a' }}>quick:</span>
        {quickCmds.map((qc) => (
          <button
            key={qc}
            onClick={(e) => { e.stopPropagation(); runCmd(qc); }}
            className="text-xs px-2 font-mono"
            style={{
              background: 'transparent',
              border: '1px solid #3a3a3a',
              color: '#7aa2f7',
              cursor: 'pointer',
              padding: '0 6px',
              height: '18px',
              lineHeight: '18px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a1a1a'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            {qc}
          </button>
        ))}
      </div>

      {/* Output area */}
      <div className="px-3 pt-2 pb-24" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {history.map((item) => (
          <div key={item.id} className="mb-1">
            {item.type === 'input' ? (
              <div className="flex items-baseline flex-wrap">
                <StarshipPrompt cwd={item.cwd || cwd} user={userLabel} />
                <span className="text-sm" style={{ color: '#c8c8c8' }}>{item.content}</span>
              </div>
            ) : (
              <div>{item.content}</div>
            )}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-baseline mt-1 flex-wrap">
          <StarshipPrompt cwd={cwd} user={userLabel} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 font-mono text-sm"
            style={{
              background: 'transparent',
              color: '#c8c8c8',
              outline: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              caretColor: '#9ece6a',
              minWidth: '8ch',
              width: '100%',
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <div ref={bottomRef} style={{ height: '4px' }} />
      </div>
    </div>
  );
};

export default Terminal;
