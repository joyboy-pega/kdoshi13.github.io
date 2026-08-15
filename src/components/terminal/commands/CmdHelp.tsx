import React from 'react';

export const CmdHelp: React.FC = () => (
  <div className="my-4 text-[#a9b1d6] font-mono whitespace-pre overflow-x-auto text-sm sm:text-base">
{`+-----------------+----------------------------------------------------+
| COMMAND         | DESCRIPTION                                        |
+-----------------+----------------------------------------------------+
| whoami          | Display developer profile & status                 |
| summary         | View professional executive summary                |
| experience      | View work experience & QA engineering roles        |
| projects        | View software projects & automated tools           |
| skills          | View technical skills, QA tooling & languages      |
| education       | View academic records & degrees                    |
| contact         | View contact info, email & phone                   |
| game / play     | Launch the interactive 2D RPG Adventure mode 🎮    |
| ls [-l -a]      | List files in virtual filesystem                   |
| cd <dir>        | Change current working directory                   |
| pwd             | Print current working directory                    |
| cat <file>      | Read file contents                                 |
| ./<script.sh>   | Execute a portfolio script                         |
| echo <str> [>]  | Print or redirect text to a file                   |
| touch <file>    | Create a new file                                  |
| mkdir <dir>     | Create a directory                                 |
| history         | View command history                               |
| date            | Print system timestamp                             |
| clear           | Clear terminal output                              |
| login           | Sign in with Google (syncs files & AI history)     |
| logout          | Sign out of Google session                         |
| ai <query>      | Ask Gemini AI assistant about Keval                |
+-----------------+----------------------------------------------------+`}
  </div>
);

export default CmdHelp;
