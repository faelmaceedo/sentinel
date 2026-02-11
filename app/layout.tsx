import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEPLAN SENTINEL",
  description: "NOC Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        {/* Renderiza o Login ou o Dashboard dependendo da rota */}
        {children}
      </body>
    </html>
  );
}