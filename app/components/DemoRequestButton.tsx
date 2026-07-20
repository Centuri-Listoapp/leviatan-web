"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  className?: string;
  children: React.ReactNode;
};

type Status = "idle" | "loading" | "success" | "error";

const DemoRequestButton = ({ className, children }: Props) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  const close = () => {
    setOpen(false);
    setStatus("idle");
    setErrorMsg("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    };

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "No se pudo enviar el formulario");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "No se pudo enviar el formulario"
      );
    }
  };

  const modal = (
    <div className="lv-modal-backdrop" onClick={close}>
      <div
        className="lv-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lv-modal-close"
          onClick={close}
          aria-label="Cerrar"
        >
          &times;
        </button>

        {status === "success" ? (
          <div className="lv-modal-success">
            <h3>¡Gracias!</h3>
            <p>
              Recibimos tu solicitud. Nuestro equipo te contactará muy
              pronto.
            </p>
            <button
              type="button"
              className="lv-btn lv-btn-outline"
              onClick={close}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h3>Solicita una demo</h3>
            <p className="lv-modal-subtitle">
              Déjanos tus datos y te contactaremos para mostrarte Leviatan.
            </p>

            <form onSubmit={onSubmit} className="lv-modal-form">
              <label>
                Nombre*
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                Correo electrónico*
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                />
              </label>
              <label>
                Teléfono
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label>
                Mensaje
                <textarea name="message" rows={3} />
              </label>

              {status === "error" && (
                <p className="lv-modal-error">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="lv-btn lv-btn-primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && mounted && createPortal(modal, document.body)}
    </>
  );
};

export default DemoRequestButton;
