"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { TfiList } from "react-icons/tfi";
import { motion, useAnimation } from "framer-motion";
import { useCart } from "../context/Cardcontext";
function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const productRefs = useRef([]);
  const controls = useAnimation();

  const showProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
      setProducts(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("show");
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    productRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [products, controls]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
const { addToCart } = useCart();
  return (
    <>
      <motion.div
        className="container flex justify-center p-10"
        initial="hidden"
        animate={controls}
        variants={container}
      >
        <div className="grid grid-cols-2 pt-15 justify-items-center-center gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="hover:border-2 border-teal-600 block hover:shadow-xl rounded-lg p-1 shadow-xs shadow-indigo-100"
            >
              <motion.img
                alt=""
                src={`http://127.0.0.1:8000/storage/${product.main_image}`}
                className="h-60 w-full rounded-md object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />

              <div className="mt-2 flex w-full justify-between">
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="font-medium line-clamp-1">{product.name}</dd>
                  <div>
                    <p className="line-clamp-2">{product.description}</p>
                  </div>
                </div>

                <div>
                  <dt className="sr-only">Price</dt>
                  <dd className="text-sm text-gray-500">${product.price}</dd>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="relative inline-flex">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={`empty-${i}`} className="text-xl text-gray-300">
                          ★
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex absolute top-0 left-0 overflow-hidden"
                      style={{ width: `${(product.rating / 5) * 100}%` }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <span key={`filled-${i}`} className="text-xl text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-1 justify-center">
                  <TfiList />
                  {product.category.name}
                </div>
              </div>
              <div className="flex justify-center w-full">
                <button onClick={()=>addToCart(product)} className="bg-teal-600 w-full rounded-md cursor-pointer hover:bg-teal-700 text-white p-3 justify-center">
                  add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default Products;