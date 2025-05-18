"use client"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./commponent/Header";
import Footer from "./commponent/Footer";
import { usePathname } from "next/navigation";
import { CartProvider } from "./context/Cardcontext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SearchContext, { SearchProvider } from "./context/SearshContext"; 
import { ThemeProvider } from "next-themes";
import LoadingAnimation from "./commponent/LoadingAnimation";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const hiddenPaths = [
    "/",
    "/dashboard",
    "/dashboard/products",
    "/dashboard/orders",
    "/dashboard/category",
    "/dashboard/messages",
  ];
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      setLogin(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <SearchProvider>
            <CartProvider>
              {loading ? (
                <>
                  <LoadingAnimation />
                </>
              ) : (
                <>
                  {!hiddenPaths.includes(pathname) && (
                    <Header
                      login={login}
                      setLogin={setLogin}
                      mode={mode}
                      setMode={setMode}
                    />
                  )}
                  {children}
                  {!hiddenPaths.includes(pathname) && <Footer />}
                </>
              )}
            </CartProvider>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
