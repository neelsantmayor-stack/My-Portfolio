import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Send, Github, Linkedin, MessageSquare, Loader2, ArrowUpCircle } from 'lucide-react';
import { PortfolioData } from '../types';
import { ACCENT_COLORS } from '../data';

interface ContactFormProps {
  data: PortfolioData;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

export default function ContactForm({ data, onSuccessToast, onErrorToast }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseAccent = ACCENT_COLORS[data.accentColor];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onErrorToast("Please complete all required fields before sending.");
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      onErrorToast("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate network request to mimic real-world submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      onSuccessToast(`Success! Thank you ${formData.name}. Your message has been sent to ${data.name}.`);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      onErrorToast("An error occurred. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-900/20 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${baseAccent.badge} border`}>
            <Mail className="h-3.5 w-3.5" />
            Connect
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Get In Touch
          </h2>
          <div className={`mt-2 h-1 w-12 rounded-full ${baseAccent.bg}`} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5 items-stretch max-w-5xl mx-auto">
          {/* Metadata Grid / Cards */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-100 font-display">Let's build something epic</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Have a job opening, a contract project, or just want to chat about front-end architecture, bundle sizes, or the latest JavaScript ecosystem shift? Shoot me a message!
              </p>
            </div>

            <div className="space-y-4 pt-6 select-all">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/60 transition-colors">
                <div className={`p-2.5 rounded-lg ${baseAccent.accentLightBg} border ${baseAccent.border}`}>
                  <Mail className={`h-4.5 w-4.5 ${baseAccent.accentText}`} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase">Direct Email</h4>
                  <a href={`mailto:${data.email}`} className="text-sm font-semibold text-slate-200 hover:text-white transition-colors">{data.email}</a>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-6">
              <a
                href={data.githubUrl}
                target="_blank"
                rel="noreferrer referrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950/20 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noreferrer referrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950/20 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Form container */}
          <form
            onSubmit={handleFormSubmit}
            className="lg:col-span-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 sm:p-8 backdrop-blur-sm space-y-5"
          >
            <div>
              <label htmlFor="form-name" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Name</label>
              <input
                type="text"
                id="form-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Eleanor Vance"
                className={`w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:ring-1 ${baseAccent.focusBorder} transition-all`}
              />
            </div>

            <div>
              <label htmlFor="form-email" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                id="form-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="eleanor@example.com"
                className={`w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:ring-1 ${baseAccent.focusBorder} transition-all`}
              />
            </div>

            <div>
              <label htmlFor="form-message" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Your Message</label>
              <textarea
                id="form-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Hi, I'm interested in collaborating on..."
                className={`w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:ring-1 ${baseAccent.focusBorder} transition-all resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-slate-950 font-semibold shadow-lg transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer ${baseAccent.bg} ${baseAccent.hoverBg}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div id="footer-section" className="mt-24 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 max-w-5xl mx-auto">
          <span>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Built with React &amp; Tailwind
            </span>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors hover:cursor-pointer"
            >
              Back to Top
              <ArrowUpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
