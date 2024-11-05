import { Category, CategoryComponent } from "@/components/container";
import Link from "next/link";

interface DealsGridProps {
  categories: Category[];
}
const sampleCategories = [
  {
    title: "Home Appliances",
    imageUrl: "/images/home-appliances.jpg",
  },
  {
    title: "Kitchen Essentials",
    imageUrl: "/images/kitchen-essentials.jpg",
  },
  {
    title: "Furniture",
    imageUrl: "/images/furniture.jpg",
  },
  {
    title: "Decor",
    imageUrl: "/images/decor.jpg",
  },
];


const DealsGrid = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Minimum 50% off | Home, kitchen & more</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleCategories.map((category, index) => (
          <CategoryComponent
            key={index}
            title={category.title}
            imageUrl={category.imageUrl} // Ensure you're using category.imageUrl
          />
        ))}
      </div>
      <div className="mt-6">
        <Link href="#" className="text-blue-600 hover:underline">See all deals</Link>
      </div>
    </div>
  );
};

export default DealsGrid;
