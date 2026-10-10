import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["500", "700", "900"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "CYBER//SENTINEL — Cyber Security & Threat Intelligence Dashboard",
  description: "Real-time SOC dashboard with live attack map, threat logs and analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${mono.variable} scanline antialiased`}>
        {children}
      </body>
    </html>
  );
}