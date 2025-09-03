import React from 'react'
import Image from 'next/image'
import LikeButton from '../LikeButton/LikeButton'
import ShareButton from '../ShareButton/ShareButton'
import { MoreHorizontal } from "lucide-react";
import { FaStar } from "react-icons/fa";

export default function Coments() {
  return (
    <div>
           <div className="flex justify-between pt-10">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image
              src="/images/Container.png"
              width={56}
              height={56}
              alt="avatar"
            />
          </div>
          <h1 className="font-semibold">علیرضا کریمی</h1>
        </div>
        <div className="flex items-center gap-3 text-[#737993]">
          <p>۵ روز پیش</p>
          <LikeButton />
          <ShareButton />
          <div className="cursor-pointer">
            <MoreHorizontal />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4 pr-[72px] border-b border-[#E9EAEE] pb-5">
        <div className="flex items-center bg-[#F3F5F6] gap-2 px-3 py-1 rounded-lg w-fit">
          <FaStar size={15} color="gold" />
          <span className="text-[#737993]">4</span>
        </div>
        <p className="text-[#333]">
          فرش مناسب و زیبایی بود از رنگ و طرحش خیلی خوشم اومد.
        </p>
      </div>
    </div>
  )
}
