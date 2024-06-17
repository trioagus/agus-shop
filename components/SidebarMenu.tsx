import React, { useState } from "react";
import Link from "next/link";
import {
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiPackage,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { useAdminLayoutStore } from "@/store/adminLayout-store";

const SidebarMenu: React.FC = () => {
  const { isDropdownOpen, setIsDropdownOpen } = useAdminLayoutStore();
  const [focusedItem, setFocusedItem] = useState<number | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (index: number) => {
    setFocusedItem(index);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLSpanElement | HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setFocusedItem(index);
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="h-full px-3 py-4 overflow-y-auto">
      <ul className="space-y-2">
        <li>
          <Link href="/admin">
            <span
              className={`flex items-center p-2 text-base font-normal text-gray-900 hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                focusedItem === 0
                  ? "focus:bg-gray-100 dark:focus:bg-gray-700"
                  : ""
              }`}
              tabIndex={0}
              onClick={() => handleItemClick(0)}
              onKeyDown={(e) => handleKeyPress(e, 0)}>
              <FiHome className="w-6 h-6 mr-3" />
              <span>Dashboard</span>
            </span>
          </Link>
        </li>
        <li>
          <button
            className={`flex items-center p-2 text-base font-normal text-gray-900 hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${
              focusedItem === 1
                ? "focus:bg-gray-100 dark:focus:bg-gray-700"
                : ""
            }`}
            onClick={toggleDropdown}
            onKeyDown={(e) => handleKeyPress(e, 1)}
            tabIndex={0}>
            <FiPackage className="w-6 h-6 mr-3" />
            <span>Ecommerce</span>
            <span className="ml-auto">
              {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          </button>
          {isDropdownOpen && (
            <ul className="space-y-2 pl-8 mt-2">
              <li>
                <Link href="/admin/products">
                  <span
                    className={`flex items-center p-2 text-base font-normal text-gray-900 hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      focusedItem === 2
                        ? "focus:bg-gray-100 dark:focus:bg-gray-700"
                        : ""
                    }`}
                    tabIndex={0}
                    onClick={() => handleItemClick(2)}
                    onKeyDown={(e) => handleKeyPress(e, 2)}>
                    <FiPackage className="w-6 h-6 mr-3" />
                    <span>Products</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/admin/category">
                  <span
                    className={`flex items-center p-2 text-base font-normal text-gray-900 hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      focusedItem === 3
                        ? "focus:bg-gray-100 dark:focus:bg-gray-700"
                        : ""
                    }`}
                    tabIndex={0}
                    onClick={() => handleItemClick(3)}
                    onKeyDown={(e) => handleKeyPress(e, 3)}>
                    <FiPackage className="w-6 h-6 mr-3" />
                    <span>Categories</span>
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/admin/users">
            <span
              className={`flex items-center p-2 text-base font-normal text-gray-900 hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                focusedItem === 4
                  ? "focus:bg-gray-100 dark:focus:bg-gray-700"
                  : ""
              }`}
              tabIndex={0}
              onClick={() => handleItemClick(4)}
              onKeyDown={(e) => handleKeyPress(e, 4)}>
              <FiUsers className="w-6 h-6 mr-3" />
              <span>Users</span>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin/settings">
            <span
              className={`flex items-center p-2 text-base font-normal text-gray-900 hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                focusedItem === 5
                  ? "focus:bg-gray-100 dark:focus:bg-gray-700"
                  : ""
              }`}
              tabIndex={0}
              onClick={() => handleItemClick(5)}
              onKeyDown={(e) => handleKeyPress(e, 5)}>
              <FiSettings className="w-6 h-6 mr-3" />
              <span>Settings</span>
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
