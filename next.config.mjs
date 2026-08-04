/**
 * Next.js configuration — tuned for a fully static GitHub Pages deployment.
 *
 * The site is served from the apex domain (v1olet.xyz) via `public/CNAME`,
 * so no `basePath`/`assetPrefix` is required. Everything below follows from
 * "no server at runtime":
 *
 *  - `output: 'export'`  → `next build` emits a plain `out/` directory.
 *  - `images.unoptimized` → the /_next/image optimiser is a server route and
 *    cannot exist. Source images are pre-compressed to WebP instead (see
 *    `public/brand` and `public/avatars`).
 *  - `trailingSlash`     → emits `/services/index.html` rather than
 *    `/services.html`, which is what GitHub Pages resolves correctly.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Three.js ships untranspiled ESM examples; keep the transpile boundary explicit.
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
