import React from 'react';
import { ShieldCheck, Truck, Clock, Instagram, Facebook, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-brand-50 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="font-romantic text-2xl tracking-tighter font-bold text-brand-600">FERNANDA JOIAS CONCEITO</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs font-light italic">
              "Um símbolo simples para um amor verdadeiro"
            </p>
            <div className="flex gap-4 text-brand-300">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-brand-600 transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-brand-600 transition-colors" />
              <Mail className="w-5 h-5 cursor-pointer hover:text-brand-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-800">Institucional</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Quem Somos</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Termos de Uso</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Privacidade</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-800">Suporte</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Acompanhar Pedido</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Ajuda & FAQ</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Trocas</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-800">Segurança & Entrega</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <span className="text-xs text-gray-400 font-medium">Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-brand-500" />
                <span className="text-xs text-gray-400 font-medium">Seus dados protegidos</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <span className="text-xs text-gray-400 font-medium italic">Embalagem especial para presente</span>
              </div>
              <div className="pt-2">
                <p className="text-[10px] text-brand-600 font-bold uppercase tracking-widest leading-relaxed">Garantia de Qualidade Fernanda Joias</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center md:text-left">
            © 2026 FERNANDA JOIAS CONCEITO. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 grayscale opacity-40">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
          </div>
        </div>
      </div>
    </footer>
  );
};
