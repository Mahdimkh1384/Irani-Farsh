import ProductGallery from '@/Components/ProductsGallery/productgallery'
import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import ProductSpecs from '@/Components/ProductSpecs/ProductSpecs'
import PurchaseBox from '@/Components/PurchaseBox/PurchaseBox'
import Slider from '@/Components/Slider/Slider'
import Reviews from '@/Components/Reviews/review'

export default function Products() {
    return (
        <>
            <Breadcrumb links={[
                {id : 1 , title : 'ماهساره' , href: "products"}
            ]}/>
            <div className='flex lg:flex-row pt-[50px] lg:pr-[108px] lg:pl-[108px] justify-between sm:flex-col'>
                <div className=' lg:w-[30%] sm:w-[100%]'>
                    <ProductGallery />
                </div>
                <div className='flex justify-center'>
                    <ProductSpecs />
                </div>
                <div className="flex justify-center lg:w-[25%] lg:pt-0 sm:pt-8">
                    <div className='flex justify-center items-center lg:w-[100%] sm:w-[95%]'>
                        <PurchaseBox status="متوسط" />
                    </div>
                </div>
            </div>
            <div className='lg:pr-[108px] lg:pl-[108px] pt-20 flex flex-col gap-10'>
                <h1 className='text-2xl'>
                    فرش های مشابه
                </h1>
            </div>
            <Slider />
            <div>
                <Reviews />
            </div>
        </>
    )
}