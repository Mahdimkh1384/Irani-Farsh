"use client"
import ProductBox from '../ProductBox/ProductBox'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './Slider.css';

// import required modules
import { Navigation , Autoplay } from 'swiper/modules';

export default function Slider() {
    return (
        <div className="lg:pr-[93px] lg:pl-[93px] sm:pr-3 sm:pl-3 mt-7">
            <Swiper
                className=" flex gap-x-6 justify-between"
                spaceBetween={20}       // فاصله بین اسلایدها
                slidesPerView={4}       // چند تا محصول توی یک صفحه نمایش داده بشه
                slidesPerGroup={1}      // با هر حرکت فقط ۱ محصول عوض بشه
                loop={true}             // اسلاید بی‌نهایت
                navigation={true}       // دکمه‌های بعد/قبل
                autoplay={{ delay: 5000 }}
                modules={[Navigation , Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }}
            >
                <SwiperSlide>
                    <ProductBox />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductBox />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductBox />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductBox />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductBox />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductBox />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
