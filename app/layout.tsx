import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://econophysics-korea.vercel.app"),
  title: "2026 가을 워크숍 | 경제사회물리연구회",
  description: "2026년 11월 13일 APCTP (포스텍 무은재기념관) 512호 강의실에서 열리는 경제사회물리연구회 가을 워크숍 안내",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "2026 가을 워크숍 | 경제사회물리연구회",
    description: "2026. 11. 13 (금) · APCTP (포스텍 무은재기념관) 512호 강의실",

    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
