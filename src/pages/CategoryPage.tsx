import { useParams } from "react-router-dom";
import { axiosProducts } from "../api/StoreApi";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Filter, Loader2 } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../type";


export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await axiosProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) => p.category === category);
  const categoryTitle = category === "men" ? "Men" : "Women";
  const categoryDescription =
    category === "men"
      ? "Refined essentials and contemporary tailoring for the modern man."
      : "El";

  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Header */}
      <header className="mb-20 space-y-6 max-w-2xl">
        <nav className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center space-x-2">
          <a href="/" className="hover:text-brand-dark transition-colors">Home</a>
          <span>/</span>
          <span className="text-brand-dark font-bold">{categoryTitle}</span>
        </nav>
        <h1 className="text-5xl md:text-7xl font-serif">{categoryTitle}</h1>
        <p className="text-lg text-brand-muted font-light leading-relaxed">
          {categoryDescription}
        </p>
      </header>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-12 py-4 border-y border-gray-100">
        <div className="flex items-center space-x-8">
          <button className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:text-brand-muted transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <div className="hidden md:flex items-center space-x-4">
            {['All', 'Apparel', 'Accessories', 'Footwear'].map(item => (
              <button key={item} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
        
        <button className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:text-brand-muted transition-colors">
          <span>Sort By</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-muted" size={40} />
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-gray-400 italic font-serif text-xl">No pieces found in this collection.</p>
        </div>
      )}
    </motion.div>
  )
};
