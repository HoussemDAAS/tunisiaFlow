/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    experimental: {
        serverActions: true,
        mdxRsc: true,
        serverComponentsExternalPackages:['mongoose']
    },
  }
   
  export default nextConfig