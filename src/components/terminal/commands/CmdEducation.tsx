import React from 'react';
import { education } from '../../../data/portfolioData';

export const CmdEducation: React.FC = () => (
  <div className="my-4 font-mono text-sm sm:text-base">
    <div className="mb-4 text-[#7aa2f7] font-bold">
      [ ACADEMIC RECORDS ]
    </div>
    <div className="space-y-3">
      {education.map((edu, idx) => (
        <div key={idx} className="bg-[#1f2335]/40 p-3 rounded border border-[#292e42]">
          <div className="text-[#7dcfff] font-bold text-base">
            * {edu.degree}
          </div>
          <div className="text-[#a9b1d6] ml-3 text-sm mt-0.5">
            - {edu.school}
          </div>
          <div className="flex flex-wrap justify-between items-center ml-3 mt-2 gap-2 text-xs sm:text-sm">
            <span className="text-[#ff9e64] font-medium bg-[#24283b] px-2 py-0.5 rounded">
              [ {edu.period} ]
            </span>
            {edu.detail && (
              <span className="text-[#9ece6a] font-medium bg-[#1c2e28] px-2 py-0.5 rounded border border-[#9ece6a]/30">
                &gt; {edu.detail}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CmdEducation;
