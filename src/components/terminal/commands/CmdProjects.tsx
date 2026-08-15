import React from 'react';
import { projects } from '../../../data/portfolioData';

export const CmdProjects: React.FC = () => {
  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌─[ PROJECTS.SH ]' + '─'.repeat(43) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        {projects.map((proj, idx) => (
          <React.Fragment key={idx}>
            {/* Project name row */}
            <div className="px-2 py-0.5 flex flex-wrap items-center gap-x-2" style={{ background: '#1a1a1a', borderBottom: '1px solid #3a3a3a' }}>
              <span style={{ color: '#e0af68' }}>./</span>
              <span style={{ color: '#9ece6a', fontWeight: 'bold' }}>{proj.name.toLowerCase().replace(/\s/g, '_')}</span>
            </div>
            {/* Tech */}
            <div className="px-2 py-0 flex" style={{ borderBottom: '1px solid #1e1e1e' }}>
              <span style={{ color: '#5a5a5a', minWidth: '6ch' }}>tech</span>
              <span style={{ color: '#3a3a3a', marginRight: '8px' }}>|</span>
              <span style={{ color: '#7dcfff' }}>{proj.tech}</span>
            </div>
            {/* Description */}
            <div className="px-2 py-0 flex" style={{ borderBottom: idx < projects.length - 1 ? '1px solid #3a3a3a' : '1px solid #1e1e1e' }}>
              <span style={{ color: '#5a5a5a', minWidth: '6ch' }}>desc</span>
              <span style={{ color: '#3a3a3a', marginRight: '8px' }}>|</span>
              <span style={{ color: '#c8c8c8' }}>{proj.desc}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default CmdProjects;
