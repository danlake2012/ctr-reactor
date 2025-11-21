import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import FloatingThemeSwitcher from "./components/FloatingThemeSwitcher";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "The CTR-Reactor | Ad Performance Analyzer",
  description: "Advanced AI-powered ad performance analysis system",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
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
        className={`${orbitron.variable} antialiased`}
        style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
      >
        <ThemeProvider>
          <Navbar />
          <FloatingThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
