import React from 'react';
import { MdSearch, MdOutlineShoppingCart, MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import Link from 'next/link';

export default function NavbarMobile({ user, search, setSearch, onSearch, searchHandler, setIsShowMobileMenu }) {

    return (
        <div className='flex flex-col'>
            {/* ========================= top section ======================== */}
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-4'>
                    <button className='size-10 rounded-[8px] bg-neutral-300 p-3' onClick={() => setIsShowMobileMenu(true)}><IoMdMenu /></button>
                    <Link href="/" className='text-primary text-[24px]'>ایرانی فرش</Link>
                </div>
                <div className='flex justify-between items-center gap-4 mr-8'>
                    <Link href="/basket" className='btn size-12 text-2xl'>
                        <MdOutlineShoppingCart />
                    </Link>

                    {user ? (
                        <Link href="/my-account" className="btn size-12">
                            <FaRegUser className="text-xl text-primary flex-shrink-0" />
                        </Link>
                    ) : (
                        <Link href="/login" className='btn size-12'>
                            <MdOutlineLogin className='text-2xl' />
                        </Link>
                    )}
                </div>
            </div>
            {/* ========================= bottom section ======================== */}
            <div>
                <div className='relative'>
                    <MdSearch className='absolute right-2 lg:top-2.5 sm:top-7.5 size-6 text-neutral-600 hover:cursor-pointer' />
                    <input type="text" value={search} placeholder='جستجوی فرش' onChange={e => setSearch(e.target.value)} onKeyDown={e => searchHandler(e)} className='w-full h-[48px] bg-neutral-200 p-3 pr-10 rounded-[12px] outline-none mt-5' />
                    <button className=' absolute top-6 left-1 bg-primary text-white h-[40px] w-[90px] rounded-[8px] font-[Rokh-light] font-bold cursor-pointer hover:bg-red-700' onClick={onSearch}>جستجو</button>
                </div>
            </div>
        </div >
    )
}
