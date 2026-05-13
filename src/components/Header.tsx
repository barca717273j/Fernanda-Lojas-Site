import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { AppView } from '../types';

import { User as UserType } from '../types';

interface HeaderProps {
  onCartClick: () => void;
  onHomeClick: () => void;
  cartCount: number;
  onAuthClick: (type: 'login' | 'register') => void;
  user: UserType | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, onHomeClick, cartCount, onAuthClick, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white shadow-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <Menu className="w-6 h-6 cursor-pointer text-gray-700 hover:text-brand-600 transition-colors" />
        </div>

        <button 
          onClick={onHomeClick}
          className="flex flex-col items-center group cursor-pointer"
        >
          <span className="font-romantic text-xl md:text-2xl tracking-[0.05em] font-bold text-brand-600 group-hover:opacity-80 transition-opacity uppercase whitespace-nowrap">
            Fernanda Joias
          </span>
          <span className="text-[8px] tracking-[0.2em] font-bold text-rose-400 uppercase text-center -mt-1">
            Conceito
          </span>
        </button>

        <div className="flex-1 flex items-center justify-end gap-3 md:gap-5 text-gray-700">
          {!user ? (
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => onAuthClick('login')}
                 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-brand-600 transition-colors hidden sm:block"
               >
                 Entrar
               </button>
               <button 
                 onClick={() => onAuthClick('register')}
                 className="bg-brand-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg shadow-brand-100 hover:bg-brand-700 transition-all active:scale-95"
               >
                 Conta
               </button>
            </div>
          ) : (
             <div className="flex items-center gap-2 md:gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hidden md:inline">Olá, {user.name.split(' ')[0]}</span>
                <button 
                  onClick={onLogout}
                  className="p-2 rounded-full hover:bg-brand-50 text-gray-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
          )}
          
          <button 
            onClick={onCartClick}
            className="relative p-2 group"
          >
            <ShoppingBag className="w-6 h-6 group-hover:text-brand-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
