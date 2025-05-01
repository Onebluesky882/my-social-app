"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // side effect logic here
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-0 max-sm:px-4 w-full bg-background ">
            <Navbar />
          </div>

          <main className=" overflow-x-hidden pt-18   ">{children}</main>
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
