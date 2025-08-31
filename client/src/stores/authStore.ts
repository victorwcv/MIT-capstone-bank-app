import { create } from "zustand";
import { createJSONStorage, devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  fullName: string;
  email: string;
  documentId: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => {
          set({ user: null });
          localStorage.removeItem("access-token");
        },
      }),
      {
        name: "user",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: "user-store" }
  )
);
