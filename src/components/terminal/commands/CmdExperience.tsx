import React from 'react';
import { experience } from '../../../data/portfolioData';

export const CmdExperience: React.FC = () => (
  <div className="my-4 text-[#a9b1d6] font-mono text-sm sm:text-base">
    <div className="mb-3 text-[#7aa2f7] font-bold">
      [ SYSTEM LOG: EXPERIENCE HISTORY ]
    </div>
    {experience.map((exp, idx) => (
      <div key={idx} className="mb-4 bg-[#1f2335]/40 p-3 rounded border border-[#292e42]">
        <div className="text-[#9ece6a] font-bold flex flex-wrap items-center gap-2">
          <span>===&gt; {exp.role}</span>
          <span className="text-[#bb9af7]">@ {exp.company}</span>
        </div>
        <div className="text-[#ff9e64] text-xs font-semibold mb-2 mt-0.5">
          [ {exp.period} ]
        </div>
        <div className="space-y-1 mt-2">
          {exp.items.map((item, i) => (
            <div key={i} className="flex items-start text-sm">
              <span className="text-[#414868] font-bold mr-2 select-none">|</span>
              <span className="text-[#c0caf5]">- {item}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default CmdExperience;
