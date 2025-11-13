import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import CategorySectionSlug from '@/Components/CategorySectionSlug/CategorySectionSlug'


export default function Slug() {
    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "دسته بندی ها", href: "categories" },
            ]} />
            <CategorySectionSlug />
        </>
    )
}
