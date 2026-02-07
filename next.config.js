/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const basePath = isGithubActions && repo ? `/${repo}` : ''

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
}

module.exports = nextConfig
