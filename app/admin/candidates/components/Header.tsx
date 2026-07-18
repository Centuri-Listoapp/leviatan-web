"use client";
import React from "react";
import Button from "@/app/components/button/Button";
import authService from "@/app/services/authService";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/utils/actions";
import LeviatanLogo from "@/app/components/LeviatanLogo";

const Header = () => {
  const router = useRouter();

  const logout = () => {
    authService.loginData = undefined;
    logoutAction();
    router.replace("/login");
  };

  return (
    <header className="admin-header ">
      <LeviatanLogo size={26} />
      <Button color="text" onClick={logout}>
        Cerrar sesión
      </Button>
    </header>
  );
};

export default Header;
