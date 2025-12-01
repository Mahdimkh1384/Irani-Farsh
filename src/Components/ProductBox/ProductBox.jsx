import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function ProductBox(product) {

    const { id, title, price, images, discount } = product

    const realPrice = (price * discount) / 100
    return (
        <div className=' flex flex-col justify-center gap-y-6 w-[287.5px] h-[493px] p-4 rounded-[12px] border border-neutral-300'>
            <Image width={255} height={261} className='w-[255.5px] h-[261px]' src={`https://backend.sajlab.ir/uploads/product/${images[0]}`} alt="single-carpet" />
            <div className='flex flex-col gap-y-4'>
                <p className='font-[Rokh-light] font-bold text-[18px]'>{title}</p>
                <div className='flex justify-between items-center'>
                    <p className='font-[Rokh-light] font-bold text-[16px]'>قیمت: </p>
                    {/* OFF 👇 */}
                    {discount ? (
                        <>
                            <div className='flex flex-col'>
                                <p className='font-[Rokh-light] text-neutral-400 text-[15px]'><s>{Number(price).toLocaleString()} تومان</s></p>
                                <p className='font-[Rokh-light] font-bold text-[18px]'>{Number(price - realPrice).toLocaleString()} تومان</p>
                            </div>
                            <div className='size-10 bg-primary flex justify-center items-center text-white rounded-xl'>
                                <span>{discount}%</span>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col'>
                            <p className='font-[Rokh-light] font-bold text-[18px]'>{Number(price).toLocaleString()} تومان</p>
                        </div>
                    )}

                </div>
            </div>
            <Link href={`/product/${id}`} className='btn w-[255.5px] h-10 '>
                مشاهده بیشتر
            </Link>
        </div >
    )
}
