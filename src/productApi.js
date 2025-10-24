
const PRODUCT_API_ENDPOINT = 'https://backend.sajlab.ir/api/products';
/**
 * 
 * @param {string} productId - آیدی محصول
 * @returns {Promise<object>} - شیء کامل محصول
 */
export async function fetchProductData(productId) {
        const PRODUCT_DETAIL_URL = `${PRODUCT_API_ENDPOINT}/${productId}`; 
    
    const response = await fetch(PRODUCT_DETAIL_URL, {
        method: 'GET',
        cache: 'no-store', 
    });

    // مدیریت خطاها
    if (response.status === 404) {
        throw new Error('محصول مورد نظر یافت نشد.');
    }
    if (!response.ok) {
        throw new Error(`خطا در لود محصول. وضعیت: ${response.status}`);
    }

    return response.json();
}