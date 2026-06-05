import { useState } from 'react';
import { Mail, Github, Linkedin, User, Phone, MapPin, Copy, Check, ArrowUpCircle } from 'lucide-react';
import { PortfolioData } from '../types';
import { ACCENT_COLORS } from '../data';

interface ContactFormProps {
  data: PortfolioData;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

export default function ContactForm({ data, onSuccessToast, onErrorToast }: ContactFormProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const baseAccent = ACCENT_COLORS[data.accentColor];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    onSuccessToast(`${fieldName} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactItems = [
    {
      id: "name",
      icon: <User className={`h-5 w-5 ${baseAccent.accentText}`} />,
      label: "Full Name",
      value: data.name,
      subtext: data.role,
      copyable: true,
    },
    {
      id: "email",
      icon: <Mail className={`h-5 w-5 ${baseAccent.accentText}`} />,
      label: "Email Address",
      value: data.email,
      subtext: "Click to mail or copy",
      copyable: true,
      href: `mailto:${data.email}`
    },
    {
      id: "phone",
      icon: <Phone className={`h-5 w-5 ${baseAccent.accentText}`} />,
      label: "Mobile / Contact Number",
      value: "+91 73046 52609",
      subtext: "Click to dial or copy",
      copyable: true,
      href: "tel:+917304652609"
    },
    {
      id: "location",
      icon: <MapPin className={`h-5 w-5 ${baseAccent.accentText}`} />,
      label: "Current Location",
      value: "Mumbai, Maharashtra, India",
      subtext: "BCA Student at SK Somaiya College",
      copyable: true,
    }
  ];

  return (
    <section id="contact" className="py-24 relative bg-slate-900/20 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${baseAccent.badge} border`}>
            <Mail className="h-3.5 w-3.5" />
            Contact Details
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Let's Stay Connected
          </h2>
          <div className={`mt-2 h-1 w-12 rounded-full ${baseAccent.bg}`} />
          <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            I am currently seeking fresher frontend and full-stack opportunities. Feel free to reach out directly via my contact details below.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {contactItems.map((item) => {
            const isCopyingThis = copiedField === item.label;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-sm hover:border-slate-700/80 hover:bg-slate-950/60 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${baseAccent.accentLightBg} border ${baseAccent.border} shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-0.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base font-semibold text-slate-200 hover:text-white hover:underline transition-colors block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-base font-semibold text-slate-200 block">
                          {item.value}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 mt-1 block">
                        {item.subtext}
                      </span>
                    </div>
                  </div>

                  {item.copyable && (
                    <button
                      onClick={() => handleCopy(item.value, item.label)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer border-0 bg-transparent"
                      title={`Copy ${item.label}`}
                    >
                      {isCopyingThis ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Links Panel */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <a
            href={data.githubUrl}
            target="_blank"
            rel="noreferrer referrer"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950/30 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900/60 transition-all cursor-pointer"
          >
            <Github className="h-4 w-4" />
            GitHub Profile
          </a>
          <a
            href={data.linkedinUrl}
            target="_blank"
            rel="noreferrer referrer"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950/30 text-slate-300 hover:text-white hover:border-slate-705 hover:bg-slate-900/60 transition-all cursor-pointer"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn Profile
          </a>
        </div>

        {/* Footer */}
        <div id="footer-section" className="mt-24 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 max-w-4xl mx-auto">
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
