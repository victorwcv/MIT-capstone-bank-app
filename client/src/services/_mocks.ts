// /src/services/_mocks.ts
import type { Account, Transaction } from '@/types';

const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

const randomMoney = (): number =>
  Number(rnd(-800, 800).toFixed(2));

const generateTxForDay = (date: Date): Transaction[] => {
  const day: Transaction[] = [];
  const count = Math.floor(rnd(0, 4));
  for (let i = 0; i < count; i++) {
    const amount = randomMoney();
    day.push({
      id: crypto.randomUUID(),
      date: date.toISOString(),
      description: amount > 0 ? 'Top-up via card' : 'Payment to John Doe',
      amount: { amount: Math.abs(amount), currency: 'USD' },
      direction: amount > 0 ? 'in' : 'out',
      status: Math.random() > 0.05 ? 'completed' : 'pending',
      category: amount > 0 ? 'topup' : 'transfer',
      counterpart:
        amount < 0
          ? { name: 'John Doe', account: 'iban123' }
          : undefined,
    });
  }
  return day;
};

// 30 días hacia atrás
export const MOCK_TX: Transaction[] = Array.from({ length: 30 })
  .map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return generateTxForDay(d);
  })
  .flat()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    number: '**** 4242',
    balance: { amount: 3_450.5, currency: 'USD' },
    type: 'checking',
  },
  {
    id: '2',
    name: 'Travel Card',
    number: '**** 2314',
    balance: { amount: 890, currency: 'USD' },
    type: 'card',
    brand: 'visa',
    exp: '12/27',
  },
  {
    id: '3',
    name: 'Savings',
    number: '**** 7867',
    balance: { amount: 12_400, currency: 'USD' },
    type: 'savings',
  },
];