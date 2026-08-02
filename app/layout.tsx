import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/widgets/floating-contact";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cyril Financial Group | California Luxury Mortgage Lending",
  description:
    "Institutional private banking standards and boutique white-glove mortgage advisory for California homebuyers, high-net-worth clients, and real estate investors.",
  metadataBase: new URL("https://cyrilfinancial.com"),
  applicationName: "Cyril Financial Group",
  authors: [{ name: "Cyril Financial Group" }],
  creator: "Cyril Financial Group",
  keywords: [
    "California mortgage lender",
    "luxury mortgage financing",
    "jumbo mortgage loans",
    "bank statement mortgage",
    "DSCR investment loans",
    "mortgage calculator",
    "California home financing",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://cyrilfinancial.com",
  },
  openGraph: {
    title: "Cyril Financial Group | California Luxury Mortgage Lending",
    description:
      "Jumbo, Bank Statement, DSCR, and Conventional financing across Los Angeles and California.",
    url: "https://cyrilfinancial.com",
    siteName: "Cyril Financial Group",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/home1.png",
        width: 1200,
        height: 700,
        alt: "Cyril Financial Group luxury California mortgage lending",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyril Financial Group | California Luxury Mortgage Lending",
    description:
      "Boutique mortgage advisory, jumbo loans, and California financing solutions for high-net-worth buyers and investors.",
    images: ["/images/hero-luxury-estate.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
        <body className="font-sans bg-gray-50 text-slate antialiased selection:bg-emerald selection:text-white">
          {children}
          {/* Main site footer */}
          <Footer />
          {/* Floating contact widget */}
          <FloatingContact />
        </body>
      </html>
    </SessionProvider>
  );
}