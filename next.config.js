/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Netlify's Next.js image-optimization function uses a legacy Lambda
    // handler that Node.js 24 no longer supports, breaking every next/image
    // on the site. This is a small site with only a couple of static
    // images, so skip runtime optimization instead of depending on that
    // function.
    unoptimized: true,
  },
}

module.exports = nextConfig
