import React from 'react'

export default function AllBasketResult() {
    return (
        <div className='lg:w-[312px] sm:w-full h-[275px] flex flex-col gap-y-8 lg:border sm:border-y border-neutral-400 lg:rounded-[8px] px-[19px] py-[26px]'>
            {/* ================== details ================== */}
                <div className='flex justify-between'>
                    <p className='text-[16px] font-[Rokh-light] font-bold'>تعداد فرش :</p>
                    <p className='text-[20px]'>1</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-[16px] font-[Rokh-light] font-bold'>مجموع سبد خرید : </p>
                    <p className='text-[20px]'>13/500/000</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-[16px] font-[Rokh-light] font-bold'>ارسال توسط :</p>
                    <p className='text-[20px]'>ایرانی فرش</p>
                </div>
            <button className='lg:w-[274px] sm:w-[350px] h-10 rounded-[12px] px-2 text-white bg-primary hover:bg-red-700 hover:cursor-pointer font-[Rokh-light] font-bold'>سفارش و خرید</button>
        </div>
    )
}
