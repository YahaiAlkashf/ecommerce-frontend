import React from 'react'
function page() {
  return (
    <>
    <div>
    <div  className='flex gap-3' >
    <h1 className='text-teal-700 font-bold text-2xl pt-30 p-3 ' > About Us</h1>
    {/* <div className='dash'>|</div> */}
    <p className='pt-30  p-3' style={{ marginRight:"5%"}}>   
    We are your go-to destination for the latest watches, headphones, and electronics!
    We offer a wide selection of trendy watches that combine style and technology, top-quality headphones for music lovers, and smart electronics that make your life easier and more comfortable.

    Enjoy a smooth shopping experience on our website with exclusive deals, competitive prices, and fast delivery across [country/world].
    We guarantee quality, exceptional customer service, and 100% secure payment.
    Shop now and be part of the future!</p>
    </div>
    <img src="/2.png" alt="" />
    </div>
    </>
  )
}

export default page