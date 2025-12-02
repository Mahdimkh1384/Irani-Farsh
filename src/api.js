const BASE_URL = "https://backend.sajlab.ir/api";

/**
 * دریافت کامنت‌های تایید‌شده از طریق API محصول
 * @param {number|string} productId
 * @returns {Promise<Array>}
 */
export async function getApprovedComments(productId) {
  if (!productId) return [];
  const URL = `${BASE_URL}/products/${productId}`;

  const response = await fetch(URL, { method: "GET", cache: "no-store" });

  if (!response.ok)
    throw new Error(`خطا در دریافت اطلاعات محصول (${response.status})`);

  const productData = await response.json();
  const comments = productData.comments || productData.data?.comments || [];
  return comments;
}

/**
 * ارسال کامنت جدید
 * @param {string} token
 * @param {string} commentText 
 * @param {number|string} productId 
 * @param {number} rating 
 */
export async function postComment(token, commentText, productId, rating) {
  if (!token) throw new Error("توکن کاربر یافت نشد. ابتدا وارد شوید.");

  const response = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product: Number(productId), 
      content: commentText,
      rating: rating,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("❌ خطا در ارسال نظر:", errorText);
    throw new Error(`ارسال نظر با خطا مواجه شد (${response.status})`);
  }

  const data = await response.json();
  return data;
}
