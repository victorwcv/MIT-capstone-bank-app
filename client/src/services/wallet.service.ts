import type { Account, Transaction } from '@/types';
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