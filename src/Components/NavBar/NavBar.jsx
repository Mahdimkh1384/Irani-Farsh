"use client"
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react'
import { MdSearch, MdOutlineShoppingCart, MdOutlineLogin, MdArrowBackIos } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import MobileMenu from '../MobileMenu/MobileMenu';



export default function NavBar() {

    const [isShowCategoryMenu, setIsShowCategoryMenu] = useState(false)
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)
    const menuRef = useRef(null);

    // close mobile menu to click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isShowMobileMenu &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsShowMobileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShowMobileMenu]);


    return (<>
        {isShowMobileMenu && <div ref={menuRef}><MobileMenu /></div>}
        <div className='flex flex-col lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3 pt-6 gap-6'>
            <div className='flex justify-between items-start'>
                {/* ========================= right section ======================== */}
                <div className='flex sm:w-[220px] lg:w-full lg:items-center lg:gap-6 lg:flex-row sm:flex-col'>
                    <div className='flex items-center gap-x-4'>
                        <button className='lg:hidden sm:inline size-10 rounded-[8px] bg-neutral-300 p-3' onClick={() => setIsShowMobileMenu(true)}><IoMdMenu /></button>
                        <h4 className='text-primary text-[24px]'>ایرانی فرش</h4>
                    </div>
                    <div className=' relative'>
                        <MdSearch className=' absolute right-2 lg:top-2.5 sm:top-7.5 size-6 text-neutral-600 hover: cursor-pointer' />
                        <input type="text" placeholder='جستجوی فرش' className='lg:w-[439px] sm:w-[367px] h-[48px] bg-neutral-200 p-3 pr-10 rounded-[12px] outline-none lg:mt-0 sm:mt-5' />
                    </div>
                </div>
                {/* ========================= left section ======================== */}
                <div className='flex justify-between items-center gap-4 '>
                    <Link href="/" className='btn size-12 text-2xl'><MdOutlineShoppingCart /> </Link>
                    <Link href="/login" className='btn lg:w-[153px] lg:h-12 sm:size-12 '>
                        <MdOutlineLogin className='text-2xl lg:ml-2' />
                        <span href="/" className=' lg:inline sm:hidden '>ورود / ثبت نام</span>
                    </Link>
                </div>
            </div>
            {/* ========================= menu section ======================== */}
            <div className=' border-b border-neutral-300 pt-2 pb-2 lg:inline sm:hidden'>
                <ul className='flex gap-8 text-[15px] font-bold font-[Rokh-light]'>
                    <Link href="/" className='active menuHover'>صفحه اصلی</Link>
                    <li className=' relative menuHover group' onMouseEnter={() => setIsShowCategoryMenu(true)}>
                        <Link href="/" className='flex justify-center items-center gap-x-0.5 '>
                            دسته بندی
                            <MdArrowBackIos className=' group-hover:-rotate-90 transition-transform' />
                        </Link>
                        {isShowCategoryMenu && <ul className=' absolute flex flex-col gap-y-1 shadow p-2.5 w-28 h-20 top-8' onMouseLeave={() => setIsShowCategoryMenu(false)}>
                            <li><Link href="/" className='text-black hover:text-primary transition-colors'>فرش دستی</Link></li>
                            <li><Link href="/" className='text-black hover:text-primary transition-colors'>فرش ماشینی</Link></li>
                        </ul>}
                    </li>
                    <Link href="/" className='menuHover'>تماس با ما</Link>
                    <Link href="/" className='menuHover'>درباره ما</Link>
                </ul>
            </div>
        </div>
    </>
    )
}
