import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[90] md:left-auto md:max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-brand-50 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 p-3 rounded-2xl hidden sm:block">
                <ShieldCheck className="w-6 h-6 text-brand-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm">Respeitamos sua privacidade</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Este site usa cookies para melhorar sua experiência, personalizar conteúdos e analisar o tráfego 💓
                </p>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-brand-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleAccept}
              className="w-full bg-gray-800 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-gray-900 transition-colors"
            >
              Aceitar Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
