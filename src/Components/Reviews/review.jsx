// review.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Coments from '../coments/coments';
import CommentForm from '../CommentForm/CommentForm';
import { getApprovedComments } from '@/api'; 

/**
 * @param {string} productId 
 * @param {string} userToken 
 */
export default function Reviews({ productId, userToken }) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);
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

    const handleCommentSubmitted = () => {
        alert('نظر شما با موفقیت ثبت شد و در انتظار تأیید است. از مشارکت شما متشکریم!');
    };

    return (
        <div className="lg:pr-[108px] lg:pl-[108px] pt-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-10">
                دیدگاه‌ها و امتیازها
            </h1>
            <CommentForm
                productId={productId}
                userToken={userToken}
                onCommentSubmitted={handleCommentSubmitted}
            />
            <h2 className="text-2xl font-bold mt-12 mb-6 border-b pb-2 text-gray-800">
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
                {comments.map((comment) => (
                    <Coments
                        key={comment.id}
                        comment={comment}
                    />
                ))}
            </div>

        </div>
    );
}