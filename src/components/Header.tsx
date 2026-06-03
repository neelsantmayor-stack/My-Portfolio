import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '../types';
import { ACCENT_COLORS } from '../data';

interface HeaderProps {
  data: PortfolioData;
  activeSection: string;
}

export default function Header({ data, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const baseAccent = ACCENT_COLORS[data.accentColor];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/80 border-b border-slate-800/60 backdrop-blur-md py-4 shadow-lg shadow-slate-950/20'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="group flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
            >
              <div className={`rounded-xl p-2 ${baseAccent.accentLightBg} border ${baseAccent.border} transition-transform group-hover:scale-105`}>
                <Code2 className={`h-5 w-5 ${baseAccent.accentText}`} />
              </div>
              <span className="font-display">{data.name}</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${baseAccent.bg}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Nav Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 z-35 border-b border-slate-850 bg-slate-900/95 backdrop-blur-lg shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-lg font-medium transition-colors py-1 ${
                      isActive ? baseAccent.accentText : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
