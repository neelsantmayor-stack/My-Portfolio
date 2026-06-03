import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="toast-notification"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-md max-w-sm"
        >
          {type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          )}
          <p className="text-sm font-medium text-slate-200">{message}</p>
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
