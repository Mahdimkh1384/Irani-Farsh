"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Typewriter from "typewriter-effect";

export default function Landing() {
    return (
        <div className=' lg:pr-[108px] lg:pl-[108px] lg:mt-20 sm:mt-16 h-[480.9px]  flex sm:flex-col-reverse lg:flex-row lg:justify-between  sm:justify-center sm:items-center '>
            <div className=' lg:mt-3 sm:mt-7 lg:w-[600px] lg:h-[280px] sm:w-[328px] sm:h-[144px] flex flex-col items-center'>
                <h2 className='lg:text-3xl sm:text-2xl'>خرید راحت فرش،در <span className='text-primary'>ایرانی فرش</span></h2>
                <div className='text-center font-[Rokh-light] font-bold lg:text-[24px] sm:text-[12px] mt-6 lg:w-[590px] sm:w-[310px] lg:min-h-[80px] sm:min-h-[50px]'>
                    <Typewriter onInit={(typeWriter) => {
                        typeWriter
                            .typeString("با ایـــرانی فرش در سریع ترین زمان ممکن فرش خودت رو سفارش بده و از تنوع بی نظیر فرش ها لذت ببر.")
                            .start()
                            .pauseFor(3000)
                            .deleteAll()
                    }}
                        options={{
                            delay : 30,
                            deleteSpeed: 10,
                            loop: true,
                        }} />
                </div>

                <div className='flex w-full justify-center lg:gap-x-10 sm:gap-x-4 lg:mt-12 sm:mt-6 lg:h-14 sm:h-8 '>
                    <button className='btn lg:h-14 sm:h-10 lg:w-[206px] sm:w-[152px] lg:text-[18px] sm:text-[14px]'>محصولات ویژه ایرانی فرش</button>
                    <Link href="/customer-club" className='font-bold lg:text-[18px] sm:text-[14px] font-[Rokh-light] bg-primary text-white border rounded-[12px] flex justify-center items-center hover:cursor-pointer hover:bg-red-700 transition-colors lg:h-14 sm:h-10 lg:w-[206px] sm:w-[152px]'>عضویت در باشگاه مشتریان</Link>
                </div>
            </div>
            <Image width={530} height={470} className='lg:w-[527px] lg:h-[470px] sm:w-[280px] sm:h-[250px]' src="/images/group 3.png" alt='carpets' />
        </div>
    )
}
