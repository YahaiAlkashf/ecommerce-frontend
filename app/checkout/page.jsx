"use client";
import React, { useState, useEffect } from "react";
import CheckoutModel from "../commponent/CheckoutModel";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

function page() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [productids, setProductIds] = useState([]);
  const [errors, setErrors] = useState({});

  const [formDate, setFormDate] = useState({
    name: "",
    address: "",
    phone: "",
    phone_alt: "",
    payment_method: "on Delivery",
    product_id: productids,
  });
  const handelClose = () => {
    setShowModel(false);
  };
  const setName = (value) => {
    setFormDate({ ...formDate, name: value });
  };
  const setAddress = (value) => {
    setFormDate({ ...formDate, address: value });
  };
  const setPhone = (value) => {
    setFormDate({ ...formDate, phone: value });
  };
  const setPhone_alt = (value) => {
    setFormDate({ ...formDate, phone_alt: value });
  };
  const setPayment = (value) => {
    // setFormDate({ ...formDate, payment: "on Delivery" });
  };
  useEffect(() => {
    setFormDate((prev) => ({
      ...prev,
      product_id: productids,
    }));
  }, [productids]);
  const sendDate = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("auth_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
        formDate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      
      handelClose();
      localStorage.removeItem("cart");
    } catch (error) {
      if (error.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    const cardProduct = JSON.parse(localStorage.getItem("cart"));
    if (cardProduct && cardProduct.length > 0) {
      setProducts(cardProduct);
      const totalPrice = cardProduct.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );
      const ids = cardProduct.map((item) => item.id);
      setProductIds(ids);
      setTotal(totalPrice);
    }
  }, []);

  return (
    <>
      {products.length > 0 ? (
        <>
          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6  sm:py-12 lg:px-8">
              <div className="mx-auto max-w-3xl mt-10">
                <header className="text-center">
                  <h1 className="text-xl font-bold text-gray-300 sm:text-3xl">
                    Your Cart
                  </h1>
                </header>

                <div className="mt-8">
                  <ul className="space-y-4">
                    {products.map((product) => (
                      <li className="flex items-center gap-4" key={product.id}>
                        <img
                          src={`http://127.0.0.1:8000/storage/${product.main_image}`}
                          alt=""
                          className="size-16 rounded-sm object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-200">
                            {product.name}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-300">
                            <div>
                              <dt className="inline">Price:</dt>
                              <dd className="inline">{product.price} </dd>
                            </div>
                          </dl>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-2">
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only">
                              {" "}
                              Quantity{" "}
                            </label>

                            <input
                              type="number"
                              min="1"
                              // value="1"
                              id="Line1Qty"
                              className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </form>

                          <button className="text-gray-600 transition hover:text-red-600">
                            <span className="sr-only">Remove item</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-300">
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>{total}</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>VAT</dt>
                          <dd>0</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>Discount</dt>
                          <dd>0</dd>
                        </div>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>{total}</dd>
                        </div>
                      </dl>

                      <div className="flex justify-end">
                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            />
                          </svg>

                          <p className="text-xs whitespace-nowrap">
                            0 Discounts Applied
                          </p>
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => setShowModel(true)}
                          className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {showModel && (
            <CheckoutModel
              name={formDate.name}
              address={formDate.address}
              phone={formDate.phone}
              phone_alt={formDate.phone_alt}
              payment={formDate.payment_method}
              setName={setName}
              setAddress={setAddress}
              setPhone={setPhone}
              setPhone_alt={setPhone_alt}
              setPayment={setPayment}
              handelClose={handelClose}
              sendDate={sendDate}
              errors={errors}
            />
          )}
        </>
      ) : (
       <div className="flex flex-col gap-2 items-center justify-center m-30 "> 
       <div><h2 className="text-teal-600 font-bold ">card Empty </h2></div>
        
        <Link
  className="group relative inline-flex items-center overflow-hidden rounded-sm bg-teal-600 px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
  href="/products"
>
  <span className="absolute -start-full transition-all group-hover:start-4">
    <svg
      className="size-5 shadow-sm rtl:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>

  <span className="text-sm font-medium transition-all group-hover:ms-4"> shoping now </span>
</Link>
        </div>
      )}
    </>
  );
}

export default page;
