import type { Metadata } from "next";
import { Chivo, Red_Hat_Mono } from "next/font/google";
import "./globals.css";

const sans = Chivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Red_Hat_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "FX Options Risk Lab | USD/MXN Derivatives Risk Analytics",
  description:
    "A self-directed FX options risk analytics project modeling a synthetic USD/MXN options book through pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.",
  keywords: [
    "FX options",
    "USD/MXN",
    "Garman-Kohlhagen",
    "Greeks",
    "VaR",
    "Expected Shortfall",
    "stress testing",
    "delta hedging",
    "P&L attribution",
    "derivatives risk analytics",
  ],
  openGraph: {
    title: "FX Options Risk Lab",
    description:
      "Institutional-style USD/MXN options risk engine: pricing, Greeks, hedging, stress testing, VaR/ES, and P&L attribution.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FX Options Risk Lab",
    description:
      "USD/MXN FX options risk engine for pricing, hedging, stress testing, and P&L attribution.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
