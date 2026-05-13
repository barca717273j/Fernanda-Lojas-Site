import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Star, ChevronDown } from 'lucide-react';
import { SIZES } from '../constants';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onBuy: (product: Product, size1: string, size2: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onBuy }) => {
  const [size1, setSize1] = useState('18');
  const [size2, setSize2] = useState('14');

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isSoldOut) return;
    onBuy(product, size1, size2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`group cursor-pointer bg-white overflow-hidden relative border transition-all duration-500 shadow-sm hover:shadow-xl rounded-2xl ${
        product.isBestSeller 
          ? 'border-brand-200 ring-2 ring-brand-50' 
          : 'border-brand-100 hover:border-brand-200'
      }`}
      onClick={() => onClick(product)}
    >
      {/* Visual Background Details */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-50/20 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-white to-brand-50/20 flex items-center justify-center p-6 md:p-8">
        <img
          src={product.images[0]} 
          alt={product.name}
          className={`w-[90%] h-[90%] object-contain transition-transform duration-700 group-hover:scale-105 relative z-10 ${
            product.isSoldOut ? 'blur-[1px] opacity-60 grayscale' : ''
          }`}
          referrerPolicy="no-referrer"
        />
        
        {product.isBestSeller && !product.isSoldOut && (
          <div className="absolute top-5 left-5 z-30">
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-rose-200/50 flex items-center gap-2 border border-white/20">
              <span className="animate-bounce">🔥</span> Mais vendido
            </div>
          </div>
        )}
        
        {product.isSoldOut && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[4px]">
            <div className="bg-white px-5 py-2.5 rounded-2xl shadow-xl border border-brand-100">
              <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">
                Esgotado
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 md:p-4 bg-white relative z-10 border-t border-brand-50/50">
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded-full">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2 h-2 fill-rose-400 text-rose-400" />
              ))}
            </div>
            <span className="text-[7px] text-gray-500 font-bold uppercase tracking-tighter">
              {product.soldCount.toLocaleString()} vendidos
            </span>
          </div>
          <span className="text-[8px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full uppercase tracking-widest">
            Estoque
          </span>
        </div>
        
        <h3 className="font-romantic text-base md:text-lg text-gray-900 mb-1 font-bold group-hover:text-brand-600 transition-colors leading-tight line-clamp-1">
          {product.name}
        </h3>

        <p className="text-[10px] text-gray-400 italic mb-3 line-clamp-1 leading-tight font-light">
          "{product.description}"
        </p>
        
        {/* Simplified Size Selectors Inside Card */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="relative group/size">
            <label className="text-[7px] uppercase tracking-[0.05em] font-black text-gray-400 mb-0.5 block ml-0.5">Anel 1</label>
            <div className="relative">
              <select 
                value={size1}
                onChange={(e) => setSize1(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-brand-50/30 border-none text-[10px] font-bold text-gray-700 py-1.5 pl-2 pr-6 rounded-lg appearance-none focus:ring-1 focus:ring-brand-200 outline-none cursor-pointer duration-200 hover:bg-brand-50"
              >
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="w-2.5 h-2.5 absolute right-2 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none" />
            </div>
          </div>
          <div className="relative group/size">
            <label className="text-[7px] uppercase tracking-[0.05em] font-black text-gray-400 mb-0.5 block ml-0.5">Anel 2</label>
            <div className="relative">
              <select 
                value={size2}
                onChange={(e) => setSize2(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-brand-50/30 border-none text-[10px] font-bold text-gray-700 py-1.5 pl-2 pr-6 rounded-lg appearance-none focus:ring-1 focus:ring-brand-200 outline-none cursor-pointer duration-200 hover:bg-brand-50"
              >
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="w-2.5 h-2.5 absolute right-2 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50/30 p-3 rounded-2xl border border-brand-50/50">
          <div className="flex flex-col items-center">
            {!product.isSoldOut ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-400 line-through text-[10px] font-medium decoration-rose-300">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-brand-100 text-brand-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-0.5 mb-2">
                  <span className="text-[8px] font-bold text-brand-400 uppercase">R$</span>
                  <span className="text-xl font-black text-brand-800 tracking-tight">
                    {product.promoPrice.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={handleBuy}
                  className="w-full bg-brand-600 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg shadow-brand-100/50 hover:bg-brand-700 transition-all active:scale-[0.98]"
                >
                  Comprar
                </button>
              </>
            ) : (
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest py-4">
                Esgotado
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
