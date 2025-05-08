"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { BreakpointProvider } from "@/lib/useBreakpoint";

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
        <BreakpointProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <main className=" overflow-x-hidden   ">{children}</main>
            <footer>
              <Footer />
            </footer>
          </ThemeProvider>
        </BreakpointProvider>
      </body>
    </html>
  );
}
