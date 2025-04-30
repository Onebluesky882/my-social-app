import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="   ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-0 px-2 w-full bg-background md:px-8 lg:px-16 xl:px-24 2xl:px56">
            <Navbar />
          </div>

          <main className="bg-primary overflow-x-hidden mt-25 min-h-[99%] md:px-8 lg:px-16 xl:px-23 2xl:px-56  scroll-auto ">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
