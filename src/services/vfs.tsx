import React from 'react';
import { VFSNode } from '../types';
import { CmdHelp } from '../components/terminal/commands/CmdHelp';
import { CmdWhoami } from '../components/terminal/commands/CmdWhoami';
import { CmdContact } from '../components/terminal/commands/CmdContact';
import { CmdSummary } from '../components/terminal/commands/CmdSummary';
import { CmdExperience } from '../components/terminal/commands/CmdExperience';
import { CmdProjects } from '../components/terminal/commands/CmdProjects';
import { CmdSkills } from '../components/terminal/commands/CmdSkills';
import { CmdEducation } from '../components/terminal/commands/CmdEducation';
import { summaryText, contactInfo, experience, projects, skills, education } from '../data/portfolioData';
import { auth, db, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const createInitialVFS = (onLaunchGame?: () => void): Record<string, VFSNode> => {
  return {
    home: {
      type: 'dir',
      children: {
        guest: {
          type: 'dir',
          children: {
            portfolio: {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content: (
                    <div className="text-[#a9b1d6] font-mono leading-relaxed my-2">
                      <p className="font-bold text-[#7aa2f7]"># Keval Doshi Portfolio (KevalOS)</p>
                      <p className="mt-1">Welcome! You can explore my experience and projects using standard terminal commands or launch the 2D retro RPG game.</p>
                      <p className="mt-1 text-[#9ece6a]">Tip: Type <span className="underline">./game.sh</span> or <span className="underline">game</span> to enter RPG mode.</p>
                    </div>
                  ),
                  rawContent: `# Keval Doshi Portfolio\nWelcome to KevalOS! Run ./game.sh to play the interactive RPG resume.`
                },
                'summary.txt': { 
                  type: 'file', 
                  content: <CmdSummary />,
                  rawContent: summaryText
                },
                'contact.json': { 
                  type: 'file', 
                  content: <CmdContact />,
                  rawContent: JSON.stringify(contactInfo, null, 2)
                },
                'skills.yml': { 
                  type: 'file', 
                  content: <CmdSkills />,
                  rawContent: Object.entries(skills).map(([k, v]) => `${k}:\n  - ${v.join('\n  - ')}`).join('\n')
                },
                'experience.sh': { 
                  type: 'exec', 
                  content: <CmdExperience />,
                  rawContent: `#!/bin/bash\n# Experience records\necho "${experience.map(e => `${e.role} @ ${e.company} (${e.period})`).join('\n')}"`
                },
                'projects.sh': { 
                  type: 'exec', 
                  content: <CmdProjects />,
                  rawContent: `#!/bin/bash\n# Projects list\necho "${projects.map(p => `${p.name} - ${p.tech}`).join('\n')}"`
                },
                'education.sh': { 
                  type: 'exec', 
                  content: <CmdEducation />,
                  rawContent: `#!/bin/bash\n# Academic records\necho "${education.map(e => `${e.degree} - ${e.school}`).join('\n')}"`
                },
                'game.sh': {
                  type: 'exec',
                  content: (
                    <div className="my-2 text-[#9ece6a] font-mono">
                      <span>🎮 Initializing Keval's Legend 2D RPG Adventure...</span>
                    </div>
                  ),
                  rawContent: `#!/bin/bash\n# Launch 2D RPG\nopen_game_engine`
                }
              }
            }
          }
        }
      }
    }
  };
};

export const resolvePath = (cwd: string, target: string): string => {
  if (!target) return cwd;
  let p = target.startsWith('/') ? target : `${cwd}/${target}`;
  p = p.replace(/^~/, '/home/guest');
  const parts = p.split('/').filter(Boolean);
  const res: string[] = [];
  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') res.pop();
    else res.push(part);
  }
  return '/' + res.join('/');
};

export const getNode = (root: Record<string, VFSNode>, path: string): VFSNode | null => {
  if (path === '/') return { type: 'dir', children: root };
  const parts = path.split('/').filter(Boolean);
  let curr: VFSNode = { type: 'dir', children: root };
  for (const part of parts) {
    if (curr.type !== 'dir' || !curr.children || !curr.children[part]) return null;
    curr = curr.children[part];
  }
  return curr;
};

