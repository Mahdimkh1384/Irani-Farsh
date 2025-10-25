"use client"
import React, { useState, useEffect } from 'react'
import { FiPlus } from "react-icons/fi";
import { FaUser, FaRegAddressBook } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from "@/utils/auth";
import { getUserData, isAuthenticated } from "@/utils/auth";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SideBar() {

    const pathname = usePathname();
    const [user, setUser] = useState(null)

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

    const links = [
        { id: 1, title: "حساب کاربری", href: "/my-account", icon: <FaUser /> },
        { id: 2, title: "سبد خرید من", href: "/basket", icon: <MdOutlineShoppingCart /> },
        { id: 3, title: "سفارش های من", href: "/my-account/orders", icon: <LuClipboardList /> },
        { id: 4, title: "آدرس ها", href: "", icon: <FaRegAddressBook /> },
    ];

    const logOutHandler = () => {
        logout()
    }

    return (
        <div className='lg:inline sm:hidden bg-neutral-50 fixed w-[25%] h-[95vh] border rounded-[10px] border-neutral-400'>
            {/* ====================== top section (profile) ========================= */}
            <div className='h-[40%] flex flex-col justify-center items-center gap-y-2 border-b border-neutral-600 rounded-t-[10px] bg-[linear-gradient(to_bottom,rgba(255,30,30,0.5),rgba(255,0,0,0.2),rgba(255,255,255,1))]'>
                <div className=' relative'>
                    <img className='size-35 ' src="/images/userIcon.png" alt="profile" />
                    <input type="file" id='fileInput' hidden />
                    <label htmlFor="fileInput" className=' absolute bottom-2 right-3 size-9 rounded-[50%] bg-white flex justify-center items-center hover:cursor-pointer'>
                        <FiPlus className='text-2xl' />
                    </label>
                </div>
                {user ? (
                    <div className='font-[Rokh-light] font-bold flex flex-col justify-center items-center'>
                        <h3 className='text-[20px]'>{user.firstName} {user.lastName}</h3>
                        <p>mahdi@gmail.com</p>
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center gap-0.5'>
                        <Skeleton height={25} width={170} />
                        <Skeleton height={20} width={120} />
                    </div>
                )}
            </div>
            {/* ====================== bottom section (menus) ======================== */}
            <div>
                <ul className='p-8 flex flex-col gap-y-8 font-[Rokh-light] font-bold text-[18px]'>
                    {links.map(link => (
                        <Link key={link.id} href={link.href} className={`flex items-center gap-x-2.5 pr-2.5  hover:text-primary transition-colors ${pathname === link.href ? "activeSidebarMenu" : ""}`}>
                            {link.icon}
                            {link.title}
                        </Link>
                    ))}
                    <Link href="/login" onClick={logOutHandler} className='flex items-center gap-x-2.5 pr-2.5  hover:text-primary transition-colors'> <CiLogout />خروج</Link>
                </ul>
            </div>
        </div>
    )
}
