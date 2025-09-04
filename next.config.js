/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  // Enable compression
  compress: true,
  // Optimize bundle size
  swcMinify: true,
  // Cache static assets
  generateEtags: false,
}

module.exports = nextConfig 