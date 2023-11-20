/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['dvf-course.s3.eu-central-1.amazonaws.com' ,  'dvf-course.co.il']
    },
    generateEtags: false,
    typescript : {
        ignoreBuildErrors : true
    },
    experimental : {
        serverActions : true
    },
    rewrites() {
        return [
            { source: `/ads`, destination: '/' }
        ]
    }
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })

module.exports = nextConfig