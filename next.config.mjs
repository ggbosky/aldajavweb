/**
 * Static export: `npm run build` writes the finished site to `out/`, which is
 * what Cloudflare Pages serves on aldastrih.cz. There is no Next.js server in
 * production, so image optimisation is off — the images in `public/` are
 * already sized for the page.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
