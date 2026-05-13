import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SLIDES = [
  "https://i.ibb.co/Ld9mFVC7/banner1.jpg",
  "https://i.ibb.co/tRTh0jh/banner2.jpg",
  "https://i.ibb.co/W4zRzxZv/banner3.jpg",
  "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop"
];

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full px-4 md:px-6 mt-20 mb-8 max-w-[1400px] mx-auto">
      <div 
        className="w-full overflow-hidden bg-white relative shadow-2xl"
        style={{
          aspectRatio: '16/6',
          borderRadius: '12px',
        }}
      >
        <div 
          className="flex h-full transition-transform duration-[800ms] ease-in-out"
          style={{
            width: `${SLIDES.length * 100}%`,
            transform: `translateX(-${(index * 100) / SLIDES.length}%)`
          }}
        >
          {SLIDES.map((src, i) => (
            <div 
              key={i} 
              className="h-full relative shrink-0"
              style={{
                width: `${100 / SLIDES.length}%`
              }}
            >
              <img 
                src={src} 
                alt={`Banner ${i + 1}`} 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              {i === SLIDES.length - 1 && (
                <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 to-transparent flex flex-col items-start justify-center p-8 md:p-20 text-left">
                   <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8 }}
                   >
                     <h2 className="text-white font-romantic text-3xl md:text-6xl font-bold mb-6 drop-shadow-2xl leading-tight max-w-2xl">
                       Surpreenda quem você ama com um presente inesquecível 💍
                     </h2>
                     <p className="text-white/90 text-sm md:text-2xl font-bold uppercase tracking-[0.4em] drop-shadow-lg">
                       Ofertas exclusivas para o Dia dos Namorados
                     </p>
                   </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
