"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdArrowBackIos } from "react-icons/md";

export default function MobileMenu() {

    const [isShowCategoryForMobile, setIsShowCategoryForMobile] = useState(false)
    const [allCategories, setAllCategories] = useState([])

    const getCategories = async () => {
        const res = await fetch("https://backend.sajlab.ir/api/categories")
        const data = await res.json()
        setAllCategories(data.data)
    }

    useEffect(() => {
        getCategories()
    })

    return (
        <div className=' absolute bg-neutral-100 shadow top-0 right-0 w-[65%] h-screen z-50 '>
            <div className='flex justify-center items-center border-b h-17'>
                <h3 className=' text-2xl text-primary'>ایرانی فرش</h3>
            </div>
            <div className='p-4'>
                <ul className='flex flex-col gap-y-4 font-bold font-[Rokh-light]' >
                    <Link href="/" className='activeMobileMenu p-2'>صفحه اصلی</Link>
                    <li className='p-2' onClick={() => setIsShowCategoryForMobile(prev => !prev)}>
                        <div className='flex items-center gap-x-1'>
                            دسته بندی
                            <MdArrowBackIos className={`${isShowCategoryForMobile ? ' -rotate-90 transition-transform' : ' rotate-0 transition-transform'}`} />
                        </div>
                        {isShowCategoryForMobile && <ul className='flex flex-col gap-y-3.5 p-2.5 mt-2 text-neutral-700'>
                            {allCategories.map(category => (
                                <Link key={category.id} href={category.slug}>{category.title}</Link>
                            ))}
                        </ul>}
                    </li>
                    <Link href="/" className='p-2'>تماس با ما</Link>
                    <Link href="/about-us" className='p-2'>درباره ما</Link>
                </ul>
            </div>
        </div >
    )
}
