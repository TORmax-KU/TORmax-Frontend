import type { NextConfig } from "next";

// Hosting the website and the API on different sites (e.g. Vercel and Render) breaks login:
// browsers do not send the session cookie to another site. Instead, set
//   BACKEND_URL=https://<your-api>.onrender.com   and   NEXT_PUBLIC_API_URL=/backend
// The browser then calls this site's /backend/... path, Next.js forwards each request to the
// API, and the cookie belongs to this site. Locally, leave BACKEND_URL unset and keep
// NEXT_PUBLIC_API_URL=http://localhost:5001.
const BACKEND_PROXY_PATH = "/backend";
const backendUrl = process.env.BACKEND_URL?.trim().replace(/\/+$/, "");

if (process.env.NEXT_PUBLIC_API_URL === BACKEND_PROXY_PATH && !backendUrl) {
  throw new Error(`NEXT_PUBLIC_API_URL is "${BACKEND_PROXY_PATH}", so BACKEND_URL must be set to the API address.`);
}

const nextConfig: NextConfig = {
  async rewrites() {
    if (!backendUrl) return [];
    return [{ source: `${BACKEND_PROXY_PATH}/:path*`, destination: `${backendUrl}/:path*` }];
  },
};

export default nextConfig;
