"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Slug() {
    const params = useParams()
    const [mainCategory, setMainCategory] = useState([])

    const getCategories = async () => {
        const res = await fetch("https://backend.sajlab.ir/api/categories")
        const data = await res.json()

        const filteredCategory = data.data.filter(category => {
            return category.slug.includes(params.slug)
        })

        setMainCategory(filteredCategory)
    }

    const getProducts = async () => {
        const res = await fetch("https://backend.sajlab.ir/api/products")
        const data = await res.json()
        console.log(data.data);
        
    }

    useEffect(() => {
        getCategories()
        getProducts()
    }, [])

    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "دسته بندی ها", href: "categories" },
                { id: 2, title: mainCategory[0]?.title, href: mainCategory[0]?.slug },
            ]} />
            <div className='lg:px-[108px] sm:px-3 mt-7'>
                <h1 className='text-2xl'>{mainCategory.length ? mainCategory[0].title : <Skeleton width="200px" />}</h1>
            </div>
        </>
    )
}
