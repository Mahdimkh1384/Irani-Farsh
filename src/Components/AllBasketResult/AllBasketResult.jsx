import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function AllBasketResult({ data, token, resetBasket }) {

    const [allPrice, setAllPrice] = useState(0)
    const [allCount, setAllCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const totalCount = data.reduce((sum, item) => sum + item.quantity, 0);

        const totalPrice = data.reduce((sum, item) => {
            const price = Number(item.product.price);
            const discount = Number(item.product.discount) || 0;

            const finalPrice = discount > 0
                ? price - (price * discount / 100)
                : price;

            return sum + finalPrice * item.quantity;
        }, 0);

        setAllCount(totalCount);
        setAllPrice(totalPrice);
    }, [data]);


    const buyProductsHandler = async () => {
        try {
            setLoading(true)
            const res = await fetch("https://api.iranifarsh.neofy.ir/cart-items/order", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            const data = await res.json()
            if (data.success) {
                setLoading(false)
                resetBasket()
                toast.success("خرید شما با موفقیت انجام شد")
            }
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className='lg:w-[25%] sm:w-full h-[275px] flex flex-col gap-y-8 lg:border sm:border-y border-neutral-400 lg:rounded-[8px] px-[19px] py-[26px]'>
            {/* ================== details ================== */}
            <div className='flex justify-between'>
                <p className='text-[16px] font-[Rokh-light] font-bold select-none'>تعداد فرش :</p>
                <p className='text-[20px] select-none'>{allCount}</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-[16px] font-[Rokh-light] font-bold select-none'>مجموع سبد خرید : </p>
                <p className='text-[20px] select-none'>{allPrice.toLocaleString()} تومان </p>
            </div>
            <div className='flex justify-between'>
                <p className='text-[16px] font-[Rokh-light] font-bold select-none'>ارسال توسط :</p>
                <p className='text-[20px] select-none'>ایرانی فرش</p>
            </div>
            <div className='flex justify-center'>
                <button onClick={buyProductsHandler} className='lg:w-[274px] sm:w-[350px] h-10 rounded-[12px] px-2 text-white bg-primary hover:bg-red-700 hover:cursor-pointer  select-none'>{loading ? "در حال پردازش..." : "سفارش و خرید"}</button>
            </div>
        </div>
    )
}
