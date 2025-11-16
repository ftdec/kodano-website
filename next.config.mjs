/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================================================

  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Enable compression
  compress: true,

  // ============================================================================
  // IMAGE OPTIMIZATION
  // ============================================================================

  images: {
    // Use Next.js Image Optimization API with remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kodano.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.kodano.com',
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // ============================================================================
  // TURBOPACK CONFIGURATION (Next.js 16)
  // ============================================================================

  // Empty turbopack config to silence the error
  turbopack: {},

  // ============================================================================
  // EXPERIMENTAL FEATURES
  // ============================================================================

  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
    ],
  },

  // Server components optimizations (moved from experimental)
  serverExternalPackages: ["sharp", "bcrypt"],

  // ============================================================================
  // HEADERS AND SECURITY
  // ============================================================================

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Performance headers
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: '<https://fonts.googleapis.com>; rel=preconnect; crossorigin, <https://fonts.gstatic.com>; rel=preconnect; crossorigin',
          },
        ],
      },
    ];
  },

  // ============================================================================
  // REDIRECTS
  // ============================================================================

  async redirects() {
    return [
      // Redirect old URLs to new ones
      {
        source: "/pricing",
        destination: "/precos",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/fale-conosco",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/como-funciona",
        permanent: true,
      },
      {
        source: "/customers",
        destination: "/clientes",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/produtos",
        permanent: true,
      },
    ];
  },

  // ============================================================================
  // REWRITES (for API proxying if needed)
  // ============================================================================

  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // ============================================================================
  // ENVIRONMENT VARIABLES
  // ============================================================================

  env: {
    // Public environment variables
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://kodano.com",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.kodano.com",
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || "",
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "",
  },

  // ============================================================================
  // BUILD OUTPUT
  // ============================================================================

  distDir: ".next",
  generateBuildId: async () => {
    // Use git commit hash as build ID for better caching
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    }
    return `build-${Date.now()}`;
  },

  // ============================================================================
  // TYPESCRIPT
  // ============================================================================

  typescript: {
    // During production builds, ignore TypeScript errors
    // (should be caught in CI/CD)
    ignoreBuildErrors: false,
  },

  // ============================================================================
  // TRAILING SLASH
  // ============================================================================

  trailingSlash: false,

  // ============================================================================
  // POWER BY HEADER
  // ============================================================================

  poweredByHeader: false,
};

export default nextConfig;