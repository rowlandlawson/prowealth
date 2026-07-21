import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "C:/Users/Administrator/Documents/ROWLAND/prowealth", // absolute path to project root
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
