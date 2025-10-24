"use client";
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { MdSearch, MdOutlineShoppingCart, MdOutlineLogin, MdArrowBackIos } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import MobileMenu from '../MobileMenu/MobileMenu';
<<<<<<< HEAD
import { getUserData, isAuthenticated } from "@/utils/auth";

export default function NavBar() {
    const [isShowCategoryMenu, setIsShowCategoryMenu] = useState(false);
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);
=======
import { redirect } from 'next/navigation';



export default function NavBar() {

    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)
    const menuRef = useRef(null);
    const [allCategories, setAllCategories] = useState([])
    const [search, setSearch] = useState('')
>>>>>>> a2194b7e418003abce1ac0af0038aeaaa88411af

    const getCategories = async () => {
        const res = await fetch("https://backend.sajlab.ir/api/categories");
        const data = await res.json();
        setAllCategories(data.data);
    };

    useEffect(() => {
        getCategories();

        // بسته شدن منو وقتی بیرون کلیک میشه
        const handleClickOutside = (event) => {
            if (isShowMobileMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsShowMobileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isShowMobileMenu]);

<<<<<<< HEAD
    useEffect(() => {
        // وقتی کاربر لاگین یا ثبت‌نام کرد، user رو از localStorage بخون
        const checkUser = () => {
            if (isAuthenticated()) {
                const userData = getUserData();
                setUser(userData);
            } else {
                setUser(null);
            }
        };
=======
    const searchHandler = (event) => {

        if (search) {
            if (event.keyCode === 13) {
                setSearch('')
                redirect(`/search?q=${search}page=${1}`)
            }
        }
    }

    const searchBtn = () => {
        if (search) {
            setSearch('')
            redirect(`/search?q=${search}page=${1}`)
        }
    }
>>>>>>> a2194b7e418003abce1ac0af0038aeaaa88411af

        checkUser();

        // گوش بده برای تغییر در localStorage (مثلاً بعد از ثبت‌نام)
        window.addEventListener("storage", checkUser);
        return () => window.removeEventListener("storage", checkUser);
    }, []);

    return (
        <>
            {isShowMobileMenu && <div ref={menuRef}><MobileMenu /></div>}
            <div className='flex flex-col lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3 pt-6 gap-6'>
                <div className='flex justify-between items-start'>
                    {/* ========================= right section ======================== */}
                    <div className='flex sm:w-[220px] lg:w-full lg:items-center lg:gap-6 lg:flex-row sm:flex-col'>
                        <div className='flex items-center gap-x-4'>
                            <button className='lg:hidden sm:inline size-10 rounded-[8px] bg-neutral-300 p-3' onClick={() => setIsShowMobileMenu(true)}><IoMdMenu /></button>
                            <Link href="/" className='text-primary text-[24px]'>ایرانی فرش</Link>
                        </div>
                        <div className='relative'>
                            <MdSearch className='absolute right-2 lg:top-2.5 sm:top-7.5 size-6 text-neutral-600 hover:cursor-pointer' />
                            <input type="text" placeholder='جستجوی فرش' className='lg:w-[439px] sm:w-[367px] h-[48px] bg-neutral-200 p-3 pr-10 rounded-[12px] outline-none lg:mt-0 sm:mt-5' />
                        </div>
                    </div>
<<<<<<< HEAD

                    {/* ========================= left section ======================== */}
                    <div className='flex justify-between items-center gap-4'>
                        <Link href="/basket" className='btn size-12 text-2xl'>
                            <MdOutlineShoppingCart />
                        </Link>

                        {user ? (
                            <Link
                                href="/my-account"
                                className="flex items-center gap-2 px-2 py-2 rounded-[12px] border-2 border-red-500 max-w-[300px] overflow-x-auto whitespace-nowrap hover:bg-red-50 transition-colors"
                            >
                                <MdOutlineLogin className="text-2xl text-primary flex-shrink-0" />
                                <span className="text-primary font-semibold">
                                    {user.firstName} {user.lastName}
                                </span>
                            </Link>
                        ) : (
                            <Link href="/login" className='btn lg:w-[153px] lg:h-12 sm:size-12'>
                                <MdOutlineLogin className='text-2xl lg:ml-2' />
                                <span className='lg:inline sm:hidden'>ورود / ثبت نام</span>
                            </Link>
                        )}

                    </div>
                </div>

                {/* ========================= menu section ======================== */}
                <div className='border-b border-neutral-300 pt-2 pb-2 lg:inline sm:hidden'>
                    <ul className='flex gap-8 text-[15px] font-bold font-[Rokh-light]'>
                        <Link href="/" className='menuHover'>صفحه اصلی</Link>
                        <li className='relative menuHover group' onMouseEnter={() => setIsShowCategoryMenu(true)}>
                            <Link href="/categories" className='flex justify-center items-center gap-x-0.5'>
                                دسته بندی
                                <MdArrowBackIos className='group-hover:-rotate-90 transition-transform' />
                            </Link>
                            {isShowCategoryMenu && (
                                <ul className='absolute flex flex-col gap-y-1 shadow w-[200px] p-2.5 top-8 bg-white z-50' onMouseLeave={() => setIsShowCategoryMenu(false)}>
                                    {allCategories.map(category => (
                                        <li key={category.id} className='text-black hover:text-primary transition-colors p-1'>
                                            <Link href={category.slug}>{category.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <Link href="/" className='menuHover'>تماس با ما</Link>
                        <Link href="/about-us" className='menuHover'>درباره ما</Link>
                    </ul>
                </div>
=======
                    <div className=' relative'>
                        <MdSearch className=' absolute right-2 lg:top-2.5 sm:top-7.5 size-6 text-neutral-600 hover: cursor-pointer' />
                        <input type="text" value={search} placeholder='جستجوی فرش' onChange={e => setSearch(e.target.value)} onKeyDown={e => searchHandler(e)} className='lg:w-[439px] sm:w-[367px] h-[48px] bg-neutral-200 p-3 pr-10 rounded-[12px] outline-none lg:mt-0 sm:mt-5' />
                        <button className=' absolute lg:left-1 lg:top-1 sm:left-[-140px] sm:top-6 bg-primary text-white lg:w-[100px] h-[40px] sm:w-[90px] rounded-[8px] font-[Rokh-light] font-bold cursor-pointer hover:bg-red-700' onClick={searchBtn}>جستجو</button>
                    </div>
                </div>
                {/* ========================= left section ======================== */}
                <div className='flex justify-between items-center gap-4 '>
                    <Link href="/basket" className='btn size-12 text-2xl'><MdOutlineShoppingCart /> </Link>
                    <Link href="/login" className='btn lg:w-[153px] lg:h-12 sm:size-12 '>
                        <MdOutlineLogin className='text-2xl lg:ml-2' />
                        <span href="/" className=' lg:inline sm:hidden '>ورود / ثبت نام</span>
                    </Link>
                </div>
            </div>
            {/* ========================= menu section ======================== */}
            <div className=' border-b border-neutral-300 pt-2 pb-2 lg:inline sm:hidden'>
                <ul className='flex gap-8 text-[15px] font-bold font-[Rokh-light]'>
                    <Link href="/" className='menuHover'>صفحه اصلی</Link>
                    <li className="relative group menuHover">
                        <div className="flex justify-center items-center gap-x-0.5 cursor-pointer">
                            <Link href="/categories" className='flex justify-center items-center gap-x-0.5 '>
                                دسته بندی
                                <MdArrowBackIos className=' group-hover:-rotate-90 transition-transform' />
                            </Link>
                        </div>
                        <div className="absolute top-5 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-white shadow-md rounded-md z-50 w-[200px] p-2">
                            {allCategories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="block px-3 py-2 text-black hover:text-primary transition-colors"
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    </li>
                    <Link href="/" className='menuHover'>تماس با ما</Link>
                    <Link href="/about-us" className='menuHover'>درباره ما</Link>
                </ul>
>>>>>>> a2194b7e418003abce1ac0af0038aeaaa88411af
            </div>
        </>
    );
}
