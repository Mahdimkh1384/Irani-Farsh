import Link from 'next/link';
import React from 'react'
import { MdOutlineHome, MdArrowBackIos } from "react-icons/md";


export default function Breadcrumb({ links }) {
    return (
        <div className='lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3 mt-5'>
            <ul className='flex items-center gap-x-2'>
                <Link href="/" className='flex gap-x-1.5 items-center text-primary'>
                    <MdOutlineHome className='size-[25px]' />
                    خانه
                    <MdArrowBackIos className='size-[12px] text-neutral-600 font-bold' />
                </Link>
                {links && links.map(link => (
                    <Link href={`/${link.href}`} key={link.id} className='flex gap-x-1.5 items-center text-neutral-600'>
                        {link.title}
                        {link.id !== links.length ? (
                            <MdArrowBackIos className='size-[12px] text-neutral-600 font-bold' />
                        ) : null}
                    </Link>
                ))}
            </ul>
        </div>
    )
}
