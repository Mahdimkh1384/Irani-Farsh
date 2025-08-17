"use client"
import React from 'react'
import { FiPlus } from "react-icons/fi";
import { FaUser, FaRegAddressBook } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function MobileSidebar() {

    const pathname = usePathname();

    const links = [
        { id: 1, title: "حساب کاربری", href: "/my-account", icon: <FaUser /> },
        { id: 2, title: "سبد خرید من", href: "/basket", icon: <MdOutlineShoppingCart /> },
        { id: 3, title: "سفارش های من", href: "", icon: <LuClipboardList /> },
        { id: 4, title: "آدرس ها", href: "", icon: <FaRegAddressBook /> },
        { id: 5, title: "خروج", href: "", icon: <CiLogout /> },
    ]

    return (
        <div className='bg-neutral-50 z-50 fixed top-0 right-0 w-[65%] h-screen border  border-neutral-400'>
            {/* ====================== top section (profile) ========================= */}
            <div className='h-[35%] flex flex-col justify-center items-center gap-y-2 border-b border-neutral-600 bg-[linear-gradient(to_bottom,rgba(255,30,30,0.5),rgba(255,0,0,0.2),rgba(255,255,255,1))]'>
                <div className=' relative'>
                    <img className='size-30 ' src="/images/userIcon.png" alt="profile" />
                    <input type="file" id='fileInput' hidden />
                    <label htmlFor="fileInput" className=' absolute bottom-2 right-3 size-7 rounded-[50%] bg-white flex justify-center items-center hover:cursor-pointer'>
                        <FiPlus className='text-2xl' />
                    </label>
                </div>
                <div className='font-[Rokh-light] font-bold flex flex-col justify-center items-center'>
                    <h3 className='text-[20px]'>مهدی مرامی</h3>
                    <p>mahdi@gmail.com</p>
                </div>
            </div>
            {/* ====================== bottom section (menus) ======================== */}
            <ul className='p-5 mt-3 flex flex-col gap-y-8 font-[Rokh-light] font-bold text-[18px]'>
                {links.map(link => (
                    <Link key={link.id} href={link.href} className={`flex items-center gap-x-2.5 pr-2.5  hover:text-primary transition-colors ${pathname === link.href ? "activeSidebarMenu" : ""}`}>
                        {link.icon}
                        {link.title}
                    </Link>
                ))}
            </ul>
        </div>
    )
}
