import React from 'react'
import { LiaTelegram } from "react-icons/lia";
import { PiInstagramLogoLight } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";


export default function Footer() {
    return (
        <div className='flex gap-10 justify-between h-[352px] bg-neutral-100 mt-30 lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3'>
            {/* ===================== right section =================== */}
            <div className='w-[494px] h-[328px] flex flex-col justify-evenly'>
                <h4 className='text-primary text-[24px] font-[500]'>ایرانی فرش </h4>
                <p className='font-[600] font-[Rokh-light] text-neutral-600 leading-8 text-justify'>با ایرانی فرش همراه باشید و از زیبایی و شگفتی های فرش های متنوع و با کیفیت ما لذت ببرید. خرید آسان، تحویل سریع و خدمات پس از فروش حرفه ای، تنها چندی از ویژگی های خرید از ماست. با ایرانی فرش یک خرید آسان و لذت بخش را تجربه کنید.</p>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col gap-y-4'>
                        <p className='text-neutral-700 font-[vazir] font-[400] text-[20px]'>تلفن پشتیبانی:  0212544</p>
                        <div className='flex flex-row gap-x-6 text-neutral-700 text-2xl'>
                            <FaLinkedin className='hover:cursor-pointer' />
                            <LiaTelegram className='hover:cursor-pointer' />
                            <PiInstagramLogoLight className='hover:cursor-pointer' />
                        </div>
                    </div>
                    <img src="./images/enamad.png" alt="enamad" />
                </div>
            </div>
            {/* ===================== left section =================== */}
            <div className='w-[600px] h-[328px] font-[Rokh-light] font-bold mt-6'>
                <table className='table-auto w-full border-separate border-spacing-x-8'>
                    <thead>
                        <tr className='text-neutral-700'>
                            <td className='border-b border-neutral-200 w-[184px] pb-0.5'>فرش های دستبافت</td>
                            <td className='border-b border-neutral-200 w-[184px] pb-0.5'>فرش های ماشینی</td>
                            <td className='border-b border-neutral-200 w-[184px] pb-0.5'>سایر فرش ها</td>
                        </tr>
                    </thead>
                    <tbody className='text-neutral-600'>
                        <tr>
                            <td className='py-3'>لوکس</td>
                            <td className='py-3'>لوکس</td>
                            <td className='py-3'>لوکس</td>
                        </tr>
                        <tr>
                            <td className='py-3'>قدیمی</td>
                            <td className='py-3'>قدیمی</td>
                            <td className='py-3'>قدیمی</td>
                        </tr>
                        <tr>
                            <td className='py-3'>مدرن</td>
                            <td className='py-3'>مدرن</td>
                            <td className='py-3'>مدرن</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
