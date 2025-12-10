"use client";
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { MdArrowBackIos } from "react-icons/md";
import MobileMenu from '../MobileMenu/MobileMenu';
import { redirect } from 'next/navigation';
import { getUserData, isAuthenticated } from "@/utils/auth";
import NavbarDesktop from '../NavbarDesktop/NavbarDesktop';
import NavbarMobile from '../NavbarMobile/NavbarMobile';

export default function NavBar() {
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);
    const [search, setSearch] = useState('')

    const getCategories = async () => {
        const res = await fetch("https://api.iranifarsh.neofy.ir/categories");
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
            {isShowMobileMenu && <div ref={menuRef}><MobileMenu setIsMenuOpen={setIsShowMobileMenu} allCategories={allCategories} /></div>}
            <div className='flex flex-col lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3 pt-6 gap-6'>
                <div className="hidden lg:block">
                    <NavbarDesktop user={user} search={search} setSearch={setSearch} onSearch={searchBtn} searchHandler={searchHandler} />
                </div>

                <div className="block lg:hidden">
                    <NavbarMobile setIsShowMobileMenu={setIsShowMobileMenu} user={user} search={search} setSearch={setSearch} onSearch={searchBtn} searchHandler={searchHandler} />
                </div>
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
