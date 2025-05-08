import { create } from "zustand";

// type

type UserStore = {
  userId: string | null;
  setUser: (userId: string) => void;
  clearUser: () => void;
};

//  Create the Zustand Store

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUser: (userId) => set({ userId }),
  clearUser: () => set({ userId: null }),
}));
