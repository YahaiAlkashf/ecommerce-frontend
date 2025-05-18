"use client";
import Image from "next/image";
import Hero from "./commponent/Hero";
import Products from "./commponent/Products";
import Recommended from "./commponent/Recommended";
import { useEffect,useState } from "react";
import Header from "./commponent/Header";
import Cookies from "js-cookie";

export default function Home() {
    const [login, setLogin] = useState(false);
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      setLogin(true);
    }
  }, []);
  return (
    <div >
      <Header login={login} setLogin={setLogin} />
      <Hero />
      <Products />
      <Recommended />
    </div>
  );
}
