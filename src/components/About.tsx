import { motion } from 'motion/react';
import { Award, GraduationCap, Laptop, Sparkles, Code } from 'lucide-react';
import { PortfolioData } from '../types';
import { ACCENT_COLORS, SKILL_CATEGORIES } from '../data';

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  const baseAccent = ACCENT_COLORS[data.accentColor];

  const statCards = [
    {
      icon: <Laptop className={`h-5 w-5 ${baseAccent.accentText}`} />,
      title: 'Current Focus',
      value: 'AI-Assisted Web Apps'
    },
    {
      icon: <Award className={`h-5 w-5 ${baseAccent.accentText}`} />,
      title: 'Principles',
      value: 'Prompt Engineering & Clean UI'
    },
    {
      icon: <GraduationCap className={`h-5 w-5 ${baseAccent.accentText}`} />,
      title: 'Delivery',
      value: 'Cloud Hosting (Vercel & Netlify)'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${baseAccent.badge} border`}>
            <Sparkles className="h-3.5 w-3.5" />
            Background
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            About Me &amp; Skills
          </h2>
          <div className={`mt-2 h-1 w-12 rounded-full ${baseAccent.bg}`} />
        </div>

        {/* Info Grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5 items-start">
          {/* Bio on left */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-semibold text-slate-100 font-display">
              A bit about who I am...
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              {data.bio}
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              I love finding creative engineering solutions to real-world interface puzzles, with a core emphasis on system latencies, payload sizes, and standards-compliant accessibility. I build systems that degrade gracefully and perform optimally on any processor or platform.
            </p>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {statCards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-sm shadow-sm hover:border-slate-700/80 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {card.icon}
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{card.title}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200">{card.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Categorized on right */}
          <div className="lg:col-span-2 space-y-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-slate-200 font-display flex items-center gap-2 border-b border-slate-850 pb-3">
              <Code className={`h-4.5 w-4.5 ${baseAccent.accentText}`} />
              Core Tech Stack
            </h3>
            
            <div className="space-y-6">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">{cat.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, si) => (
                      <span
                        key={si}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-300 border hover:-translate-y-0.5 ${baseAccent.pillBg}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
