import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';
import Script from "next/script";

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
      <meta name="viewport" content="width=device-width, initial-scale=0.75, maximum-scale=0.75, user-scalable=0"/>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="site-nav">
          <div className="nav-inner container-main">
            <Link href="/" className="brand">
              📝 Blog
            </Link>
            <Link href="/blog" className="link">
              All Posts
            </Link>
          </div>
        </nav>
        {children}
        {/* Example: external script loaded after hydration */}
        <Script
          src="https://cdn.jsdelivr.net/gh/WLJSTeam/web-components@latest/src/common/app.js"
          strategy="lazyOnload"
          id="wljs-component"
        />
      </body>
    </html>
  );
}
