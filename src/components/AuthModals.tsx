import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Mail, Lock, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'register';
  setType: (type: 'login' | 'register') => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({ isOpen, onClose, type, setType, onAuthSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (type === 'register') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: User) => u.email === formData.email)) {
        setError('Este e-mail já está cadastrado.');
        return;
      }
      const newUser = { name: formData.name, email: formData.email, password: formData.password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      onAuthSuccess(newUser);
      onClose();
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User) => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onAuthSuccess(user);
        onClose();
      } else {
        setError('E-mail ou senha incorretos.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-50 text-gray-400 hover:text-brand-600 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-10">
              <div className="flex bg-gray-50 p-1 rounded-2xl mb-8">
                <button
                  onClick={() => setType('login')}
                  className={`flex-1 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                    type === 'login' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  Fazer Login
                </button>
                <button
                  onClick={() => setType('register')}
                  className={`flex-1 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                    type === 'register' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  Criar Conta
                </button>
              </div>

              <div className="flex flex-col items-center text-center mb-8">
                <h2 className="font-romantic text-2xl font-bold text-gray-800 italic">
                  {type === 'login' ? 'Bem-vinda de volta!' : 'Bem-vinda à Fernanda Joias'}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {type === 'login' 
                    ? 'Acesse sua conta para ver seus pedidos e favoritos.' 
                    : 'Cadastre-se para aproveitar ofertas exclusivas de Dia dos Namorados.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'register' && (
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-shadow"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-shadow"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Sua senha"
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-200 outline-none transition-shadow"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                {error && <p className="text-xs text-rose-500 text-center font-medium">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-200 hover:bg-brand-700 transition-colors uppercase tracking-widest text-xs"
                >
                  {type === 'login' ? 'Entrar' : 'Cadastrar agora'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  {type === 'login' ? 'Não tem uma conta?' : 'Já possui uma conta?'}
                  <button
                    onClick={() => setType(type === 'login' ? 'register' : 'login')}
                    className="ml-2 text-brand-600 font-bold hover:underline"
                  >
                    {type === 'login' ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
