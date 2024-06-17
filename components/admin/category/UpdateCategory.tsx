import React, { useState, useEffect } from "react";
import { useCategoryStore } from "@/store/category-store";

interface UpdateCategoryProps {
  categoryId: string;
  onClose: () => void;
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({ categoryId, onClose }) => {
  const [name, setName] = useState("");
  const { categories, updateCategory } = useCategoryStore();

  useEffect(() => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setName(category.name);
    }
  }, [categories, categoryId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    await updateCategory(categoryId, name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Update Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new category name"
            className="px-3 py-2 border rounded-md mb-2 w-full"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
