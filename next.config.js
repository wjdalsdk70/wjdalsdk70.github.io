/** @type {import('next').NextConfig} */

// 1. 환경 변수 체크 (Optional Chaining ?. 을 제거하여 구형 환경 대응)
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoRaw = process.env.GITHUB_REPOSITORY;
const repo = repoRaw ? repoRaw.split('/')[1] : '';

// 2. 경로 설정 (wjdalsdk70.github.io 처럼 메인 레포인 경우 제외)
let finalBasePath = '';
if (isGithubActions && repo && repo !== 'wjdalsdk70.github.io') {
  finalBasePath = '/' + repo;
}

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 3. 변수명을 명시적으로 할당 (Shorthand 미사용)
  basePath: finalBasePath,
  assetPrefix: finalBasePath
};

module.exports = nextConfig;