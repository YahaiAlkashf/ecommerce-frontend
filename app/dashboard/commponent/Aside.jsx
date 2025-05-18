import Link from 'next/link'
import React from 'react'
import {
  FaBoxOpen,
  FaShoppingCart,
  FaThLarge,
  FaTachometerAlt,
} from "react-icons/fa";
function Aside({open}) {
  return (
    <>
    <div  className={`flex shadow-lg fixed top-0 left-0 h-full w-60 bg-blue-950 text-white
        transform transition-transform duration-700 ease-in-out z-50
        ${open ? 'translate-x-0' : '-translate-x-full'}`}>

  <div className="flex h-screen w-16 flex-col justify-between border-e border-gray-100 bg-white">
    <div>
      <div className="inline-flex size-16 items-center justify-center">
        <span
          className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
        >
          Y
        </span>
      </div>

      <div className="border-t border-gray-100">
        <div className="px-2">
          <div className="py-4">
            <Link
              href="/dashboard"
              className="t group relative flex justify-center rounded-sm bg-blue-50 px-2 py-1.5 text-blue-700"
            >
          <FaTachometerAlt />

              <span
                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Dashboard
              </span>
            </Link>
          </div>

          <ul className="space-y-1 border-t border-gray-100 pt-4">
            <li>
              <Link
                href="/dashboard/category"
                className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <FaThLarge />

                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  categories
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/products"
                className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <FaBoxOpen />

                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Product
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/orders"
                className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                    
              <FaShoppingCart />
                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Orders
                </span>
              </Link>
            </li>


          </ul>
        </div>
      </div>
    </div>

    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
      <a
        href="#"
        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        <span
          className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
        >
          Logout
        </span>
      </a>
    </div>
  </div>

  <div className="flex h-screen flex-1 flex-col justify-between border-e border-gray-100 bg-white">
    <div className="px-4 py-6">
      <ul className="mt-14 space-y-1">
        <li>
          <Link
            href="/dashboard"
            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Dashboard
          </Link>
        </li>
      <li>
          <Link
            href="/dashboard/category"
            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            categories
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/products"
            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Products
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/orders"
            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Orders
          </Link>
        </li>


      </ul>
    </div>
  </div>

</div>
  </>
  )
}

export default Aside