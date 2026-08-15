import React from 'react';
import { contactInfo } from '../../../data/portfolioData';

export const CmdContact: React.FC = () => (
  <div className="my-4 p-4 rounded-lg border border-[#292e42] bg-[#1f2335]/50 font-mono text-xs sm:text-sm">
    <div className="text-[#7dcfff] font-bold text-sm border-b border-[#292e42] pb-2 mb-3">
      CONTACT INFORMATION
    </div>
    <div className="space-y-1.5 text-[#c0caf5]">
      <div><span className="text-[#565f89]">Name:</span> {contactInfo.name}</div>
      <div><span className="text-[#565f89]">Email:</span> <a href={`mailto:${contactInfo.email}`} className="text-[#7dcfff] hover:underline">{contactInfo.email}</a></div>
      <div><span className="text-[#565f89]">Phone:</span> {contactInfo.phone}</div>
      <div><span className="text-[#565f89]">Location:</span> {contactInfo.location}</div>
      <div><span className="text-[#565f89]">GitHub:</span> <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-[#7aa2f7] hover:underline">{contactInfo.github}</a></div>
      <div><span className="text-[#565f89]">LinkedIn:</span> <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#bb9af7] hover:underline">{contactInfo.linkedin}</a></div>
    </div>
  </div>
);

export default CmdContact;
