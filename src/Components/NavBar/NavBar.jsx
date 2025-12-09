"use client";
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { MdSearch, MdOutlineShoppingCart, MdOutlineLogin, MdArrowBackIos } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import MobileMenu from '../MobileMenu/MobileMenu';
import { redirect } from 'next/navigation';
import { getUserData, isAuthenticated } from "@/utils/auth";

export default function NavBar() {
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);
    const [search, setSearch] = useState('')

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

        checkUser();

        // گوش بده برای تغییر در localStorage (مثلاً بعد از ثبت‌نام)
        window.addEventListener("storage", checkUser);
        return () => window.removeEventListener("storage", checkUser);
    }, []);

    const searchHandler = (event) => {

        if (search) {
            if (event.keyCode === 13) {
                setSearch('')
                redirect(`/search/${search}?page=${1}`)
            }
        }
    }

    const searchBtn = () => {
        if (search) {
            setSearch('')
            redirect(`/search/${search}?page=${1}`)
        }
    }

    return (
        <>
            {isShowMobileMenu && <div ref={menuRef}><MobileMenu setIsMenuOpen={setIsShowMobileMenu} allCategories={allCategories}/></div>}
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
                            <input type="text" value={search} placeholder='جستجوی فرش' onChange={e => setSearch(e.target.value)} onKeyDown={e => searchHandler(e)} className='lg:w-[439px] sm:w-[367px] h-[48px] bg-neutral-200 p-3 pr-10 rounded-[12px] outline-none lg:mt-0 sm:mt-5' />
                            <button className=' absolute lg:left-1 lg:top-1 sm:left-[-140px] sm:top-6 bg-primary text-white lg:w-[100px] h-[40px] sm:w-[90px] rounded-[8px] font-[Rokh-light] font-bold cursor-pointer hover:bg-red-700' onClick={searchBtn}>جستجو</button>
                        </div>
                    </div>

                    {/* ========================= left section ======================== */}
                    <div className='flex justify-between items-center gap-4 mr-8'>
                        <Link href="/basket" className='btn size-12 text-2xl'>
                            <MdOutlineShoppingCart />
                        </Link>

                        {user ? (
                            <Link
                                href="/my-account"
                                className="btn lg:w-[153px] lg:h-12 sm:size-12"
                            >
                                <FaRegUser className="text-xl lg:ml-2 text-primary flex-shrink-0" />
                                <span className="text-primary font-semibold lg:inline sm:hidden">
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
                </div >

                {/* ========================= menu section ======================== */}
                < div className='border-b border-neutral-300 pt-2 pb-2 lg:inline sm:hidden' >
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
                        <Link href="/about-us" className='menuHover'>درباره ما</Link>
                    </ul>
                </div >
            </div >
        </>
    );
}
