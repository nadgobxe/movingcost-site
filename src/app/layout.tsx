import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://movingcost.co.uk"),
  title: {
    default: "MovingCost.co.uk | Cheap Man & Van Quotes + Cashback",
    template: "%s | MovingCost.co.uk",
  },
  description:
    "UK moving intelligence hub: compare man & van quotes, unlock AnyVan perks, and track every lead with calculators, guides, and automations.",
  openGraph: {
    title: "MovingCost.co.uk | Cheap Man & Van Quotes + Cashback",
    description:
      "Plan your move with live calculators, AnyVan promos, and city-specific man & van partners across the UK.",
    url: "https://movingcost.co.uk",
    siteName: "MovingCost.co.uk",
    images: [
      {
        url: "https://movingcost.co.uk/og-cover.png",
        width: 1200,
        height: 630,
        alt: "MovingCost dashboard preview",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MovingCost.co.uk | Cheap Man & Van Quotes",
    description:
      "Unlock cheaper moves in the UK with AnyVan perks, calculators, and city-specific man & van partners.",
    images: ["https://movingcost.co.uk/og-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
