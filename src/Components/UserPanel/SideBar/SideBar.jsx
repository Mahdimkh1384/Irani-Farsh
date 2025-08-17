import React from 'react'
import { FiPlus } from "react-icons/fi";
import {FaUser , FaRegAddressBook  } from "react-icons/fa";
import {MdOutlineShoppingCart } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";
import Link from 'next/link';





export default function SideBar() {
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
                <div className='font-[Rokh-light] font-bold flex flex-col justify-center items-center'>
                    <h3 className='text-[20px]'>مهدی مرامی</h3>
                    <p>mahdi@gmail.com</p>
                </div>
            </div>
            {/* ====================== bottom section (menus) ======================== */}
            <div>
                <ul className='p-8 flex flex-col gap-y-8 font-[Rokh-light] font-bold text-[18px]'>
                    <Link href='' className='flex items-center gap-x-2.5 pr-2.5 activeSidebarMenu hover:text-primary transition-colors'>
                        <FaUser/>
                        حساب کاربری
                    </Link>
                    <Link href='/basket' className='flex items-center gap-x-2.5 pr-2.5 hover:text-primary transition-colors'>
                        <MdOutlineShoppingCart/>
                        سبد خرید من
                    </Link>
                    <Link href='' className='flex items-center gap-x-2.5 pr-2.5 hover:text-primary transition-colors'>
                        <LuClipboardList/>
                        سفارش های من
                    </Link>
                    <Link href='' className='flex items-center gap-x-2.5 pr-2.5 hover:text-primary transition-colors'>
                        <FaRegAddressBook/>
                        آدرس  ها
                    </Link>
                    <Link href='' className='flex items-center gap-x-2.5 pr-2.5 hover:text-primary transition-colors'>
                        <FaRegCommentDots/>
                        دیدگاه ها و نظرات
                    </Link>
                    <Link href='/' className='flex items-center gap-x-2.5 pr-2.5 hover:text-primary transition-colors'>
                        <CiLogout/>
                        خروج
                    </Link>
                </ul>
            </div>
        </div>
    )
}
