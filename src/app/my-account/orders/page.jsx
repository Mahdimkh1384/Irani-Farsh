"use client"
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Page() {

    const { userInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(true)

    const calcFinalPrice = (item) => {
        const price = Number(item.product.price);
        const discount = item.product.discount || 0;
        const quantity = item.quantity;

        const discountedPrice = price - (price * discount / 100);

        return discountedPrice * quantity;
    };

    useEffect(() => {
        if (userInfo) {
            setLoading(false)
        }
    }, [userInfo])

    if (loading) {

    }

    return (
        <div className="lg:mt-14 sm:mt-10">
            <h2 className="text-2xl">سفارش‌های من</h2>
            {loading ? (
                <div className="pt-6 space-y-4">
                    {Array(4).fill(0).map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white border border-neutral-400 rounded-xl p-2 shadow-sm">
                            {/* عکس */}
                            <div className="w-[55px] h-[55px]">
                                <Skeleton className="w-full h-full" />
                            </div>

                            {/* عنوان */}
                            <div className="w-[40%] h-[35px] sm:w-[150px]">
                                <Skeleton className="w-full h-full" />
                            </div>

                            {/* قیمت */}
                            <div className="lg:w-[150px] h-[50px] sm:w-[100px]">
                                <Skeleton className="w-full h-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                userInfo.orders ? (
                    userInfo.orders.map((item) => (
                        <div key={item.id} className="pt-6 space-y-4">
                            <div className="flex items-center justify-between bg-white border border-neutral-400 rounded-xl p-3 shadow-sm hover:bg-red-50 hover:border-red-400 transition cursor-pointer">

                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <Link href={`/product/${item.product.id}`} className="rounded-md overflow-hidden border border-gray-300">
                                        <Image
                                            width={40}
                                            height={40}
                                            src={`https://api.iranifarsh.neofy.ir/uploads/product/${item.product.images[0]}`}
                                            className="w-full h-full object-cover"
                                            alt="order-picture"
                                        />
                                    </Link>
                                </div>

                                <span className="flex-1 text-center font-bold text-gray-700">
                                    {item.product.title}
                                </span>

                                <div className="flex gap-x-4 items-center">
                                    <div className="flex flex-col items-center">
                                        {/* قیمت نهایی پس از تخفیف */}
                                        <span className="text-gray-700 text-sm font-bold">
                                            {calcFinalPrice(item).toLocaleString()} تومان
                                        </span>

                                        {/* نمایش قیمت بدون تخفیف (اختیاری) */}
                                        {item.product.discount > 0 && (
                                            <span className="text-red-500 text-xs line-through">
                                                {Number(item.product.price).toLocaleString()}
                                            </span>
                                        )}

                                        {/* نمایش تعداد */}
                                        <span className="text-gray-500 text-xs">
                                            تعداد: {item.quantity}
                                        </span>
                                    </div>

                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[40vh] flex justify-center items-center">
                        <p className="text-2xl text-primary">هیچ سفارشی وجود ندارد</p>
                    </div>
                )
            )}

        </div>
    );
}
