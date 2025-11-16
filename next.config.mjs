/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================================================

  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Enable SWC minification for faster builds
  swcMinify: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Enable compression
  compress: true,

  // ============================================================================
  // IMAGE OPTIMIZATION
  // ============================================================================

  images: {
    // Use Next.js Image Optimization API
    domains: ["kodano.com", "cdn.kodano.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // ============================================================================
  // WEBPACK OPTIMIZATIONS
  // ============================================================================

  webpack: (config, { isServer, dev }) => {
    // Production optimizations
    if (!dev) {
      // Enable module concatenation
      config.optimization.concatenateModules = true;

      // Split chunks optimally
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          // Framework chunks
          framework: {
            name: "framework",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
            priority: 40,
            reuseExistingChunk: true,
          },
          // Library chunks
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `npm.${packageName?.replace("@", "")}`;
            },
            priority: 30,
          },
          // Common components
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          // Shared modules
          shared: {
            name(module, chunks) {
              return `shared-${crypto
                .createHash("md5")
                .update(chunks.map((c) => c.name).join("_"))
                .digest("hex")
                .substring(0, 8)}`;
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };

      // Minimize main bundle
      config.optimization.minimize = true;

      // Use content hash for better caching
      config.optimization.moduleIds = "deterministic";
      config.optimization.chunkIds = "deterministic";
    }

    // Bundle analyzer (only in analyze mode)
    if (process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: isServer
            ? "../analyze/server.html"
            : "./analyze/client.html",
          openAnalyzer: false,
        })
      );
    }

    return config;
  },

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

    // Server components optimizations
    serverComponentsExternalPackages: ["sharp", "bcrypt"],
  },

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
  // ESLINT
  // ============================================================================

  eslint: {
    // During production builds, ignore ESLint errors
    // (should be caught in CI/CD)
    ignoreDuringBuilds: false,
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