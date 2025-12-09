"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { postComment } from "@/api";

/**
 * @param {number} productId 
 * @param {string} userToken 
 * @param {function} onCommentSubmitted 
 */
export default function CommentForm({ productId, userToken, onCommentSubmitted }) {
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (newRating) => setRating(newRating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = userToken || Cookies.get("sajy");

    if (!token) {
      toast.error("برای ثبت نظر ابتدا باید وارد حساب کاربری خود شوید.", {
        duration: 5000,
      });
      return;
    }


    if (!commentText.trim() || rating === 0) {
      toast("لطفاً متن نظر و امتیاز خود را وارد کنید.", {
        icon: "ℹ️",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await postComment(token, commentText, productId, rating);

      // 🚫 حذف alert — فقط toast استفاده می‌کنیم
      toast.success(" نظر شما با موفقیت ثبت شد و در انتظار تأیید ادمین است.", {
        duration: 5000,
      });

      setCommentText("");
      setRating(0);
      if (onCommentSubmitted) onCommentSubmitted();
    } catch (err) {
      console.error("Error submitting comment:", err);
      toast.error(`❌ خطا در ارسال نظر: ${err.message || "مشکلی پیش آمد"}`, {
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="bg-white w-[100%] p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          نظر خود را ثبت کنید
        </h2>

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

          {/* متن نظر */}
          <div className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="5"
              placeholder="تجربه خود را درباره این محصول بنویسید..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-right resize-none placeholder-gray-400 transition"
              disabled={isSubmitting}
            />
          </div>

          {/* دکمه ارسال */}
          <button
            type="submit"
            disabled={isSubmitting || rating === 0 || commentText.trim() === ""}
            className="w-full bg-primary cursor-pointer text-white font-bold py-3 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "در حال ارسال نظر..." : "ارسال نظر"}
          </button>
        </form>
      </div>
    </div>
  );
}
