"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CategoryBox({ firstItem, lastItem }) {

    const [allCategory, setAllCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getCategory = async () => {
        const res = await fetch("https://backend.sajlab.ir/api/categories")
        const data = await res.json()

        const mainCategories = data.data.slice(firstItem, lastItem)

        setAllCategory(mainCategories)
        setIsLoading(false)
    }

    useEffect(() => {
        getCategory()
    }, [])

    return (
        <>
            {isLoading ? (
                <>
                    <div className='flex lg:flex-row sm:flex-col lg:gap-x-6 sm:gap-y-2.5 items-center justify-between lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3 mt-25'>
                        <div
                            className="flex items-end  flex-2 lg:h-[288px] sm:w-[340px] rounded-2xl bg-gray-200 overflow-hidden">
                            <div className="p-7 w-full">
                                <Skeleton height={28} width={`60%`} className="mb-2" /> {/* title */}
                                <Skeleton height={40} width={150} /> {/* button */}
                            </div>
                        </div>
                        <div
                            className="flex items-end  flex-2 lg:h-[288px] sm:w-[340px] rounded-2xl bg-gray-200 overflow-hidden">
                            <div className="p-7 w-full">
                                <Skeleton height={28} width={`60%`} className="mb-2" /> {/* title */}
                                <Skeleton height={40} width={150} /> {/* button */}
                            </div>
                        </div>
                        <div className='flex items-center flex-1/6 flex-col lg:gap-y-6 sm:gap-y-2.5'>
                            <div className="flex items-end lg:w-full h-[132px] sm:w-[340px] rounded-2xl bg-gray-200 overflow-hidden">
                                <div className="p-7 w-full">
                                    <Skeleton height={20} width={`50%`} className="mb-2" /> {/* title */}
                                    <Skeleton height={36} width={140} /> {/* button */}
                                </div>
                            </div>
                            <div className="flex items-end lg:w-full h-[132px] sm:w-[340px] rounded-2xl bg-gray-200 overflow-hidden">
                                <div className="p-7 w-full">
                                    <Skeleton height={20} width={`50%`} className="mb-2" /> {/* title */}
                                    <Skeleton height={36} width={140} /> {/* button */}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='flex lg:flex-row sm:flex-col lg:gap-x-6 sm:gap-y-2.5 items-center justify-between lg:pr-[108px] lg:pl-[108px] sm:pr-3 sm:pl-3 mt-25'>
                    <div style={{
                        backgroundImage: `linear-gradient(to left, rgba(1,48,117,0.6), rgba(0,0,0,0.1)), url(https://backend.sajlab.ir/uploads/category/${allCategory[0]?.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }} className={'flex items-end flex-2 lg:h-[288px] sm:w-[340px] inset-0 sm:bg-bottom lg:bg-center bg-cover rounded-2xl hover:shadow shadow-neutral-700 transition-all'}>
                        <div className='p-7'>
                            <p className='text-white font-[Rokh-light] font-bold text-[20px] mb-2'>{allCategory[0]?.title}</p>
                            <Link href={`/categories/${allCategory[0]?.slug || "/"}`} className='p-2 border border-white text-white bg-white/10 font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید {allCategory[0]?.title}</Link>
                        </div>
                    </div>
                    <div style={{
                        backgroundImage: `linear-gradient(to left, rgba(1,48,117,0.6), rgba(0,0,0,0.1)), url(https://backend.sajlab.ir/uploads/category/${allCategory[1]?.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }} className={'flex items-end flex-2 lg:h-[288px] sm:w-[340px] inset-0 sm:bg-bottom lg:bg-center bg-cover rounded-2xl hover:shadow shadow-neutral-700 transition-all'}>
                        <div className='p-7'>
                            <p className='text-white font-[Rokh-light] font-bold text-[20px] mb-2'>{allCategory[1]?.title}</p>
                            <Link href={`/categories/${allCategory[1]?.slug || "/"}`} className='p-2 border border-white text-white bg-white/10 font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید {allCategory[1]?.title}</Link>
                        </div>
                    </div>
                    <div className='flex items-center flex-1/6 flex-col lg:gap-y-6 sm:gap-y-2.5'>
                        <div style={{
                            backgroundImage: `linear-gradient(to left, rgba(1,48,117,0.6), rgba(0,0,0,0.1)), url(https://backend.sajlab.ir/uploads/category/${allCategory[2]?.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }} className=' flex items-end lg:w-full h-[132px] sm:w-[340px] inset-0 bg-bottom bg-cover rounded-2xl hover:shadow shadow-neutral-700 transition-all'>
                            <div className='p-7'>
                                <p className='text-white font-[Rokh-light] font-bold text-[20px] mb-2'>{allCategory[2]?.title}</p>
                                <Link href={`/categories/${allCategory[2]?.slug || "/"}`} className='p-2 border border-white text-white bg-white/10 font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید {allCategory[2]?.title} </Link>
                            </div>
                        </div>
                        <div style={{
                            backgroundImage: `linear-gradient(to left, rgba(1,48,117,0.6), rgba(0,0,0,0.1)), url(https://backend.sajlab.ir/uploads/category/${allCategory[3]?.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }} className=' flex items-end lg:w-full h-[132px] sm:w-[340px] inset-0 bg-bottom bg-cover rounded-2xl hover:shadow shadow-neutral-700 transition-all'>
                            <div className='p-7'>
                                <p className='text-white font-[Rokh-light] font-bold text-[20px] mb-2'>{allCategory[3]?.title}</p>
                                <Link href={`/categories/${allCategory[3]?.slug || "/"}`} className='p-2 border border-white text-white bg-white/10 font-[Rokh-light] text-[18px] rounded-xl hover:cursor-pointer'>مشاهده و خرید {allCategory[3]?.title}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
