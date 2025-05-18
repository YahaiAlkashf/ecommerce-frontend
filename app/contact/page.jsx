import Link from "next/link";
import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function page() {
  return (
    <div>
      <div className="flex  justify-center items-center" >
        <div>
        <h1 className="text-teal-700 font-bold text-2xl mt-20  "> Contact Us</h1>
        <p  className="mb-5">
           <span className="font-medium">You Can Contact Us With</span>  
            <Link href="tel:01557606009" className="flex items-center  hover:underline hovet:text-teal-400 pl-5 text-teal-500 gap-2"><FaPhoneVolume />01557606009 </Link>
            <Link href="mailto:yeheimohmed@gmail.com" className="flex hover:underline hovet:text-teal-400 pl-5 text-teal-500 items-center gap-2"><MdEmail />yeheimohmed@gmail.com</Link>
        </p>
        </div>
      </div>
      <img src="/2.png" alt="image" />
    </div>
  );
}

export default page;
