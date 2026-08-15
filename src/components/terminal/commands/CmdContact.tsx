import React from 'react';
import { contactInfo } from '../../../data/portfolioData';

export const CmdContact: React.FC = () => {
  const rows: [string, string, string, string?][] = [
    ['Email',    'kevaldoshi34223@gmail.com', `mailto:${contactInfo.email}`, '#7dcfff'],
    ['Phone',    contactInfo.phone,           `tel:${contactInfo.phone}`, '#c8c8c8'],
    ['Location', contactInfo.location,        '#', '#c8c8c8'],
    ['GitHub',   contactInfo.github,          contactInfo.github, '#7aa2f7'],
    ['LinkedIn', contactInfo.linkedin,        contactInfo.linkedin, '#7aa2f7'],
  ];

  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌─[ CONTACT_INFO ]' + '─'.repeat(43) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        {rows.map(([label, value, href, color]) => (
          <div key={label} className="flex px-2 py-0" style={{ borderBottom: '1px solid #1e1e1e' }}>
            <span style={{ color: '#5a5a5a', minWidth: '10ch', display: 'inline-block' }}>{label}</span>
            <span style={{ color: '#3a3a3a', marginRight: '8px' }}>|</span>
            {href && href !== '#' ? (
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: color || '#7aa2f7', textDecoration: 'none' }}>
                {value}
              </a>
            ) : (
              <span style={{ color: color || '#c8c8c8' }}>{value}</span>
            )}
          </div>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default CmdContact;
