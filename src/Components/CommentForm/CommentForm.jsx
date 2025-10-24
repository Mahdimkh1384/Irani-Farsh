"use client"
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { postComment } from '@/api'; 
/**
 * @param {number} productId 
 * @param {string} userToken 
 * @param {function} onCommentSubmitted 
 */
export default function CommentForm({ productId, userToken, onCommentSubmitted }) {
    
    const [rating, setRating] = useState(0); 
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleRatingClick = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!userToken) {
             setError('برای ثبت نظر، ابتدا باید وارد شوید.');
             return;
        }
        if (!commentText.trim() || rating === 0) {
            setError('لطفاً هم متن نظر و هم امتیاز (ستاره) را وارد کنید.');
            return;
        }
        setIsSubmitting(true);
        
        try {
            await postComment(userToken, commentText, productId, rating); 
            alert('نظر شما با موفقیت ثبت شد و در انتظار تأیید ادمین است.');
            setCommentText(''); 
            setRating(0); 
            if(onCommentSubmitted) onCommentSubmitted();
            
        } catch (err) {
            console.error('Error submitting comment:', err);
            setError(`مشکلی پیش آمد: ${err.message}`); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">نظر خود را ثبت کنید</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-5 flex items-center gap-4">
                    <span className="text-gray-700 font-medium">امتیاز شما:</span>
                    <div className="flex text-2xl cursor-pointer">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                            <FaStar
                                key={starValue}
                                color={starValue <= rating ? "#ffc107" : "#e4e5e9"}
                                onClick={() => !isSubmitting && handleRatingClick(starValue)}
                                className="transition-colors duration-150"
                            />
                        ))}
                    </div>
                </div>

                {/* فیلد متن کامنت */}
                <div className="mb-4">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows="5"
                        placeholder="تجربه و نظر خود را درباره این محصول بنویسید..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-right resize-none placeholder-gray-400 transition"
                        disabled={isSubmitting}
                    />
                </div>
                
                {/* پیام خطا */}
                {error && (
                    <p className="text-red-500 text-sm mb-4">
                        🚨 {error}
                    </p>
                )}

                {/* دکمه ارسال */}
                <button
                    type="submit"
                    disabled={isSubmitting || rating === 0 || commentText.trim() === ''}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'در حال ارسال نظر...' : 'ارسال نظر'}
                </button>
            </form>
        </div>
    );
}