'use client'; 

import { RotateLoader  } from 'react-spinners';
export default function LoadingAnimation () {
  return (
    <div className="flex items-center justify-center h-screen">
    <RotateLoader  color="#36d7b7" size={20} />
  </div>

  );
}

