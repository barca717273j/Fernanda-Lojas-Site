import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, Clock, Heart, ShoppingCart } from 'lucide-react';
import { SIZES } from '../constants';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, p1: string, p2: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onAddToCart }) => {
  const [partner1Size, setPartner1Size] = useState<string>('');
  const [partner2Size, setPartner2Size] = useState<string>('');
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (!partner1Size || !partner2Size) {
      setError(true);
      return;
    }
    setError(false);
    onAddToCart(product, partner1Size, partner2Size);
  };

  const isReady = partner1Size && partner2Size;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-brand-600 transition-colors mb-8 text-[10px] uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a vitrine
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-50 relative flex items-center justify-center p-20 md:p-32"
            >
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className={`w-full h-full object-contain relative z-10 transition-all ${product.isSoldOut ? 'blur-[4px] opacity-60 grayscale' : ''}`}
              />
              {product.isSoldOut && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/20 backdrop-blur-[4px]">
                  <div className="bg-white/90 px-8 py-4 rounded-3xl shadow-2xl border border-brand-100 text-center">
                    <span className="text-sm uppercase tracking-[0.2em] font-bold text-gray-400 block mb-1">
                      Indisponível
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block italic">
                      No momento
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-rose-300">
                  <Star className="w-4 h-4 fill-rose-300" />
                  <Star className="w-4 h-4 fill-rose-300" />
                  <Star className="w-4 h-4 fill-rose-300" />
                  <Star className="w-4 h-4 fill-rose-300" />
                  <Star className="w-4 h-4 fill-rose-300" />
                </div>
                <span className="text-gray-400 text-[10px] tracking-widest uppercase font-bold">Destaque do Mês</span>
              </div>
              
              <h1 className="font-romantic text-3xl md:text-5xl text-gray-800 mb-3 font-bold leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-rose-400 italic font-romantic mb-6">{product.tagline}</p>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-brand-700 font-bold text-4xl">
                  R$ {product.promoPrice.toFixed(2)}
                </span>
                <span className="text-gray-300 line-through text-lg font-light italic">
                  De R$ {product.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-8 mb-10">
              {/* Partner 1 Size */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 flex items-center gap-2 px-1">
                  TAMANHO DO ANEL Nº 1 (Namorado)
                </label>
                <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide snap-x">
                  {SIZES.map((size) => (
                    <button
                      key={`p1-${size}`}
                      onClick={() => {
                        if (product.isSoldOut) return;
                        setPartner1Size(size);
                        setError(false);
                      }}
                      disabled={product.isSoldOut}
                      className={`min-w-[60px] h-14 rounded-2xl border-2 flex items-center justify-center text-sm font-bold transition-all snap-center shrink-0 ${
                        partner1Size === size
                          ? 'bg-brand-600 text-white border-brand-600 shadow-xl shadow-brand-100 scale-105'
                          : 'bg-white text-gray-400 border-gray-100 hover:border-brand-200'
                      } ${product.isSoldOut ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner 2 Size */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 flex items-center gap-2 px-1">
                  TAMANHO DO ANEL Nº 2 (Namorada)
                </label>
                <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide snap-x">
                  {SIZES.map((size) => (
                    <button
                      key={`p2-${size}`}
                      onClick={() => {
                        if (product.isSoldOut) return;
                        setPartner2Size(size);
                        setError(false);
                      }}
                      disabled={product.isSoldOut}
                      className={`min-w-[60px] h-14 rounded-2xl border-2 flex items-center justify-center text-sm font-bold transition-all snap-center shrink-0 ${
                        partner2Size === size
                          ? 'bg-brand-600 text-white border-brand-600 shadow-xl shadow-brand-100 scale-105'
                          : 'bg-white text-gray-400 border-gray-100 hover:border-brand-200'
                      } ${product.isSoldOut ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-rose-500 text-xs font-bold text-center italic bg-rose-50 py-2 rounded-xl">
                  Selecione os dois tamanhos para continuar
                </p>
              )}
            </div>

            <div className="space-y-4 mb-10">
              <button 
                onClick={handleAdd}
                disabled={product.isSoldOut}
                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 tracking-[0.2em] font-bold uppercase transition-all shadow-xl ${
                  isReady 
                    ? 'bg-brand-600 text-white shadow-brand-100 hover:bg-brand-700 active:scale-95' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Comprar Agora
              </button>
              
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-ping"></div>
                <span className="text-rose-400 font-bold text-[10px] uppercase tracking-widest">
                  Restam apenas {product.stock} unidades para esta oferta
                </span>
              </div>
            </div>

            <div className="border-t border-brand-50 pt-8 space-y-8">
               <div className="prose prose-sm text-gray-500 font-light leading-relaxed">
                 <p className="mb-4 text-sm">{product.description}</p>
                 <ul className="text-[10px] space-y-2 list-none uppercase tracking-widest font-bold text-gray-400">
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-brand-200 rounded-full"></span>
                     Certificado de Autenticidade
                   </li>
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-brand-200 rounded-full"></span>
                     Caixinha Premium de Veludo
                   </li>
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-brand-200 rounded-full"></span>
                     Embalagem Discreta e Segura
                   </li>
                 </ul>
               </div>

               {product.reviews && product.reviews.length > 0 && (
                 <div className="space-y-6 pt-4">
                   <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-800">Depoimentos de Clientes</h4>
                   <div className="space-y-6">
                     {product.reviews.map((review, i) => (
                       <div key={i} className="bg-[#fdfaf7] p-5 rounded-2xl border border-brand-100/50">
                         <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-gray-800">{review.name}</span>
                           <div className="flex text-gold-500">
                             {Array.from({ length: 5 }).map((_, j) => (
                               <Star key={j} className="w-3 h-3 fill-gold-500" />
                             ))}
                           </div>
                         </div>
                         <p className="text-xs text-gray-500 italic leading-relaxed">"{review.comment}"</p>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
