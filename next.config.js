/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['dvf-course.s3.eu-central-1.amazonaws.com' ,  'dvf-course.co.il']
    },
    generateEtags: false,
    experimental : {
        ppr : true,
        serverActions : true
    }
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })

module.exports = nextConfig