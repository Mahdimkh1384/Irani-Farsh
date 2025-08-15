import React from 'react'
import { TfiCommentAlt } from "react-icons/tfi";


export default function UserDetailBox() {
    return (
        <div className='bg-white w-[200px] h-25 flex items-center justify-center gap-x-2.5 border border-neutral-300 rounded-[8px] shadow'>
            <TfiCommentAlt className='text-5xl text-primary'/>
            <div className='font-[Rokh-light] font-bold'>
                <p>0 دیدگاه</p>
                <p className='text-neutral-600'>دیدگاه ها و نظرات</p>
            </div>
        </div>
    )
}
