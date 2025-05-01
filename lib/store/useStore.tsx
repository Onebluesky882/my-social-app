import { create } from "zustand";

// type
export type UserId = {
  id: string;
};

type UserStore = {
  userId: UserId | null;
  setUser: (userId: UserId) => void;
  clearUser: () => void;
};

//  Create the Zustand Store

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUser: (userId) => set({ userId }),
  clearUser: () => set({ userId: null }),
}));
