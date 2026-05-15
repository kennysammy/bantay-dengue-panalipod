/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/shared", "@repo/constants", "@repo/ai-engine"],
};

export default nextConfig;
