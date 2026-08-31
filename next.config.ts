import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      new URL('https://centuria-files-557690598784-leviatan.s3.amazonaws.com/**'),
    ],
  },
};

export default nextConfig;
