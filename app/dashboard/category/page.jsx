"use client";
import React, { useEffect, useState } from "react";
import Model from "../commponent/Model";
import axios from "axios";

function page() {
  const [openModelCreate, setOpenModelCreate] = useState(false);
  const [openModelEdite, setOpenModelEdite] = useState(false);
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [preview, setPreview] = useState("");
  const [preview2, setPreview2] = useState("");
  const [id, setID] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [dataCreate, setDataCreate] = useState({
    name: "",
    image: "",
  });

  const handelClose = () => {
    setOpenModelCreate(false);
    setOpenModelEdite(false);
    setOpenModelDelete(false);
  };
  const setName = (value) => {
    setDataCreate({ ...dataCreate, name: value });
  };
  const setImage = (value) => {
    setDataCreate({ ...dataCreate, image: value });
    setPreview(URL.createObjectURL(value));
  };
  const sendDateCreate = async (value) => {
    if (value === 1) {
      const formData = new FormData();
      formData.append("name", dataCreate.name);
      formData.append("image", dataCreate.image);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert(response.data.message);
        showCategory();
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    } else if (value === 0) {
      const formData = new FormData();
      formData.append("name", dataCreate.name);
      formData.append("image", dataCreate.image);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert(response.data.message);
        showCategory();
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    }
  };
  const showCategory = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showCategory();
  }, []);
  const handelDelete = async () => {

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`
      );
      alert(response.data.message);
      showCategory();
    } catch (error) {
     console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-center  w-full">
        <button
          onClick={() => setOpenModelCreate(true)}
          className="inline-block rounded-sm bg-teal-600 px-8 py-3 cursor-pointer text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
        >
          Create Category
        </button>
      </div>
      <div className="overflow-x-auto m-4">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Image</th>
              <th className="px-3 py-2 whitespace-nowrap">Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Edit</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {categories.map((category) => (
              <tr
                className="*:text-gray-900 *:first:font-medium"
                key={category.id}
              >
                <td className="px-3 py-2 whitespace-nowrap">
                  {category.image && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${category.image}`}
                      alt={category.name}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{category.name}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button
                 onClick={() => {
                    setOpenModelDelete(true);
                    setID(category.id);
                  }} 
                  className="inline-block rounded-sm bg-red-600 px-8 py-3 cursor-pointer mr-2 text-sm font-medium text-white transition hover:scale-110 hover:rotate-2 focus:ring-3 focus:outline-hidden">
                    delete
                  </button>
                  <button
                    onClick={() => {
                      setOpenModelEdite(true);
                      setName(category.name);
                      setID(category.id);
                      setPreview2(category.image);
                    }}
                    className="inline-block rounded-sm bg-green-600 px-8 py-3 cursor-pointer text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openModelCreate && (
        <Model
          title={"create category"}
          handelClose={handelClose}
          name={dataCreate.name}
          image={dataCreate.image}
          setName={setName}
          setImage={setImage}
          sendDateCreate={sendDateCreate}
          preview={preview}
          errors={errors}
          create={1}
        />
      )}

      {openModelEdite && (
        <Model
          title={"Edit category"}
          handelClose={handelClose}
          name={dataCreate.name}
          image={dataCreate.image}
          setName={setName}
          setImage={setImage}
          sendDateCreate={sendDateCreate}
          preview={preview}
          preview2={preview2}
          errors={errors}
          create={0}
        />
      )}

      {openModelDelete && (
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
                    Delete Category
                  </h2>
      
                  <button
                    type="button"
                    className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
                    aria-label="Close"
                    onClick={handelClose}
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

                </div>
      
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
                    className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    onClick={()=>handelDelete()}
                  >
                    Done
                  </button>
                </footer>
              </div>
            </div>
      )}
    </div>
  );
}

export default page;
