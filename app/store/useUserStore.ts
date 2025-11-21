"use client";

import { create } from 'zustand';

type User = Record<string, unknown> | null;

type State = {
  user: User;
  setUser: (u: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<State>((set: (partial: Partial<State>) => void) => ({
  user: null,
  setUser: (u: User) => set({ user: u }),
  clearUser: () => set({ user: null }),
}));
