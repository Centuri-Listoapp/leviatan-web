"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONFIG } from "@/app/constants/globals";
import { getOperatingSystem } from "@/app/utils/utils";
import Button from "@/app/components/button/Button";

const ANDROID_PACKAGE = "com.leviatan";

function buildAndroidIntentUrl(token: string | null) {
  const path = token
    ? `/reset-password?token=${encodeURIComponent(token)}`
    : "/reset-password";
  const fallback = encodeURIComponent(CONFIG.PLAY_STORE);
  return `intent://leviatania.com${path}#Intent;scheme=https;package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [attempted, setAttempted] = useState(false);

  const openApp = () => {
    setAttempted(true);
    const os = getOperatingSystem();
    if (os === "Android") {
      window.location.href = buildAndroidIntentUrl(token);
    } else if (os === "iOS") {
      window.location.href = CONFIG.APP_STORE;
    } else {
      window.location.href = CONFIG.APP_STORE;
    }
  };

  useEffect(() => {
    if (!token) return;
    if (getOperatingSystem() === "Android") {
      window.location.href = buildAndroidIntentUrl(token);
      setAttempted(true);
    }
  }, [token]);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <header className="header">
        <Image
          src="/logo/leviatan-logo-oficial.svg"
          alt="Leviatan"
          width={1254}
          height={1254}
          style={{ width: "auto", height: 40 }}
        />
      </header>
      <main>
        <div className="info-section">
          <div className="texts">
            {token ? (
              <>
                <h1 className="info-title">
                  Continúa el restablecimiento de tu contraseña en la app
                  Leviatan
                </h1>
                <p className="info-text">
                  Si ya tienes la app instalada, ábrela para completar el
                  proceso. Si no la tienes, descárgala primero y vuelve a
                  intentarlo desde este mismo enlace.
                </p>
                <Button
                  color="primary"
                  myClass="mb-6"
                  onClick={openApp}
                >
                  {attempted ? "Reintentar abrir la app" : "Abrir en la app"}
                </Button>
              </>
            ) : (
              <h1 className="info-title">
                Este enlace no es válido o ya expiró. Solicita uno nuevo
                desde la app.
              </h1>
            )}
            <div className="buttons">
              <div
                className="store"
                onClick={() => window.open(CONFIG.APP_STORE, "_blank")}
              >
                <Image src="/apple.png" alt="App Store" width={30} height={30} />
                <span>Descarga en App Store</span>
              </div>
              <div
                className="store"
                onClick={() => window.open(CONFIG.PLAY_STORE, "_blank")}
              >
                <Image
                  src="/playstore.png"
                  alt="Google Play"
                  width={30}
                  height={30}
                />
                <span>Descarga en Google Play</span>
              </div>
            </div>
          </div>
          <div className="app">
            <Image src="/app.png" alt="app" width={350} height={550} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
