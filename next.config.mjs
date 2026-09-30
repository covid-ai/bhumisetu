/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // leaflet sometimes has double-mount issues with React 18 strict mode
};

export default nextConfig;
