// product/[id]/page.jsx
// این فایل یک Server Component است و به طور خودکار داده‌ها را در سمت سرور لود می‌کند.

import { notFound } from 'next/navigation';
// ✅ ایمپورت توابع API مورد نیاز
import { fetchProductData } from '@/productApi'; 

// 💡 ایمپورت کامپوننت‌های ساختاری
import ProductGallery from '@/Components/ProductsGallery/productgallery';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import ProductSpecs from '@/Components/ProductSpecs/ProductSpecs';
import PurchaseBox from '@/Components/PurchaseBox/PurchaseBox';
import Slider from '@/Components/Slider/Slider';
import Reviews from '@/Components/Reviews/review';

// 🔑 دریافت params برای استخراج آیدی محصول
export default async function Products({ params }) {
    
    const productId = params.id;
    let productData = null;

    // 1. لود داده‌های محصول در سرور
    try {
        productData = await fetchProductData(productId);
    } catch (error) {
        // اگر API با خطای 404 یا هر خطای دیگری مواجه شود
        console.error(`خطا در لود محصول با آیدی ${productId}:`, error);
        notFound(); // هدایت به صفحه 404
    }

    // 2. مدیریت توکن کاربر (فعلاً برای شبیه‌سازی کاربر مهمان، null است)
    // ⚠️ توجه: برای محیط تولید، باید منطق خواندن توکن از کوکی‌ها یا JWT را اینجا قرار دهید.
    const userToken = null; 
    
    // 3. استخراج داده‌ها برای استفاده در UI
    const productTitle = productData.title || productData.name || "محصول"; 

    return (
        <>
            <Breadcrumb links={[
                {id : 1 , title : 'ماهساره' , href: "/"},
                {id : 2 , title : productTitle , href: `/products/${productId}`}
            ]}/>
            
            <div className='flex lg:flex-row pt-[50px] lg:pr-[108px] lg:pl-[108px] justify-between sm:flex-col'>
                
                {/* Product Gallery */}
                <div className=' lg:w-[30%] sm:w-[100%]'>
                    <ProductGallery product={productData} />
                </div>
                
                {/* Product Specs */}
                <div className='flex justify-center'>
                    <ProductSpecs product={productData} />
                </div>
                
                {/* Purchase Box */}
                <div className="flex justify-center lg:w-[25%] lg:pt-0 sm:pt-8">
                    <div className='flex justify-center items-center lg:w-[100%] sm:w-[95%]'>
                        <PurchaseBox product={productData} status="متوسط" />
                    </div>
                </div>
            </div>
            
            <div className='lg:pr-[108px] lg:pl-[108px] pt-20 flex flex-col gap-10'>
                <h1 className='text-2xl'>
                    فرش های مشابه
                </h1>
            </div>
            
            {/* Slider محصولات مشابه */}
            <Slider /> 
            
            {/* Reviews Section */}
            <div>
                {/* 🔑 پاس دادن آیدی محصول و توکن به سیستم کامنت */}
                <Reviews productId={productId} userToken={userToken} />
            </div>
        </>
    )
}