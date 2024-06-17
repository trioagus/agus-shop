import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/header/Navbar";

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const { pathname } = useRouter();
  const disableNavbar = ['register', 'login', 'reset-password', 'forgot-password', 'admin', 'user'];

  return (
    <>
      {!disableNavbar.includes(pathname.split('/')[1]) && <Navbar />}
      {children}
    </>
  );
}

export default Provider;
