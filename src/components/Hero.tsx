import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/fashion-hero/1920/1080?grayscale" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/10" />
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark/60 mb-4 block">
              Spring / Summer 2026
            </span>
            <h1 className="text-5xl md:text-8xl font-serif leading-tight">
              The Art of <br /> <span className="italic">Simplicity</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/category/women" className="btn-primary">
              Shop Women
            </Link>
            <Link to="/category/men" className="btn-outline">
              Shop Men
            </Link>
          </motion.div>
        </div>
      </section>
  )
}
