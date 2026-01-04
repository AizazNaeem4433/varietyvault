import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "./components/providers/SmoothScroll";
import AuthProvider from "./components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Variety Vault PK | Premium Cutlery & Trendy Essentials",
  description: "Pakistan's largest online cutlery brand offering premium dining and home essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll>
          <AuthProvider> {/* Added Auth Provider */}
          <Navbar />
          {children}
          <Toaster position="top-center" richColors />
          </AuthProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}