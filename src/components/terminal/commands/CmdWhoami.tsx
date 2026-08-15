import React from 'react';
import { contactInfo } from '../../../data/portfolioData';

interface CmdWhoamiProps {
  user?: any;
}

export const CmdWhoami: React.FC<CmdWhoamiProps> = ({ user }) => (
  <div className="my-4 text-[#a9b1d6] font-mono whitespace-pre overflow-x-auto text-sm sm:text-base">
{`+-------------------------------------------------------------+
| USER PROFILE: ${contactInfo.name.padEnd(44, ' ')}|
+-------------------------------------------------------------+
| [ ROLE ]      ${contactInfo.title.padEnd(46, ' ')}|
| [ DOMAIN ]    QA, Game Telemetry, Software Automation       |
| [ SESSION ]   ${(user ? `${user.displayName || user.email} (Authenticated)` : 'Guest User').padEnd(46, ' ')}|
| [ STATUS ]    ACTIVE - Open for Opportunities               |
|                                                             |
| "Ensuring software quality through telemetry & automation"  |
+-------------------------------------------------------------+`}
  </div>
);

export default CmdWhoami;
