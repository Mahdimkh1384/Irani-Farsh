"use client"
import React, { useEffect, useState } from 'react'
import SingleCategoryBox from '@/Components/SingleCategoryBox/SingleCategoryBox'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function page() {

    const [allCategories, setAllCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getCategories = async () => {
        const res = await fetch("https://backend.sajlab.ir/api/categories")
        const data = await res.json()
        if (res.status === 200) {
            setAllCategories(data.data)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "دسته بندی ها", href: "categories" }
            ]} />
            <div className='lg:px-[108px] sm:px-3 mt-10 flex flex-wrap sm:justify-center lg:justify-start gap-5'>
                {isLoading && Array(8).fill(0).map((item, index) => (
                    <div
                        key={index}
                        className="flex items-end lg:w-[420px] lg:h-[288px] sm:w-[340px] rounded-2xl bg-gray-200 overflow-hidden">
                        <div className="p-7 w-full">
                            <Skeleton height={28} width={`60%`} className="mb-2" /> {/* title */}
                            <Skeleton height={40} width={150} /> {/* button */}
                        </div>
                    </div>
                ))}
            </div>
            <div className='lg:px-[108px] sm:px-3 mt-10 flex flex-wrap sm:justify-center lg:justify-start gap-5'>
                {allCategories.map(category => (
                    <SingleCategoryBox key={category.id} {...category} />
                ))}
            </div>
        </>
    )
}
