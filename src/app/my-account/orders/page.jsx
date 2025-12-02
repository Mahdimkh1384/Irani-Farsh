"use client"
import { CheckCircle, } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext';



export default function Page() {

    const { userInfo, getUserInfo, token } = useContext(UserContext);

    const [localUser, setLocalUser] = useState(null);

    useEffect(() => {
        if (userInfo) {
            setLocalUser(userInfo);
        }
    }, [userInfo])
    console.log("userinfo", userInfo);


    return (
        <div className="lg:mt-14 sm:mt-10">
            <h2 className="text-2xl">سفارش‌های من</h2>
            {localUser?.cartItems?.map((item) => (
                <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between bg-white border border-neutral-400 rounded-xl p-3 shadow-sm hover:bg-red-50 hover:border-red-400 transition cursor-pointer">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Link href={`/products/${item.product.id}`} className="rounded-md overflow-hidden border border-gray-300">
                                <Image width={40} height={40} src={`https://backend.sajlab.ir/uploads/product/${item.product.images[0]}`} className="w-full h-full object-cover" alt="order-picture" />
                            </Link>
                        </div>
                        <span className="flex-1 text-center font-bold text-gray-700">
                            {item.product.title}
                        </span>
                        <div className="flex gap-3">
                            <span className="text-gray-700 text-sm">{item.product.price}تومان</span>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
