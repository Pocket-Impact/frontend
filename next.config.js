const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // eslint-disable-next-line no-undef
        destination: `${process.env.BACKEND_URL}/api/:path*`, // Proxy to Backend
      },
    ]
  }
};

export default nextConfig;