"use client";

import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Stores from "../components/Stores";
import Button from "../components/button/Button";
import { CONFIG } from "../constants/globals";
import { buildAndroidIntentUrl, getOperatingSystem } from "../utils/utils";

function ReferredCodeContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const path = code
    ? `/referred-code?code=${encodeURIComponent(code)}`
    : "/referred-code";

  const openApp = () => {
    const os = getOperatingSystem();
    if (os === "Android") {
      window.location.href = buildAndroidIntentUrl(
        path,
        CONFIG.ANDROID_PACKAGE,
        CONFIG.PLAY_STORE,
      );
    } else if (os === "iOS") {
      // No custom scheme registered yet: re-navigating to the canonical
      // universal link on a real click is the only way iOS will consider
      // handing off to the app instead of the browser.
      window.location.href = `${CONFIG.WEBSITE_URL}${path}`;
    }
  };

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
            <h1 className="info-title">
              Descarga la app para poder disfrutar de &quot;Leviatan&quot;
            </h1>
            {code && (
              <Button color="primary" myClass="mb-6" onClick={openApp}>
                Abrir en la app
              </Button>
            )}
            <Stores openStore={true} code={code} />
          </div>
          <div className="app">
            <Image src="/app.png" alt="app" width={350} height={550} />
          </div>
        </div>
        <Stores extraClass="show-mobile" code={code} />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ReferredCodeContent />
    </Suspense>
  );
}
