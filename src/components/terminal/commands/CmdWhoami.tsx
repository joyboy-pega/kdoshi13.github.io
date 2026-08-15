import React from 'react';
import { contactInfo } from '../../../data/portfolioData';

interface CmdWhoamiProps {
  user?: any;
}

export const CmdWhoami: React.FC<CmdWhoamiProps> = ({ user }) => {
  const rows: [string, string, string?][] = [
    ['Name',    contactInfo.name],
    ['Role',    contactInfo.title],
    ['Domain',  'QA Engineering  /  Game Telemetry  /  Automation'],
    ['Session', user ? `${user.displayName || user.email}  [authenticated]` : 'guest  [unauthenticated]'],
    ['Status',  'ACTIVE -- open for opportunities', '#9ece6a'],
    ['Quote',   '"Ensuring software quality through telemetry & automation."', '#5a5a5a'],
  ];

  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌─[ USER PROFILE ]' + '─'.repeat(43) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        {rows.map(([label, value, color]) => (
          <div key={label} className="flex px-2 py-0" style={{ borderBottom: '1px solid #1e1e1e' }}>
            <span style={{ color: '#5a5a5a', minWidth: '10ch', display: 'inline-block' }}>{label}</span>
            <span style={{ color: '#3a3a3a', marginRight: '8px' }}>|</span>
            <span style={{ color: color || '#c8c8c8' }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default CmdWhoami;
