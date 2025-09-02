import { create } from "zustand"

export type AlertStore = {
    message: string | null
    setMessage: (message: string | null) => void,
    clearMessage: () => void
}

export const useAlertStore = create<AlertStore>((set) => ({
    message: null,
    setMessage: (message) => set({ message }),
    clearMessage: () => set({ message: null })
}))