import {
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosProductsById } from "../api/StoreApi";
import { motion } from "motion/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import type { CartItem, Product } from "../type";
import { ProductGallery } from "../features/products/ProductGallery";
import { ProductInfo } from "../features/products/ProductInfo";
import { SizeSelector } from "../features/products/SizeSelector";
import { QuantitySelector } from "../features/products/QuantitySelector";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addToCart, getItemQuantity } = useShoppingCart();

  useEffect(() => {
    async function loadProductData() {
      if (!id) return;
      setLoading(true);

      const productData = await axiosProductsById(id);
      setProduct(productData);

      setLoading(false);
    }
    loadProductData();
  }, [id]);

  // variante seleccionada
  const variant = product?.variants.find((v) => v.id === selectedSize);

  // unidades guardadas en el carrito
  const currentInCart = getItemQuantity(selectedSize || "");

  // Determina si el usuario ya alcanzó el límite permitido.
  // Si no hay variante seleccionada, por defecto es false.
  const isMaxStockReached = variant ? currentInCart >= variant.stock : false;

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      alert("Selecciona una talla");
      return;
    }
    if (!variant) return;

    const itemToCart: CartItem = {
      productId: product.id,
      variantId: variant.id, // <-- Importante: usamos el ID de la variante
      name: product.name,
      price: product.price,
      image: product.image,
      size: variant.size, // Usamos el texto de la talla (S, M, L...)
      quantity: quantity, // La cantidad que el usuario eligió en el contador
      stock: variant.stock,
    };
    addToCart(itemToCart);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 flex justify-center">
        <Loader2 className="animate-spin text-brand-muted" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-serif mb-4">Product Not Found</h2>
        <Link to="/" className="text-sm uppercase tracking-widest underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const sizes = product.variants;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center space-x-2 mb-12">
          <Link to="/" className="hover:text-brand-dark transition-colors">
            Home
          </Link>
          <ChevronRight size={10} />
          <Link
            to={`/category/${product.category}`}
            className="hover:text-brand-dark transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <ProductGallery
            mainImage={product.image}
            name={product.name}
            productId={product.id}
          />

          <div className="lg:sticky lg:top-32 h-fit space-y-10">
            {/* Product Info */}
            <ProductInfo
              description={product.description}
              name={product.name}
              price={product.price}
            />

            <div className="space-y-6">
              <SizeSelector
                variants={product.variants}
                selectedSizeId={selectedSize}
                onSelectSize={setSelectedSize}
              />

              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                stock={variant?.stock || 0}
                currentInCart={currentInCart}
                disabled={!selectedSize}
              />
            </div>

            <div className="pt-6 space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isMaxStockReached || variant?.stock === 0}
                className="w-full py-5 bg-brand-dark text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-muted transition-colors"
              >
                Add to Bag
              </button>
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                Free shipping on orders over $200
              </p>
            </div>

            <div className="pt-10 border-t border-gray-100 space-y-6">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Details & Care
                  </span>
                  <ChevronRight
                    size={14}
                    className="group-open:rotate-90 transition-transform"
                  />
                </summary>
                <div className="pt-4 text-sm text-gray-500 font-light space-y-2">
                  <p>• 100% Organic Cotton</p>
                  <p>• Dry clean only</p>
                  <p>• Made in Portugal</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Shipping & Returns
                  </span>
                  <ChevronRight
                    size={14}
                    className="group-open:rotate-90 transition-transform"
                  />
                </summary>
                <div className="pt-4 text-sm text-gray-500 font-light">
                  <p>
                    Complimentary standard shipping on all orders. Returns
                    accepted within 30 days of delivery.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
