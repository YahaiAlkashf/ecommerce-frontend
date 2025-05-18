"use client";
import React, { useState } from 'react'
import Aside from './Aside'
import { FaBars } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
function Header({login,setLogin}) {
    const [open,setOpen]=useState(false);
    const router=useRouter();
    const handleLogout= async(e)=>{
        e.preventDefault();
    try {
      const token = Cookies.get("auth_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        Cookies.remove("auth_token");
      alert(response.data.message);
      router.push('/');
      setLogin(false);
      
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div className='flex justify-between'>
        <div>
        <header className="bg-white  ">
            <div className="mx-auto flex h-16 w-screen  items-center gap-8 px-4 sm:px-6 lg:px-8 justify-between">
                <div className={`${open ?'ml-60' : ''}   transform transition-transform duration-700 ease-in-out`}>
                    <button className="block  text-teal-600 cursor-pointer " >
                    <FaBars onClick={()=>setOpen(!open) }  />
                    </button>
            </div>
        

                <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                 <button onClick={handleLogout}
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  href="/login"
                >
                  Logout
                </button>
        
   
                </div>
            </div>

            </div>
        </header>
        </div>

        <div>
        <Aside className={"duration-1000"} open={open}/>
        </div>
  </div>
  )
}

export default Header