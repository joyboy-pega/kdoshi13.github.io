import React from 'react';

interface StarshipPromptProps {
  cwd: string;
  user?: string;
}

export const StarshipPrompt: React.FC<StarshipPromptProps> = ({ cwd, user = 'guest' }) => {
  const displayCwd = cwd.replace(/^\/home\/guest/, '~');
  return (
    <span className="font-mono text-sm whitespace-nowrap select-none mr-1" style={{ color: '#c8c8c8' }}>
      <span style={{ color: '#9ece6a' }}>{user}</span>
      <span style={{ color: '#5a5a5a' }}>@</span>
      <span style={{ color: '#7dcfff' }}>kevalos</span>
      <span style={{ color: '#5a5a5a' }}>:</span>
      <span style={{ color: '#7aa2f7' }}>{displayCwd}</span>
      <span style={{ color: '#5a5a5a' }}>$</span>
      <span>&nbsp;</span>
    </span>
  );
};

export default StarshipPrompt;
