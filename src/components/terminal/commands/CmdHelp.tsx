import React from 'react';

export const CmdHelp: React.FC = () => {
  const sections: { heading: string; commands: { cmd: string; desc: string }[] }[] = [
    {
      heading: 'PORTFOLIO',
      commands: [
        { cmd: 'whoami',     desc: 'display developer profile and status' },
        { cmd: 'summary',    desc: 'professional summary' },
        { cmd: 'experience', desc: 'work experience and QA engineering roles' },
        { cmd: 'projects',   desc: 'software projects and automated tools' },
        { cmd: 'skills',     desc: 'technical skills and QA tooling' },
        { cmd: 'education',  desc: 'academic records and degrees' },
        { cmd: 'contact',    desc: 'contact information' },
      ],
    },
    {
      heading: 'FILESYSTEM',
      commands: [
        { cmd: 'ls [-l -a]',    desc: 'list files in virtual filesystem' },
        { cmd: 'cd <dir>',      desc: 'change working directory' },
        { cmd: 'pwd',           desc: 'print working directory' },
        { cmd: 'cat <file>',    desc: 'read file contents' },
        { cmd: './<script>',    desc: 'execute a portfolio script' },
        { cmd: 'echo <str>',    desc: 'print or redirect text (>, >>)' },
        { cmd: 'touch <file>',  desc: 'create an empty file' },
        { cmd: 'mkdir <dir>',   desc: 'create a directory' },
      ],
    },
    {
      heading: 'SYSTEM',
      commands: [
        { cmd: 'history',    desc: 'view command history' },
        { cmd: 'date',       desc: 'print system timestamp' },
        { cmd: 'uname',      desc: 'print OS info' },
        { cmd: 'clear',      desc: 'clear terminal' },
        { cmd: 'game/play',  desc: 'launch 2D RPG adventure mode' },
        { cmd: 'login',      desc: 'sign in with Google' },
        { cmd: 'logout',     desc: 'sign out' },
        { cmd: 'ai <query>', desc: 'ask Gemini AI about Keval' },
      ],
    },
  ];

  const COL1 = 18;

  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌' + '─'.repeat(58) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        <div className="px-2 py-0.5" style={{ borderBottom: '1px solid #3a3a3a' }}>
          <span style={{ color: '#7aa2f7' }}>AVAILABLE COMMANDS</span>
          <span style={{ color: '#5a5a5a' }}> &mdash; kevalos v1.2</span>
        </div>

        {sections.map((sec) => (
          <React.Fragment key={sec.heading}>
            <div className="px-2 py-0.5" style={{ borderBottom: '1px solid #3a3a3a', color: '#5a5a5a' }}>
              {'  '}{sec.heading}
            </div>
            {sec.commands.map(({ cmd, desc }) => (
              <div
                key={cmd}
                className="flex px-2 py-0"
                style={{ borderBottom: '1px solid #1e1e1e' }}
              >
                <span style={{ color: '#9ece6a', minWidth: `${COL1}ch`, display: 'inline-block' }}>
                  {cmd}
                </span>
                <span style={{ color: '#5a5a5a', marginRight: '4px' }}>  &mdash;  </span>
                <span style={{ color: '#c8c8c8' }}>{desc}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(58) + '┘'}</div>
    </div>
  );
};

export default CmdHelp;
