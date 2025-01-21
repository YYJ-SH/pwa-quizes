/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa';

const nextConfig = nextPwa({
  dest: 'public',  // PWA 파일 저장 위치
  disable: process.env.NODE_ENV === 'development',  // 개발 환경에서는 PWA 비활성화
  register: true,  // 서비스 워커 자동 등록
  skipWaiting: true,  // 업데이트 시 즉시 적용
})({
  reactStrictMode: true,
  swcMinify: true,  // 코드 최적화 활성화
});

export default nextConfig;
