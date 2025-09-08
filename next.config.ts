import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
<<<<<<< HEAD
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
=======
        destination: `${process.env.BACKEND_URL}/api/:path*`, // Proxy to Backend
>>>>>>> 7b86845a8b1cf13899b4bd13c272958ddb02b008
      },
    ]
  }
};

export default nextConfig;