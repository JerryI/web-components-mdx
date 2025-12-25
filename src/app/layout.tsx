import type { Metadata } from "next";
import Link from "next/link";
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
  title: "MDX Blog",
  description: "A simple blog powered by MDX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="site-nav">
          <div className="nav-inner container">
            <Link href="/" className="brand">
              📝 Blog
            </Link>
            <Link href="/blog" className="link">
              All Posts
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
