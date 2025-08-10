import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'

export default function Basket() {
    return (
        <div>
            <Breadcrumb links={[
                {id: 1 , title: "سبد خرید" , href: "basket"}
            ]}/>
        </div>
    )
}
