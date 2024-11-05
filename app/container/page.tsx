import sru from "../components/amazon1.jpeg";
import {CategoryProps} from "@components\container.tsx";
import Link from "next/link";

interface DealsGridProps {
  categories: {
    title: string;
    imageUrl: string;
  }[];
}

const DealsGrid = ({ categories }: DealsGridProps) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Minimum 50% off | Home, kitchen & more</h1>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <CategoryProps
            key={index}
            title={category.title}
            imageUrl={sru}
          />
        ))}
      </div>
      
      {/* See all deals link */}
      <div className="mt-6">
        <Link href="#" className="text-blue-600 hover:underline">See all deals</Link>
      </div>
    </div>
  );
};

export default DealsGrid;