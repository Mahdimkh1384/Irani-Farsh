// Components/ProductSpecs/ProductSpecs.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Features from '@/Components/Features/Features';

export default function ProductSpecs({ product }) {
    const productTitle = product?.title || 'عنوان محصول لود نشده';
    const productCategory = product?.category || 'دسته بندی';
    const productSize = product?.size || 'نامشخص';
    const productFeatures = product?.attributes || [];

    const [isMobile, setIsMobile] = useState(false);
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const initialCount = isMobile ? 2 : productFeatures.length;
    const displayedFeatures = showAllFeatures ? productFeatures : productFeatures.slice(0, initialCount);

    const featureKeyMap = {
        quality: "کیفیت",
        color: "رنگ",
        shape: "شکل",
        yarn: "نخ",
        warp: "تاروپود",
        weft: "پود",
    };

    if (!product) return <div>در حال بارگذاری...</div>;

    return (
        <div className='flex flex-col lg:gap-15 sm:gap-5'>

            {/* بخش عنوان و دسته بندی */}
            <div className='flex flex-col gap-7 lg:border-b lg:border-[#ADADAD] sm:border-white pb-7'>
                <h4 className='text-primary text-xl lg:inline sm:hidden'>
                    {productCategory}
                </h4>
                <h1 className='lg:text-3xl sm:text-xl sm:text-center lg:pt-0 sm:pt-[40px]'>
                    {productTitle}
                </h1>
            </div>

            {/* اندازه فرش */}
            <div className='flex gap-5 lg:flex sm:hidden'>
                <h1 className='text-2xl'>اندازه فرش:</h1>
                <h2 className='text-2xl'>{productSize}</h2>
            </div>

            {/* ویژگی‌ها */}
            <div className='flex flex-col gap-6 lg:w-[500px] sm:w-[350px]'>
                <h1 className='text-2xl lg:inline sm:hidden'>ویژگی ها</h1>
                <div className="flex lg:flex-wrap sm:flex-wrap gap-4 lg:w-[496px] sm:w-[100%] sm:justify-center transition-all duration-300">
                    {displayedFeatures.map((feature, i) => (
                        <Features
                            featureTitle={featureKeyMap[feature.key] || feature.key || "ویژگی"}
                            featureValue={feature.value || "مقدار"}
                            key={i}
                        />
                    ))}
                </div>

                {/* دکمه نمایش بیشتر برای موبایل */}
                {isMobile && productFeatures.length > initialCount && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                            className='cursor-pointer px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition-all'
                        >
                            {showAllFeatures ? "نمایش کمتر" : `نمایش همه ویژگی‌ها (${productFeatures.length})`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
