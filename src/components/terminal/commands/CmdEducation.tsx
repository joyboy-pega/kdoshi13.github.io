import React from 'react';
import { education } from '../../../data/portfolioData';

export const CmdEducation: React.FC = () => {
  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌─[ EDUCATION.SH ]' + '─'.repeat(42) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        {education.map((edu, idx) => (
          <React.Fragment key={idx}>
            {/* Degree */}
            <div className="px-2 py-0.5 flex flex-wrap items-center gap-x-2" style={{ background: '#1a1a1a', borderBottom: '1px solid #3a3a3a' }}>
              <span style={{ color: '#7dcfff' }}>{edu.degree}</span>
              {edu.detail && (
                <span style={{ color: '#9ece6a', marginLeft: 'auto' }}>{edu.detail}</span>
              )}
            </div>
            {/* School + Period */}
            <div className="px-2 py-0 flex flex-wrap items-center gap-x-4" style={{ borderBottom: idx < education.length - 1 ? '1px solid #3a3a3a' : '1px solid #1e1e1e' }}>
              <span style={{ color: '#c8c8c8' }}>{edu.school}</span>
              <span style={{ color: '#5a5a5a', marginLeft: 'auto' }}>{edu.period}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default CmdEducation;
