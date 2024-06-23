/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
    loader: "default",
    path: "/",
    
  }
};

export default nextConfig;
