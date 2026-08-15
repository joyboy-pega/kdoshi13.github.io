import React from 'react';

export type VFSNode = {
  type: 'dir' | 'file' | 'exec';
  content?: string | React.ReactNode;
  rawContent?: string;
  children?: Record<string, VFSNode>;
};

export type HistoryItem = {
  id: number;
  type: 'input' | 'output';
  content: React.ReactNode | string;
  cwd?: string;
};

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  items: string[];
}

export interface ProjectItem {
  name: string;
  tech: string;
  desc: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  detail?: string;
}

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}
