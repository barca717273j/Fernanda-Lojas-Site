/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductPage } from './components/ProductPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { Footer } from './components/Footer';
import { AuthModals } from './components/AuthModals';
import { CookieConsent } from './components/CookieConsent';
import { PRODUCTS } from './constants';
import { Product, CartItem, AppView, User } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Heart, Truck, Loader2 } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [pendingCart, setPendingCart] = useState<CartItem | null>(null);
  
  const [user, setUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, type: 'login' | 'register'}>({ isOpen: false, type: 'login' });

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Sync scroll on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProduct, orderComplete]);

  const addToCart = (product: Product, p1Size: string, p2Size: string) => {
    const newItem = { ...product, partner1Size: p1Size, partner2Size: p2Size, quantity: 1 };
    if (!user) {
      setPendingCart(newItem);
      setAuthModal({ isOpen: true, type: 'register' });
      return;
    }
    setCart([newItem]);
    setView('checkout');
  };

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    if (pendingCart) {
      setCart([pendingCart]);
      setPendingCart(null);
      setView('checkout');
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const startCheckout = () => {
    setIsCartOpen(false);
    if (!user) {
      setAuthModal({ isOpen: true, type: 'login' });
      return;
    }
    setView('checkout');
  };

  const completeOrder = () => {
    setOrderComplete(true);
    setCart([]);
  };

  const resetStore = () => {
    setView('home');
    setSelectedProduct(null);
    setOrderComplete(false);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.promoPrice * item.quantity, 0);

  const handleCheckoutComplete = () => {
    setView('payment-pending');
    setTimeout(() => {
      if (cart.length > 0 && cart[0].checkoutUrl) {
        window.location.href = cart[0].checkoutUrl;
      } else {
        setOrderComplete(true);
      }
    }, 2500);
  };

  if (view === 'payment-pending') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-brand-50 rounded-full scale-[2] blur-3xl opacity-50"></div>
            <Loader2 className="w-20 h-20 text-brand-600 animate-spin relative z-10" />
          </div>
          <div className="relative z-10">
            <h1 className="font-romantic text-3xl font-bold mb-4 text-gray-800">Finalizar Pagamento</h1>
            <p className="text-gray-400 italic font-romantic">
              Estamos te redirecionando para o ambiente de pagamento seguro...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md space-y-8"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-2xl opacity-50"></div>
              <CheckCircle2 className="w-24 h-24 text-green-500 relative z-10" />
            </div>
          </div>
          <div>
            <h1 className="font-romantic text-4xl font-bold mb-4 text-gray-800 tracking-tight">Pedido Realizado!</h1>
            <p className="text-gray-400 italic font-romantic text-lg leading-relaxed">
              Sua promessa de amor está a caminho. Você receberá um e-mail com todos os detalhes em instantes.
            </p>
          </div>
          <button 
            onClick={resetStore}
            className="w-full bg-brand-600 text-white py-5 rounded-2xl tracking-[0.2em] font-bold uppercase shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all font-sans text-xs"
          >
            Voltar para a Vitrine
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased selection:bg-brand-100">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={resetStore}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onAuthClick={(type) => setAuthModal({ isOpen: true, type })}
        user={user}
        onLogout={logout}
      />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />

            {/* Marquee de frases */}
            <div className="bg-brand-600 py-3 overflow-hidden border-y border-brand-700 select-none">
              <div className="flex animate-marquee whitespace-nowrap">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white mx-8">
                      “Um símbolo simples para um amor verdadeiro”
                    </span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white mx-8">
                      “Pequenos anéis, grandes promessas”
                    </span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white mx-8">
                      “Para quem ama de verdade”
                    </span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white mx-8">
                      “O presente perfeito para quem mora no seu coração”
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <section className="py-24 bg-white" id="vitrine">
              <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-brand-600 font-bold mb-4 block animate-bounce">
                    Joias Selecionadas
                  </span>
                  <h2 className="font-romantic text-4xl md:text-5xl text-gray-800 mb-6 font-bold tracking-tight">
                    O Presente Perfeito
                  </h2>
                  <div className="w-24 h-1 bg-brand-100 mx-auto mb-8"></div>
                  <p className="text-gray-400 italic font-romantic text-xl leading-relaxed">
                    "O presente perfeito para quem faz seu coração bater mais forte"
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                  {PRODUCTS.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={openProduct} 
                      onBuy={addToCart}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Por que escolher */}
            <section className="py-24 bg-brand-50/30">
              <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <div className="w-8 h-8 bg-brand-100 rounded-full"></div>
                    </div>
                    <h3 className="font-romantic text-xl font-bold text-gray-800">Feito com Amor</h3>
                    <p className="text-sm text-gray-500 font-light italic">Cada anel é escolhido a dedo para representar a doçura do seu relacionamento.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8 text-brand-500" />
                    </div>
                    <h3 className="font-romantic text-xl font-bold text-gray-800">Garantia e Carinho</h3>
                    <p className="text-sm text-gray-500 font-light italic">Sua satisfação é nossa prioridade. Oferecemos suporte humanizado em cada compra.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Truck className="w-8 h-8 text-brand-500" />
                    </div>
                    <h3 className="font-romantic text-xl font-bold text-gray-800">Entrega Segura</h3>
                    <p className="text-sm text-gray-500 font-light italic">Enviamos para todo o Brasil com embalagem discreta e romântica.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Depoimentos */}
            <section className="py-24 bg-white relative overflow-hidden">
               <div className="relative container mx-auto px-4 md:px-6">
                  <h2 className="font-romantic text-3xl text-center mb-16 text-brand-600 font-bold">O que dizem os apaixonados</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { name: 'Bernardo & Sofia', text: 'Os anéis são lindos e delicados! Chegaram antes do esperado e a caixinha é uma graça.' },
                      { name: 'Lucas & Julia', text: 'Comprei para o nosso primeiro ano de namoro. Ela amou o brilho sutil e a simplicidade.' },
                      { name: 'Gabriel & Mariana', text: 'Atendimento muito atencioso. O anel serviu perfeitamente e é muito confortável.' }
                    ].map((dep, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-50">
                        <p className="text-gray-500 text-sm italic mb-6">"{dep.text}"</p>
                        <div className="flex items-center gap-2">
                           <p className="font-bold text-[10px] uppercase tracking-widest text-gray-800">{dep.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </section>
          </motion.main>
        )}

        {view === 'product' && selectedProduct && (
          <motion.div
            key="product"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <ProductPage 
              product={selectedProduct} 
              onBack={() => setView('home')} 
              onAddToCart={addToCart}
            />
          </motion.div>
        )}

        {view === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CheckoutForm 
              total={cartTotal} 
              items={cart}
              onBack={() => setView('product')}
              onComplete={handleCheckoutComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'product' && !user && !authModal.isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[110] p-4 pointer-events-none"
          >
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-xl border border-brand-100 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0">
                </div>
                <div>
                  <h3 className="font-romantic font-bold text-gray-800">Faça login ou crie sua conta para continuar</h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Sua história merece esse brilho especial</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setAuthModal({ isOpen: true, type: 'register' })}
                  className="flex-1 md:px-8 py-3 bg-brand-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors shadow-lg shadow-brand-100"
                >
                  Criar Conta
                </button>
                <button 
                  onClick={() => setAuthModal({ isOpen: true, type: 'login' })}
                  className="flex-1 md:px-8 py-3 bg-gray-50 text-brand-600 border border-brand-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-100 transition-colors"
                >
                  Fazer Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={(id) => removeFromCart(id)}
        onCheckout={startCheckout}
      />

      <AuthModals 
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        type={authModal.type}
        setType={(type) => setAuthModal({ ...authModal, type })}
        onAuthSuccess={handleAuthSuccess}
      />

      <CookieConsent />
    </div>
  );
}

