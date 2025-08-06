"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { MdSearch, MdOutlineShoppingCart, MdOutlineLogin, MdArrowBackIos } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";



export default function NavBar() {

    const [isShowCategoryMenu, setIsShowCategoryMenu] = useState(false)

    return (
        <div className='flex flex-col pr-[108px] pl-[108px] pt-6 gap-6'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center gap-6'>
                    <h4 className='lg:text-primary text-[24px]'>ایرانی فرش</h4>
                    <div className=' relative'>
                        <MdSearch className=' absolute right-2 top-2.5 size-6 text-neutral-600 hover: cursor-pointer' />
                        <input type="text" placeholder='جستجوی فرش' className='w-[439px] h-[48px] bg-neutral-200 p-3 pr-10 rounded-[12px] outline-none' />
                    </div>
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <button className='btn size-12 text-2xl'><MdOutlineShoppingCart /> </button>
                    <button className='btn w-[153px] h-12'>
                        <MdOutlineLogin className='text-2xl ml-2' />
                        <Link href="/">ورود / ثبت نام</Link>
                    </button>
                </div>
            </div>
            <div className=' border-b border-neutral-300 pt-2 pb-2'>
                <ul className='flex gap-8 text-[15px]'>
                    <Link href="/" className='active menuHover'>صفحه اصلی</Link>
                    <Link href="/" className=' relative menuHover group' onMouseEnter={() => setIsShowCategoryMenu(true)}>
                        <div className='flex justify-center items-center gap-x-0.5 '>
                            دسته بندی
                            <MdArrowBackIos className=' group-hover:-rotate-90 transition-transform' />
                        </div>
                        {isShowCategoryMenu && <ul className=' absolute flex flex-col gap-y-1 shadow p-2.5 w-28 h-20 top-8' onMouseLeave={() => setIsShowCategoryMenu(false)}>
                            <li><Link href="/" className='text-black hover:text-primary transition-colors'>فرش دستی</Link></li>
                            <li><Link href="/" className='text-black hover:text-primary transition-colors'>فرش ماشینی</Link></li>
                        </ul>}
                    </Link>
                    <Link href="" className='menuHover'>تماس با ما</Link>
                    <Link href="/" className='menuHover'>درباره ما</Link>
                </ul>
            </div>
        </div>
    )
}
