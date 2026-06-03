import { Project, ExperienceItem, SkillCategory, PortfolioData } from './types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  name: "Neel Santhumayor",
  role: "Fresher Developer & Web/AI Enthusiast",
  tagline: "Building responsive, modern web applications with intelligent AI integrations.",
  bio: "Passionate BCA student with hands-on experience in building and deploying web applications using AI-assisted development and modern web technologies. Highly skilled in frontend layouts, custom APIs, responsive designs, and cloud deployments. Completed 6 professional certifications from AWS, IBM, and UC San Diego, driven to apply strong technical capabilities in key real-world environments.",
  githubUsername: "neelsantmayor-stack",
  accentColor: "emerald",
  linkedinUrl: "https://www.linkedin.com/in/neel-santhumayor-8a7144310/",
  githubUrl: "https://github.com/neelsantmayor-stack",
  email: "neelsantmayor@gmail.com"
};

export const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Beta Testing Intern",
    company: "Skillora",
    duration: "May 2026",
    achievements: [
      "Performed detailed daily beta testing, feature validation, bug identification, and feedback reporting workflows.",
      "Conducted extensive usability analyses and quality assurance audits across the Skillora learning platform modules.",
      "Successfully logged ~85 active working hours within 15 days, recognized for dedication, consistency, and teamwork."
    ]
  },
  {
    id: "exp-2",
    role: "BCA Student & Fresher Developer",
    company: "Sk Somaiya College",
    duration: "2024 - 2027",
    achievements: [
      "Studying full-stack development, complex data structures, database management, and robust software engineering principles.",
      "Leveraged advanced AI-assisted development tools and prompt engineering to rapidly architect, test, and iterate on dynamic web solutions.",
      "Mastered frontend layouts, object-oriented concepts, and clean coding paradigms to ship reliable codebase structures."
    ]
  },
  {
    id: "exp-3",
    role: "AI-Assisted Developer & Contributor",
    company: "GitHub Community",
    duration: "2025 - Present",
    achievements: [
      "Engineered 'Gemini Suite' integrating text, image, and video generation APIs on Vercel, utilizing AI-assisted development models to speed up assembly.",
      "Developed the 'DigitalFlow' mobile-first responsive landing page on Netlify using HTML5/CSS3/JavaScript guided by AI workflows.",
      "Optimized client-side builds, configured clean layouts, and established efficient custom modules with high-speed performance tokens."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["HTML", "CSS", "JavaScript", "C", "C#", "Python", "Dart"]
  },
  {
    category: "Frameworks",
    skills: ["Flutter"]
  },
  {
    category: "AI & APIs",
    skills: ["Gemini API (Text, Image & Video)", "Google AI Studio", "Prompt Engineering"]
  },
  {
    category: "Cloud",
    skills: ["AWS (Serverless Architecture)"]
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Netlify", "Figma"]
  }
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    name: "Gemini-suite",
    description: "A comprehensive generative AI exploration suite. Integrates Google's Gemini models for real-time natural language processing, custom image creation, and fluid video synthesis, deployed on Vercel.",
    stargazers_count: 14,
    forks_count: 2,
    html_url: "https://github.com/neelsantmayor-stack/Gemini-suite",
    homepage: "https://gemini-suite-5tyo-hav2j5p13-neel-santhumayors-projects.vercel.app/",
    language: "TypeScript",
    topics: ["gemini-api", "vercel", "ai-generative", "prompt-engineering", "typescript"]
  },
  {
    name: "prime-clone",
    description: "Multi-category video streaming interface replicating Amazon Prime Video. Built with smooth high-speed sliders, dedicated modal dialog overlays, and optimized grid layouts.",
    stargazers_count: 11,
    forks_count: 1,
    html_url: "https://github.com/neelsantmayor-stack/prime-clone",
    homepage: "https://prime-clo.netlify.app/",
    language: "HTML",
    topics: ["prime-video", "clone", "css-grid", "flexbox", "media-player"]
  },
  {
    name: "groove-garden",
    description: "A state-of-the-art virtual audio workstation and streaming dashboard. Implements beautiful interactive musical card components, visual waveform graphs, and playlist persistence.",
    stargazers_count: 9,
    forks_count: 1,
    html_url: "https://github.com/neelsantmayor-stack/groove-garden",
    homepage: "https://soundi.netlify.app/",
    language: "JavaScript",
    topics: ["audio-player", "javascript", "css-animations", "sound-design", "responsive"]
  },
  {
    name: "DigitalFlow",
    description: "A mobile-first corporate landing page featuring sleek modular structures, clean aesthetic grids, customized buttons, and dynamic entrance scroll transitions.",
    stargazers_count: 18,
    forks_count: 2,
    html_url: "https://github.com/neelsantmayor-stack/DigitalFlow",
    homepage: "https://thedigitalflow.netlify.app/",
    language: "CSS",
    topics: ["html5", "css3", "javascript", "netlify", "responsive-layout"]
  },
  {
    name: "Ai_gallery",
    description: "An elegant, highly immersive digital gallery highlighting AI-generated graphics and media prompt compositions. Showcases state-of-the-art visual models and prompt-engineered lighting styles.",
    stargazers_count: 15,
    forks_count: 1,
    html_url: "https://github.com/neelsantmayor-stack/Ai_gallery",
    homepage: "https://aigallery4.netlify.app/",
    language: "TypeScript",
    topics: ["ai-gallery", "netlify", "generative-art", "prompt-engineering", "react"]
  }
];

