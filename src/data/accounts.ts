import { BankAccount } from '../types';

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'mb',
    name: 'Nguyễn Hoàng Kha',
    bank: 'MBBank',
    bankFullName: 'Ngân hàng Thương mại Cổ phần Quân đội',
    stk: '70047705081999',
    qr: '/mb.svg',
    bin: '970422',
    colorTheme: 'blue',
  },
  {
    id: 'vcb',
    name: 'Nguyễn Hoàng Kha',
    bank: 'Vietcombank',
    bankFullName: 'Ngân hàng Ngoại thương Việt Nam',
    stk: '1055833228',
    qr: '/vcb.svg',
    bin: '970436',
    colorTheme: 'emerald',
  },
];
