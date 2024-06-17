import { create } from "zustand";

type NavbarStore = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isDropdownOpen: boolean;
    setIsDropdownOpen: (isDropdownOpen: boolean) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (isSearchOpen: boolean) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
    isScrollTop: boolean;
    setIsScrollTop: (isScrollTop: boolean) => void;
    isScrollDown: boolean;
    setIsScrollDown: (isScrollDown: boolean) => void;
    isShoppingCartOpen: boolean;
    setIsShoppingCartOpen: (isShoppingCartOpen: boolean) => void;
    reset: () => void;
};

export const useNavbarStore = create<NavbarStore>((set) => ({
    isOpen: false,
    isDropdownOpen: false,
    isSearchOpen: false,
    isSidebarOpen: false,
    isScrollTop: false,
    isScrollDown: false,
    isShoppingCartOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    setIsDropdownOpen: (isDropdownOpen) => set({ isDropdownOpen }),
    setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
    setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
    setIsScrollTop: (isScrollTop) => set({ isScrollTop }),
    setIsScrollDown: (isScrollDown) => set({ isScrollDown }),
    setIsShoppingCartOpen: (isShoppingCartOpen) =>
        set({ isShoppingCartOpen }),
    reset: () =>
        set({
            isOpen: false,
            isDropdownOpen: false,
            isSearchOpen: false,
            isSidebarOpen: false,
            isScrollTop: false,
            isScrollDown: false,
            isShoppingCartOpen: false,
        }),
}))