import React from 'react';
import { AsciiBox } from '../../common/AsciiBox';
import { projects } from '../../../data/portfolioData';

export const CmdProjects: React.FC = () => (
  <div className="my-4 font-mono text-sm sm:text-base">
    <div className="mb-3 text-[#7aa2f7] font-bold">
      [ SOFTWARE PROJECTS & QA TOOLS ]
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((proj, idx) => (
        <AsciiBox 
          key={idx} 
          title={`./${proj.name.toLowerCase().replace(/ /g, '_')}`} 
          borderColor="#414868" 
          titleColor="#9ece6a"
        >
          <div className="text-[#ff9e64] mb-2 font-bold text-xs uppercase tracking-wider">
            &gt; TECH: {proj.tech}
          </div>
          <div className="text-[#c0caf5] text-sm leading-relaxed">
            {proj.desc}
          </div>
        </AsciiBox>
      ))}
    </div>
  </div>
);

export default CmdProjects;
