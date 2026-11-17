import type { Metadata } from "next";
import "./globals.css";
import { event, eventDateRange, siteUrl } from "./event";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: event.title,
  description: `${eventDateRange} · ${event.venue} · ${event.title}`,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: event.title,
    description: `${eventDateRange} · ${event.venue} · ${event.title}`,

    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
