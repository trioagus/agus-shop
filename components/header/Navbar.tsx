import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNavbarStore } from "@/store/navbar-store";
import { getSession, signOut } from "next-auth/react";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { Session } from "next-auth";
import { Role } from "@prisma/client"; 

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    reset,
  } = useNavbarStore();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session as Session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsDropdownOpen]);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <div className="flex items-center space-x-4">
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="/favicon.ico" alt="logo" className="w-10 h-10" />
            <h1 className="text-lg md:text-2xl">Agus Shop</h1>
          </div>
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/products" passHref>
          <span className="text-lg cursor-pointer">Products</span>
        </Link>
        <Link href="/about" passHref>
          <span className="text-lg cursor-pointer">About</span>
        </Link>
        <Link href="/contact" passHref>
          <span className="text-lg cursor-pointer">Contact</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/cart" passHref>
          <div className="relative text-gray-600 hover:text-gray-700 cursor-pointer">
            <FaShoppingCart className="w-6 h-6" />
            <div className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full">
              0
            </div>
          </div>
        </Link>
        {session ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleUserClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"
            >
              <FiUser className="w-6 h-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 lg:pr-4 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                <Link
                  href={
                    session.user.role === Role.ADMIN
                      ? "/admin"
                      : "/user"
                  }
                  passHref
                >
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" passHref>
            <span className="text-lg cursor-pointer">Login</span>
          </Link>
        )}
        <button
          onClick={handleSidebarToggle}
          className="md:hidden text-gray-600 hover:text-gray-700"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleSidebarToggle}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 shadow-lg`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl">Menu</h2>
          <button
            onClick={handleSidebarToggle}
            className="text-gray-600 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col space-y-2 p-4">
          <Link href="/" passHref>
            <span className="text-lg cursor-pointer">Home</span>
          </Link>
          <Link href="/products" passHref>
            <span className="text-lg cursor-pointer">Products</span>
          </Link>
          <Link href="/about" passHref>
            <span className="text-lg cursor-pointer">About</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="text-lg cursor-pointer">Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
