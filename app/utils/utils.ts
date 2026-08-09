export function isMobileDevice() {
  console.log("isMobileDevice:", navigator.userAgent);
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function getOperatingSystem(): "Android" | "iOS" | "Other" {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return "iOS";
  }
  return "Other";
}

/**
 * Builds an `intent://` URL that tells Android to open the app directly
 * (by package name) if installed, or fall back to the Play Store if not —
 * this works even when Digital Asset Links (App Links) verification hasn't
 * gone through, since it targets the package explicitly.
 */
export function buildAndroidIntentUrl(
  path: string,
  androidPackage: string,
  fallbackUrl: string,
) {
  return `intent://leviatania.com${path}#Intent;scheme=https;package=${androidPackage};S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
}
