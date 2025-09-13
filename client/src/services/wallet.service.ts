import type { Account, Transaction, TransferDto } from '@/types';
import { MOCK_ACCOUNTS, MOCK_TX } from './_mocks';

const delay = (ms = 600) => new Promise<void>(r => setTimeout(r, ms));

export const fetchAccounts = async (): Promise<Account[]> => {
  await delay();
  // 10 % chance de error para probar UI
  if (Math.random() < 0.1) throw new Error('Network error');
  return MOCK_ACCOUNTS;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  await delay(700);
  return MOCK_TX;
};


export const createTransfer = async (dto: TransferDto): Promise<Transaction> => {
  await delay(900);
  // 15 % de error para ver UI
  if (Math.random() < 0.15) throw new Error('Insufficient funds');
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    description: dto.note || `Transfer to ${dto.to}`,
    amount: dto.amount,
    direction: 'out',
    status: 'completed',
    category: 'transfer',
    counterpart: { name: dto.to, account: dto.to },
  };
};