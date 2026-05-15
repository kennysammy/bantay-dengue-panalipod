/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@repo/ui",
    "@repo/shared",
    "@repo/constants",
    "@repo/ai-engine",
    "@repo/hooks",
    "@repo/utils",
    "@repo/firebase",
  ],
};

export default nextConfig;
