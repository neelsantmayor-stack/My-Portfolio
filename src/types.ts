export interface Project {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  githubUsername: string;
  accentColor: 'emerald' | 'blue' | 'indigo' | 'violet' | 'amber' | 'rose';
  avatarUrl?: string;
  linkedinUrl: string;
  githubUrl: string;
  email: string;
}
