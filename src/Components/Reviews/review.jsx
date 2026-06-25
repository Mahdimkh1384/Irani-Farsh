"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Coments from '../coments/coments';
import CommentForm from '../CommentForm/CommentForm';
import { getApprovedComments } from '@/api';

export default function Reviews({ productId }) {
  const [comments, setComments] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const cookieToken = Cookies.get('sajy');
    if (cookieToken) {
      setUserToken(cookieToken);
      return;
    }
    const localToken = typeof window !== 'undefined' ? localStorage.getItem('sajy') : null;
    if (localToken) {
      Cookies.set('sajy', localToken, { path: '/', sameSite: 'lax' });
      setUserToken(localToken);
    }
  }, []);

  const loadComments = async () => {
    if (!productId) return;
    setIsLoading(true);
    setLoadError(null);
    try {
      const approvedList = await getApprovedComments(productId);
      setComments(approvedList || []);
    } catch (err) {
      setLoadError('خطا در بارگذاری نظرات. لطفاً بعداً مجدد امتحان کنید.');
      console.error('Loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [productId]);

  return (
    <div className="lg:pr-[108px] lg:pl-[108px] pt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 px-3">
        دیدگاه‌ها و امتیازها
      </h1>

      <CommentForm
        productId={productId}
        userToken={userToken}
        onCommentSubmitted={loadComments}
      />

      <h2 className="text-2xl font-bold mt-12 mb-6 border-b pb-2 text-gray-800 px-3">
        نظرات کاربران ({isLoading ? '...' : comments.length})
      </h2>

      {loadError && (
        <p className="text-red-500 bg-red-50 p-3 rounded-lg text-center my-4 border border-red-200">
          ❌ {loadError}
        </p>
      )}

      {isLoading && (
        <p className="text-blue-500 text-center my-4 font-medium">
          در حال بارگذاری نظرات...
        </p>
      )}

      <div className="divide-y divide-gray-100">
        {!isLoading && !loadError && comments.length === 0 && (
          <p className="text-gray-500 pt-5 text-center">
            تاکنون هیچ نظری برای این محصول ثبت یا تأیید نشده است. اولین نفر باشید!
          </p>
        )}
        {comments.map((comment, index) => (
          <Coments key={comment.id || index} comment={comment} />
        ))}
      </div>
    </div>
  );
}
