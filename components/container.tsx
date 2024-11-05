import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from "next/link";

export interface Category {
  title: string;
  imageUrl: string | StaticImageData;
}


 export const CategoryComponent = ({ title, imageUrl }: Category) => {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg bg-[#40E0D0]/20 group">
      <div className="relative w-full h-[80%] p-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-white">
        <div className="h-full flex flex-col justify-center items-center">
          <h2 className="text-gray-800 font-medium text-lg">{title}</h2>
        </div>
      </div>
    </div>
  );
};

