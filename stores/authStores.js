import { create } from "zustand";
import { persist } from "zustand/middleware";

const initState = {
    _id: "",
    fullname: "",
    email: "",
    role: "",
    isVerified: false,
    hasHydrated: false,
    phonenumber: "",
    organisationId: "",
    organisationName: "",
};

export const useAuthStore = create()(
    persist(
        (set) => ({
            ...initState,
            setUser: (user) => set(() => ({ ...user })),
            clearUser: () => set({ ...initState }),
            setHydration: (state) => set({ hasHydrated: state }),
        }),
        {
            name: "user",
            onRehydrateStorage: () => (state) => {
                state?.setHydration(true);
            }
        }
    )
);
