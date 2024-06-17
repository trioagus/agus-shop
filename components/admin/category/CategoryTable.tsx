import React, { useState, useEffect } from "react";
import { useCategoryStore } from "@/store/category-store";
import { useSession } from "next-auth/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddCategory from "@/components/admin/category/AddCategory";
import UpdateCategory from "./UpdateCategory";
import Table from "@/components/ui/Table";
import { Role } from "@prisma/client";

interface Category {
  id?: string;
  name: string;
}

const CategoryTable = () => {
  const { categories, createCategory, setCategories, deleteCategory } = useCategoryStore();
  const { data: session } = useSession();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } else {
        console.error("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        deleteCategory(id);
      } else {
        console.error("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (!session || !session.user || session.user.role !== Role.ADMIN) {
    return <div>Unauthorized</div>;
  }

  const openEditModal = (id: string) => {
    setEditCategoryId(id);
  };

  const closeEditModal = () => {
    setEditCategoryId(null);
  };

  const handleMutateCategories = (name: string) => {
    createCategory(name);
    setShowAddModal(false);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
      >
        Add Category
      </button>

      {showAddModal && (
        <AddCategory onClose={() => setShowAddModal(false)} mutateCategories={handleMutateCategories} />
      )}

      {editCategoryId && (
        <UpdateCategory
          categoryId={editCategoryId}
          onClose={closeEditModal}
        />
      )}

      <Table
        data={categories}
        columns={[
          { key: "name", header: "Category Name" },
        ]}
        actions={(category) => (
          <>
            <button
              onClick={() => openEditModal(category.id!)}
              className="inline-block text-sm px-3 py-1 leading-none border rounded text-blue-500 border-blue-500 hover:border-transparent hover:text-white hover:bg-blue-500 mt-4 lg:mt-0 mr-2"
            >
              <FiEdit2 className="w-4 h-4 inline" />
              <span className="ml-2">Edit</span>
            </button>
            <button
              onClick={() => handleDeleteCategory(category.id!)}
              className="inline-block text-sm px-3 py-1 leading-none border rounded text-red-500 border-red-500 hover:border-transparent hover:text-white hover:bg-red-500 mt-4 lg:mt-0"
            >
              <FiTrash2 className="w-4 h-4 inline" />
              <span className="ml-2">Delete</span>
            </button>
          </>
        )}
      />
    </div>
  );
};

export default CategoryTable;
