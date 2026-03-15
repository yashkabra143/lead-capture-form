import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; connect-src 'self' https://script.google.com https://*.google.com https://*.googleapis.com; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
