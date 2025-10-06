import React from 'react'
import { LiaTelegram } from "react-icons/lia";
import { PiInstagramLogoLight } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import Link from 'next/link';


export default function Footer() {
    return (
        <div className='flex lg:flex-row sm:flex-col-reverse gap-10 justify-between lg:h-[352px] sm:h-[514px] bg-neutral-100 lg:mt-30 sm:mt-55 lg:pr-[108px] lg:pl-[108px] rounded-t-[10%]'>
            {/* ===================== right section =================== */}
            <div className='lg:w-[494px] lg:h-[328px] sm:w-[318px] sm:h-[600px] flex flex-col justify-evenly lg:p-0 sm:pr-7 sm:pl-5'>
                <h4 className='text-primary lg:text-[24px] sm:text-[18px] font-[500]'>ایرانی فرش </h4>
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
                    <img src="/images/enamad.png" alt="enamad" />
                </div>
            </div>
            {/* ===================== left section =================== */}
            <div className='lg:w-[600px] lg:h-[328px] sm:w-[390px] sm:h-[178] font-[Rokh-light] font-bold mt-6'>
                <table className='table-auto w-full border-separate border-spacing-x-8'>
                    <thead>
                        <tr className='text-neutral-700 lg:text-[16px] sm:text-[12px] lg:font-[700] sm:font-[600]'>
                            <td className='border-b border-neutral-200 lg:w-[184px] sm:w-[105px] pb-0.5'>فرش های دستبافت</td>
                            <td className='border-b border-neutral-200 lg:w-[184px] sm:w-[105px] pb-0.5'>فرش های ماشینی</td>
                            <td className='border-b border-neutral-200 lg:w-[184px] sm:w-[105px] pb-0.5'>سایر فرش ها</td>
                        </tr>
                    </thead>
                    <tbody className='text-neutral-600'>
                        <tr>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">لوکس</Link></td>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">لوکس</Link></td>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">لوکس</Link></td>
                        </tr>
                        <tr>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">قدیمی</Link></td>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">قدیمی</Link></td>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">قدیمی</Link></td>
                        </tr>
                        <tr>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">مدرن</Link></td>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">مدرن</Link></td>
                            <td className='py-3 lg:text-[20px] sm:text-[12px] font-[500]'><Link href="/">مدرن</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
