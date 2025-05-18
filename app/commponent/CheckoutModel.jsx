import React from "react";

function CheckoutModel({
  name,
  address,
  phone,
  phone_alt,
  payment_method,
  setName,
  setAddress,
  setPhone,
  setPhone_alt,
  setPayment,
  handelClose,
  sendDate,
  errors
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2
            id="modalTitle"
            className="text-xl font-bold text-gray-900 sm:text-2xl"
          >
           Create Order
          </h2>

          <button
            type="button" onClick={handelClose}
            className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <label htmlFor="name">
            <span className="text-sm font-medium text-gray-700"> Name </span>

            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
          </label>
            {errors.name && <h2 className="text-red-500">{errors.name}</h2>}


          <label htmlFor="address">
            <span className="text-sm font-medium text-gray-700"> address </span>

            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
          </label>
            {errors.address && <h2 className="text-red-500">{errors.address}</h2>}


          <label htmlFor="phone">
            <span className="text-sm font-medium text-gray-700">  phone number </span>

            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
          </label>
            {errors.phone && <h2 className="text-red-500">{errors.phone}</h2>}


          <label htmlFor="phone_alt">
            <span className="text-sm font-medium text-gray-700"> Alternative phone number </span>

            <input
              type="text"
              id="phone_alt"
              value={phone_alt}
              onChange={(e) => setPhone_alt(e.target.value)}
              className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
          </label>
            {errors.phone_alt && <h2 className="text-red-500">{errors.phone_alt}</h2>}


    <label htmlFor="payment" className="inline-flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700"> payment </span>
        <input type="checkbox"  className="size-5 rounded border-gray-300 shadow-sm" id="payment" />
        <span className="font-medium text-gray-700"> on Delivery</span>
    </label>
            {errors.payment_method && <h2 className="text-red-500">{errors.payment_method}</h2>}


        </div>

        <footer className="mt-6 flex justify-end gap-2">
          <button onClick={handelClose}
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>

          <button onClick={sendDate}
            type="button"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CheckoutModel;
