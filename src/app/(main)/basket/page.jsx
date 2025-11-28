import React from 'react'
import BasketPage from '@/Components/BasketPage/BasketPage'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'

export default function Basket() {
    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "سبد خرید", href: "basket" }
            ]} />
            <BasketPage />
        </>
    )
}

export const metadata = {
    title: "سبد خرید",
}