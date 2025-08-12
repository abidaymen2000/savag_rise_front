import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'ik.imagekit.io'], // add your backend hostname and image host here
  },
};

export default nextConfig;
