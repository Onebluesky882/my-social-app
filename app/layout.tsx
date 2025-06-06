"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { BreakpointProvider } from "@/lib/useBreakpoint";
import { Toaster } from "@/components/ui/sonner";

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
      <body className="flex flex-col min-h-screen ">
        <BreakpointProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <main className=" overflow-x-hidden flex-1 pb-20">{children}</main>
            <footer>
              <Footer />
            </footer>
            <Toaster />
          </ThemeProvider>
        </BreakpointProvider>
      </body>
    </html>
  );
}
