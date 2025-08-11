import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'

export default function AboutUs() {
    return (
        <>
            <Breadcrumb links={[
                {id:1 , title : "درباره ما" , href : "about-us"}
            ]}/>
            <div className='lg:px-[108px] sm:px-3 mt-10 flex flex-col items-center gap-y-15'>
                <h1 className='text-3xl text-primary border-b p-2.5 border-neutral-500'>درباره ما</h1>
                <p className='w-[70%] text-justify font-[Rokh-light] font-bold leading-8'>فروشگاه ایرانی فرش با هدف ارائه زیباترین و باکیفیت‌ترین فرش‌های دستباف و ماشینی ایرانی فعالیت خود را آغاز کرده است. ما باور داریم که فرش ایرانی تنها یک کف‌پوش نیست، بلکه بخشی از فرهنگ، هنر و هویت این سرزمین است.

                    در ایرانی فرش تلاش می‌کنیم با گردآوری مجموعه‌ای متنوع از طرح‌ها و نقش‌های اصیل و مدرن، سلیقه‌های مختلف را پاسخ دهیم. از فرش‌های سنتی با نقش و نگارهای کهن گرفته تا طرح‌های مینیمال و مدرن، همه و همه با دقت و وسواس انتخاب می‌شوند تا زیبایی و کیفیت در کنار هم قرار گیرند.

                    هدف ما، فراهم کردن تجربه‌ای آسان و لذت‌بخش برای خرید فرش است؛ تجربه‌ای که در آن مشتری با اطمینان از اصالت، کیفیت و قیمت مناسب، انتخاب خود را انجام دهد.

                    با ایرانی فرش، اصالت هنر ایرانی را به خانه خود بیاورید.</p>
                <div className='w-full flex lg:flex-row sm:flex-col justify-evenly items-center lg:gap-y-0 sm:gap-y-2.5'>
                    <div className='flex flex-col items-center justify-center lg:w-[150px] sm:w-[260px] h-[100px] border rounded-[8px] border-primary '>
                        <img src="/images/original-products.svg" alt="original-products" />
                        <p className='font-[Rokh-light] font-bold'>ضمانت اصل بودن کالا</p>
                    </div>
                    <div className='flex flex-col items-center justify-center lg:w-[150px] sm:w-[260px] h-[100px] border rounded-[8px] border-primary '>
                        <img src="/images/support.svg" alt="support" />
                        <p className='font-[Rokh-light] font-bold'>پشتیبانی 24 ساعته</p>
                    </div>
                    <div className='flex flex-col items-center justify-center lg:w-[150px] sm:w-[260px] h-[100px] border rounded-[8px] border-primary '>
                        <img src="/images/days-return.svg" alt="days-return" />
                        <p className='font-[Rokh-light] font-bold'>7 روز ضمانت بازگشت</p>
                    </div>
                    <div className='flex flex-col items-center justify-center lg:w-[150px] sm:w-[260px] h-[100px] border rounded-[8px] border-primary '>
                        <img src="/images/express-delivery.svg" alt="express-delivery" />
                        <p className='font-[Rokh-light] font-bold'>امکان تحویل اکسپرس</p>
                    </div>
                </div>
            </div>
        </>
    )
}
