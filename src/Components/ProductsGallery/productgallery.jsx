"use client";
import { useState } from "react";
import Image from "next/image";

const images = [
    "/images/carpet.png",
    "/images/Frame 11.png",
    "/images/Frame 15.png",
    "/images/carpet.png",
];

export default function ProductGallery() {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="flex flex-col w-full max-w-[436px] gap-13  mx-auto">
            <div className="relative w-full h-[500px] aspect-[4/3] mb-4">
                <Image
                    src={mainImage}
                    alt="Main product"
                    fill
                    className="object-contain rounded-lg shadow-md"
                />
            </div>


            <div className="flex justify-center gap-3 mt-">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`cursor-pointer border rounded-md overflow-hidden ${img === mainImage
                                ? "border-blue-500"
                                : "border-gray-300 hover:border-blue-300"
                            }`}
                    >
                        <div className="relative w-20 h-20">
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
