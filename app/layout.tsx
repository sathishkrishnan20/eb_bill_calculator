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
  title: "TNEB Bill Calculator",
  description: "TNEB Bill Calculator - Tamil Nadu Electricity Tariff Estimator",
  keywords: 'TNEB, TNEB calculator, TNEB calculator 2024, TNEB calculator 2025, Tamil Nadu EB bill, electricity bill, TNEB tariff, bill estimator, TN electricity calculator',
  authors: { url: 'https://www.sathishkrishnan.tech/', name: 'Sathish Krishnan'},
  applicationName: 'TNEB Bill Calculator',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TNEB Bill Calculator - Tamil Nadu EB Estimator',
    description: 'Calculate your Tamil Nadu electricity bill easily with slab-wise breakdowns.',
    images: 'https://eb-bill-calculator.sathishkrishnan.tech/tneb-preview.png'
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
