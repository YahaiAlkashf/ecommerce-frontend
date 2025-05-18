"use client";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const resonse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
      Cookies.set("auth_token", resonse.data.token, 7);
      {
        resonse.data.user.role === "admin"
          ? router.push("/dashboard")
          : router.push("/");
      }
      alert("OK");
    } catch (error) {
      if(error.status===422){
        setErrors(error.response.data.errors);
      }
      else {
        alert(error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center  p-10 ">
      <form
        onSubmit={handelLogin}
        className="border-teal-500 border p-10 px-15 rounded-2xl"
      >
        <h1 className="text-teal-500 font-bold text-center">register</h1>

        <div className="w-52">
          <label htmlFor="name">
            <span className="text-sm font-medium text-gray-700"> Name </span>

            <input
              type="name"
              id="name"
              className="mt-0.5 w-full hover:border rounded border-teal-300 shadow-sm sm:text-sm h-7 p-4 outline-0"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          {errors.name && <div className="text-red-500">{errors.name[0]}</div>}
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
          {errors.email && (
            <div className="text-red-500">{errors.email[0]}</div>
          )}

          <label htmlFor="password">
            <span className="text-sm font-medium text-gray-700">Password</span>
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
            <div className="text-red-500">{errors.password[0]}</div>
          )}

          <label htmlFor="password_confirmation">
            <span className="text-sm font-medium text-gray-700">
              Password Confirmation
            </span>

            <input
              type="password"
              id="password_confirmation"
              className="mt-0.5 w-full hover:border rounded border-teal-300 shadow-sm sm:text-sm h-7 p-4 outline-0"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
            />
          </label>
          <div className="text-center">
            <button type="submit" className="inline-block rounded-sm bg-teal-600 px-8 py-3 text-sm font-medium text-white transition my-2 hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden">
              register
            </button>
          </div>
          <div className="text-center">OR</div>
          <div className="text-center">
            {" "}
            <Link
              className="inline-block rounded-sm border border-current px-8 py-3 text-sm font-medium text-teal-600 transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
              href="/register"
            >
              login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default page;
