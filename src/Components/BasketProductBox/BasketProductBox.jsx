import React, { useEffect, useState, useRef } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function BasketProductBox({ quantity, product, token, resetBasket }) {

    const { id, title, price, images, discount } = product

    const [isCountOverOne, setIsCountOverOne] = useState(false)
    const [count, setCount] = useState(quantity)
    const timerRef = useRef(null)
    const discountPercent = Number(discount) || 0;
    const discountPrice = (price * discountPercent) / 100;

    useEffect(() => {
        if (count > 1) {
            setIsCountOverOne(true)
        } else {
            setIsCountOverOne(false)
        }
    }, [count])

    const updateQuantity = async (newCount) => {
        try {
            const res = await fetch("https://backend.sajlab.ir/api/cart-items", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: newCount
                })
            })

            const data = await res.json()

            if (data.success) resetBasket()
        } catch (err) {
            console.log(err)
        }
    }

    const addCount = () => {
        setCount(prev => {
            const newCount = prev + 1

            if (timerRef.current) clearTimeout(timerRef.current)

            timerRef.current = setTimeout(() => updateQuantity(newCount), 1000)

            return newCount
        })
    }

    const minusCount = () => {
        setCount(prev => {
            const newCount = prev - 1

            if (timerRef.current) clearTimeout(timerRef.current)

            timerRef.current = setTimeout(() => updateQuantity(newCount), 1000)

            return newCount
        })
    }

    const removeItem = async () => {
        try {
            const res = await fetch("https://backend.sajlab.ir/api/cart-items", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: 0
                })
            })

            const data = await res.json()
            if (data.success) {
                resetBasket()
                toast.success("محصول با موفقیت از سبد خرید حذف شد")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className=' sm:relative lg:static lg:w-[507px] lg:h-[226px] sm:w-[312px] sm:h-[310px] flex lg:gap-x-6 sm:gap-6'>
            {/* ====================== right section ===================== */}
            <Link href={`/product/${id}`}>
                <Image width={160} height={235} className='w-[160px] h-[224px]' src={`https://backend.sajlab.ir/uploads/product/${images[0]}`} alt="basket-carpet" />
            </Link>
            {/* ====================== left section ===================== */}
            <div className='flex lg:justify-between flex-col lg:gap-y-3.5 sm:gap-y-5 font-[Rokh-light]'>
                <h5 className='font-bold lg:text-[20px] sm:text-[16px]'>{title}</h5>
                <p className='font-[500]'>رنگ : آبی</p>
                <p className='font-[500]'>شرکت فرش سهند</p>
                {discount ? (
                    <div className='flex gap-x-6'>
                        <p>قیمت:</p>
                        <div className='flex gap-x-2 lg:flex-row sm:flex-col'>
                            <h5 className='font-bold'>{((Number(price - discountPrice) * count)).toLocaleString()} تومان </h5>
                            <p className='font-bold text-neutral-400'><s>{(Number(price) * count).toLocaleString()} تومان</s></p>
                        </div>
                    </div>
                ) : (
                    <div className='flex gap-x-6'>
                        <p>قیمت:</p>
                        <h5 className='font-bold'>{(Number(price) * count).toLocaleString()} تومان </h5>
                    </div>
                )}
                {/* ==================== product count ================== */}
                <div className=' sm:absolute lg:static bottom-0 right-4 flex justify-around items-center w-[125px] h-[59px] border border-neutral-400 rounded-[8px] font-bold'>
                    <FaPlus className='text-primary text-[16px] hover:cursor-pointer transition-all duration-150 active:scale-85' onClick={addCount} />
                    <div className='flex flex-col '>
                        <span className='text-center text-[20px] select-none'>{count}</span>
                        <p className='text-[14px] select-none'>تعداد</p>
                    </div>
                    {isCountOverOne ? (
                        <FaMinus className='text-primary text-[16px] hover:cursor-pointer transition-all duration-150 active:scale-85' onClick={minusCount} />
                    ) : (
                        <LuTrash className='text-primary text-[16px] hover:cursor-pointer transition-all duration-150 active:scale-85' onClick={removeItem} />
                    )}
                </div>
            </div>
        </div>
    )
}
