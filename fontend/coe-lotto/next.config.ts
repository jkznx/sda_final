import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores all ESLint errors during build
  },
  /* add other config options here if needed */
};

export default nextConfig;