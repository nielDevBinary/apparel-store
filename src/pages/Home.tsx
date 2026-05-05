import { motion } from "motion/react";
import { Hero } from "../components/Hero";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosProducts, type Product } from "../api/StoreApi";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await axiosProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/category/women"
            className="relative group overflow-hidden aspect-[4/5] bg-brand-light"
          >
            <img
              src="https://picsum.photos/seed/women-cat/1000/1250"
              alt="Women"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="text-4xl font-serif mb-2">Women</h2>
              <span className="text-xs uppercase tracking-widest flex items-center gap-2">
                Explore Collection <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          <Link
            to="/category/men"
            className="relative group overflow-hidden aspect-[4/5] bg-brand-muted/10"
          >
            <img
              src="https://picsum.photos/seed/men-cat/1000/1250"
              alt="Men"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="text-4xl font-serif mb-2">Men</h2>
              <span className="text-xs uppercase tracking-widest flex items-center gap-2">
                Explore Collection <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">New Arrivals</span>
            <h2 className="text-4xl font-serif">Featured Pieces</h2>
          </div>
          <Link to="/category/women" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1 hover:text-brand-muted hover:border-brand-muted transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-muted" size={40} />
            </div>
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-32 bg-brand-light/30 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif italic">"Quality is not an act, it is a habit."</h2>
          <p className="text-lg text-brand-muted leading-relaxed font-light">
            We believe in the beauty of the essential. Our collections are designed to transcend seasons, 
            combining architectural silhouettes with the finest materials to create a wardrobe that lasts.
          </p>
          <div className="pt-4">
            <Link to="/" className="text-xs uppercase tracking-widest font-bold border-b border-brand-dark pb-1">
              Our Story
            </Link>
          </div>
        </div>
      </section>

    </motion.div>
  );
};
