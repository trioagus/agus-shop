import { create } from 'zustand';

interface Category {
  id: string;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  createCategory: (name: string) => Promise<void>;
  updateCategory: (id: string, newName: string) => Promise<void>;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  createCategory: async (name) => {
    const response = await fetch("/api/categories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const newCategory = await response.json();
      set((state) => ({
        categories: [...state.categories, newCategory],
      }));
    } else {
      console.error("Failed to create category.");
    }
  },
  updateCategory: async (id, newName) => {
    const response = await fetch(`/api/categories/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }), 
    });

    if (response.ok) {
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === id ? { ...category, name: newName } : category
        ),
      }));
    } else {
      console.error("Failed to update category.");
    }
  },
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));
