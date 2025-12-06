import Link from 'next/link';
import React from 'react'
import { MdArrowBack } from "react-icons/md";

export default function SectionHeader({title , href}) {
    return (
        <div className='flex justify-between items-center lg:pr-[108px] lg:pl-[108px] sm:pr-3 pl-3 lg:mt-25 sm:mt-20 '>
            <h4 className='lg:text-2xl sm:text-[20px]'>{title}</h4>
            <Link href={href} className='btn lg:w-[165px] lg:h-12 sm:w-[150px] sm:h-9 gap-x-2.5'>
                مشاهده همه
                <MdArrowBack className='text-2xl'/>
            </Link>
        </div>
    )
}
