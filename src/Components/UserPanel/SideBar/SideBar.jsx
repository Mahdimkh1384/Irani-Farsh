"use client"
import React, { useState, useEffect } from 'react'
import { FiPlus } from "react-icons/fi";
import { FaUser, FaRegAddressBook } from "react-icons/fa";
import { MdOutlineShoppingCart, MdEdit } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from "@/utils/auth";
import { getUserData, isAuthenticated } from "@/utils/auth";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useContext } from 'react';
import { UserContext } from '../../../../Contexts/UserContext';
import Image from 'next/image';

export default function SideBar() {

    const { userInfo, getUserInfo, token } = useContext(UserContext);
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
        { id: 4, title: "آدرس ها", href: "/my-account/addresses", icon: <FaRegAddressBook /> },
    ];

    const logOutHandler = () => {
        logout()
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("https://api.iranifarsh.neofy.ir/users/profileImage", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                getUserInfo()
            }

        } catch (err) {
            console.log("Upload error:", err);
        }
    }

    return (
        <div className='lg:inline sm:hidden bg-neutral-50 fixed w-[25%] h-[95vh] border rounded-[10px] border-neutral-400'>
            {/* ====================== top section (profile) ========================= */}
            <div className='h-[40%] flex flex-col justify-center items-center gap-y-2 border-b border-neutral-600 rounded-t-[10px] bg-[linear-gradient(to_bottom,rgba(255,30,30,0.5),rgba(255,0,0,0.2),rgba(255,255,255,1))]'>
                <div className=' relative'>
                    <Image width={140} height={140} className='size-35 rounded-[50%]' src={userInfo?.profileImage ? `https://api.iranifarsh.neofy.ir/uploads/user/${userInfo?.profileImage}` : "/images/userIcon.png"} alt="profile" />
                    <input type="file" id='fileInput' hidden onChange={handleUpload} />
                    <label htmlFor="fileInput" className=' absolute bottom-0 right-3 size-9 rounded-[50%] bg-white flex justify-center items-center hover:cursor-pointer'>
                        {userInfo?.profileImage ? <MdEdit className='text-2xl' /> : <FiPlus className='text-2xl' />}
                    </label>
                </div>
                {user ? (
                    <div className='font-[Rokh-light] font-bold flex flex-col justify-center items-center'>
                        <h3 className='text-[20px]'>{userInfo.firstName} {userInfo.lastName}</h3>
                        <p>{userInfo.email}</p>
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
