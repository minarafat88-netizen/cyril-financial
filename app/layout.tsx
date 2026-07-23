import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";

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
  title: "Cynl Financial Group | California Luxury Mortgage Lending",
  description:
    "Institutional private banking standards and boutique white-glove mortgage advisory for California homebuyers, high-net-worth clients, and real estate investors.",
  metadataBase: new URL("https://cynlfinancial.com"),
  applicationName: "Cynl Financial Group",
  authors: [{ name: "Cynl Financial Group" }],
  creator: "Cynl Financial Group",
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
    canonical: "https://cynlfinancial.com",
  },
  openGraph: {
    title: "Cynl Financial Group | Luxury Mortgage Lending",
    description:
      "Jumbo, Bank Statement, DSCR, and Conventional financing across Los Angeles and California.",
    url: "https://cynlfinancial.com",
    siteName: "Cynl Financial Group",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-luxury-estate.png",
        width: 1200,
        height: 700,
        alt: "Cynl Financial Group luxury California mortgage lending",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cynl Financial Group | California Luxury Mortgage Lending",
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
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-gray-50 text-slate antialiased selection:bg-emerald selection:text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}