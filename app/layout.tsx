import type { Metadata } from "next";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";
import CurrencyNormalizer from "@/components/CurrencyNormalizer";

export const metadata: Metadata = {
  title: "Smart Loans - Banking & Business Loan",
  description:
    "Smart Loans – Banking & Business Loan HTML5 Responsive Template",
  icons: { icon: "/images/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon_64x64.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/images/favicon_192x192.png"
        />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/Smart Loans-icon.css" />
        <link rel="stylesheet" href="/css/icofont.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/slick.css" />
        <link rel="stylesheet" href="/css/owl.theme.css" />
        <link rel="stylesheet" href="/css/owl.carousel.css" />
        <link rel="stylesheet" href="/css/preset.css" />
        <link rel="stylesheet" href="/css/theme.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
      </head>
      <body>
        {children}
        <ChatbotWidget />
        <CurrencyNormalizer />
      </body>
    </html>
  );
}
