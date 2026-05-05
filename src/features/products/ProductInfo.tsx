import { Heart, Share2 } from "lucide-react";

export const ProductInfo = ({ name, price, description }: { name: string, price: number, description: string }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-4xl md:text-5xl font-serif">{name}</h1>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <Share2 size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <p className="text-2xl font-light text-brand-muted">
        ${price}.00
      </p>
      <p className="text-gray-500 leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
};
