// TestProps.tsx
import Image, { StaticImageData } from 'next/image';

interface TestPropsTypes {
  name: string;
  description: string;
  price: number;
  imageUrl: string | StaticImageData;
}

export default function TestProps({ name, description, price, imageUrl }: TestPropsTypes) {
  return (
   
    
    <div className="h-64 w-64 relative overflow-hidden rounded-lg shadow-lg group">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 256px) 100vw, 256px"
        priority
      />
      
      {/* Gradient overlay */}
      <div className="  absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/30 transition-all duration-300">
        <div className="absolute bottom-0 w-full p-4 flex flex-col items-center">
          <h1 className="text-xl font-bold text-white mb-2">{name}</h1>
          <p className="text-sm text-gray-200 text-center mb-3">{description}</p>
          
    <span className="text-white font-bold">${price.toFixed(2)}</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform group-hover:scale-105">
            Buy Now ${price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
   
   
  );
}