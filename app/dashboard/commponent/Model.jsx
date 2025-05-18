import React from "react";

function Model({
  title,
  handelClose,
  name,
  image,
  setName,
  setImage,
  sendDateCreate,
  preview,
  preview2,
  errors,
  create,
}) {
  const handelCloseModel = () => {
    handelClose();
  };
  return (
    <div>
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
              {title}
            </h2>

            <button
              type="button"
              className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
              onClick={handelCloseModel}
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

            <label htmlFor="image">
              <span className="text-sm font-medium text-gray-700"> Image </span>

              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
              />
            </label>
            {errors.image && <h2 className="text-red-500">{errors.image}</h2>}
            {preview ? (
              <img src={preview} alt="image" className="w-[100] h-[100]" />
            ): preview2 && (<img  src={`http://127.0.0.1:8000/storage/${preview2}`}alt="image" className="w-[100] h-[100]" />) }
          </div>

          <footer className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              onClick={handelCloseModel}
            >
              Cancel
            </button>

            <button
              type="button"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              onClick={()=>sendDateCreate(create)}
            >
              Done
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Model;
