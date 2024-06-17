import { create } from "zustand";

export type RegisterStore = {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  name: "",
  email: "",
  password: "",
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  reset: () => set({ name: "", email: "", password: "" }),
}));
