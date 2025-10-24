// Components/ProductSpecs/ProductSpecs.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Features from '@/Components/Features/Features';

export default function ProductSpecs({ product }) {
    
    // 🔍 داده‌ها را از Prop استخراج می‌کنیم
    const productTitle = product?.title || 'عنوان محصول لود نشده'; 
    const productCategory = product?.category_path || 'دسته بندی'; 
    const productSize = product?.size || 'نامشخص'; 
    const productFeatures = product?.features || []; 

    // --- منطق UI/Mobile ---
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const itemsCount = isMobile ? 2 : 6;
    const featuresToDisplay = productFeatures.slice(0, itemsCount); 

    // 🛑 مهم: اگر داده‌ها در کنسول درست است اما اینجا نمایش داده نمی‌شود، تنها دلیل این است که
    // شما متغیرهای productTitle/productSize را در JSX استفاده نکرده‌اید!
    
    return (
        <>
            <div className='flex flex-col lg:gap-15 sm:gap-5' >
                <div className='flex flex-col gap-7 lg:border-b lg:border-[#ADADAD] sm:border-white pb-7 '>
                    
                    {/* ✅ پویا: مسیر دسته بندی */}
                    <h4 className='text-primary text-xl lg:inline sm:hidden'>
                        {productCategory}
                    </h4>
                    
                    {/* ✅ پویا: عنوان اصلی محصول */}
                    <h1 className=' lg:text-3xl sm:text-xl sm:text-center lg:pt-0 sm:pt-[40px]'>
                        {productTitle}
                    </h1>
                </div>
                
                {/* ✅ پویا: اندازه فرش */}
                <div className='flex gap-5 lg:flex sm:hidden'>
                    <h1 className='text-2xl'>اندازه فرش:</h1>
                    <h2 className='text-2xl'>
                        {productSize}
                    </h2>
                </div>
                
                {/* ... بقیه قسمت ویژگی‌ها ... */}
                <div className='flex flex-col gap-6'>
                    <h1 className='text-2xl lg:inline sm:hidden'>ویژگی ها</h1>
                    <div className="flex lg:flex-wrap gap-4 lg:w-[496px] sm:justify-center">
                        {featuresToDisplay.map((feature, i) => (
                            <Features
                                featureTitle={feature.key || "ویژگی"} 
                                featureValue={feature.value || "مقدار"}
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
    );
}