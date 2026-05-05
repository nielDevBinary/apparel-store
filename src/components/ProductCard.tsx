import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Product } from '../type';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export const ProductCard = ({product}:ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-image-container mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {true && (
            <span className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
              New
            </span>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium tracking-wide group-hover:text-brand-muted transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 font-light">
            ${product.price}.00
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
