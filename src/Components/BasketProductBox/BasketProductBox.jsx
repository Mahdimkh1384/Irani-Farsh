import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";


export default function BasketProductBox() {
    return (
        <div className=' sm:relative lg:static lg:w-[507px] lg:h-[236px] sm:w-[312px] sm:h-[310px] flex lg:gap-x-6 sm:gap-6'>
            {/* ====================== right section ===================== */}
            <img className='w-[160px] h-[234px]' src="/images/frame 12.png" alt="basket-carpet" />
            {/* ====================== left section ===================== */}
            <div className='flex  lg:justify-between flex-col lg:gap-y-3.5 sm:gap-y-5 font-[Rokh-light]'>
                <h5 className='font-bold lg:text-[20px] sm:text-[16px]'>فرش ماشینی  ماهساره طرح آترینا زمینه آبی</h5>
                <p className='font-[500]'>رنگ : آبی</p>
                <p className='font-[500]'>شرکت فرش سهند</p>
                <div className='flex gap-x-6'>
                    <p>قیمت:</p>
                    <h5 className='font-bold'>13/500/000</h5>
                </div>
                {/* ==================== product count ================== */}
                <div className=' sm:absolute lg:static bottom-0 right-4 flex justify-around items-center w-[125px] h-[59px] border border-neutral-400 rounded-[8px] font-bold'>
                    <FaPlus className='text-primary text-[16px] hover:cursor-pointer' />
                    <div className='flex flex-col '>
                        <span className='text-center text-[20px]'>1</span>
                        <p className='text-[14px]'>تعداد</p>
                    </div>
                    <LuTrash className='text-primary text-[16px] hover:cursor-pointer' />
                </div>
            </div>
        </div>
    )
}
