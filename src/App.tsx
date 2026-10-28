import React, { useState, useRef, useCallback } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Header } from './components/Header';
import { AccountCard } from './components/AccountCard';
import { QRModal } from './components/QRModal';
import { Toast } from './components/Toast';
import { BANK_ACCOUNTS } from './data/accounts';
import { BankAccount } from './types';
import { Smartphone, CheckCircle, Shield } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [effectsEnabled, setEffectsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('qr_effects_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });
  const [copiedSTK, setCopiedSTK] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleEffects = useCallback(() => {
    setEffectsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('qr_effects_enabled', JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2000);
  }, []);

  const handleCopySTK = useCallback((stk: string, bank: string) => {
    navigator.clipboard.writeText(stk)
      .then(() => {
        setCopiedSTK(stk);
        showToast(`Đã copy STK ${bank}: ${stk}`);

        if (copiedTimeoutRef.current) {
          clearTimeout(copiedTimeoutRef.current);
        }
        copiedTimeoutRef.current = setTimeout(() => {
          setCopiedSTK(null);
        }, 2000);
      })
      .catch(() => {
        // Fallback for older browsers or restricted permissions
        try {
          const textarea = document.createElement('textarea');
          textarea.value = stk;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          setCopiedSTK(stk);
          showToast(`Đã copy STK ${bank}: ${stk}`);
        } catch {
          showToast(`Không thể tự động copy. STK: ${stk}`);
        }
      });
  }, [showToast]);

  const handleOpenQR = useCallback((account: BankAccount) => {
    setSelectedAccount(account);
  }, []);

  const handleCloseQR = useCallback(() => {
    setSelectedAccount(null);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background neon ambient light and grid effects */}
      <BackgroundEffects enabled={effectsEnabled} />

      {/* Sticky Header */}
      <Header effectsEnabled={effectsEnabled} onToggleEffects={toggleEffects} />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-5">
        {/* Intro banner */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-sky-500/15 backdrop-blur-sm text-xs sm:text-sm text-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Mở app ngân hàng bất kỳ, quét mã QR hoặc chạm sao chép số tài khoản.</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-sky-400 text-xs shrink-0 font-medium">
            <Shield className="w-3.5 h-3.5" /> Napas 247
          </div>
        </div>

        {/* Bank Accounts Grid */}
        <div className="flex flex-col gap-4">
          {BANK_ACCOUNTS.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onOpenQR={handleOpenQR}
              onCopySTK={handleCopySTK}
              copiedSTK={copiedSTK}
            />
          ))}
        </div>

        {/* Additional guidance card */}
        <div className="mt-2 p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex flex-col gap-2">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-sky-400" />
            Lưu ý khi chuyển khoản:
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-400">
            <li>Vui lòng kiểm tra đúng tên người nhận là <strong className="text-slate-200">NGUYEN HOANG KHA</strong> trước khi xác nhận giao dịch.</li>
            <li>Hỗ trợ chuyển tiền liên ngân hàng 24/7 từ tất cả các ngân hàng Việt Nam.</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-500 border-t border-slate-800/60">
        <p>© {new Date().getFullYear()} Nguyễn Hoàng Kha • Cổng thông tin mã QR chuyển khoản cá nhân</p>
      </footer>

      {/* Modal for full QR display */}
      <QRModal
        account={selectedAccount}
        onClose={handleCloseQR}
        onCopySTK={handleCopySTK}
        copiedSTK={copiedSTK}
      />

      {/* Toast Notification */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
};

export default App;
