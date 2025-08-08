import Link from 'next/link';
import React from 'react'
import { MdArrowBack } from "react-icons/md";

export default function SectionHeader({title}) {
    return (
        <div className='flex justify-between pr-[108px] pl-[108px] mt-25'>
            <h4 className='text-2xl'>{title}</h4>
            <Link href="/" className='btn w-[165px] h-12 gap-x-2.5'>
                مشاهده همه
                <MdArrowBack className='text-2xl'/>
            </Link>
        </div>
    )
}
