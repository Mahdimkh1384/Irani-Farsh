"use client"
import React, { useState, useEffect, useRef } from 'react'
import UserDetailBox from '../UserDetailBox/UserDetailBox'
import { CgMenuGridO } from "react-icons/cg";
import MobileSidebar from '../MobileSideBar/MobileSidebar';
import Link from 'next/link'
import { TfiCommentAlt } from "react-icons/tfi";
import { FaRegAddressBook } from "react-icons/fa6";
import { TbShoppingBagCheck } from "react-icons/tb";
import { BiDollar } from "react-icons/bi";
import { useContext } from 'react';
import { UserContext } from '../../../../Contexts/UserContext';


export default function Header() {

    const { userInfo, getUserInfo, token } = useContext(UserContext);

    const [isShowMobileSidebar, setIsShowMobileSidebar] = useState(false)
    const [allPrice, setAllPrice] = useState(0)

    const menuRef = useRef(null);
    // close mobile menu to click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isShowMobileSidebar &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsShowMobileSidebar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShowMobileSidebar]);

    useEffect(() => {
        if (!userInfo?.orders) return;

        const totalPrice = userInfo.orders.reduce((sum, item) => {
            const price = Number(item.product.price);
            const discount = Number(item.product.discount) || 0;

            // قیمت بعد از تخفیف
            const finalPrice = discount > 0
                ? price - (price * discount / 100)
                : price;

            return sum + finalPrice * item.quantity;
        }, 0);

        setAllPrice(totalPrice);
    }, [userInfo]);

    const userHistoryData = [
        { id: 1, title: "دیدگاه ها و نظرات", shortTitle: "دیدگاه", icon: <TfiCommentAlt />, data: userInfo.commentsCount },
        { id: 2, title: "آدرس ها", shortTitle: "آدرس", icon: <FaRegAddressBook />, data: userInfo.address ? 1 : 0 }, //****** 
        { id: 3, title: "سفارشات", shortTitle: "سفارش", icon: <TbShoppingBagCheck />, data: userInfo.orders?.length },
        { id: 4, title: "کل مبلغ سفارشات", shortTitle: "تومان", icon: <BiDollar />, data: allPrice },
    ]

    return (
        <>
            {isShowMobileSidebar && <div ref={menuRef}><MobileSidebar /></div>}
            <div className=' lg:flex-row sm:flex-col flex justify-between items-center bg-neutral-50 border rounded-[10px] border-neutral-400'>
                {/* ================= right section ================ */}
                <div className='lg:p-8 sm:p-5 flex items-center justify-between w-full'>
                    <CgMenuGridO className='lg:hidden sm:inline text-4xl' onClick={() => setIsShowMobileSidebar(true)} />
                    <Link href='/' className='text-3xl text-primary'>ایرانی فرش</Link>
                </div>
                {/* ================= left section ================ */}
                <div className='flex sm:flex-wrap lg:flex-nowrap justify-center gap-3 p-3'>
                    {userHistoryData.map(data => (
                        <UserDetailBox key={data.id} {...data} />
                    ))}
                </div>
            </div>
        </>
    )
}
