import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Configure Body Font (Inter)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
});

// Configure Heading Font (Space Grotesk)
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading", 
});

export const metadata: Metadata = {
  title: "Feriearbete.se",
  description: "Sveriges moderna plattform för feriejobb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

// Export font variables for use in locale layout
export { inter, spaceGrotesk };
