import React from 'react';
import { skills } from '../../../data/portfolioData';

export const CmdSkills: React.FC = () => {
  return (
    <div className="font-mono text-sm my-2" style={{ color: '#c8c8c8' }}>
      <div style={{ color: '#3a3a3a' }}>{'┌─[ SKILLS.YML ]' + '─'.repeat(44) + '┐'}</div>
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        {Object.entries(skills).map(([category, items], idx) => (
          <React.Fragment key={category}>
            {/* Category header */}
            <div className="px-2 py-0.5" style={{ background: '#1a1a1a', borderBottom: '1px solid #3a3a3a', color: '#bb9af7' }}>
              {category}:
            </div>
            {/* Skill items */}
            <div className="px-2 py-0.5 flex flex-wrap" style={{ borderBottom: idx < Object.keys(skills).length - 1 ? '1px solid #3a3a3a' : 'none', gap: '4px 16px' }}>
              {items.map((skill, i) => (
                <span key={i} style={{ color: '#7dcfff' }}>
                  - {skill}
                </span>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default CmdSkills;
