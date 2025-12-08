"use client"
import React, { useEffect, useState } from 'react'
import BasketProductBox from '@/Components/BasketProductBox/BasketProductBox'
import AllBasketResult from '@/Components/AllBasketResult/AllBasketResult'
import { getToken } from "@/utils/auth";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BasketPage() {

    const [isUserLogin, setIsUserLogin] = useState(false)
    const [basketItems, setBasketItems] = useState([])
    const [loading, setLoading] = useState(true)
    const token = getToken()

    const getBasketItems = async () => {
        try {
            const res = await fetch("https://backend.sajlab.ir/api/users/info", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()

            const items = Array.isArray(data.result.cartItems)
                ? data.result.cartItems
                : []

            setBasketItems(items)
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    // check users login
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setIsUserLogin(true)
            getBasketItems()
        } else {
            setIsUserLogin(false)
            setLoading(false)
        }

    }, [])

    if (loading) {
        return (
            <div className='flex justify-between lg:items-start sm:items-center lg:flex-row sm:flex-col lg:pr-[108px] lg:pl-[108px] mt-10'>
                <div className='lg:w-[60%] sm:w-[360px] flex flex-col gap-y-7 lg:border border-neutral-400 lg:rounded-[12px] pt-9 pr-6 pl-6 pb-9'>
                    <Skeleton width={150} height={35} />
                    <div className='w-full flex gap-x-4'>
                        <Skeleton width={160} height={224} />
                        <div className='flex flex-col gap-y-2'>
                            <Skeleton width={170} height={35} />
                            <Skeleton width={170} height={30} />
                            <Skeleton width={170} height={30} />
                            <Skeleton width={170} height={30} />
                            <Skeleton width={170} height={50} />
                        </div>
                    </div>
                </div>
                <div className='lg:w-[25%] sm:w-full h-[275px] flex flex-col gap-y-6 lg:border sm:border-y border-neutral-400 lg:rounded-[8px] px-[19px] py-[26px] items-center '>
                    <div className='flex justify-between w-full'>
                        <Skeleton width={120} height={35} />
                        <Skeleton width={120} height={35} />
                    </div>
                    <div className='flex justify-between w-full'>
                        <Skeleton width={120} height={35} />
                        <Skeleton width={120} height={35} />
                    </div>
                    <div className='flex justify-between w-full'>
                        <Skeleton width={120} height={35} />
                        <Skeleton width={120} height={35} />
                    </div>
                    <Skeleton width={270} height={40} />
                </div>
            </div>
        )
    }

    return (
        <>
            {isUserLogin ? (
                <div>
                    <div className='flex justify-between lg:items-start sm:items-center lg:flex-row sm:flex-col lg:pr-[108px] lg:pl-[108px] mt-10'>
                        {/* ========================== right section =========================== */}
                        {basketItems && basketItems.length > 0 ? (
                            <>
                                <div className='lg:w-[60%] sm:w-[360px] flex flex-col gap-y-14 lg:border border-neutral-400 lg:rounded-[12px] pt-9 pr-6 pl-6 pb-9'>
                                    <h6>سبد خرید شما</h6>
                                    {basketItems.map(item => (
                                        <BasketProductBox
                                            key={item.id}
                                            {...item}
                                            token={token}
                                            resetBasket={getBasketItems}
                                        />
                                    ))}
                                </div>

                                {/* =========================== left section =========================== */}
                                <AllBasketResult data={basketItems} token={token} resetBasket={getBasketItems} />
                            </>
                        ) : <div className='flex w-full lg:h-[27vh] sm:h-[200px] justify-center items-center'>
                            <h1 className='lg:text-2xl sm:text-xl'>سبد خرید شما خالی است!</h1>
                        </div>}
                    </div>
                </div>
            ) : (
                <div className='flex lg:h-[31vh] sm:h-[200px] justify-center items-center '>
                    <h1 className='lg:text-2xl sm:text-xl'>برای مشاهده سبد خرید خود ابتدا باید <a href='/login' className='text-primary'> وارد </a>  شوید!</h1>
                </div>
            )}
        </>
    )
}
