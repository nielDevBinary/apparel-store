import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
  currentInCart: number;
  disabled?: boolean;
}

export const QuantitySelector = ({
  quantity,
  setQuantity,
  stock,
  currentInCart,
  disabled,
}: QuantitySelectorProps) => {
  const isMaxReached = quantity + currentInCart >= stock;
  return (
    <div className="space-y-4">
      <span className="text-[10px] uppercase tracking-widest font-bold block">
        Quantity
      </span>
      <div className="flex items-center border border-gray-200 w-fit">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-3 hover:bg-gray-50 transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="px-6 text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          disabled={isMaxReached || disabled}
          className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};
