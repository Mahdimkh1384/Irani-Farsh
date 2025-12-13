import React from 'react'
import { LiaTelegram } from "react-icons/lia";
import { PiInstagramLogoLight } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
    return (
        <footer className='flex lg:flex-row sm:flex-col-reverse gap-10 justify-between items-center lg:h-[352px] sm:h-[514px] bg-neutral-100 lg:mt-30 sm:mt-50 lg:pr-[108px] lg:pl-[108px] rounded-t-[50px]'>
            {/* ===================== right section =================== */}
            <div className='lg:w-[494px] lg:h-[328px] sm:h-[600px] flex flex-col justify-evenly lg:p-0 sm:pr-7 sm:pl-5'>
                <Link href="/" className='text-primary lg:text-[24px] sm:text-[18px] font-[500]'>ایرانی فرش </Link>
                <p className='lg:font-[600] sm:font-[600] font-[Rokh-light] lg:text-[16px] sm:text-[12px] lg:w-full sm:w-[320px] text-neutral-600 leading-8 text-justify'>با ایرانی فرش همراه باشید و از زیبایی و شگفتی های فرش های متنوع و با کیفیت ما لذت ببرید. خرید آسان، تحویل سریع و خدمات پس از فروش حرفه ای، تنها چندی از ویژگی های خرید از ماست. با ایرانی فرش یک خرید آسان و لذت بخش را تجربه کنید.</p>
                <div className='flex justify-between items-center lg:w-[494px] lg:h-[102px] sm:w-[320px] sm:h-[100px] lg:pb-0 sm:pb-2'>
                    <div className='flex flex-col gap-y-4'>
                        <p className='text-neutral-700 font-[vazir] font-[400] lg:text-[20px] sm:text-[15px]'>تلفن پشتیبانی:  0212544</p>
                        <div className='flex flex-row gap-x-6 text-neutral-700 text-2xl'>
                            <FaLinkedin className='hover:cursor-pointer' />
                            <LiaTelegram className='hover:cursor-pointer' />
                            <PiInstagramLogoLight className='hover:cursor-pointer' />
                        </div>
                    </div>
                    <Image width={100} height={100} src="/images/enamad.png" alt="enamad" />
                </div>
            </div>
            {/* ===================== left section =================== */}
            <div className='lg:w-[50%] lg:h-[328px] flex justify-evenly sm:w-full font-[Rokh-light] font-bold p-5'>
                <div className='flex flex-col gap-8'>
                    <h3 className='border-b border-neutral-200 pb-0.5 text-neutral-700 lg:text-[16px] sm:text-[12px] lg:font-[700] sm:font-[600]'>فرش های پر طرفدار</h3>
                    <Link href="/product/4" className='footerLink'>فرش باغ گل سبز</Link>
                    <Link href="/product/7" className='footerLink'>فرش طرح سلطانی </Link>
                    <Link href="/product/11" className='footerLink'>فرش رنگی ابریشم</Link>
                </div>
                <div className='flex flex-col gap-8'>
                    <h3 className='border-b border-neutral-200 pb-0.5 text-neutral-700 lg:text-[16px] sm:text-[12px] lg:font-[700] sm:font-[600]'>دسته بندی های پر بازدید</h3>
                    <Link href="/categories/new-carpet" className='footerLink'>فرش های جدید</Link>
                    <Link href="/categories/tabriz-handmade-carpet" className='footerLink'>فرش دستبافت تبریز  </Link>
                    <Link href="/categories/machine-made-rug" className='footerLink'>قالیچه ماشینی</Link>
                </div>
                <div className='flex flex-col gap-8'>
                    <h3 className='border-b border-neutral-200 pb-0.5 text-neutral-700 lg:text-[16px] sm:text-[12px] lg:font-[700] sm:font-[600]'>راه های ارتباطی سریع</h3>
                    <Link href="/about-us" className='footerLink'>درباره ما</Link>
                    <Link href="/customer-club" className='footerLink'>باشگاه مشتریان</Link>
                </div>
            </div>
        </footer>
    )
}
