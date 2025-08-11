import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className='lg:px-[108px] sm:px-3 flex flex-col items-center gap-y-4 lg:mt-2 sm:mt-10'>
            <img className='lg:w-[700px]  lg:h-[450px] sm:h-[350px] sm:w-[600px]' src="/images/not-found.png" alt="not found" />
            <h1 className='text-4xl font-[Rokh-light] font-bold'>صفحه مورد نظر پیدا نشد</h1>
            <Link href="/" className='btn w-[200px] h-[40px]'>صفحه اصلی</Link>
        </div>
    )
}
