import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    /**
     * Pin the workspace root to this project. Without it Turbopack walks up and
     * finds an unrelated package-lock.json in the home directory, which it then
     * warns about on every build.
     */
    root: dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
