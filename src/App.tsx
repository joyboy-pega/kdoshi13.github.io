import React, { useState, useRef, useEffect } from 'react';
import { auth, db, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

const skills = {
  "Programming Languages": ["C", "C++", "Python", "Java", "HTML", "CSS", "JavaScript", "SQL", "React Native", "GDScript"],
  "Databases": ["Oracle DB", "MySQL", "SQLite"],
  "Operating Systems": ["Windows", "Linux"],
  "Testing & QA": ["Game QA", "Telemetry Analysis", "Performance Profiling", "Bug Tracking", "Quality Assurance", "Software Testing"]
};

const experience = [
  { 
    role: "Test Engineer", 
    company: "Globalstep", 
    period: "Jan 2026 - Present", 
    items: [
      "Performing software testing and quality assurance activities.", 
      "Streamlined bug reporting workflows by integrating real-time telemetry, hardware diagnostics (PresentMon), and automated video capture.", 
      "Enhanced testing cycle efficiency by automating data filing and performance profiling."
    ] 
  },
  { 
    role: "Legal Assistant", 
    company: "Simplify S", 
    period: "May 2024 - Oct 2024", 
    items: [
      "Managed and organized customer personal documents, ensuring accuracy and confidentiality of sensitive records.", 
      "Handled client correspondence via email and phone, addressing queries and providing timely status updates.", 
      "Maintained organized digital record-keeping systems to support efficient tracking and retrieval of client files."
    ] 
  }
];

const projects = [
  { 
    name: "ClipBug", 
    tech: "Telemetry Analysis, PresentMon, Automation", 
    desc: "Developed a unified desktop client for automated game QA that streamlined bug reporting workflows by integrating real-time telemetry, hardware diagnostics, and automated video capture." 
  },
  { 
    name: "Adventure of Kaya", 
    tech: "Godot Engine (v3.5.2), GDScript", 
    desc: "Created a 2D action-adventure game featuring quest mechanics, enemy AI, inventory systems, and sprite-based animations." 
  },
  { 
    name: "First Trip", 
    tech: "React Native, Expo, JavaScript, Supabase", 
    desc: "Developed a mobile application for travel experience sharing and ride-sharing with real-time synchronization." 
  },
  { 
    name: "Sales Management", 
    tech: "Python, Tkinter, SQLite3, Pillow", 
    desc: "Designed a desktop solution for small businesses to manage inventory, generate invoices, and produce daily sales reports." 
  }
];

const education = [
  { degree: "Master of Computer Applications (MCA)", school: "Modern College of Engineering", period: "July 2024 - Present", detail: "" },
  { degree: "Bachelor of Business Administration (Computer Application)", school: "MMCC", period: "July 2020 - July 2023", detail: "CGPA: 8.89" },
  { degree: "12th HSC", school: "SMT S.T.K Gujarati Junior College, Amravati", period: "July 2019 - Feb 2020", detail: "75.85%" },
  { degree: "10th SSC", school: "M.G.H.S", period: "July 2017 - Feb 2018", detail: "76.20%" }
];

// --- Command Output Components ---

const AsciiBox = ({ title, children, borderColor = '#414868', titleColor = '#9ece6a' }: any) => (
  <div className="flex flex-col w-full mb-4 font-mono text-sm sm:text-base">
    <div className="flex select-none" style={{ color: borderColor }}>
      <span>+--[&nbsp;</span>
      <span style={{ color: titleColor, fontWeight: 'bold' }}>{title}</span>
      <span>&nbsp;]</span>
      <span className="flex-1 overflow-hidden" style={{ textOverflow: 'clip', whiteSpace: 'nowrap' }}>
        {'-'.repeat(200)}
      </span>
      <span>+</span>
    </div>
    <div className="px-3 py-2" style={{ borderLeft: `1px solid ${borderColor}`, borderRight: `1px solid ${borderColor}` }}>
      {children}
    </div>
    <div className="flex select-none" style={{ color: borderColor }}>
      <span>+</span>
      <span className="flex-1 overflow-hidden" style={{ textOverflow: 'clip', whiteSpace: 'nowrap' }}>
        {'-'.repeat(200)}
      </span>
      <span>+</span>
    </div>
  </div>
);

const CmdHelp = () => (
  <div className="my-4 text-[#a9b1d6] font-mono whitespace-pre overflow-x-auto text-sm sm:text-base">
{`+-----------------+------------------------------------------+
| COMMAND         | DESCRIPTION                              |
+-----------------+------------------------------------------+
| whoami          | Display user info                        |
| ls              | List files and executables               |
| cd <dir>        | Change directory                         |
| pwd             | Print working directory                  |
| cat <file>      | Read a text file                         |
| echo <str>      | Print string (supports > and >>)         |
| touch <file>    | Create an empty file                     |
| mkdir <dir>     | Create a directory                       |
| date            | Print current date                       |
| history         | View command history                     |
| ./<script>      | Execute a script                         |
| clear           | Clear terminal window                    |
| login           | Login with Google (saves AI queries)     |
| logout          | Logout of current session                |
| ai <query>      | Ask the AI assistant a question          |
+-----------------+------------------------------------------+`}
  </div>
);

const CmdWhoami = () => (
  <div className="my-4 text-[#a9b1d6] font-mono whitespace-pre overflow-x-auto text-sm sm:text-base">
{`+-------------------------------------------------------------+
| USER PROFILE: Keval Doshi                                   |
+-------------------------------------------------------------+
| [ ROLE ]      Test Engineer & Software Developer            |
| [ DOMAIN ]    QA, Game Telemetry, Software Automation       |
| [ STATUS ]    ACTIVE                                        |
|                                                             |
| "Ensuring software quality through telemetry & automation"  |
+-------------------------------------------------------------+`}
  </div>
);

const CmdContact = () => (
  <div className="my-4 text-[#7dcfff] font-mono whitespace-pre overflow-x-auto text-sm sm:text-base">
{`+--[ CONTACT_INFO ]------------------------+
|                                          |
|  EMAIL:  kevaldoshi34223@gmail.com       |
|  PHONE:  7887554305                      |
|  LOC:    Hadapsar, Pune                  |
|                                          |
+------------------------------------------+`}
  </div>
);

const CmdSummary = () => (
  <AsciiBox title="SUMMARY.TXT" borderColor="#414868" titleColor="#7dcfff">
    <p className="text-[#a9b1d6] leading-relaxed">
      Motivated Test Engineer and BBA in Computer Applications graduate with a strong foundation in Game QA, programming, and software development. Currently pursuing an MCA, with hands-on experience developing automated testing tools and streamlining quality assurance workflows. Skilled in telemetry analysis and performance profiling to deliver high-quality, evidence-backed bug reports in dynamic development environments.
    </p>
  </AsciiBox>
);

const CmdExperience = () => (
  <div className="my-4 text-[#a9b1d6] font-mono text-sm sm:text-base">
    <div className="mb-2 text-[#7aa2f7] font-bold">
      [ SYSTEM LOG: EXPERIENCE HISTORY ]
    </div>
    {experience.map((exp, idx) => (
      <div key={idx} className="mb-4">
        <div className="text-[#9ece6a]">
          ===&gt; {exp.role} <span className="text-[#bb9af7]">@ {exp.company}</span>
        </div>
        <div className="text-[#ff9e64] mb-1">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ {exp.period} ]
        </div>
        {exp.items.map((item, i) => (
          <div key={i} className="flex">
            <div className="text-[#414868] font-bold mr-2 ml-4"> | </div>
            <div className="flex-1">- {item}</div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const CmdProjects = () => (
  <div className="my-4 font-mono text-sm sm:text-base">
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((proj, idx) => (
        <AsciiBox key={idx} title={`./${proj.name.toLowerCase().replace(/ /g, '_')}`} borderColor="#414868" titleColor="#9ece6a">
          <div className="text-[#ff9e64] mb-2 font-bold text-xs uppercase tracking-wider">
            &gt; {proj.tech}
          </div>
          <div className="text-[#a9b1d6] text-sm">
            {proj.desc}
          </div>
        </AsciiBox>
      ))}
    </div>
  </div>
);

const CmdSkills = () => (
  <div className="my-4 font-mono text-sm sm:text-base">
    <div className="grid sm:grid-cols-2 gap-4">
      {Object.entries(skills).map(([category, items], idx) => (
        <AsciiBox key={idx} title={category.toUpperCase()} borderColor="#414868" titleColor="#bb9af7">
          <div className="flex flex-wrap gap-2">
            {items.map((skill, i) => (
              <span key={i} className="text-[#7dcfff] text-sm">
                [{skill}]
              </span>
            ))}
          </div>
        </AsciiBox>
      ))}
    </div>
  </div>
);

const CmdEducation = () => (
  <div className="my-4 font-mono text-sm sm:text-base">
    <div className="mb-4 text-[#7aa2f7] font-bold">
      [ ACADEMIC RECORDS ]
    </div>
    {education.map((edu, idx) => (
      <div key={idx} className="mb-3">
        <div className="text-[#7dcfff] font-bold">
          * {edu.degree}
        </div>
        <div className="text-[#a9b1d6] ml-4">
          - {edu.school}
        </div>
        <div className="flex flex-wrap justify-between items-center ml-4 mt-1 gap-2">
          <div className="text-[#ff9e64] text-sm">
            [ {edu.period} ]
          </div>
          {edu.detail && (
            <div className="text-[#9ece6a] text-sm">
              &gt; DATA: {edu.detail}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

const BootBanner = () => {
  const ascii = ` _  __               _   ____            _     _ 
| |/ /_____   ____ _| | |  _ \\  ___  ___| |__ (_)
| ' // _ \\ \\ / / _\` | | | | | |/ _ \\/ __| '_ \\| |
| . \\  __/\\ V / (_| | | | |_| | (_) \\__ \\ | | | |
|_|\\_\\___| \\_/ \\__,_|_| |____/ \\___/|___/_| |_|_|`;

  return (
    <div className="mb-6 mt-2 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start text-[#a9b1d6]">
      <pre className="text-[#7aa2f7] font-bold text-xs sm:text-sm leading-tight select-none">
        {ascii}
      </pre>
      <div className="flex flex-col gap-1 text-sm">
        <div><span className="text-[#7aa2f7] font-bold">OS</span>: KevalOS v1.0 (BrowserVFS)</div>
        <div><span className="text-[#7aa2f7] font-bold">Host</span>: Starship Terminal</div>
        <div><span className="text-[#7aa2f7] font-bold">Kernel</span>: Web 5.0 (React 18)</div>
        <div><span className="text-[#7aa2f7] font-bold">Uptime</span>: 99 days, 23 hours, 42 mins</div>
        <div><span className="text-[#7aa2f7] font-bold">Packages</span>: 42 (npm)</div>
        <div><span className="text-[#7aa2f7] font-bold">Shell</span>: bash 5.1.16</div>
        <div><span className="text-[#7aa2f7] font-bold">Theme</span>: Tokyo Night</div>
        <div className="flex gap-1 mt-1">
          <div className="w-4 h-4 bg-[#1a1b26] rounded-sm"></div>
          <div className="w-4 h-4 bg-[#f7768e] rounded-sm"></div>
          <div className="w-4 h-4 bg-[#9ece6a] rounded-sm"></div>
          <div className="w-4 h-4 bg-[#e0af68] rounded-sm"></div>
          <div className="w-4 h-4 bg-[#7aa2f7] rounded-sm"></div>
          <div className="w-4 h-4 bg-[#bb9af7] rounded-sm"></div>
          <div className="w-4 h-4 bg-[#7dcfff] rounded-sm"></div>
          <div className="w-4 h-4 bg-[#a9b1d6] rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

const StarshipPrompt = ({ cwd }: { cwd: string }) => {
  const displayCwd = cwd.replace(/^\/home\/guest/, '~');
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 select-none font-bold sm:mr-2">
      <span className="text-[#9ece6a]">guest</span>
      <span className="text-[#a9b1d6] font-normal">in</span>
      <span className="text-[#7dcfff]">{displayCwd}</span>
      <span className="text-[#a9b1d6] font-normal">on</span>
      <span className="text-[#bb9af7]">⎇ main</span>
      <span className="text-[#9ece6a] font-normal text-lg leading-none">❯</span>
    </div>
  );
};

// --- Virtual File System ---

type VFSNode = {
  type: 'dir' | 'file' | 'exec';
  content?: string | React.ReactNode;
  rawContent?: string;
  children?: Record<string, VFSNode>;
};

let vfsRoot: Record<string, VFSNode> = {
  home: {
    type: 'dir',
    children: {
      guest: {
        type: 'dir',
        children: {
          portfolio: {
            type: 'dir',
            children: {
              'contact.json': { type: 'file', content: <CmdContact /> },
              'summary.txt': { type: 'file', content: <CmdSummary /> },
              'skills.yml': { type: 'file', content: <CmdSkills /> },
              'education.sh': { type: 'exec', content: <CmdEducation /> },
              'experience.sh': { type: 'exec', content: <CmdExperience /> },
              'projects.sh': { type: 'exec', content: <CmdProjects /> },
            }
          }
        }
      }
    }
  }
};

const resolvePath = (cwd: string, target: string) => {
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

const getNode = (path: string): VFSNode | null => {
  if (path === '/') return { type: 'dir', children: vfsRoot };
  const parts = path.split('/').filter(Boolean);
  let curr: VFSNode = { type: 'dir', children: vfsRoot };
  for (const part of parts) {
    if (curr.type !== 'dir' || !curr.children || !curr.children[part]) return null;
    curr = curr.children[part];
  }
  return curr;
};

const getParentPath = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  parts.pop();
  return '/' + parts.join('/');
};

const getBaseName = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : '';
};

const executeCommand = async (cmdStr: string, cwd: string, setCwd: (p: string) => void, cmdHistory: string[], currentUser: any): Promise<React.ReactNode | null> => {
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
    case 'help': return <CmdHelp />;
    case 'whoami': return <div className="my-2 text-[#a9b1d6]">guest</div>;
    case 'pwd': return <div className="my-2 text-[#a9b1d6]">{cwd}</div>;
    case 'date': return <div className="my-2 text-[#a9b1d6]">{new Date().toString()}</div>;
    case 'uname': return <div className="my-2 text-[#a9b1d6]">KevalOS (Linux-compatible via BrowserVFS)</div>;
    case 'sudo': return <div className="my-2 text-[#f7768e]">guest is not in the sudoers file. This incident will be reported.</div>;
    
    case 'echo': {
      const text = args.slice(1).map(unquote).join(' ');
      if (redirectTarget) {
        const targetPath = resolvePath(cwd, redirectTarget);
        const pNode = getNode(getParentPath(targetPath));
        const name = getBaseName(targetPath);
        
        if (pNode && pNode.type === 'dir') {
          if (!pNode.children) pNode.children = {};
          
          let newRawContent = text;
          if (append && pNode.children[name] && pNode.children[name].type === 'file') {
            const existingRaw = pNode.children[name].rawContent || '';
            newRawContent = existingRaw + '\n' + text;
            const existing = pNode.children[name].content;
            pNode.children[name].content = <>{existing}<div className="whitespace-pre-wrap text-[#a9b1d6]">{text}</div></>;
            pNode.children[name].rawContent = newRawContent;
          } else {
            pNode.children[name] = { type: 'file', content: <div className="whitespace-pre-wrap text-[#a9b1d6]">{text}</div>, rawContent: text };
          }
          
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
      const node = getNode(p);
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
      
      const node = getNode(target);
      if (!node) return <div className="my-2 text-[#f7768e]">ls: cannot access '{target}': No such file or directory</div>;
      if (node.type !== 'dir') return <div className="my-2 text-[#a9b1d6]">{getBaseName(target)}</div>;
      
      const children = node.children || {};
      let keys = Object.keys(children).sort();
      if (!isAll) keys = keys.filter(k => !k.startsWith('.'));
      
      if (keys.length === 0) return null;
      
      if (isLong) {
        return (
          <div className="my-2 text-[#a9b1d6] font-mono whitespace-pre overflow-x-auto">
            {keys.map(k => {
              const child = children[k];
              const perms = child.type === 'dir' ? 'drwxr-xr-x' : child.type === 'exec' ? '-rwxr-xr-x' : '-rw-r--r--';
              const color = child.type === 'dir' ? 'text-[#7aa2f7]' : child.type === 'exec' ? 'text-[#9ece6a] font-bold' : 'text-[#a9b1d6]';
              return <div key={k}>{perms} 1 guest guest 4096 Aug 12 10:00 <span className={color}>{k}</span></div>;
            })}
          </div>
        );
      }
      
      return (
        <div className="my-2 text-[#a9b1d6] flex flex-wrap gap-4">
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
      const node = getNode(target);
      if (!node) return <div className="my-2 text-[#f7768e]">cat: {args[1]}: No such file or directory</div>;
      if (node.type === 'dir') return <div className="my-2 text-[#f7768e]">cat: {args[1]}: Is a directory</div>;
      return <div className="my-2">{node.content}</div>;
    }

    case 'mkdir': {
      if (args.length < 2) return <div className="my-2 text-[#f7768e]">mkdir: missing operand</div>;
      const target = resolvePath(cwd, unquote(args[1]));
      const pNode = getNode(getParentPath(target));
      const name = getBaseName(target);
      if (!pNode || pNode.type !== 'dir') return <div className="my-2 text-[#f7768e]">mkdir: cannot create directory '{args[1]}': No such file or directory</div>;
      if (!pNode.children) pNode.children = {};
      if (pNode.children[name]) return <div className="my-2 text-[#f7768e]">mkdir: cannot create directory '{args[1]}': File exists</div>;
      pNode.children[name] = { type: 'dir', children: {} };
      return null;
    }

    case 'touch': {
      if (args.length < 2) return <div className="my-2 text-[#f7768e]">touch: missing operand</div>;
      const target = resolvePath(cwd, unquote(args[1]));
      const pNode = getNode(getParentPath(target));
      const name = getBaseName(target);
      if (!pNode || pNode.type !== 'dir') return <div className="my-2 text-[#f7768e]">touch: cannot touch '{args[1]}': No such file or directory</div>;
      if (!pNode.children) pNode.children = {};
      if (!pNode.children[name]) {
        pNode.children[name] = { type: 'file', content: '', rawContent: '' };
        
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
        await signInWithPopup(auth, googleProvider);
        return <div className="my-2 text-[#9ece6a]">Successfully logged in as {auth.currentUser?.displayName}</div>;
      } catch (e: any) {
        return <div className="my-2 text-[#f7768e]">Login failed: {e.message}</div>;
      }
    }

    case 'logout': {
      await signOut(auth);
      return <div className="my-2 text-[#9ece6a]">Successfully logged out.</div>;
    }

    case 'ai': {
      if (!currentUser) {
        return <div className="my-2 text-[#f7768e]">Please run 'login' first to use the AI assistant.</div>;
      }
      const prompt = args.slice(1).map(unquote).join(' ');
      if (!prompt) return <div className="my-2 text-[#f7768e]">ai: missing query</div>;
      
      try {
        const res = await fetch('/api/ai/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        
        await addDoc(collection(db, 'queries'), {
          userId: currentUser.uid,
          prompt,
          response: data.text,
          createdAt: serverTimestamp()
        });

        return <div className="my-2 text-[#7dcfff] whitespace-pre-wrap">{data.text}</div>;
      } catch (e: any) {
        return <div className="my-2 text-[#f7768e]">AI error: {e.message}</div>;
      }
    }

    default: {
      const isRelativeExecute = cmd.startsWith('./');
      const isAbsoluteExecute = cmd.startsWith('/');
      
      let target = resolvePath(cwd, cmd);
      
      const node = getNode(target);
      if (node) {
         if (node.type === 'exec') return <div className="my-2">{node.content}</div>;
         if (node.type === 'dir') return <div className="my-2 text-[#f7768e]">bash: {cmd}: Is a directory</div>;
         return <div className="my-2 text-[#f7768e]">bash: {cmd}: Permission denied (not executable)</div>;
      }

      return <div className="my-2 text-[#f7768e]">bash: {cmd}: command not found. Type 'help' for available commands.</div>;
    }
  }
};

type HistoryItem = {
  id: number;
  type: 'input' | 'output';
  content: React.ReactNode | string;
  cwd?: string;
};

// --- Main App Component ---

export default function App() {
  const [cwd, setCwd] = useState('/home/guest/portfolio');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 0, type: 'output', content: (
      <div className="mb-4 text-[#a9b1d6]">
        <div className="mb-2">Last login: {new Date().toDateString()} on ttys001</div>
        <BootBanner />
        <div className="mt-2">Type <span className="text-[#1a1b26] font-bold bg-[#7dcfff] px-1.5 py-0.5 rounded">help</span> to see available commands.</div>
      </div>
    ) },
    { id: 1, type: 'input', content: 'whoami', cwd: '/home/guest/portfolio' },
    { id: 2, type: 'output', content: <CmdWhoami /> },
    { id: 3, type: 'input', content: 'cat summary.txt', cwd: '/home/guest/portfolio' },
    { id: 4, type: 'output', content: <CmdSummary /> },
    { id: 5, type: 'input', content: 'cat contact.json', cwd: '/home/guest/portfolio' },
    { id: 6, type: 'output', content: <CmdContact /> },
    { id: 7, type: 'input', content: './experience.sh', cwd: '/home/guest/portfolio' },
    { id: 8, type: 'output', content: <CmdExperience /> },
    { id: 9, type: 'input', content: './projects.sh', cwd: '/home/guest/portfolio' },
    { id: 10, type: 'output', content: <CmdProjects /> },
    { id: 11, type: 'input', content: 'cat skills.yml', cwd: '/home/guest/portfolio' },
    { id: 12, type: 'output', content: <CmdSkills /> },
    { id: 13, type: 'input', content: './education.sh', cwd: '/home/guest/portfolio' },
    { id: 14, type: 'output', content: <CmdEducation /> }
  ]);
  
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleAppClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input;
      setInput('');
      
      if (!cmd.trim()) {
        setHistory(prev => [...prev, { id: Date.now(), type: 'input', content: '', cwd }]);
        return;
      }
      
      setCmdHistory(prev => [...prev, cmd]);
      setHistoryIdx(-1);
      
      const cmdId = Date.now();
      const newHistory = [...history, { id: cmdId, type: 'input', content: cmd, cwd }];
      
      if (cmd.trim().toLowerCase() === 'clear') {
        setHistory([]);
        return;
      }

      // Add a loading state
      const loadingId = cmdId + 1;
      setHistory([...newHistory, { id: loadingId, type: 'output', content: <div className="my-2 text-[#414868]">Processing...</div> }]);
      
      const output = await executeCommand(cmd, cwd, setCwd, cmdHistory, currentUser);
      
      setHistory(prev => {
        const filtered = prev.filter(h => h.id !== loadingId);
        if (output !== null) {
          return [...filtered, { id: Date.now(), type: 'output', content: output }];
        }
        return filtered;
      });
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
        const node = getNode(searchPath);
        
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

  return (
    <div 
      className="min-h-screen relative bg-[#1a1b26] p-4 sm:p-8 md:p-12 font-mono cursor-text text-[#a9b1d6]"
      onClick={handleAppClick}
    >
      <div className="max-w-4xl mx-auto pb-32 relative z-10">
        
        {/* History Output */}
        {history.map((item) => (
          <div key={item.id} className="mb-2">
            {item.type === 'input' ? (
              <div className="flex flex-col sm:flex-row sm:items-center text-[#a9b1d6]">
                <StarshipPrompt cwd={item.cwd || cwd} />
                <span className="font-normal whitespace-pre-wrap">{item.content}</span>
              </div>
            ) : (
              <div>{item.content}</div>
            )}
          </div>
        ))}
        
        {/* Current Prompt */}
        <div className="flex flex-col sm:flex-row sm:items-center mt-2">
          <StarshipPrompt cwd={cwd} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-[#a9b1d6] outline-none border-none caret-[#9ece6a] shadow-none focus:ring-0 p-0 m-0 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        
        {/* Invisible div to snap scroll to */}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
