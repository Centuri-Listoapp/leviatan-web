"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#que-es", label: "¿Qué es Leviatan?" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#contacto", label: "Contacto" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const panel = (
    <div className="lv-mobile-nav">
      <div className="lv-mobile-nav-backdrop" onClick={() => setOpen(false)} />
      <div className="lv-mobile-nav-panel">
        <button
          type="button"
          className="lv-mobile-nav-close"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <nav>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="lv-burger"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && mounted && createPortal(panel, document.body)}
    </>
  );
};

export default MobileNav;
