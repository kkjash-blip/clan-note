import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '클랜 노트 — 서든어택 클랜 전술 플랫폼',
  description: '서든어택 클랜을 위한 전술 커뮤니케이션 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
