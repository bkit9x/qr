import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ show, message }) => {
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ease-out ${
        show
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95'
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/95 text-slate-100 border border-sky-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_12px_rgba(56,189,248,0.3)] backdrop-blur-md text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
