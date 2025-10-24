// api.js

const COMMENT_API_ENDPOINT = 'https://backend.sajlab.ir/api/comments';

export async function getApprovedComments(productId) {
    
    if (!productId) {
        console.warn("آیدی محصول برای دریافت نظرات لازم است.");
        return [];
    }
    
    // 1. ساخت URL و فراخوانی fetch
    const URL = `${COMMENT_API_ENDPOINT}?product=${productId}&approved=true`; 
    
    const response = await fetch(URL, {
        method: 'GET',
        cache: 'no-store', 
    });

    // 2. مدیریت خطا
    if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Text:", errorText); 
        throw new Error(`خطا در دریافت نظرات. وضعیت: ${response.status}`);
    }

    // 3. استخراج و اصلاح داده‌ها (منطق شما)
    const responseData = await response.json(); 
    
    // اگر آرایه واقعی نظرات داخل فیلد 'data' باشد
    if (responseData.data && Array.isArray(responseData.data)) {
        return responseData.data; 
    }
    
    // اگر API مستقیماً آرایه را برگرداند
    if (Array.isArray(responseData)) {
        return responseData;
    }

    // در صورتی که پاسخ، آرایه نبود، یک آرایه خالی برمی‌گرداند تا خطا ندهد
    return []; 
}