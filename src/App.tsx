import { useState, useEffect } from 'react';
import { PortfolioData } from './types';
import { INITIAL_PORTFOLIO_DATA, ACCENT_COLORS } from './data';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsGrid from './components/ProjectsGrid';
import Timeline from './components/Timeline';
import ContactForm from './components/ContactForm';
import Toast from './components/Toast';

export default function App() {
  const [data, setData] = useState<PortfolioData>(INITIAL_PORTFOLIO_DATA);
  const [activeSection, setActiveSection] = useState('hero');

  // Toast status states
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const baseAccent = ACCENT_COLORS[data.accentColor];

  // Show a message in toast
  const triggerToast = (msg: string, type: 'success' | 'error') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
  };

  // Scrollspy implementation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset for sticky menu headers

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans selection:bg-slate-850 selection:text-white transition-colors duration-300">
      
      {/* Sticky Navigation Bar */}
      <Header
        data={data}
        activeSection={activeSection}
      />

      {/* Main Single Page Sections */}
      <main className="relative">
        <Hero data={data} />
        <About data={data} />
        <ProjectsGrid data={data} />
        <Timeline data={data} />
        <ContactForm 
          data={data}
          onSuccessToast={(msg) => triggerToast(msg, 'success')}
          onErrorToast={(msg) => triggerToast(msg, 'error')}
        />
      </main>

      {/* Toast Notification Container */}
      <Toast
        message={toastMsg}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
