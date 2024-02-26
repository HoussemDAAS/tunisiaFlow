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
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
              
            },
            {
                protocol: 'http',
                hostname: '*',
              
            },

        ]
    }
  }
   
  export default nextConfig