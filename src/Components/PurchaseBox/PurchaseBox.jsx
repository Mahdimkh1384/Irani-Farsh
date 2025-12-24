"use client";
import React, { useEffect, useState } from "react";
import { MdBusiness } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { getToken } from "@/utils/auth";

export default function PurchaseBox({ product }) {

    const [mounted, setMounted] = useState(false);
    const [qty, setQty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setMounted(true); // بعد از mount روی کلاینت فعال میشه
    }, []);

    const token = getToken();
    const API_URL = "https://api.iranifarsh.neofy.ir/cart-items";
    const productId = product?._id ?? product?.id;

    const status = product?.rating || "متوسط";
    const price = product?.price ? Number(product.price) : "نامشخص";
    const discount = product.discount;
    const discountPercent = Number(discount) || 0;
    const discountPrice = (price * discountPercent) / 100;
    const seller = product?.seller || "شرکت فرش سهند";
    const stars = product?.stars || 4.6;

    const colorClass =
        status === "عالی"
            ? "text-green-500"
            : status === "بد"
                ? "text-red-500"
                : "text-yellow-500";

    // ============= دریافت مقدار اولیه از سبد =============
    useEffect(() => {
        const fetchCart = async () => {
            if (!token || !productId) return;

            try {
                setLoading(true);
                const res = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                const items = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                        ? data.data
                        : Array.isArray(data?.items)
                            ? data.items
                            : [];

                const item = items.find(
                    (it) =>
                        String(it.productId) === String(productId) ||
                        String(it.product_id) === String(productId)
                );

                setQty(item ? Number(item.quantity) : 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [token, productId]);

    // ============= ارسال فقط مقدار تغییر (delta) =============
    const updateCart = async (delta) => {
        if (!token) {
            setErrorMsg("لطفاً ابتدا وارد حساب شوید.");
            return;
        }

        const finalQty = qty + delta;
        if (finalQty < 0) return;

        try {
            setLoading(true);

            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity: delta,   // ⬅ فقط تغییر را می‌فرستیم نه کل مقدار
                }),
            });

            const data = await res.json();

            setQty(finalQty);  // مقدار جدید محلی
            setErrorMsg(null);
        } catch (err) {
            console.error(err);
            setErrorMsg("خطا در ارتباط با سرور");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => updateCart(1);
    const handleIncrease = () => updateCart(1);
    const handleDecreaseOrRemove = () => updateCart(-1);

    if (!mounted) return null;

    return (
        <div className="flex flex-col justify-center lg:rounded-lg lg:border-2 border-[#ADADAD] sm:border-t sm:border-b lg:w-[312px] sm:w-[100%] h-[470px] py-[31px] px-[12px]">

            <div className="flex flex-col gap-7 border-b-1 border-[#ADADAD] pb-5">
                <h1>فروشنده</h1>
                <div className="flex gap-2 items-center">
                    <MdBusiness size={20} />
                    <h2>{seller}</h2>
                </div>

                <div className="flex gap-2 items-center">
                    <h1>عملکرد:</h1>
                    <p className={`text-xl font-bold ${colorClass}`}>{status}</p>
                </div>

                <div className="flex gap-2 items-center">
                    <FaStar className="text-yellow-500 text-3xl" size={20} />
                    <p>{stars}</p>
                </div>
            </div>

            {/* قیمت */}
            {discount ? (
                <div className="flex justify-between mt-6 items-center">
                    <h1 className="text-xl font-[Rokh-light]  font-bold">قیمت:</h1>
                    <div className="flex flex-col">
                        <p className=" font-[Rokh-light] text-neutral-400 text-[15px]"><s>{price.toLocaleString()} تومان</s></p>
                        <p className=" font-[Rokh-light] font-bold text-[18px]">{Number(price - discountPrice).toLocaleString()} تومان</p>
                    </div>
                    <div className='size-10 bg-primary flex justify-center items-center text-white rounded-xl'>
                        <span>{discount}%</span>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between mt-6 font-[Rokh-light] font-bold">
                    <h1 className="text-xl">قیمت:</h1>
                    <h2 className="font-[Rokh-light] font-bold text-[18px]">{price.toLocaleString()} تومان</h2>
                </div >
            )
            }

            {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}

            {!token && (
                <a
                    href="/login"
                    className="w-full mt-5 bg-primary text-white text-center py-2 rounded-xl block"
                >
                    ورود به حساب
                </a>
            )}

            {token && qty === 0 && (
                <button
                    onClick={handleAdd}
                    disabled={loading}
                    className="w-full mt-5 bg-primary text-white py-2 rounded-xl cursor-pointer hover:bg-red-700 transition-colors"
                >
                    {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
                </button>
            )}

            {token && qty > 0 && (
                <div className="mt-5 flex justify-between items-center bg-gray-100 p-3 rounded-xl">

                    <button
                        onClick={handleIncrease}
                        disabled={loading}
                        className="p-2 bg-gray-300 rounded-lg text-xl cursor-pointer"
                    >
                        +
                    </button>

                    <span className="text-lg font-bold">{qty}</span>

                    {qty === 1 ? (
                        <button
                            onClick={handleDecreaseOrRemove}
                            disabled={loading}
                            className="p-2 bg-red-200 rounded-lg"
                        >
                            <FaTrash size={18} className="text-red-600" />
                        </button>
                    ) : (
                        <button
                            onClick={handleDecreaseOrRemove}
                            disabled={loading}
                            className="p-2 bg-gray-300 rounded-lg text-xl cursor-pointer"
                        >
                            −
                        </button>
                    )}
                </div>
            )
            }
        </div >
    );
}
