"use client";
import React, { useEffect, useState } from "react";
import { MdBusiness } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { getToken } from "@/utils/auth"; // مسیر فایل auth خودت

export default function PurchaseBox({ product }) {
    const [qty, setQty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const token = getToken();

    const status = product?.rating || "متوسط";
    const price = product?.price ? Number(product.price).toLocaleString() : "نامشخص";
    const seller = product?.seller || "شرکت فرش سهند";
    const stars = product?.stars || 4.6;

    const colorClass =
        status === "عالی"
            ? "text-green-500"
            : status === "بد"
                ? "text-red-500"
                : "text-yellow-500";

    const API_URL = "https://backend.sajlab.ir/api/cart-items";
    const productId = product?._id ?? product?.id;

    // ------------ دریافت وضعیت اولیه سبد ----------
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
                const item = data?.find(
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

    // ------------ ارسال POST برای اضافه/کم کردن ----------
    const updateCart = async (newQty) => {
        if (!token) {
            setErrorMsg("لطفاً ابتدا وارد حساب شوید.");
            return;
        }

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
                    quantity: newQty,
                }),
            });

            const data = await res.json();
            console.log("🟢 پاسخ سرور:", data);

            setQty(newQty);
            setErrorMsg(null);
        } catch (err) {
            console.error(err);
            setErrorMsg("خطا در ارتباط با سرور");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => updateCart(1);
    const handleIncrease = () => updateCart(qty + 1);
    const handleDecreaseOrRemove = () => {
        if (qty <= 1) updateCart(0);
        else updateCart(qty - 1);
    };

    return (
        <div className="flex flex-col justify-center lg:rounded-lg lg:border-2 border-[#ADADAD] sm:border-t sm:border-b lg:w-[312px] sm:w-[100%] h-[470px] py-[31px] px-[12px]">

            {/* بخش فروشنده و عملکرد */}
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
            <div className="flex justify-between mt-6">
                <h1 className="text-xl">قیمت:</h1>
                <h2>{price} تومان</h2>
            </div>

            {/* خطا */}
            {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}

            {/* اگر توکن نیست */}
            {!token && (
                <a
                    href="/login"
                    className="w-full mt-5 bg-primary text-white text-center py-2 rounded-xl block"
                >
                    ورود به حساب
                </a>
            )}

            {/* اگر محصول هنوز تو سبد نیست */}
            {token && qty === 0 && (
                <button
                    onClick={handleAdd}
                    disabled={loading}
                    className="w-full mt-5 bg-primary text-white py-2 rounded-xl"
                >
                    {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
                </button>
            )}

            {/* کنترل تعداد */}
            {token && qty > 0 && (
                <div className="mt-5 flex justify-between items-center bg-gray-100 p-3 rounded-xl">

                    <button
                        onClick={handleIncrease}
                        disabled={loading}
                        className="p-2 bg-gray-300 rounded-lg text-xl"
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
                            className="p-2 bg-gray-300 rounded-lg text-xl"
                        >
                            −
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
