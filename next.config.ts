import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Test serverlarni asosiy .next keshidan ajratish uchun
  // (NEXT_DIST_DIR=.next-test npm run dev -- --port 3002)
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
};

export default nextConfig;
