import React from 'react';
import { contactInfo } from '../../../data/portfolioData';

export const CmdContact: React.FC = () => (
  <div className="my-4 text-[#7dcfff] font-mono whitespace-pre overflow-x-auto text-sm sm:text-base">
{`+--[ CONTACT_INFO ]-------------------------------------+
|                                                       |
|  NAME:     ${contactInfo.name.padEnd(43, ' ')}|
|  EMAIL:    ${contactInfo.email.padEnd(43, ' ')}|
|  PHONE:    ${contactInfo.phone.padEnd(43, ' ')}|
|  LOC:      ${contactInfo.location.padEnd(43, ' ')}|
|  GITHUB:   ${contactInfo.github.padEnd(43, ' ')}|
|  LINKEDIN: ${contactInfo.linkedin.padEnd(43, ' ')}|
|                                                       |
+-------------------------------------------------------+`}
  </div>
);

export default CmdContact;
