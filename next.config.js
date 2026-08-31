/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify's Next.js image-optimization function uses a legacy Lambda
  // handler that Node.js 24 no longer supports, breaking every next/image
  // on the site. This is a small site with only a couple of static
  // images, so skip runtime optimization instead of depending on that
  // function. Next 12.2's stable `images.unoptimized` isn't wired up yet;
  // this version only reads it from `experimental.images.unoptimized`.
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig
