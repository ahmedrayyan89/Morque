import type { Metadata } from "next";
import { Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MORQUE | Hypercar",
  description: "Engineered in the wind. Perfected in silence. The cinematic wind tunnel experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${caveat.variable} h-full antialiased bg-steel-dark`}
    >
      <body className="min-h-full flex flex-col selection:bg-cyan-glow/30 selection:text-ice-white text-ice-white bg-transparent">
        {children}
      </body>
    </html>
  );
}
