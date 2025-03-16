import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "勤怠管理システム",
  description: "従業員向け勤怠管理システム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className + " bg-gray-50"}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
