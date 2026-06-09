import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    token: string | null;
    user: string | null;
    setToken: (token: string | null) => void;
    setUser: (user: string | null) => void;
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
        }
    )
);