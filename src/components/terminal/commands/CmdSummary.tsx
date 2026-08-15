import React from 'react';
import { AsciiBox } from '../../common/AsciiBox';
import { summaryText } from '../../../data/portfolioData';

export const CmdSummary: React.FC = () => (
  <AsciiBox title="SUMMARY.TXT" borderColor="#414868" titleColor="#7dcfff">
    <p className="text-[#a9b1d6] leading-relaxed font-mono">
      {summaryText}
    </p>
  </AsciiBox>
);

export default CmdSummary;
