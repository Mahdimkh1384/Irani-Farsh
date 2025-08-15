import React from 'react'
import UserDetailBox from '../UserDetailBox/UserDetailBox'
import { CgMenuGridO } from "react-icons/cg";

import Link from 'next/link'

export default function Header() {
    return (
            <div className='lg:h-30 sm:h-60 lg:flex-row flex justify-between items-center bg-neutral-50 border rounded-[10px] border-neutral-400'>
                {/* ================= right section ================ */}
                <div className='p-8'>
                    <Link href='/' className='text-3xl text-primary'>ایرانی فرش</Link>
                </div>
                {/* ================= left section ================ */}
                <div className='flex gap-x-3 p-8'>
                    <UserDetailBox/>
                    <UserDetailBox/>
                    <UserDetailBox/>
                </div>
            </div>
    )
}
