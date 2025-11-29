import React from 'react'

export default function UserDetailBox({title , shortTitle , icon , data}) {
    return (
        <div className='bg-white lg:w-[200px] sm:w-[48%] lg:p-0 sm:px-2 h-25 flex items-center justify-center gap-x-2.5 border border-neutral-300 rounded-[8px] shadow'>
            <span className='lg:text-5xl sm:text-3xl text-primary'>{icon}</span>
            <div className='font-[Rokh-light] font-bold'>
                <p>{data?.toLocaleString()} {shortTitle}</p>
                <p className='sm:text-xs lg:text-[13px] text-neutral-600'>{title}</p>
            </div>
        </div>
    )
}
