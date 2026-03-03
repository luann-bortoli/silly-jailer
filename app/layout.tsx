import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "silly-jailer",
  description: "Silly Jailer is a terminal-style AI experiment where players have 10 messages to trick a sarcastic jailer AI into revealing a secret word. Built with Next.js and powered by a local LLM, the project explores prompt engineering, jailbreak dynamics, and adversarial human–AI interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
