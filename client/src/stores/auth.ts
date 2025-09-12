import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: {
        id: 'u1',
        fullName: 'Alex Johnson',
        email: 'alex@mail.com',
      },
      login: (email) =>
        set({
          user: { id: 'u1', fullName: 'Alex Johnson', email },
        }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-store' }
  )
);