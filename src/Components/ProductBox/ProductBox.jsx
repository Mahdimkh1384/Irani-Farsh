import React from 'react'

export default function ProductBox() {
    return (
        <div className=' flex flex-col justify-center gap-y-6 w-[287.5px] h-[493px] p-4 rounded-[12px] border border-neutral-300'>
            <img className='w-[255.5px] h-[261px]' src="./images/Frame 11.png" alt="single-carpet" />
            <div className='flex flex-col gap-y-4'>
                <p className='font-[Rokh-light] font-bold text-[18px]'>فرش کهن  دست بافت سهند زمینه سرمه ای </p>
                <div className='flex justify-between'>
                    <p className='font-[Rokh-light] font-bold text-[14px]'>قیمت: </p>
                    <p className='font-[Rokh-light] font-bold text-[18px]'>233/000 تومان</p>
                </div>
            </div>
            <button className='btn w-[255.5px] h-10 '>
                مشاهده بیشتر
            </button>
        </div>
    )
}
