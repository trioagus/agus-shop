import { create } from "zustand";

type LoginStore = {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    reset: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
    email: "",
    password: "",
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    reset: () => set({ email: "", password: "" }),
}))