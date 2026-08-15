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
import { executeCommand, resolvePath, getNode } from '../../services/vfs';

interface TerminalProps {
  vfs: Record<string, VFSNode>;
  setVfs: React.Dispatch<React.SetStateAction<Record<string, VFSNode>>>;
  currentUser: any;
  onLaunchGame: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  vfs,
  setVfs,
  currentUser,
  onLaunchGame
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
        <div className="mb-4 text-[#a9b1d6]">
          <div className="mb-2 text-xs text-[#565f89]">Last login: {new Date().toDateString()} on ttys001 (KevalOS)</div>
          <BootBanner />
          <div className="mt-2 text-sm">
            Type <span className="text-[#1a1b26] font-bold bg-[#7dcfff] px-1.5 py-0.5 rounded">help</span> to list commands, or type <span className="text-[#1a1b26] font-bold bg-[#9ece6a] px-1.5 py-0.5 rounded">game</span> to enter RPG mode.
          </div>
        </div>
      )
    },
    { id: 1, type: 'input', content: 'whoami', cwd: '/home/guest/portfolio' },
    { id: 2, type: 'output', content: <CmdWhoami user={currentUser} /> },
    { id: 3, type: 'input', content: 'cat summary.txt', cwd: '/home/guest/portfolio' },
    { id: 4, type: 'output', content: <CmdSummary /> },
    { id: 5, type: 'input', content: './experience.sh', cwd: '/home/guest/portfolio' },
    { id: 6, type: 'output', content: <CmdExperience /> },
    { id: 7, type: 'input', content: './projects.sh', cwd: '/home/guest/portfolio' },
    { id: 8, type: 'output', content: <CmdProjects /> },
    { id: 9, type: 'input', content: 'cat skills.yml', cwd: '/home/guest/portfolio' },
    { id: 10, type: 'output', content: <CmdSkills /> }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const runCommandDirectly = async (cmd: string) => {
    if (!cmd.trim()) return;
    
    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIdx(-1);

    const cmdId = Date.now();
    const newHistory: HistoryItem[] = [...history, { id: cmdId, type: 'input', content: cmd, cwd }];

    if (cmd.trim().toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    const loadingId = cmdId + 1;
    setHistory([...newHistory, { id: loadingId, type: 'output', content: <div className="my-2 text-[#565f89] font-mono">Running...</div> }]);

    const output = await executeCommand({
      cmdStr: cmd,
      cwd,
      setCwd,
      vfs,
      setVfs,
      cmdHistory,
      currentUser,
      onLaunchGame
    });

    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== loadingId);
      if (output !== null) {
        return [...filtered, { id: Date.now(), type: 'output', content: output }];
      }
      return filtered;
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
      
      await runCommandDirectly(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= cmdHistory.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(nextIdx);
          setInput(cmdHistory[nextIdx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(' ');
      const lastPart = parts[parts.length - 1];
      
      if (lastPart.length > 0) {
        const prefixDir = lastPart.includes('/') ? lastPart.substring(0, lastPart.lastIndexOf('/') + 1) : '';
        const searchPrefix = lastPart.includes('/') ? lastPart.substring(lastPart.lastIndexOf('/') + 1) : lastPart;
        
        const searchPath = resolvePath(cwd, prefixDir || '.');
        const node = getNode(vfs, searchPath);
        
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

  const quickCommands = [
    { label: 'help', cmd: 'help' },
    { label: 'summary', cmd: 'summary' },
    { label: 'experience', cmd: 'experience' },
    { label: 'projects', cmd: 'projects' },
    { label: 'skills', cmd: 'skills' },
    { label: 'education', cmd: 'education' },
    { label: 'contact', cmd: 'contact' },
    { label: 'play rpg', cmd: 'game' },
    { label: 'clear', cmd: 'clear' }
  ];

  return (
    <div 
      className="flex-1 w-full p-4 sm:p-8 md:p-12 font-mono cursor-text text-[#a9b1d6]"
      onClick={handleTerminalClick}
    >
      <div className="max-w-4xl mx-auto pb-24 relative z-10">
        
        {/* Quick Command Suggestions */}
        <div className="mb-6 flex flex-wrap items-center gap-2 select-none border-b border-[#24283b] pb-4">
          <span className="text-xs text-[#565f89] font-bold uppercase tracking-wider mr-1">Run:</span>
          {quickCommands.map((qc, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                runCommandDirectly(qc.cmd);
              }}
              className="text-xs bg-[#1f2335] hover:bg-[#2e344e] text-[#7dcfff] hover:text-white px-2.5 py-1 rounded border border-[#292e42] hover:border-[#7aa2f7] transition-all cursor-pointer shadow-sm font-semibold"
            >
              {qc.label}
            </button>
          ))}
        </div>

        {/* Command History Output */}
        {history.map((item) => (
          <div key={item.id} className="mb-2">
            {item.type === 'input' ? (
              <div className="flex flex-col sm:flex-row sm:items-center text-[#a9b1d6]">
                <StarshipPrompt cwd={item.cwd || cwd} user={currentUser ? (currentUser.displayName?.toLowerCase().replace(/\s+/g, '') || 'guest') : 'guest'} />
                <span className="font-normal whitespace-pre-wrap">{item.content}</span>
              </div>
            ) : (
              <div>{item.content}</div>
            )}
          </div>
        ))}
        
        {/* Active Command Input Line */}
        <div className="flex flex-col sm:flex-row sm:items-center mt-2">
          <StarshipPrompt cwd={cwd} user={currentUser ? (currentUser.displayName?.toLowerCase().replace(/\s+/g, '') || 'guest') : 'guest'} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-[#a9b1d6] outline-none border-none caret-[#9ece6a] shadow-none focus:ring-0 p-0 m-0 w-full font-mono text-sm sm:text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

export default Terminal;
