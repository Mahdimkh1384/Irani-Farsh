"use client";
import { Share2 } from "lucide-react";

export default function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "سایت من",
          text: "این صفحه رو ببین 👇",
          url: window.location.href,
        });
      } catch (err) {
        console.log("❌ کاربر کنسل کرد یا خطا:", err);
      }
    } else {
      alert("این مرورگر موبایل از Share API پشتیبانی نمی‌کند.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-ful cursor-pointer"
    >
      <Share2 className="w-5 h-5 text-gray-600" />
    </button>
  );
}
