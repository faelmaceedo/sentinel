import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'; // <--- Importe aqui

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
        {children}
        {/* Adicione o Toaster aqui, fora de tudo */}
        <Toaster theme="dark" richColors position="top-right" /> 
      </body>
    </html>
  );
}