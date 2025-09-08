import { create } from "zustand"

export const useAlertStore = create((set) => ({
    message: null,
    setMessage: (message) => set({ message }),
    clearMessage: () => set({ message: null })
}))