"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  const defaultImage = "/images/no-image.png";
  const baseURL = "https://api.iranifarsh.neofy.ir/uploads/product/";

  // 🧩 حالت اولیه mainImage
  const [mainImage, setMainImage] = useState(defaultImage);

  // 🧩 وقتی product تغییر کرد، mainImage رو آپدیت کن
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(`${baseURL}${product.images[0]}`);
    } else {
      setMainImage(defaultImage);
    }
  }, [product]);
  if (!product) return <div>در حال بارگذاری...</div>;

  const images = product.images?.map(img => `${baseURL}${img}`) || [];

  return (
    <div className="flex flex-col w-full max-w-[436px] gap-4 mx-auto">
      {/* تصویر اصلی */}
      <div className="relative w-full h-[500px] aspect-[4/3] mb-4">
        <Image
          src={mainImage}
          alt={product.title || "محصول"}
          fill
          className="object-contain rounded-lg shadow-md"
        />
      </div>

      {/* تصاویر کوچک */}
      {images.length > 0 && (
        <div className="flex justify-center gap-3 mt-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer border rounded-md overflow-hidden transition ${
                img === mainImage
                  ? "border-blue-500"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              <div className="relative w-20 h-20">
                <Image
                  src={img}
                  alt={`تصویر ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
