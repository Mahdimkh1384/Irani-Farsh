"use client"
import React, { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";

export default function ProductSort({productSort}) {

    const [isShowSorts, setIsShowSorts] = useState(false)
    const [sort, setSort] = useState("مرتب سازی بر اساس...")

    const sortValue = [
        { id: 1, title: "گران ترین ها", value: "expensive" },
        { id: 2, title: "ارزان ترین ها", value: "cheap" },
        { id: 3, title: "جدید ترین ها", value: "new" },
        { id: 4, title: "قدیمی ترین ها", value: "old" },
    ]

    const changeSort = ( title , value) => {
        setSort(title)
        setIsShowSorts(false)
        productSort(value)
    }
    return (
        <div className='lg:px-[108px] sm:px-3 my-7 flex sm:justify-center lg:justify-start'>
            <div className='relative lg:w-[200px] sm:w-[287px] font-[Rokh-light] font-bold select-none'>
                <div onClick={() => setIsShowSorts(prev => !prev)} className='flex justify-between items-center border border-primary rounded-[8px] p-2 cursor-pointer transition-transform duration-100 ease-in-out origin-center active:scale-98'>
                    <p>{sort}</p>
                    <IoMdArrowDropdown />
                </div>
                {isShowSorts && <ul className='absolute w-full top-11 bg-white border border-primary rounded-[8px] text-[18px]'>
                    {sortValue.map(sort => (
                        <li onClick={() => changeSort(sort.title , sort.value)} key={sort.id} className='hover:bg-red-200 p-2 rounded-[8px] transition-colors cursor-pointer'>{sort.title}</li>
                    ))}
                </ul>}
            </div>
        </div>
    )
}
