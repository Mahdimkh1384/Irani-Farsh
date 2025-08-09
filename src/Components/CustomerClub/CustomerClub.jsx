import Link from 'next/link'
import React from 'react'

export default function CustomerClub() {
    return (
        <div className='flex lg:flex-row sm:flex-col-reverse justify-between items-center lg:pr-[200px] lg:pl-[200px] sm:pr-3 sm:pl-3 lg:mt-25 sm:mt-14'>
            <div className='lg:w-[445px] lg:h-[330px] sm:w-[328px] sm:h-[226px] lg:mt-0 sm:mt-10 text-center flex flex-col justify-between'>
                <h1 className='text-[44px] font-[Rokh-light] lg:font-bold'>عضویت در باشگاه مشتریان <span className='text-primary block'>ایرانی فرش</span></h1>
                <p className='font-[Rokh-light] lg:text-[20px] sm:text-[12px] lg:font-[500] sm:font-[600] mt-5'>با عضویت در باشگاه مشتریان ایرانــی فرش زودتر از تخفیفات با خبر شوید و از امکان تحویل رایگان فرش های خود بهره مند شوید.</p>
                <Link href="/" className='btn w-full h-14 lg:p-0 sm:p-2 lg:mt-0 sm:mt-8'>ایجاد عضویت</Link>
            </div>
            <div>
                <img className='lg:w-[438px] lg:h-[678px] sm:w-[310px] sm:h-[550px]' src="./images/carpet.png" alt="main carpet" />
            </div>
        </div>
    )
}
