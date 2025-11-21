"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = Record<string, unknown> | null;

type State = {
  user: User;
  setUser: (u: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u: User) => set({ user: u }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store',
      // Only persist user data, not functions
      partialize: (state) => ({ user: state.user }),
    }
  )
);
