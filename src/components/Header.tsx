import React from 'react';
import { QrCode, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface HeaderProps {
  effectsEnabled: boolean;
  onToggleEffects: () => void;
}

export const Header: React.FC<HeaderProps> = ({ effectsEnabled, onToggleEffects }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Left: empty spacer for center alignment on desktop */}
        <div className="w-16 hidden sm:block" />

        {/* Center: Title & Owner */}
        <div className="flex-1 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-0.5">
            <QrCode className="w-5 h-5 text-sky-400" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-sky-400">
              QR Thanh Toán
            </h1>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-slate-200">
            <span>Nguyễn Hoàng Kha</span>
            <span className="inline-flex items-center text-[11px] px-2 py-0.2 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
              <ShieldCheck className="w-3 h-3 mr-1 text-sky-400" /> Chính chủ
            </span>
          </div>
        </div>

        {/* Right: Performance / Effects Mode Toggle */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onToggleEffects}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              effectsEnabled
                ? 'bg-slate-900 text-sky-300 border-sky-500/30 hover:bg-slate-800'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
            }`}
            title={effectsEnabled ? "Chuyển sang chế độ siêu nhẹ / tiết kiệm pin" : "Bật hiệu ứng nền"}
          >
            {effectsEnabled ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden xs:inline">Hiệu ứng</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline">Siêu mượt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
