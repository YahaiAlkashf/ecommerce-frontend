import React, { useState, useEffect } from "react";

function ProductModel({
  handelClose,
  title,
  setName,
  setDiscription,
  setRating,
  setPrice,
  setImage,
  setImages,
  praview,
  praview2,
  name,
  discription,
  rating,
  price,
  sendDate,
  create,
  errors,
  categories,
  category,
  setCategory,
  praview3,
  praview4
}) {

    useEffect(() => {
      
    }, []);
  return (
    <div
      className="fixed inset-0 z-50   grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="w-full max-w-md rounded-lg bg-white overflow-auto  p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2
            id="modalTitle"
            className="text-xl font-bold text-gray-900 sm:text-2xl"
          >
            {title}
          </h2>

          <button
            onClick={handelClose}
            type="button"
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
              onChange={(e)=>setName(e.target.value)}
              className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
          </label>
          {errors.name && <h2 className="text-red-500">{errors.name}</h2>}
          <label htmlFor="Description">
            <span className="text-sm font-medium text-gray-700">
              {" "}
              Description{" "}
            </span>

            <textarea
              id="Description"
              className="mt-0.5 w-full resize-none focus:border rounded border-teal-600 shadow-sm sm:text-sm outline-0 "
              rows="4"
              value={discription}
              onChange={(e)=>setDiscription(e.target.value)}
            ></textarea>
          </label>
          {errors.description && <h2 className="text-red-500">{errors.description}</h2>}

          <label htmlFor="Rating">
            <span className="text-sm font-medium text-gray-700"> Rating </span>

            <input
              type="number"
              id="Rating"
              value={rating}
              onChange={(e)=>setRating(e.target.value)}
              className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
          </label>
          {errors.rating && <h2 className="text-red-500">{errors.rating}</h2>}

          <label htmlFor="price">
            <span className="text-sm font-medium text-gray-700"> price </span>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
          </label>
          {errors.price && <h2 className="text-red-500">{errors.price}</h2>}

        </div>
        <div>
          <label htmlFor="Categories">
            <span className="text-sm font-medium text-gray-700">
              {" "}
              Categories{" "}
            </span>

            <select
              name="Categories"
              id="Categories"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="mt-0.5 w-full outline-0 p-2 rounded focus:border border-teal-600 shadow-sm sm:text-sm"
            >
                {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
          </label>
          {errors.category_id && <h2 className="text-red-500">{errors.price}</h2>}

        </div>

        <label htmlFor="image">
          <span className="text-sm font-medium text-gray-700">
            {" "}
            Main Image{" "}
          </span>
          <input
            type="file"
            id="image"
            onChange={(e)=>setImage(e.target.files[0])}
            className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
          />
        </label>
        {errors.main_image && <h2 className="text-red-500">{errors.main_image}</h2>}

        {praview ? ( <img src={praview} alt="image" className="w-[100] h-[100]" />)
        :praview3 && ( <img src={`http://127.0.0.1:8000/storage/${praview3}`}  alt="image3" className="w-[100] h-[100]" />
        )}
        <label htmlFor="images">
          <span className="text-sm font-medium text-gray-700"> Images </span>
          <input
            type="file"
            id="images"
            onChange={(e)=>setImages(e.target.files)}
            multiple
            className="mt-0.5 w-full rounded outline-0 focus:border border-teal-600 shadow-sm sm:text-sm p-2  "
            />
        </label>
        {errors.images && <h2 className="text-red-500">{errors.images}</h2>}
            

        {praview2 ? praview2.map((image,index)=>
         ( <img src={image} alt="image" className="w-[100] h-[100]"  key={index}/>)
        ):praview4 && praview4.map((image,index)=>
          ( <img src={`http://127.0.0.1:8000/storage/${image.image}`}  alt="image" className="w-[100] h-[100]"  key={index}/>)) }
        <footer className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            onClick={handelClose}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={()=>sendDate(create)}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ProductModel;
