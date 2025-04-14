import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
          <div className=" px-2 w-full bg-background md:px-8 lg:px-16 xl:px-24 2xl:px56    sticky top-0">
            <Navbar />
          </div>

          <div className="bg-primary px-4 md:px-8 lg:px-16 xl:px-23 2xl:px-56  scroll-auto ">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
