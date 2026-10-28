export interface BankAccount {
  id: string;
  name: string;
  bank: string;
  bankFullName: string;
  stk: string;
  qr: string;
  bin?: string;
  colorTheme?: string;
}

export interface ToastState {
  show: boolean;
  message: string;
}
