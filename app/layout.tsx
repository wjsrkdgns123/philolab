import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "philolab — 철학으로 나를 실험하다",
  description: "철학으로 만나는 깊이 있는 진단 시리즈. 당신을 이루는 두 철학자를 찾아보세요.",
  openGraph: {
    title: "philolab — 철학으로 나를 실험하다",
    description: "철학으로 만나는 깊이 있는 진단 시리즈.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
