import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + item.promoPrice * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold-600" />
                <h2 className="font-serif text-xl font-bold tracking-tight">Seu Carrinho</h2>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-500">{items.length}</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p className="font-serif italic text-lg">Seu carrinho está vazio</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-gray-50 rounded-sm overflow-hidden shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-sm font-bold text-gray-900 truncate pr-2">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Aro: {item.selectedSize}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-bold">R$ {item.promoPrice.toFixed(2)}</span>
                        <span className="text-[10px] text-gray-400">Qtd: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm uppercase tracking-widest font-bold text-gray-500">Subtotal</span>
                  <span className="text-2xl font-serif font-bold text-gray-900">R$ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-gray-900 text-white py-4 rounded-sm tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20"
                >
                  Finalizar Pedido
                  <ChevronRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[0.1em]">
                  Frete grátis para todo o Brasil apenas hoje
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
