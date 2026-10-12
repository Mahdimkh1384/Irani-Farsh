"use client"
import ProductBox from '../ProductBox/ProductBox'
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import 'swiper/css';
import 'swiper/css/navigation';

import './Slider.css';

import { Navigation, Autoplay } from 'swiper/modules';

function SliderSkeleton() {
    return (
        <div className="flex gap-6 justify-between overflow-x-auto">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='flex flex-col justify-center gap-y-6 w-[287.5px] h-[493px] p-4 rounded-[12px] border border-neutral-300 flex-shrink-0'>
                    <Skeleton height={261} width={255} borderRadius={12} />
                    <Skeleton count={2} height={20} />
                    <Skeleton height={40} width={255} />
                </div>
            ))}
        </div>
    );
}

export default function Slider({ category }) {

    const [mainProducts, setMainProducts] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const [loading, setLoading] = useState(true)

    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://api-iranifarsh.gawyhub.online/categories/${category}`);
            const data = await res.json();
            setMainProducts(data.data.products || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setIsMounted(true);
        getProducts();
    }, [])

    if (!isMounted || loading) {
        return (
            <div className="lg:pr-[93px] lg:pl-[93px] sm:pr-3 sm:pl-3 mt-7">
                <SliderSkeleton />
            </div>
        );
    }

    return (
        <div className="lg:pr-[93px] lg:pl-[93px] sm:pr-3 sm:pl-3 mt-7">
            <Swiper
                className="flex gap-x-6 justify-between"
                spaceBetween={20}
                slidesPerView={4}
                slidesPerGroup={1}
                loop={mainProducts.length > 0}
                navigation={true}
                autoplay={{ delay: 7000 }}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 10 },
                    1024: { slidesPerView: 4, spaceBetween: 20 }
                }}
            >
                {mainProducts.slice(0, 6).map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductBox {...product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
