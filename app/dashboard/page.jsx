"use client";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaThLarge,
  FaTachometerAlt,
} from "react-icons/fa";
import { format } from 'date-fns';
import React, { useState, useEffect } from "react";
import axios from "axios";
function page() {
  const [orders, setOrders] = useState([]);
  const showOrders = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`);
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showOrders();
  }, []);
  return (
    <div className="mx-7 flex flex-col ju">
      <div className=" flex mt-3 gap-2 flex-wrap  ">
        <div className="bg-blue-950 p-6 py-9 grow hover:bg-blue-500  hover:scale-105 font-bold text-xl flex rounded-xl items-center  text-white">
          <FaBoxOpen className="mr-2" />
          <h5>Products</h5>
        </div>

        <div className=" bg-blue-950 p-6 py-9 grow hover:bg-blue-500 hover:scale-105  animate-pulse font-bold text-xl flex rounded-xl items-center  text-white">
          <FaShoppingCart className="mr-2" />
          <h5>Orders</h5>
        </div>

        <div className=" bg-blue-950 p-6 py-9 grow hover:bg-blue-500 hover:scale-105   font-bold text-xl flex rounded-xl items-center  text-white">
          <FaThLarge className="mr-2" />
          <h5>Category</h5>
        </div>
        <div className="flex bg-blue-600  p-3 font-bold items-center text-xl rounded-md w-full justify-between items-center  ">
          <h4 className="text-white "> Orders </h4>
          <FaTachometerAlt className="text-2xl  text-white" />
        </div>

        <div></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Adress</th>
              <th className="px-3 py-2 whitespace-nowrap">phone</th>
              <th className="px-3 py-2 whitespace-nowrap">phone Altrnatev</th>
              <th className="px-3 py-2 whitespace-nowrap">Payment Method</th>
              <th className="px-3 py-2 whitespace-nowrap">created at</th>
              <th className="px-3 py-2 whitespace-nowrap">products</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {orders.map((order) => (
              <tr
                className="*:text-gray-900 *:first:font-medium"
                key={order.id}
              >
                <td className="px-3 py-2 whitespace-nowrap">{order.name}</td>
                <td className="px-3 py-2 whitespace-nowrap">{order.address}</td>
                <td className="px-3 py-2 whitespace-nowrap">{order.phone}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {order.phone_alt}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {order["Payment Method"]}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {order.created_at}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-1 bg-green-600 font-medium rounded-lg mt-2 p-2 gap-4 text-white"
                    >
                      <div className="w-[55%]">name: {product.name}</div>{" "}
                      <div className="w-[40%] flex-1">
                        price: {product.price}
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
