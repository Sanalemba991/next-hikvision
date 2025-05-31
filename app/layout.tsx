import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers/Providers";
import ConditionalNavFooter from "./components/ConditionalNavFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hikvision",
  description: "Hikvision security systems and solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ConditionalNavFooter>{children}</ConditionalNavFooter>
        </Providers>
      </body>
    </html>
  );
}
