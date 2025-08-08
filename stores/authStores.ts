import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    isVerified: boolean;
    hasHydrated: boolean;
    phonenumber: string;
    organisationName: string;
};

type AuthState = User & {
    setUser: (user: User) => void;
    clearUser: () => void;
    setHydration: (state: boolean) => void;
};

const initState: User = {
    _id: "",
    fullname: "",
    email: "",
    role: "",
    isVerified: false,
    hasHydrated: false,
    phonenumber: "",
    organisationName: "",
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...initState,
            setUser: (user) => set(() => ({ ...user })),
            clearUser: () => set({ ...initState }),
            setHydration: (state: boolean) => set({ hasHydrated: state }),
        }),
        {
            name: "user",
            onRehydrateStorage: () => (state) => {
                state?.setHydration(true);
            }
        }
    )
);
