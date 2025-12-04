/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'openfarmpet.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.healthy-pet.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.petmd.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'whitehavenvet.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ch.allianzgi.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'people.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.brodieanimalhospital.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.smart.dhgate.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xcdn.next.co.uk',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2zp5xs5cp8zlg.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thegroomer.ae',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
