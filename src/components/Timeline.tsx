import { Briefcase, Calendar, CheckSquare } from 'lucide-react';
import { ExperienceItem, PortfolioData } from '../types';
import { ACCENT_COLORS, INITIAL_EXPERIENCE } from '../data';

interface TimelineProps {
  data: PortfolioData;
}

export default function Timeline({ data }: TimelineProps) {
  const baseAccent = ACCENT_COLORS[data.accentColor];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${baseAccent.badge} border`}>
            <Briefcase className="h-3.5 w-3.5" />
            Milestones
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Experience Timeline
          </h2>
          <div className={`mt-2 h-1 w-12 rounded-full ${baseAccent.bg}`} />
        </div>

        {/* Timeline Path */}
        <div className="relative mt-16 max-w-3xl mx-auto">
          {/* Main vertical track line */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {INITIAL_EXPERIENCE.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className="relative flex flex-col sm:flex-row items-start sm:items-center">
                  
                  {/* Timeline Pulse Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className={`h-4 w-4 rounded-full border-4 border-slate-900 bg-slate-950 flex items-center justify-center transition-all duration-500 hover:scale-125`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${baseAccent.bg} animate-pulse`} />
                    </div>
                  </div>

                  {/* Desktop Right Side */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:pr-12 md:pr-16 flex justify-end">
                    {isEven && (
                      <div className="w-full text-left sm:text-right space-y-2 border border-slate-800/80 bg-slate-900/10 hover:border-slate-700/60 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300">
                        <span className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold tracking-wider ${baseAccent.accentText} uppercase`}>
                          <Calendar className="h-3.5 w-3.5" />
                          {item.duration}
                        </span>
                        <h3 className="text-lg font-bold text-white font-display leading-tight">{item.role}</h3>
                        <p className="text-sm font-medium text-slate-400">{item.company}</p>
                        
                        <ul className="mt-4 space-y-2.5 text-slate-400 text-sm list-none text-left flex flex-col items-start sm:items-end">
                          {item.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2.5 sm:flex-row-reverse sm:text-right">
                              <CheckSquare className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${baseAccent.accentText} sm:ml-2.5 sm:mr-0`} />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Desktop Left Side Wrapper */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-12 md:pl-16 mt-4 sm:mt-0">
                    {!isEven && (
                      <div className="w-full text-left space-y-2 border border-slate-800/80 bg-slate-900/10 hover:border-slate-700/60 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300">
                        <span className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold tracking-wider ${baseAccent.accentText} uppercase`}>
                          <Calendar className="h-3.5 w-3.5" />
                          {item.duration}
                        </span>
                        <h3 className="text-lg font-bold text-white font-display leading-tight">{item.role}</h3>
                        <p className="text-sm font-medium text-slate-400">{item.company}</p>
                        
                        <ul className="mt-4 space-y-2.5 text-slate-400 text-sm list-none">
                          {item.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckSquare className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${baseAccent.accentText}`} />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
