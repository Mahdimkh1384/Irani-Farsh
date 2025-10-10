import React from 'react'
import SearchSection from '@/Components/SearchSection/SearchSection'

export default function Search() {
    return (
        
            <div className='lg:px-[108px] sm:px-3 mt-5'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-2xl text-primary border-b p-2 border-neutral-500'>نتایج جستجو</h1>
                </div>
                {/* products 👇 */}
                <SearchSection />
            </div>
    )
}

export const metadata = {
    title: "جستجو",
}