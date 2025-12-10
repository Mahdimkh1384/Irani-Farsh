import React from 'react';
import { MdSearch, MdOutlineShoppingCart, MdOutlineLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Link from 'next/link';

export default function NavbarDesktop({ user, search, setSearch, onSearch, searchHandler }) {

    return (
        <div className='flex justify-between items-center'>
            {/* ========================= right section ======================== */}
            <div className='flex w-full items-center gap-6 flex-row'>
                <div className='flex items-center gap-x-4'>
                    <Link href="/" className='text-primary text-[24px]'>ایرانی فرش</Link>
                </div>
                <div className='relative'>
                    <MdSearch className='absolute right-2 top-2.5 size-6 text-neutral-600 hover:cursor-pointer' />
                    <input type="text" value={search} placeholder='جستجوی فرش' onChange={e => setSearch(e.target.value)} onKeyDown={e => searchHandler(e)} className='w-[28rem] h-[48px] bg-neutral-200 p-3 pr-10 rounded-[12px] outline-none' />
                    <button className=' absolute left-1 top-1 bg-primary text-white w-[100px] h-[40px] rounded-[8px] font-[Rokh-light] font-bold cursor-pointer transition-colors hover:bg-red-700' onClick={onSearch}>جستجو</button>
                </div>
            </div>

            {/* ========================= left section ======================== */}
            <div className='flex justify-between items-center gap-4 mr-8'>
                <Link href="/basket" className='btn size-12 text-2xl'>
                    <MdOutlineShoppingCart />
                </Link>

                {user ? (
                    <Link href="/my-account"className="btn w-[153px] h-12">
                        <FaRegUser className="text-xl ml-2 text-primary flex-shrink-0" />
                        <span className="text-primary font-semibold">
                            {user.firstName} {user.lastName}
                        </span>
                    </Link>
                ) : (
                    <Link href="/login" className='btn w-[153px] h-12'>
                        <MdOutlineLogin className='text-2xl ml-2' />
                        <span>ورود / ثبت نام</span>
                    </Link>
                )}
            </div>
        </div >
    )
}