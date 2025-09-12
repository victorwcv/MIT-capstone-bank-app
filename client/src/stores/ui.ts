import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  setTheme: (t: Theme) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        sidebarOpen: false,
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      }),
      { name: 'ui-storage' }
    )
  )
);