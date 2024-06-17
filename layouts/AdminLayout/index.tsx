import React, { useEffect, useRef } from "react";
import { useAdminLayoutStore } from "@/store/adminLayout-store";
import { FiMenu, FiX } from "react-icons/fi";
import SidebarMenu from "@/components/SidebarMenu";

type AdminLayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, pageTitle }) => {
  const { reset, isSidebarOpen, setIsSidebarOpen } = useAdminLayoutStore();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset();
  }, [reset]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen && sidebarRef.current) {
      sidebarRef.current.focus();
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform bg-white dark:bg-gray-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:static sm:translate-x-0`}
        tabIndex={isSidebarOpen ? 0 : -1} // Set tabindex based on sidebar state
        aria-labelledby="sidebar-title"
        role="complementary"
      >
        <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-700">
          <h2 id="sidebar-title" className="text-lg font-semibold text-gray-700">
            Admin Panel
          </h2>
          <button
            className="text-gray-700 sm:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <SidebarMenu />
      </aside>
      <div className="flex-1 flex flex-col ml-64">
        <header className="w-full fixed bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <button
            className="text-gray-800 sm:hidden"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </header>
        <main className="flex-1 p-4 pt-16">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
