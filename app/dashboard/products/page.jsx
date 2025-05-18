"use client";
import React, { useEffect, useState } from "react";
import Model from "../commponent/Model";
import axios from "axios";
import ProductModel from "../commponent/ProductModel";

function page() {
  const [openModelCreate, setOpenModelCreate] = useState(false);
  const [openModelEdite, setOpenModelEdite] = useState(false);
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [praview, setPraview] = useState("");
  const [praview3, setPraview3] = useState("");
  const [praview2, setPraview2] = useState([]);
  const [praview4, setPraview4] = useState([]);
  const [dataform, setDataForm] = useState({
    name: "",
    discription: "",
    rating: 0,
    price: "",
    category_id:"",
    image: "",
    images: [],
  });
  const [id, setId] = useState("");
  const setName = (value) => {
    setDataForm({ ...dataform, name: value });
  };
  const setDiscription = (value) => {
    setDataForm({ ...dataform, discription: value });
  };
  const setRating = (value) => {
    setDataForm({ ...dataform, rating: value });
  };
  const setPrice = (value) => {
    setDataForm({ ...dataform, price: value });
  };
  const setCategory = (value) => {
    setDataForm({ ...dataform, category_id: value });
  };
  const setImage = (value) => {
    setDataForm({ ...dataform, image: value });
    setPraview(URL.createObjectURL(value));
  };
  const setImages = (value) => {
    setDataForm({ ...dataform, images: value });
    const files = Array.from(value);
    const previewUrl = files.map((file) => URL.createObjectURL(file));
    setPraview2(previewUrl);
  };
  const handelClose = () => {
    setOpenModelCreate(false);
    setOpenModelEdite(false);
    setOpenModelDelete(false);
  };
  const showCategory = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
          setCategories(response.data.categories);
        } catch (error) {
          console.log(error);
        }
  };
  const sendDate=async(value)=>{
    if (value === 1) {
        const formData = new FormData();
        formData.append("name", dataform.name);
        formData.append("description", dataform.discription);
        formData.append("price", dataform.price);
        formData.append("rating", dataform.rating);
        formData.append("category_id",dataform.category_id );
        formData.append("main_image", dataform.image);
        for (let i = 0; i < dataform.images.length; i++) {
          formData.append("images[]", dataform.images[i]);
        }
        // formData.append("images", dataform.images);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          alert(response.data.message);
          showProducts();
          handelClose();
        } catch (error) {
          setErrors(error.response.data.errors);
        }
      }else if(value === 0){
        const formData = new FormData();
        formData.append("name", dataform.name);
        formData.append("description", dataform.discription);
        formData.append("price", dataform.price);
        formData.append("rating", dataform.rating);
        formData.append("category_id",dataform.category_id );
        formData.append("main_image", dataform.image);
        for (let i = 0; i < dataform.images.length; i++) {
          formData.append("images[]", dataform.images[i]);
        }
        // formData.append("images", dataform.images);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          alert(response.data.message);
          showProducts();
          handelClose();
        } catch (error) {
          setErrors(error.response.data.errors);
        }
      }
  }
  const showProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async () => {

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`);
      alert(response.data.message);
      handelClose();
      showProducts();
    } catch (error) {
     console.log(error);
    }
  };
    useEffect(() => {
        showProducts();
        showCategory();
    }, []);
  return (
    <div>
      <div className="flex justify-center  w-full">
        <button
          onClick={() => setOpenModelCreate(true)}
          className="inline-block rounded-sm bg-teal-600 px-8 py-3 cursor-pointer text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
        >
          Create Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Image</th>
              <th className="px-3 py-2 whitespace-nowrap">Name</th>
              <th className="px-3 py-2 whitespace-nowrap w-10 overflow-auto">Description</th>
              <th className="px-3 py-2 whitespace-nowrap">Rating</th>
              <th className="px-3 py-2 whitespace-nowrap">Price</th>
              <th className="px-3 py-2 whitespace-nowrap">Category</th>
              <th className="px-3 py-2 whitespace-nowrap">Images</th>
              <th className="px-3 py-2 whitespace-nowrap">Edit</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
          {products.map((product) => (
            <tr className="*:text-gray-900 *:first:font-medium"  key={product.id}>
              <td className="px-3 py-2 whitespace-nowrap">                  
                {product.main_image && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.main_image}`}
                      alt={product.main_image}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  )}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.name}</td>
              <td className="px-3 py-2 whitespace-nowrap w-20 overflow-auto">{product.description}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.rating}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.price}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.category_id}</td>
              <td className="px-3 py-2 whitespace-nowrap">                  
                {product.images_products && product.images_products.map((images_product)=>(
                    <img key={images_product.id}
                      src={`http://127.0.0.1:8000/storage/${images_product.image}`}
                      alt={product.main_image}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  ))}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <button
                  onClick={() => {
                    setOpenModelDelete(true);
                    setId(product.id);
                  }}
                  className="inline-block rounded-sm bg-red-600 px-8 py-3 cursor-pointer mr-2 text-sm font-medium text-white transition hover:scale-110 hover:rotate-2 focus:ring-3 focus:outline-hidden"
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    setPraview3(product.main_image);
                    setDataForm({...dataform,
                      name: product.name,
                      discription: product.description,  
                      rating: product.rating,
                      price: product.price,
                      category_id: product.category_id,
                    });
                    setPraview4(product.images_products || [])
                    setId(product.id);
                    setOpenModelEdite(true);
                    setPraview(null);
                    setPraview2(null);
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
        <ProductModel
          setName={setName}
          setDiscription={setDiscription}
          setRating={setRating}
          setPrice={setPrice}
          setImage={setImage}
          setImages={setImages}
          praview={praview}
          praview2={praview2}
          title={"Create Product"}
          handelClose={handelClose}
          name={dataform.name}
          discription={dataform.discription}
          rating={dataform.rating}
          price={dataform.price}
          sendDate={sendDate}
          create={1}
          errors={errors}
          categories={categories}
          category={dataform.category_id}
          setCategory={setCategory}
        />
      )}
      {openModelEdite && <ProductModel     
          setName={setName}
          setDiscription={setDiscription}
          setRating={setRating}
          setPrice={setPrice}
          setImage={setImage}
          setImages={setImages}
          praview={praview}
          praview2={praview2}
          title={"Edit Product"}
          handelClose={handelClose}
          name={dataform.name}
          discription={dataform.discription}
          rating={dataform.rating}
          price={dataform.price}
          sendDate={sendDate}
          create={0}
          errors={errors}
          categories={categories}
          category={dataform.category_id}
          setCategory={setCategory} 
          praview3={praview3}
          praview4={praview4}
          />}

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
                    Delete Product
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
