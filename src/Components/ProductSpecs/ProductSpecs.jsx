"use client"
import React from 'react'
import Features from '@/Components/Features/Features'
import { useState, useEffect } from "react";

export default function ProductSpecs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const itemsCount = isMobile ? 2 : 6;
  return (
    <>
      <div className='flex flex-col lg:gap-15 sm:gap-5' >
        <div className='flex flex-col gap-7 lg:border-b lg:border-[#ADADAD] sm:border-white pb-7 '>
          <h4 className='text-primary text-xl lg:inline sm:hidden'>
            فرش ماهساره / فرش ماشینی ماهساره
          </h4>
          <h1 className=' lg:text-3xl sm:text-xl sm:text-center lg:pt-0 sm:pt-[40px]'>
            فرش ماشینی  ماهساره طرح آترینا زمینه آبی
          </h1>
        </div>
        <div className='flex gap-5 lg:flex sm:hidden'>
          <h1 className='text-2xl'>اندازه فرش:</h1>
          <h2 className='text-2xl'>
            شش متری (۳۰۰* ۲۰۰)
          </h2>
        </div>
        <div className='flex flex-col gap-6'>
          <h1 className='text-2xl lg:inline sm:hidden'>ویژگی ها</h1>

          <div className="flex lg:flex-wrap gap-4 lg:w-[496px] sm:justify-center">
            {[...Array(itemsCount)].map((_, i) => (
              <Features
                featureTitle="کیفیت فرش"
                featureValue="درجه یک"
                key={i}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button className='cursor-pointer w-[180px] h-[50px] bg-white text-primary rounded-xl border-2 border-primary'>
            مشاهده همه ویژگی ها
          </button>
        </div>
      </div>
    </>
  )
}
