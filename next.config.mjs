/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR || "default_value",
  },
};

export default nextConfig;
