import type { Product } from "../../type";

interface SizeSelectorProps {
  variants: Product["variants"];
  selectedSizeId: string;
  onSelectSize: (id: string) => void;
}

export const SizeSelector = ({
  variants,
  selectedSizeId,
  onSelectSize,
}: SizeSelectorProps) => {
  const activeVariant = variants.find((v) => v.id === selectedSizeId);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-widest font-bold">
          Select Size
        </span>
        <button className="text-[10px] uppercase tracking-widest underline text-gray-400">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelectSize(variant.id)}
            className={`w-12 h-12 flex items-center justify-center text-xs border transition-all duration-300 ${
              selectedSizeId === variant.id
                ? "border-brand-dark bg-brand-dark text-white"
                : "border-gray-200 hover:border-brand-dark"
            }`}
          >
            {variant.size}
          </button>
        ))}
      </div>
      <p className="text-sm font-medium">
        {activeVariant
          ? `Stock: ${activeVariant.stock} unidades`
          : "Selecciona una talla para ver disponibilidad"}
      </p>
    </div>
  );
};
