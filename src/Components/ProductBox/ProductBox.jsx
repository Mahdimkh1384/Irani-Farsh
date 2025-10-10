import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function ProductBox() {
    return (
        <div className=' flex flex-col justify-center gap-y-6 w-[287.5px] h-[493px] p-4 rounded-[12px] border border-neutral-300'>
            <Image width={255} height={261} className='w-[255.5px] h-[261px]' src="/images/Frame 11.png" alt="single-carpet" />
            <div className='flex flex-col gap-y-4'>
                <p className='font-[Rokh-light] font-bold text-[18px]'>فرش کهن  دست بافت سهند زمینه سرمه ای </p>
                <div className='flex justify-between items-center'>
                    <p className='font-[Rokh-light] font-bold text-[16px]'>قیمت: </p>
                    {/* OFF 👇 */}
                    <div className='flex flex-col'>
                        {/* <p className='font-[Rokh-light] text-neutral-400 text-[15px]'><s>420/000 تومان</s></p> */}
                        <p className='font-[Rokh-light] font-bold text-[18px]'>233/000 تومان</p>
                    </div>
                    {/* <div className='size-10 bg-primary flex justify-center items-center text-white rounded-xl'>
                        <span>20%</span>
                    </div> */}
                </div>
            </div>
            <Link href="/product" className='btn w-[255.5px] h-10 '>
                مشاهده بیشتر
            </Link>
        </div>
    )
}
