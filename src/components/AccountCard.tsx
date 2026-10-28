import React from 'react';
import { Copy, Check, Maximize2, Download, Building2 } from 'lucide-react';
import { BankAccount } from '../types';

interface AccountCardProps {
  account: BankAccount;
  onOpenQR: (account: BankAccount) => void;
  onCopySTK: (stk: string, bank: string) => void;
  copiedSTK: string | null;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onOpenQR,
  onCopySTK,
  copiedSTK,
}) => {
  const isCopied = copiedSTK === account.stk;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = account.qr;
    link.download = `QR_${account.bank}_${account.stk}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="neon-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-stretch border border-sky-500/10">
      {/* QR Code thumbnail */}
      <div
        onClick={() => onOpenQR(account)}
        title="Nhấp để phóng to mã QR"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenQR(account);
          }
        }}
        className="neon-qr-box relative w-28 h-28 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-white p-1.5 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <img
          src={account.qr}
          alt={`Mã QR ${account.bank}`}
          width={112}
          height={112}
          className="w-full h-full object-contain block transition-transform group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sky-300">
          <Maximize2 className="w-5 h-5 drop-shadow" />
        </div>
      </div>

      {/* Account metadata */}
      <div className="flex-1 flex flex-col justify-between w-full text-center sm:text-left">
        <div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-sky-400/80" />
              {account.bank}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 line-clamp-1">{account.bankFullName}</span>
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-slate-100 tracking-wide my-1">
            {account.name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 font-mono text-base font-semibold text-sky-300 tracking-wider">
              <span>{account.stk}</span>
            </div>

            <button
              type="button"
              onClick={() => onCopySTK(account.stk, account.bank)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 active:scale-95 text-sky-400 border border-sky-500/30 text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
              title="Sao chép số tài khoản"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy STK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Secondary quick actions */}
        <div className="mt-3 pt-3 border-t border-slate-700/40 flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => onOpenQR(account)}
            className="hover:text-sky-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Phóng to QR
          </button>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={handleDownload}
            className="hover:text-sky-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Tải mã QR
          </button>
        </div>
      </div>
    </div>
  );
};
