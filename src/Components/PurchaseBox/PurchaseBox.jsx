"use client";
import React from 'react';
import { MdBusiness } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function PurchaseBox({ product }) {
    // وضعیت محصول از API
    const status = product?.rating || 'متوسط'; 

    let colorClass = '';
    if (status === 'عالی') colorClass = 'text-green-500';
    else if (status === 'متوسط') colorClass = 'text-yellow-500';
    else if (status === 'بد') colorClass = 'text-red-500';

    const price = product?.price ? Number(product.price).toLocaleString() : 'نامشخص';
    const seller = product?.seller || 'شرکت فرش سهند';
    const stars = 4.6; // اگر API ستاره دارد، جایگزین کن

    return (
        <div className='flex flex-col justify-center lg:rounded-lg lg:border-2 border-[#ADADAD] sm:border-t sm:border-b lg:w-[312px] sm:w-[100%] h-[370px] py-[31px] px-[12px]'>
            
            <div className='flex flex-col gap-7 border-b-1 border-[#ADADAD] pb-5'>
                <h1>فروشنده</h1>
                <div className='flex gap-2'>
                    <MdBusiness size={20} />
                    <h2>{seller}</h2>
                </div>

                <div className='flex gap-2'>
                    <h1>عملکرد</h1>
                    <p className={`text-xl font-bold ${colorClass}`}>{status}</p>
                </div>

                <div className='flex gap-2 items-center'>
                    <FaStar className="text-yellow-500 text-3xl" size={20} />
                    <p>{stars}</p>
                </div>
            </div>

            <div className='flex flex-col gap-5 pt-6'>
                <div className='flex justify-between'>
                    <h1 className='text-xl'>قیمت:</h1>
                    <h2>{price} تومان</h2>
                </div>
                <div>
                    <button className='w-[100%] h-[40px] bg-primary text-white rounded-2xl cursor-pointer'>
                        افزودن به سبد خرید
                    </button>
                </div>
            </div>
        </div>
    );
}
