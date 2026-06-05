import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Laptop, Sparkles, Code, User } from 'lucide-react';
import { PortfolioData } from '../types';
import { ACCENT_COLORS, SKILL_CATEGORIES } from '../data';

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  const [imgFailed, setImgFailed] = useState(false);
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

        {/* Info Grid - Professional 3-Column layout */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          
          {/* Column 1: Profile & Avatar Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm shadow-xl text-center relative overflow-hidden group">
            {/* Ambient Background decoration */}
            <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full filter blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${baseAccent.bg}`} />
            <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full filter blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${baseAccent.bg}`} />

            <div className="w-full flex flex-col items-center relative z-10 py-2">
              {/* Image / Fallback Container */}
              <div className="relative mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                {/* Pulse Glow Background Ring */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${baseAccent.gradient} opacity-25 blur-sm group-hover:opacity-50 transition-opacity duration-300`} />
                
                <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center">
                  {!imgFailed && data.avatarUrl ? (
                     <img
                      src={data.avatarUrl}
                      alt={data.name}
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    /* High craft fallback view if photo doesn't exist yet */
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 select-none">
                      <div className={`w-14 h-14 rounded-full ${baseAccent.accentLightBg} border ${baseAccent.border} flex items-center justify-center mb-3`}>
                        <User className={`h-7 w-7 ${baseAccent.accentText}`} />
                      </div>
                      <span className="text-3xl font-extrabold tracking-tight text-white font-display">
                        {data.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <p className="text-[10px] text-slate-500 font-mono mt-4 leading-relaxed max-w-[150px] text-center">
                        Developer Profile
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono font-medium border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 mb-4 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open for Opportunities
              </div>

              {/* Bio Name Info */}
              <h3 className="text-lg font-bold text-slate-100 font-display">
                {data.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                BCA Student &amp; Fresher
              </p>
            </div>
          </div>

          {/* Column 2: Biography & Achievements */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-100 font-display">
                A bit about who I am...
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {data.bio}
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                I love finding creative engineering solutions to real-world interface puzzles, with a core emphasis on system latencies, payload sizes, and standards-compliant accessibility. I build systems that degrade gracefully and perform optimally on any processor or platform.
              </p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {statCards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-sm shadow-sm hover:border-slate-700/80 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {card.icon}
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{card.title}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-slate-200">{card.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Skills Categorized */}
          <div className="lg:col-span-3 space-y-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 font-display flex items-center gap-2 border-b border-slate-850 pb-3">
                <Code className={`h-4.5 w-4.5 ${baseAccent.accentText}`} />
                Core Tech Stack
              </h3>
              
              <div className="space-y-6 mt-4">
                {SKILL_CATEGORIES.map((cat, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{cat.category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, si) => (
                        <span
                          key={si}
                          className={`rounded-lg px-2 py-0.5 text-[11px] font-medium transition-all duration-300 border hover:-translate-y-0.5 ${baseAccent.pillBg}`}
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
      </div>
    </section>
  );
}
