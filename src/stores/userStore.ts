import { registerSchema } from "@/schemas/user";
import z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = z.infer<typeof registerSchema> & { permissions: string[] };

interface AuthStore {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
