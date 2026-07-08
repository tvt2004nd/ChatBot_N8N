import type { NextConfig } from "next";

const serverActionOrigins = [
  "chatbotain8n.netlify.app",
  "*.netlify.app",
  ...(process.env.URL ? [new URL(process.env.URL).host] : []),
  ...(process.env.DEPLOY_PRIME_URL ? [new URL(process.env.DEPLOY_PRIME_URL).host] : []),
  ...(process.env.DEPLOY_URL ? [new URL(process.env.DEPLOY_URL).host] : []),
];

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: Array.from(new Set(serverActionOrigins)),
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