export const ACCENT_COLORS = {
  emerald: {
    primary: "text-emerald-400",
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-600",
    border: "border-emerald-500/30",
    focusBorder: "focus:border-emerald-500",
    glow: "shadow-emerald-500/25",
    accentText: "text-emerald-400",
    accentLightBg: "bg-emerald-500/10",
    pillBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    gradient: "from-emerald-400 to-teal-500"
  },
  blue: {
    primary: "text-blue-400",
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
    border: "border-blue-500/30",
    focusBorder: "focus:border-blue-500",
    glow: "shadow-blue-500/25",
    accentText: "text-blue-400",
    accentLightBg: "bg-blue-500/10",
    pillBg: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    gradient: "from-blue-400 to-cyan-500"
  },
  indigo: {
    primary: "text-indigo-400",
    bg: "bg-indigo-500",
    hoverBg: "hover:bg-indigo-600",
    border: "border-indigo-500/30",
    focusBorder: "focus:border-indigo-500",
    glow: "shadow-indigo-500/25",
    accentText: "text-indigo-400",
    accentLightBg: "bg-indigo-500/10",
    pillBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    gradient: "from-indigo-400 to-indigo-600"
  },
  violet: {
    primary: "text-violet-400",
    bg: "bg-violet-500",
    hoverBg: "hover:bg-violet-600",
    border: "border-violet-500/30",
    focusBorder: "focus:border-violet-500",
    glow: "shadow-violet-500/25",
    accentText: "text-violet-400",
    accentLightBg: "bg-violet-500/10",
    pillBg: "bg-violet-500/10 border-violet-500/30 text-violet-300",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    gradient: "from-violet-400 to-fuchsia-500"
  },
  amber: {
    primary: "text-amber-400",
    bg: "bg-amber-500",
    hoverBg: "hover:bg-amber-600",
    border: "border-amber-500/30",
    focusBorder: "focus:border-amber-500",
    glow: "shadow-amber-500/25",
    accentText: "text-amber-400",
    accentLightBg: "bg-amber-500/10",
    pillBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    gradient: "from-amber-400 to-orange-500"
  },
  rose: {
    primary: "text-rose-400",
    bg: "bg-rose-500",
    hoverBg: "hover:bg-rose-600",
    border: "border-rose-500/30",
    focusBorder: "focus:border-rose-500",
    glow: "shadow-rose-500/25",
    accentText: "text-rose-400",
    accentLightBg: "bg-rose-500/10",
    pillBg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    gradient: "from-rose-400 to-pink-500"
  }
};

