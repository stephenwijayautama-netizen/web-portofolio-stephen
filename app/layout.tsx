import type { Metadata, Viewport } from "next";
import { Bangers, Nunito, Barlow_Condensed, Caveat, Permanent_Marker } from "next/font/google";

import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stephen-portfolio.vercel.app"),
  title: "Stephen Wijaya Utama — Full-Stack Web Developer & UI/UX Designer",
  description:
    "Portfolio interaktif Stephen Wijaya Utama: Laravel, React, Next.js, Golang. Featured projects, tech stack, dan karya kreatif.",
  openGraph: {
    title: "Stephen Wijaya Utama — Full-Stack Web Developer & UI/UX Designer",
    description:
      "Portfolio satu halaman: proyek, skill, dan kontak Stephen Wijaya Utama.",
    type: "website",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#090a16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${bangers.variable} ${permanentMarker.variable} ${caveat.variable} ${nunito.variable} ${barlowCondensed.variable}`}
    >
      <body className="bg-navy text-paper antialiased">{children}</body>
    </html>
  );
}
