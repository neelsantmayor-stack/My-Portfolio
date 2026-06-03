import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Eye, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types';
import { ACCENT_COLORS } from '../data';

interface HeroProps {
  data: PortfolioData;
}

export default function Hero({ data }: HeroProps) {
  const baseAccent = ACCENT_COLORS[data.accentColor];

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 px-6 sm:px-8 lg:px-12"
    >
      {/* Background Gradients and Orbs */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
      
      {/* Ambient Pulsing Orb */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full filter blur-[100px] md:blur-[140px] opacity-15 mix-blend-screen transition-all duration-1000 ${baseAccent.bg}`} />
      
      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" 
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Name and Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl font-display font-display-sans"
        >
          Hi, I'm <span className={`bg-gradient-to-r bg-clip-text text-transparent ${baseAccent.gradient}`}>{data.name}</span>
          <br />
          <span className="text-slate-300 text-3xl sm:text-5xl md:text-6xl font-medium block mt-2">
            a {data.role}
          </span>
        </motion.h1>

        {/* Tagline / Hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl leading-relaxed"
        >
          {data.tagline} 
          <span className="block mt-2 text-sm sm:text-base text-slate-500 font-medium">
            Highly optimized for ultra-fast performance, pixel perfect layout designs, and elegant UX codebases.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 px-4"
        >
          <button
            onClick={() => handleScrollTo('#projects')}
            className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg transition-all duration-300 ${baseAccent.bg} ${baseAccent.hoverBg} hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
          >
            View Work
            <Eye className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          
          <button
            onClick={() => handleScrollTo('#contact')}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-300 backdrop-blur-sm hover:border-slate-700 hover:text-white hover:bg-slate-900/60 active:scale-[0.98] cursor-pointer"
          >
            Contact Me
            <MessageSquare className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-500 cursor-pointer"
          onClick={() => handleScrollTo('#about')}
        >
          <div className="h-10 w-6 rounded-full border border-slate-800 flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className={`h-2 w-1.5 rounded-full ${baseAccent.bg}`}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
