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
import { Navigation } from 'swiper/modules';

export default function Slider() {
    return (
        <div className="pr-[93px] pl-[93px] mt-7">
            <Swiper
                className=" flex gap-x-6 justify-between"
                spaceBetween={20}       // فاصله بین اسلایدها
                slidesPerView={4}       // چند تا محصول توی یک صفحه نمایش داده بشه
                slidesPerGroup={1}      // با هر حرکت فقط ۱ محصول عوض بشه
                loop={true}             // اسلاید بی‌نهایت
                navigation={true}       // دکمه‌های بعد/قبل
                modules={[Navigation]}
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
