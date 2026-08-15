import React from 'react';
import { experience } from '../../../data/portfolioData';

export const CmdExperience: React.FC = () => {
  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌─[ EXPERIENCE.SH ]' + '─'.repeat(41) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        {experience.map((exp, idx) => (
          <React.Fragment key={idx}>
            {/* Entry header */}
            <div className="px-2 py-0.5 flex flex-wrap items-center gap-x-2" style={{ background: '#1a1a1a', borderBottom: '1px solid #3a3a3a' }}>
              <span style={{ color: '#9ece6a' }}>{exp.role}</span>
              <span style={{ color: '#5a5a5a' }}>@</span>
              <span style={{ color: '#7aa2f7' }}>{exp.company}</span>
              <span style={{ color: '#3a3a3a', marginLeft: 'auto' }}>{exp.period}</span>
            </div>
            {/* Bullet items */}
            {exp.items.map((item, i) => (
              <div key={i} className="px-2 py-0 flex" style={{ borderBottom: '1px solid #1e1e1e' }}>
                <span style={{ color: '#5a5a5a', marginRight: '8px', flexShrink: 0 }}>  &bull;</span>
                <span style={{ color: '#c8c8c8' }}>{item}</span>
              </div>
            ))}
            {/* Spacer between entries */}
            {idx < experience.length - 1 && (
              <div style={{ borderBottom: '1px solid #3a3a3a', height: '4px' }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default CmdExperience;
