import React, { useState } from 'react';
import { OwlIcon } from './icons/OwlIcon';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    setError('');
    onLogin(email);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg">
      <div className="text-center">
          <OwlIcon className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-cyan-400">Quiz de Filosofía</h1>
        <p className="mt-2 text-slate-300">Demuestra tus conocimientos y aprende con nuestro tutor IA.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-400">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="tu@email.com"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-800 transition-colors"
          >
            Comenzar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;