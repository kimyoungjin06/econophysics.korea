import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { "/*": ["./content/events/*.json"] },
};

export default nextConfig;
