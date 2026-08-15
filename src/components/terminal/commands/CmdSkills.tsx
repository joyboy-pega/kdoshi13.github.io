import React from 'react';
import { AsciiBox } from '../../common/AsciiBox';
import { skills } from '../../../data/portfolioData';

export const CmdSkills: React.FC = () => (
  <div className="my-4 font-mono text-sm sm:text-base">
    <div className="mb-3 text-[#7aa2f7] font-bold">
      [ TECHNICAL PROFICIENCIES & QA DOMAINS ]
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      {Object.entries(skills).map(([category, items], idx) => (
        <AsciiBox key={idx} title={category.toUpperCase()} borderColor="#414868" titleColor="#bb9af7">
          <div className="flex flex-wrap gap-2">
            {items.map((skill, i) => (
              <span 
                key={i} 
                className="text-[#7dcfff] bg-[#24283b] border border-[#3b4261] px-2 py-0.5 rounded text-xs sm:text-sm font-medium hover:border-[#7aa2f7] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </AsciiBox>
      ))}
    </div>
  </div>
);

export default CmdSkills;
