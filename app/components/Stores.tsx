"use client";
import { CONFIG } from "@/app/constants/globals";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  buildAndroidIntentUrl,
  getOperatingSystem,
  isMobileDevice,
} from "../utils/utils";

type Props = {
  extraClass?: string;
  openStore?: boolean;
  code?: string | null;
};

const Stores = ({ extraClass, openStore = false, code }: Props) => {
  const path = code
    ? `/referred-code?code=${encodeURIComponent(code)}`
    : "/referred-code";

  const openLink = (url: string) => {
    if (isMobileDevice()) {
      window.open(`${CONFIG.WEBSITE_URL}/referred-code`);
      setTimeout(() => {
        window.open(url, "_blank");
      }, 500);
    } else {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    validateStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateStore = () => {
    if (!openStore) return;
    const so = getOperatingSystem();
    if (so == "Android") {
      // Explicit-package intent: opens the app directly if installed, or
      // falls back to the Play Store in the same navigation if not — safe
      // to fire automatically, and doesn't depend on Digital Asset Links
      // verification having gone through.
      window.location.href = buildAndroidIntentUrl(
        path,
        CONFIG.ANDROID_PACKAGE,
        CONFIG.PLAY_STORE,
      );
    }
    // iOS: intentionally no auto-redirect. If this script is running, iOS
    // already decided not to hand this pageload to the app; forcing the
    // App Store here would remove the user's only remaining chance (a
    // real tap) to retry the Universal Link.
  };

  return (
    <div className={`buttons ${extraClass}`}>
      <div className="store" onClick={() => openLink(CONFIG.APP_STORE)}>
        <Image src="/apple.png" alt="app" width={30} height={30} />
        <span>Descarga en App Store</span>
      </div>
      <div className="store" onClick={() => openLink(CONFIG.PLAY_STORE)}>
        <Image src="/playstore.png" alt="app" width={30} height={30} />
        <span>Descarga en Google Play</span>
      </div>
    </div>
  );
};

export default Stores;
