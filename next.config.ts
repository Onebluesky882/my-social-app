// next.config.js or next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "orjrsmfdvvojvtpmhagj.supabase.co",
      },
    ],
  },
};

export default nextConfig;
