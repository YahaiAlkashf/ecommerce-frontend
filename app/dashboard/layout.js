"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./commponent/Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import LoadingAnimation from "../commponent/LoadingAnimation";
import axios from "axios";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const router= useRouter();
  const checkAdmin = async () => {
    try {
      const token = Cookies.get("auth_token");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.role !== "admin") {
        router.push("/");
      }else{
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      }

    } catch (error) {
      router.push("/");
      console.log(error);

    }
  };
  useEffect(() => {
     const token=Cookies.get("auth_token");

     if(!token || token.length ===0){
      router.push("/");
     }
    checkAdmin();
    return () => setLoading(true);
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {loading  ? (
          <>
            <LoadingAnimation />
          </>
        ) : (
          <>
            <Header login={login} setLogin={setLogin} />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
