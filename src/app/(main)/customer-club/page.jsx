import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import CustomerClubInput from '@/Components/CustomerClubInput/CustomerClubInput'

export default function Customer() {

    
    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "باشگاه مشتریان", href: "customer-club" }
            ]} />
            <div className='lg:px-[108px] sm:px-3 flex flex-col justify-center items-center lg:mt-15 sm:mt-25 gap-y-10'>
                <h1 className='text-primary text-3xl border-b border-neutral-500 p-2.5'>باشگاه مشتریان</h1>
                <CustomerClubInput/>
            </div>
        </>
    )
}

export const metadata = {
    title: "باشگاه مشتریان",
}