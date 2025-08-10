import Link from 'next/link'
import React from 'react'

export default function CategoryBox() {
    return (
        <div className='flex lg:flex-row sm:flex-col lg:gap-x-6 sm:gap-y-2.5 items-center justify-between lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3 mt-25'>
            <div className=' flex items-end lg:w-[420px] lg:h-[288px] sm:w-[340px] inset-0 bg-[linear-gradient(to_left,rgba(1,48,117,0.6),rgba(0,0,0,0.1)),url("/images/new-carpet1.png")] sm:bg-bottom lg:bg-center bg-cover rounded-2xl '>
                <div className='p-7'>
                    <p className='text-white font-[Rokh-light] text-[20px] mb-2'>فرش های جدید</p>
                    <Link href="/" className='p-2 border border-white text-white font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید فرش جدید</Link>
                </div>
            </div>
            <div className=' flex items-end lg:w-[420px] lg:h-[288px] sm:w-[340px] inset-0 bg-[linear-gradient(to_left,rgba(1,48,117,0.6),rgba(0,0,0,0.1)),url("/images/new-carpet2.png")] sm:bg-bottom lg:bg-center bg-cover rounded-2xl '>
                <div className='p-7'>
                    <p className='text-white font-[Rokh-light] text-[20px] mb-2'>فرش های رنگارنگ</p>
                    <Link href="/" className='p-2 border border-white text-white font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید فرش رنگارنگ</Link>
                </div>
            </div>
            <div className='flex items-center flex-col lg:gap-y-6 sm:gap-y-2.5'>
                <div className=' flex items-end lg:w-[420px] h-[132px] sm:w-[340px] inset-0 bg-[linear-gradient(to_left,rgba(1,48,117,0.6),rgba(0,0,0,0.1)),url("/images/new-carpet3.png")] bg-bottom bg-cover rounded-2xl '>
                    <div className='p-7'>
                        <p className='text-white font-[Rokh-light] text-[20px] mb-2'>پادری دستبافت</p>
                        <Link href="/" className='p-2 border border-white text-white font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید پادری </Link>
                    </div>
                </div>
                <div className=' flex items-end lg:w-[420px] h-[132px] sm:w-[340px] inset-0 bg-[linear-gradient(to_left,rgba(1,48,117,0.6),rgba(0,0,0,0.1)),url("/images/new-carpet4.png")] bg-bottom bg-cover rounded-2xl '>
                    <div className='p-7'>
                        <p className='text-white font-[Rokh-light] text-[20px] mb-2'>موکت اتاق</p>
                        <Link href="/" className='p-2 border border-white text-white font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید موکت</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
