import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import CategorySection from '@/Components/CategorySection/CategorySection'

export default function categories() {

    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "دسته بندی ها", href: "categories" }
            ]} />
            <CategorySection />
        </>
    )
}
