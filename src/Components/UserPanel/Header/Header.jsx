"use client"
import React, { useState , useEffect , useRef } from 'react'
import UserDetailBox from '../UserDetailBox/UserDetailBox'
import { CgMenuGridO } from "react-icons/cg";
import MobileSidebar from '../MobileSideBar/MobileSidebar';
import Link from 'next/link'

export default function Header() {

    const [isShowMobileSidebar, setIsShowMobileSidebar] = useState(false)

    const menuRef = useRef(null);
    // close mobile menu to click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isShowMobileSidebar &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsShowMobileSidebar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShowMobileSidebar]);

    return (
        <>
            {isShowMobileSidebar && <div ref={menuRef}><MobileSidebar /></div>}
            <div className=' lg:flex-row sm:flex-col flex justify-between items-center bg-neutral-50 border rounded-[10px] border-neutral-400'>
                {/* ================= right section ================ */}
                <div className='lg:p-8 sm:p-5 flex items-center justify-between w-full'>
                    <CgMenuGridO className='lg:hidden sm:inline text-4xl' onClick={() => setIsShowMobileSidebar(true)} />
                    <Link href='/' className='text-3xl text-primary'>ایرانی فرش</Link>
                </div>
                {/* ================= left section ================ */}
                <div className='flex sm:flex-wrap lg:flex-nowrap justify-center gap-3  p-3'>
                    <UserDetailBox />
                    <UserDetailBox />
                    <UserDetailBox />
                    <UserDetailBox />
                </div>
            </div>
        </>
    )
}
