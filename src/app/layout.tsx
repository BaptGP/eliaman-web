import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Eliaman - Développeur Fullstack React & Symfony",
  description:
    "Développeur Fullstack React & Symfony - Création de sites web et solutions sur-mesure",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Eliaman - Développeur Fullstack React & Symfony",
    description:
      "Développeur Fullstack React & Symfony - Création de sites web et solutions sur-mesure",
    type: "website",
    url: "https://www.eliaman.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eliaman - Développeur Fullstack React & Symfony",
    description:
      "Développeur Fullstack React & Symfony - Création de sites web et solutions sur-mesure",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${roboto.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
