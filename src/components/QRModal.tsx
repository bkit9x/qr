import React, { useEffect } from 'react';
import { X, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { BankAccount } from '../types';

interface QRModalProps {
  account: BankAccount | null;
  onClose: () => void;
  onCopySTK: (stk: string, bank: string) => void;
  copiedSTK: string | null;
}

export const QRModal: React.FC<QRModalProps> = ({
  account,
  onClose,
  onCopySTK,
  copiedSTK,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (account) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [account, onClose]);

  if (!account) return null;

  const isCopied = copiedSTK === account.stk;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = account.qr;
    link.download = `QR_${account.bank}_${account.stk}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Mã QR ${account.bank}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm sm:max-w-md w-full bg-slate-900 border border-sky-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Bank & Name Info */}
        <div className="mb-4">
          <span className="inline-block text-xs uppercase tracking-wider font-semibold text-sky-400 mb-1">
            {account.bank}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100">
            {account.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{account.bankFullName}</p>
        </div>

        {/* QR Code Big Container */}
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-inner border border-slate-200 w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center">
          <img
            src={account.qr}
            alt={`Mã QR ${account.bank} - ${account.name}`}
            width={320}
            height={320}
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>

        {/* STK Bar */}
        <div className="w-full mt-4 flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="text-left font-mono text-sm sm:text-base font-semibold text-sky-300 tracking-wider">
            {account.stk}
          </div>
          <button
            type="button"
            onClick={() => onCopySTK(account.stk, account.bank)}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-medium transition-all cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        </div>

        {/* Modal actions */}
        <div className="w-full mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Tải mã QR</span>
          </button>
          <a
            href={account.qr}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-sky-400" />
            <span>Mở SVG gốc</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 mt-3">
          Quét bằng ứng dụng ngân hàng bất kỳ để chuyển khoản nhanh 24/7 (VietQR / Napas 247).
        </p>
      </div>
    </div>
  );
};
