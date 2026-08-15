import React from 'react';

export const CmdHelp: React.FC = () => {
  const commands = [
    { cmd: 'whoami', desc: 'Display developer profile and status' },
    { cmd: 'summary', desc: 'View professional executive summary' },
    { cmd: 'experience', desc: 'View work experience and QA engineering roles' },
    { cmd: 'projects', desc: 'View software projects and automated tools' },
    { cmd: 'skills', desc: 'View technical skills, QA tooling, and languages' },
    { cmd: 'education', desc: 'View academic records and degrees' },
    { cmd: 'contact', desc: 'View contact info, email, and profiles' },
    { cmd: 'game / play', desc: 'Launch interactive 2D RPG Adventure mode' },
    { cmd: 'ls [-l -a]', desc: 'List files in virtual filesystem' },
    { cmd: 'cd <dir>', desc: 'Change current working directory' },
    { cmd: 'pwd', desc: 'Print current working directory' },
    { cmd: 'cat <file>', desc: 'Read file contents' },
    { cmd: './<script.sh>', desc: 'Execute a portfolio script' },
    { cmd: 'echo <str> [>]', desc: 'Print or redirect text to a file' },
    { cmd: 'touch <file>', desc: 'Create a new empty file' },
    { cmd: 'mkdir <dir>', desc: 'Create a new directory' },
    { cmd: 'history', desc: 'View command history' },
    { cmd: 'date', desc: 'Print system timestamp' },
    { cmd: 'clear', desc: 'Clear terminal window output' },
    { cmd: 'login', desc: 'Sign in with Google (syncs files and AI history)' },
    { cmd: 'logout', desc: 'Sign out of current session' },
    { cmd: 'ai <query>', desc: 'Ask Gemini AI assistant a question' },
  ];

  return (
    <div className="my-4 rounded-lg border border-[#292e42] bg-[#1f2335]/50 overflow-hidden font-mono text-xs sm:text-sm">
      <div className="bg-[#16161e] px-4 py-2 border-b border-[#292e42] flex justify-between text-[#7aa2f7] font-bold">
        <span>COMMAND</span>
        <span>DESCRIPTION</span>
      </div>
      <div className="divide-y divide-[#292e42]/50">
        {commands.map((c, i) => (
          <div key={i} className="px-4 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-[#24283b]/40">
            <span className="text-[#9ece6a] font-semibold">{c.cmd}</span>
            <span className="text-[#a9b1d6]">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CmdHelp;
