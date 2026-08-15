import React from 'react';
import { contactInfo } from '../../../data/portfolioData';

interface CmdWhoamiProps {
  user?: any;
}

export const CmdWhoami: React.FC<CmdWhoamiProps> = ({ user }) => (
  <div className="my-4 p-4 rounded-lg border border-[#292e42] bg-[#1f2335]/50 font-mono text-xs sm:text-sm">
    <div className="text-[#7aa2f7] font-bold text-sm border-b border-[#292e42] pb-2 mb-3">
      USER PROFILE: {contactInfo.name}
    </div>
    <div className="space-y-1.5 text-[#c0caf5]">
      <div><span className="text-[#565f89]">Role:</span> {contactInfo.title}</div>
      <div><span className="text-[#565f89]">Domain:</span> QA Engineering, Game Telemetry, Software Automation</div>
      <div><span className="text-[#565f89]">Session:</span> {user ? `${user.displayName || user.email} (Authenticated)` : 'Guest User'}</div>
      <div><span className="text-[#565f89]">Status:</span> Active (Open for Opportunities)</div>
      <div className="mt-2 pt-2 border-t border-[#292e42]/60 text-[#9ece6a] italic">
        "Ensuring software quality through telemetry and automation."
      </div>
    </div>
  </div>
);

export default CmdWhoami;
