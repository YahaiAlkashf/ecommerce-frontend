"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

function page() {
  const searchParams = useSearchParams();
  const [emailGoogle, setEmailGoogle] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const emailFromUrl = searchParams.get("token");
    if (emailFromUrl) {
      Cookies.set("auth_token", emailFromUrl, 7);
      router.push("/");
    }
  }, [searchParams]);

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const resonse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        email: formData.email,
        password: formData.password,
      });

      Cookies.set("auth_token", resonse.data.token, 7);
      console.log(resonse.data);
      if (resonse.data.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      alert("login success");
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
      console.log(error.errors);
    }
  };
  return (
    <div className="flex justify-center items-center  p-20 ">
      <form
        onSubmit={handelLogin}
        className="border-teal-500 border h-fit p-10 rounded-2xl"
      >
        <h1 className="text-teal-500 font-bold text-center">login</h1>
        <div className="w-52">
          <label htmlFor="Email">
            <span className="text-sm font-medium text-gray-700"> Email </span>

            <input
              type="email"
              id="Email"
              className="mt-0.5 w-full hover:border rounded border-teal-300 shadow-sm sm:text-sm h-7 p-4 outline-0"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          {errors.email && <h2 className="text-red-500">{errors.email}</h2>}

          <label htmlFor="password">
            <span className="text-sm font-medium text-gray-700">
              {" "}
              password{" "}
            </span>

            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-0.5 w-full hover:border rounded border-teal-300 shadow-sm sm:text-sm h-7 p-4 outline-0"
            />
          </label>
          {errors.password && (
            <h2 className="text-red-500">{errors.password}</h2>
          )}
          <div className="text-center">
            <button className="inline-block rounded-sm bg-teal-600 px-8 py-3 text-sm font-medium text-white transition my-2 hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden">
              login
            </button>
          </div>
          <div className="text-center">OR</div>
          <div className="text-center">
            {" "}
            <Link
              className="inline-block rounded-sm border border-current px-8 py-3 text-sm font-medium text-teal-600 transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
              href="/register"
            >
              register
            </Link>
          </div>
        </div>
            <div className="mt-3 text-center">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded-sm bg-red-600 px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
                href="http://localhost:8000/auth/google/redirect"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <FaGoogle className="size-5 shadow-sm rtl:rotate-180" />
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                  {" "}
                  login with google{" "}
                </span>
              </a>
            </div>
      </form>
    </div>
  );
}

export default page;
