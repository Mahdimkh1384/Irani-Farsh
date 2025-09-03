"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="p-1 rounded-full hover:scale-110 transition-transform"
    >
      <Heart
        className={`w-5 h-5 ${
          liked ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
    </button>
  );
}
