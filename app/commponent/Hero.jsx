"use client";

import React, { useContext } from 'react'
import { teal } from '@mui/material/colors';
import SearchContext from '../context/SearshContext';
function Hero({theme}) {
    const { query } = useContext(SearchContext);
  return (
    <>
    {!query && (
    <section className=" lg:grid lg:h-screen  ">
  <div className="flex justify-between item mx-auto w-screen max-w-screen-xl px-4 py-5 sm:px-6 sm:py-3 lg:px-8 lg:py-15">
    <div className={`max-w-prose break-words text-left md:w-[50%] mt-15`}>
      <h1 className={`break-words w-[70%] text-4xl font-bold  text-gray-600  sm:text-5xl`}>
        Understand user flow and
        <strong className="text-teal-600"> increase </strong>
        conversions
      </h1>

      <p className={`mt-4 break-words w-[70%] text-base text-pretty text-gray-500 sm:text-lg/relaxed`}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident
        accusamus impedit minima harum corporis iusto.
      </p>

      <div className="mt-4 flex gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-teal-600 bg-teal-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
          href="#"
        >
          Get Started
        </a>

        <a
          className={`inline-block  rounded border border-gray-200 px-5 py-3 font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50  hover:text-gray-900`}
          href="#"
          
        >
          Learn More
        </a>
      </div>
    </div>
    <div  className='mt-15'>
      <img src="/13.png" alt="image" 
      className='w-[300px] h-[300px] 
      md:h-[400px] md:w-[400px]  
      '
      />
    </div>
  </div>
</section>      
    )}
  </>
  )
}

export default Hero