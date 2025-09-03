import React from 'react'
import { TfiCommentAlt } from "react-icons/tfi";


export default function UserDetailBox() {
    return (
        <div className='bg-white lg:w-[200px] sm:w-[155px] lg:p-0 sm:px-2 h-25 flex items-center justify-center gap-x-2.5 border border-neutral-300 rounded-[8px] shadow'>
            <TfiCommentAlt className='lg:text-5xl sm:text-4xl text-primary'/>
            <div className='font-[Rokh-light] font-bold'>
                <p>0 دیدگاه</p>
                <p className='sm:text-xs lg:text-[13px] text-neutral-600'>دیدگاه ها و نظرات</p>
            </div>
        </div>
    )
}
