import React from 'react'
import Link from 'next/link'

export default function SingleCategoryBox({ title, slug, image }) {
    return (
        <div style={{
            backgroundImage: `linear-gradient(to left, rgba(1,48,117,0.6), rgba(0,0,0,0.1)), url(https://api.iranifarsh.neofy.ir/uploads/category/${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        }} className={'flex items-end lg:w-[420px] lg:h-[288px] sm:w-[340px] inset-0 sm:bg-bottom lg:bg-center bg-cover rounded-2xl hover:shadow shadow-neutral-700 transition-all'} >
            <div className='p-7'>
                <p className='text-white font-[Rokh-light] text-[20px] mb-2'>{title}</p>
                <Link href={`/categories/${slug}`} className='p-2 border border-white text-white font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید {title}</Link>
            </div>
        </div >
    )
}
