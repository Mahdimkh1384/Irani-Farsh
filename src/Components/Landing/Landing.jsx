import React from 'react'

export default function Landing() {
    return (
        <div className=' pr-[108px] pl-[108px] mt-20 h-[470.9px] flex justify-between '>
            <div className=' mt-24 w-[600px] h-[280px] flex flex-col items-center'>
                <h2 className='text-3xl'>خرید راحت فرش،در<span className='text-primary'>ایرانی فرش</span></h2>
                <p className='text-center font-[Rokh-light] font-bold text-[24px] mt-6 w-[590px]'>با ایـــرانی فرش در سریع ترین زمان ممکن فرش خودت رو سفارش بده و از تنوع بی نظیر فرش ها لذت ببر.</p>
                <div className='flex gap-x-10 mt-12'>
                    <button className='btn h-14 w-[206px]'>محصولات ویژه ایرانی فرش</button>
                    <button className='font-bold font-[Rokh-light] bg-primary text-white border rounded-[12px] flex justify-center items-center hover:cursor-pointer hover:bg-red-700 transition-colors h-14 w-[206px]'>عضویت در باشگاه مشتریان</button>
                </div>
            </div>
            <img className='w-[527px] h-[470px]' src="./images/group 3.png" alt="carpets" />
        </div>
    )
}
