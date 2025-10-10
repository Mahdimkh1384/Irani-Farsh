import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import BasketProductBox from '@/Components/BasketProductBox/BasketProductBox'
import AllBasketResult from '@/Components/AllBasketResult/AllBasketResult'

export default function Basket() {
    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "سبد خرید", href: "basket" }
            ]} />
            <div className='flex justify-between lg:items-start sm:items-center lg:flex-row sm:flex-col lg:pr-[108px] lg:pl-[108px] mt-10'>
                {/* ========================== right section =========================== */}
                <div className='lg:w-[832px] sm:w-[360px] flex flex-col gap-y-14 lg:border border-neutral-400 lg:rounded-[12px] pt-9 pr-6 pl-6 pb-9'>
                    <h6>سبد خرید شما</h6>
                    <BasketProductBox />
                </div>
                {/* =========================== left section =========================== */}
                <AllBasketResult />
            </div>
        </>
    )
}

export const metadata = {
    title: "سبد خرید",
}