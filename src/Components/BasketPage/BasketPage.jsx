"use client"
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import BasketProductBox from '@/Components/BasketProductBox/BasketProductBox'
import AllBasketResult from '@/Components/AllBasketResult/AllBasketResult'

export default function BasketPage() {

    const [isUserLogin, setIsUserLogin] = useState(false)

    // check users login
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setIsUserLogin(true)
        } else {
            setIsUserLogin(false)
        }
    }, [])

    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "سبد خرید", href: "basket" }
            ]} />
            {isUserLogin ? (
                <div>
                    <div className='flex justify-between lg:items-start sm:items-center lg:flex-row sm:flex-col lg:pr-[108px] lg:pl-[108px] mt-10'>
                        {/* ========================== right section =========================== */}
                        <div className='lg:w-[832px] sm:w-[360px] flex flex-col gap-y-14 lg:border border-neutral-400 lg:rounded-[12px] pt-9 pr-6 pl-6 pb-9'>
                            <h6>سبد خرید شما</h6>
                            <BasketProductBox />
                        </div>
                        {/* =========================== left section =========================== */}
                        <AllBasketResult />
                    </div>
                </div>
            ) : (
                <div className='flex lg:h-[150px] sm:h-[200px] justify-center items-end '>
                    <h1 className='lg:text-2xl sm:text-xl'>برای مشاهده سبد خرید خود ابتدا باید <a href='/login' className='text-primary'> وارد </a>  شوید!</h1>
                </div>
            )}
        </>
    )
}
