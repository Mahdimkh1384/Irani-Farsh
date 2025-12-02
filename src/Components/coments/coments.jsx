import React from "react";
import Image from "next/image";
import LikeButton from "../LikeButton/LikeButton";
import ShareButton from "../ShareButton/ShareButton";
import { MoreHorizontal } from "lucide-react";
import { FaStar } from "react-icons/fa";

/**
 * @param {{ comment: {
 *   id: number,
 *   user?: { name?: string, avatar?: string },
 *   rating?: number,
 *   comment?: string,
 *   created_at?: string
 * }}} props 
 */
const BASE_URL = "https://backend.sajlab.ir";

export default function Coments({ comment }) {
  const firstName = comment?.user?.firstName || "کاربر مهمان";
  const lastName = comment?.user?.lastName || "";
  const userAvatar = comment?.user?.profileImage
  ? comment.user.profileImage.startsWith("http")
    ? comment.user.profileImage
    : `${BASE_URL}/uploads/user/${comment.user.profileImage}`
  : "/images/defult1.jpg";
  const rating = comment?.rating || 0;
  const text = comment?.content || "بدون متن";
  const createdAt = comment?.created_at
    ? new Date(comment.created_at).toLocaleDateString("fa-IR")
    : "تازه ثبت شده";
console.log(comment);

  return (
    <div className="border-b border-[#E9EAEE] pb-5 pt-8">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image
              src={userAvatar}
              width={56}
              height={56}
              alt={`${firstName} ${lastName}`}
              className="object-cover"
            />
          </div>
          <h1 className="font-semibold">{firstName} {lastName} </h1>
        </div>

        <div className="flex items-center gap-3 text-[#737993]">
          <p>{createdAt}</p>
          <LikeButton />
          <ShareButton />
          <div className="cursor-pointer">
            <MoreHorizontal />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 mt-4 pr-[72px]">
        {rating > 0 && (
          <div className="flex items-center bg-[#F3F5F6] gap-2 px-3 py-1 rounded-lg w-fit">
            <FaStar size={15} color="gold" />
            <span className="text-[#737993]">{rating}</span>
          </div>
        )}

        <p className="text-[#333] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
