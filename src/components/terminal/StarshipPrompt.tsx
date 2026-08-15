import React from 'react';

interface StarshipPromptProps {
  cwd: string;
  user?: string;
}

export const StarshipPrompt: React.FC<StarshipPromptProps> = ({ cwd, user = 'guest' }) => {
  const displayCwd = cwd.replace(/^\/home\/guest/, '~');
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 select-none font-bold sm:mr-2">
      <span className="text-[#9ece6a]">{user}</span>
      <span className="text-[#a9b1d6] font-normal">in</span>
      <span className="text-[#7dcfff]">{displayCwd}</span>
      <span className="text-[#a9b1d6] font-normal">on</span>
      <span className="text-[#bb9af7]">⎇ main</span>
      <span className="text-[#9ece6a] font-normal text-lg leading-none">❯</span>
    </div>
  );
};

export default StarshipPrompt;