export const getParentPath = (path: string): string => {
  const parts = path.split('/').filter(Boolean);
  parts.pop();
  return '/' + parts.join('/');
};

export const getBaseName = (path: string): string => {
  const parts = path.split('/').filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : '';
};

export interface ExecuteOptions {
  cmdStr: string;
  cwd: string;
  setCwd: (p: string) => void;
  vfs: Record<string, VFSNode>;
  setVfs: React.Dispatch<React.SetStateAction<Record<string, VFSNode>>>;
  cmdHistory: string[];
  currentUser: any;
  onLaunchGame: () => void;
}

export const executeCommand = async ({
  cmdStr,
  cwd,
  setCwd,
  vfs,
  setVfs,
  cmdHistory,
  currentUser,
  onLaunchGame
}: ExecuteOptions): Promise<React.ReactNode | null> => {
  let cmdToRun = cmdStr;
  let redirectTarget = '';
  let append = false;

  const appendMatch = cmdStr.match(/^(.*?)\s*>>\s*([^\s]+)$/);
  if (appendMatch) {
    cmdToRun = appendMatch[1];
    redirectTarget = appendMatch[2];
    append = true;
  } else {
    const redirectMatch = cmdStr.match(/^(.*?)\s*>\s*([^\s]+)$/);
    if (redirectMatch) {
      cmdToRun = redirectMatch[1];
      redirectTarget = redirectMatch[2];
    }
  }

  const args = cmdToRun.trim().match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  if (args.length === 0) return null;

  const cmd = args[0].toLowerCase();
  const unquote = (s: string) => s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1) : s;

  switch (cmd) {
    case 'help': 
      return <CmdHelp />;
    case 'whoami': 
      return <CmdWhoami user={currentUser} />;
    case 'summary': 
      return <CmdSummary />;
    case 'contact': 
      return <CmdContact />;
    case 'experience': 
      return <CmdExperience />;
    case 'projects': 
      return <CmdProjects />;
    case 'skills': 
      return <CmdSkills />;
    case 'education': 
      return <CmdEducation />;
    case 'pwd': 
      return <div className="my-2 text-[#a9b1d6]">{cwd}</div>;
    case 'date': 
      return <div className="my-2 text-[#a9b1d6]">{new Date().toString()}</div>;
    case 'uname': 
      return <div className="my-2 text-[#a9b1d6]">KevalOS 1.2 (Linux-compatible via BrowserVFS + React 19)</div>;
    case 'sudo': 
      return <div className="my-2 text-[#f7768e]">guest is not in the sudoers file. This incident will be reported.</div>;
    
    case 'game':
    case 'play':
    case 'rpg': {
      onLaunchGame();
      return (
        <div className="my-2 text-[#9ece6a] font-mono">
          <span>🎮 Switching to Keval's Legend (2D RPG Adventure Mode)...</span>
        </div>
      );
    }

    case 'echo': {
      const text = args.slice(1).map(unquote).join(' ');
      if (redirectTarget) {
        const targetPath = resolvePath(cwd, redirectTarget);
        const pNode = getNode(vfs, getParentPath(targetPath));
        const name = getBaseName(targetPath);
        
        if (pNode && pNode.type === 'dir') {
          if (!pNode.children) pNode.children = {};
          
          let newRawContent = text;
          if (append && pNode.children[name] && pNode.children[name].type === 'file') {
            const existingRaw = pNode.children[name].rawContent || '';
            newRawContent = existingRaw + '\n' + text;
            pNode.children[name].content = <div className="whitespace-pre-wrap text-[#a9b1d6]">{newRawContent}</div>;
            pNode.children[name].rawContent = newRawContent;
          } else {
            pNode.children[name] = { 
              type: 'file', 
              content: <div className="whitespace-pre-wrap text-[#a9b1d6]">{text}</div>, 
              rawContent: text 
            };
          }
          
          setVfs({ ...vfs });

          if (currentUser) {
            try {
              await addDoc(collection(db, 'files'), {
                userId: currentUser.uid,
                path: targetPath,
                content: newRawContent,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              });
            } catch (e) {
              console.error("Failed to sync file to Firestore", e);
            }
          }
          return null;
        } else {
          return <div className="my-2 text-[#f7768e]">bash: {redirectTarget}: No such file or directory</div>;
        }
      }
      return <div className="my-2 text-[#a9b1d6]">{text}</div>;
    }

    case 'cd': {
      const target = args[1] ? unquote(args[1]) : '~';
      const p = resolvePath(cwd, target);
      const node = getNode(vfs, p);
      if (!node) return <div className="my-2 text-[#f7768e]">cd: {target}: No such file or directory</div>;
      if (node.type !== 'dir') return <div className="my-2 text-[#f7768e]">cd: {target}: Not a directory</div>;
      setCwd(p);
      return null;
    }

    case 'ls': {
      let target = cwd;
      let isLong = false;
      let isAll = false;
      
      for (let i = 1; i < args.length; i++) {
        if (args[i].startsWith('-')) {
          if (args[i].includes('l')) isLong = true;
          if (args[i].includes('a')) isAll = true;
        } else {
          target = resolvePath(cwd, unquote(args[i]));
        }
      }
      
      const node = getNode(vfs, target);
      if (!node) return <div className="my-2 text-[#f7768e]">ls: cannot access '{target}': No such file or directory</div>;
      if (node.type !== 'dir') return <div className="my-2 text-[#a9b1d6]">{getBaseName(target)}</div>;
      
      const children = node.children || {};
      let keys = Object.keys(children).sort();
      if (!isAll) keys = keys.filter(k => !k.startsWith('.'));
      
      if (keys.length === 0) return null;
      
      if (isLong) {
        return (
          <div className="my-2 text-[#a9b1d6] font-mono whitespace-pre overflow-x-auto text-xs sm:text-sm">
            {keys.map(k => {
              const child = children[k];
              const perms = child.type === 'dir' ? 'drwxr-xr-x' : child.type === 'exec' ? '-rwxr-xr-x' : '-rw-r--r--';
              const color = child.type === 'dir' ? 'text-[#7aa2f7]' : child.type === 'exec' ? 'text-[#9ece6a] font-bold' : 'text-[#a9b1d6]';
              return <div key={k}>{perms} 1 guest guest 4096 Aug 15 10:00 <span className={color}>{k}</span></div>;
            })}
          </div>
        );
      }
      
      return (
        <div className="my-2 text-[#a9b1d6] flex flex-wrap gap-4 font-mono">
          {keys.map(k => {
            const child = children[k];
            const color = child.type === 'dir' ? 'text-[#7aa2f7]' : child.type === 'exec' ? 'text-[#9ece6a] font-bold' : 'text-[#a9b1d6]';
            return <span key={k} className={color}>{k}</span>;
          })}
        </div>
      );
    }

    case 'cat': {
      if (args.length < 2) return <div className="my-2 text-[#f7768e]">cat: missing file operand</div>;
      const target = resolvePath(cwd, unquote(args[1]));
      const node = getNode(vfs, target);
      if (!node) return <div className="my-2 text-[#f7768e]">cat: {args[1]}: No such file or directory</div>;
      if (node.type === 'dir') return <div className="my-2 text-[#f7768e]">cat: {args[1]}: Is a directory</div>;
      return <div className="my-2">{node.content || node.rawContent}</div>;
    }

    case 'mkdir': {
      if (args.length < 2) return <div className="my-2 text-[#f7768e]">mkdir: missing operand</div>;
      const target = resolvePath(cwd, unquote(args[1]));
      const pNode = getNode(vfs, getParentPath(target));
      const name = getBaseName(target);
      if (!pNode || pNode.type !== 'dir') return <div className="my-2 text-[#f7768e]">mkdir: cannot create directory '{args[1]}': No such file or directory</div>;
      if (!pNode.children) pNode.children = {};
      if (pNode.children[name]) return <div className="my-2 text-[#f7768e]">mkdir: cannot create directory '{args[1]}': File exists</div>;
      pNode.children[name] = { type: 'dir', children: {} };
      setVfs({ ...vfs });
      return null;
    }

    case 'touch': {
      if (args.length < 2) return <div className="my-2 text-[#f7768e]">touch: missing operand</div>;
      const target = resolvePath(cwd, unquote(args[1]));
      const pNode = getNode(vfs, getParentPath(target));
      const name = getBaseName(target);
      if (!pNode || pNode.type !== 'dir') return <div className="my-2 text-[#f7768e]">touch: cannot touch '{args[1]}': No such file or directory</div>;
      if (!pNode.children) pNode.children = {};
      if (!pNode.children[name]) {
        pNode.children[name] = { type: 'file', content: '', rawContent: '' };
        setVfs({ ...vfs });
        
        if (currentUser) {
          try {
            await addDoc(collection(db, 'files'), {
              userId: currentUser.uid,
              path: target,
              content: '',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          } catch (e) {
            console.error("Failed to sync file to Firestore", e);
          }
        }
      }
      return null;
    }

    case 'history': {
      return (
        <div className="my-2 text-[#a9b1d6] font-mono">
          {cmdHistory.map((c, i) => (
            <div key={i}><span className="mr-4 text-[#414868]">{i + 1}</span> {c}</div>
          ))}
          <div><span className="mr-4 text-[#414868]">{cmdHistory.length + 1}</span> history</div>
        </div>
      );
    }

    case 'login': {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        return <div className="my-2 text-[#9ece6a]">Successfully logged in as {res.user?.displayName || res.user?.email}</div>;
      } catch (e: any) {
        return <div className="my-2 text-[#f7768e]">Login failed: {e.message}</div>;
      }
    }

    case 'logout': {
      await signOut(auth);
      return <div className="my-2 text-[#9ece6a]">Successfully logged out.</div>;
    }

    case 'ai': {
      const prompt = args.slice(1).map(unquote).join(' ');
      if (!prompt) return <div className="my-2 text-[#f7768e]">ai: missing query. Usage: ai "How many years of QA experience does Keval have?"</div>;
      
      try {
        const res = await fetch('/api/ai/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        
        if (!res.ok) {
          // If running statically on GitHub Pages or server endpoint not available
          return (
            <div className="my-2 text-[#e0af68] font-mono">
              <div>[AI Note] The backend server is required for live Gemini AI queries.</div>
              <div className="text-xs text-[#a9b1d6] mt-1">You can explore Keval's resume via `summary`, `experience`, `projects`, `skills`, or by launching `game`!</div>
            </div>
          );
        }
        
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        
        if (currentUser) {
          try {
            await addDoc(collection(db, 'queries'), {
              userId: currentUser.uid,
              prompt,
              response: data.text,
              createdAt: serverTimestamp()
            });
          } catch (e) {
            console.error("Failed to sync AI query to Firestore", e);
          }
        }

        return <div className="my-2 text-[#7dcfff] whitespace-pre-wrap font-mono">{data.text}</div>;
      } catch (e: any) {
        return (
          <div className="my-2 text-[#e0af68] font-mono">
            <div>AI Service response: Keval Doshi is a Test Engineer specialized in QA automation, PresentMon telemetry, and software development.</div>
            <div className="text-xs text-[#565f89] mt-1">({e.message})</div>
          </div>
        );
      }
    }

    default: {
      let target = resolvePath(cwd, cmd);
      if (cmd === './game.sh' || cmd === 'game.sh') {
        onLaunchGame();
        return <div className="my-2 text-[#9ece6a] font-mono">🎮 Launching 2D RPG Adventure mode...</div>;
      }
      
      const node = getNode(vfs, target);
      if (node) {
        if (node.type === 'exec') return <div className="my-2">{node.content}</div>;
        if (node.type === 'dir') return <div className="my-2 text-[#f7768e]">bash: {cmd}: Is a directory</div>;
        return <div className="my-2 text-[#f7768e]">bash: {cmd}: Permission denied (not executable). Try: cat {cmd}</div>;
      }

      return <div className="my-2 text-[#f7768e]">bash: {cmd}: command not found. Type 'help' for available commands or 'game' to play the RPG.</div>;
    }
  }
};
