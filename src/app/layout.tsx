import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "이정민 - 포트폴리오",
  description: "클라우드/백엔드 엔지니어를 꿈꾸는 개발자 이정민의 포트폴리오 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                이정민
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  홈
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  소개
                </Link>
                <Link href="/projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                  프로젝트
                </Link>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  블로그
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  연락처
                </Link>
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-600 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
