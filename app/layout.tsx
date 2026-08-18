import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://econophysics-korea.vercel.app"),
  title: "2026 여름 워크숍 | 경제사회물리연구회",
  description: "2026년 8월 21–22일 부산대학교에서 열리는 경제사회물리연구회 여름 워크숍 안내",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "2026 여름 워크숍 | 경제사회물리연구회",
    description: "2026. 08. 21–22 · 부산대학교 제2물리관 106호",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
