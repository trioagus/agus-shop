import { create } from "zustand";

type AdminLayoutStore = {
    isSidebarOpen: boolean;
    isDropdownOpen: boolean;
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
    setIsDropdownOpen: (isDropdownOpen: boolean) => void;
    reset: () => void;
};

export const useAdminLayoutStore = create<AdminLayoutStore>((set) => ({
    isSidebarOpen: false,
    isDropdownOpen: false,
    setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
    setIsDropdownOpen: (isDropdownOpen: boolean) => set({ isDropdownOpen }),
    reset: () => set({ isSidebarOpen: false, isDropdownOpen: false }),
}));
