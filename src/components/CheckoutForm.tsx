import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

import { CartItem } from '../types';

interface CheckoutFormProps {
  total: number;
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ total, items, onBack, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    residenceType: 'Casa',
    obs: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-brand-600 transition-colors mb-8 text-[10px] uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar a Coleção
        </button>

        <div className="text-center mb-10">
          <h1 className="font-romantic text-3xl md:text-4xl font-bold text-gray-800 mb-2">Finalize seu pagamento</h1>
          <p className="text-gray-400 italic font-romantic text-lg">Confirme algumas informações importantes abaixo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white p-8 shadow-sm rounded-3xl border border-brand-50"
            >
              <h2 className="font-romantic text-2xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                <Truck className="w-6 h-6 text-brand-600" />
                Dados de Entrega
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Nome Completo</label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Como no seu documento"
                    className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">CPF</label>
                    <input 
                      required 
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      type="text" 
                      placeholder="000.000.000-00"
                      className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Telefone</label>
                    <input 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      placeholder="(00) 00000-0000"
                      className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">E-mail</label>
                  <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="seu@contato.com"
                    className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">CEP</label>
                    <input 
                      required 
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      type="text" 
                      placeholder="00000-000"
                      className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Tipo de Residência</label>
                    <select
                      name="residenceType"
                      value={formData.residenceType}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl appearance-none"
                    >
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">Apartamento</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="md:col-span-2">
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Rua / Avenida</label>
                     <input 
                       required 
                       name="street"
                       value={formData.street}
                       onChange={handleChange}
                       type="text" 
                       className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                     />
                   </div>
                   <div>
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Número</label>
                     <input 
                       required 
                       name="number"
                       value={formData.number}
                       onChange={handleChange}
                       type="text" 
                       className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                     />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Complemento</label>
                     <input 
                       name="complement"
                       value={formData.complement}
                       onChange={handleChange}
                       type="text" 
                       placeholder="Ex: Bloco 2, Ap 402"
                       className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                     />
                   </div>
                   <div>
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Bairro</label>
                     <input 
                       required 
                       name="neighborhood"
                       value={formData.neighborhood}
                       onChange={handleChange}
                       type="text" 
                       className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                     />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Cidade</label>
                     <input 
                       required 
                       name="city"
                       value={formData.city}
                       onChange={handleChange}
                       type="text" 
                       className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                     />
                   </div>
                   <div>
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Estado</label>
                     <input 
                       required 
                       name="state"
                       value={formData.state}
                       onChange={handleChange}
                       type="text" 
                       className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl"
                     />
                   </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Observações (Opcional)</label>
                  <textarea 
                    name="obs"
                    value={formData.obs}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none px-6 py-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-all rounded-2xl h-24 resize-none"
                    placeholder="Ponto de referência, horário de entrega..."
                  ></textarea>
                </div>

                <p className="text-[10px] text-brand-700 leading-relaxed font-bold uppercase tracking-widest mt-2">
                   Frete grátis por nossa conta para compras realizadas até 21 de maio
                </p>

                <div className="pt-6">
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-brand-600 text-white py-5 rounded-2xl tracking-[0.2em] font-bold uppercase transition-all shadow-xl shadow-brand-100 hover:bg-brand-700 disabled:opacity-50 flex items-center justify-center gap-4"
                  >
                    {isSubmitting ? (
                       <>
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                         Salvando Endereço...
                       </>
                    ) : (
                      'Salvar Endereço'
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 shadow-sm rounded-3xl border border-brand-50"
            >
              <h3 className="font-romantic text-lg font-bold mb-6 text-gray-800">Seu Pedido</h3>
              
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-brand-50 overflow-hidden photo-treated">
                      <img src={item.images[0]} alt={item.name} className="w-[85%] h-[85%] object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-800 leading-tight mb-2">
                        {item.name}
                      </h4>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                          Tam. Anel 1: <span className="text-brand-600">{item.partner1Size}</span>
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                          Tam. Anel 2: <span className="text-brand-600">{item.partner2Size}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-800">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                  <span className="text-gray-400">Frete</span>
                  <span className="text-emerald-500">Grátis</span>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 mb-4">
                  <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest text-center">
                    Prazo de entrega: 12 a 16 dias úteis
                  </p>
                </div>
                <div className="border-t border-brand-50 pt-6 flex justify-between items-center">
                  <span className="font-bold text-gray-800 uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-bold text-brand-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-brand-50 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-3 text-brand-700">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Pagamento Blindado</span>
                </div>
                <div className="flex items-center gap-3 text-brand-700">
                  <Lock className="w-5 h-5" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Certificado 256 bits</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

  );
};
