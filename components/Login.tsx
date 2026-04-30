import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      <div className="relative w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D93F34" />
                      <stop offset="100%" stopColor="#8A1F18" />
                  </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" className="opacity-10 text-gray-400" />
              <path d="M20 10V22M11.3 27L20 22M28.7 27L20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200 dark:text-gray-700" />
              <circle cx="20" cy="10" r="3.5" fill="url(#loginLogoGrad)" />
              <circle cx="11.3" cy="27" r="3.5" fill="url(#loginLogoGrad)" />
              <circle cx="28.7" cy="27" r="3.5" fill="url(#loginLogoGrad)" />
              <circle cx="20" cy="22" r="5.5" fill="#1A3B66" className="dark:fill-white" />
              <circle cx="20" cy="22" r="2.5" fill="white" className="dark:fill-[#1A3B66]" />
          </svg>
      </div>
      <span className="text-xl font-bold text-[#1A3B66] dark:text-white">Redes Comerciales.Sales</span>
    </div>
  );
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.message || 'Error al iniciar sesión');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] px-4 font-poppins">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#0B0B0B] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold text-[#1A3B66] dark:text-white">
            Bienvenido de nuevo
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ingresa tus credenciales para acceder
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-[#1A3B66] dark:text-gray-200 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white dark:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D93F34] focus:border-transparent transition-all sm:text-sm"
                  placeholder="tu@correo.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#1A3B66] dark:text-gray-200 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white dark:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D93F34] focus:border-transparent transition-all sm:text-sm pr-10"
                  placeholder="Tu contraseña segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#D93F34] dark:hover:text-[#D93F34] transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#D93F34] hover:bg-[#c4362b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D93F34] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="material-symbols-outlined animate-spin mr-2 text-sm">progress_activity</span>
                  Verificando...
                </span>
              ) : (
                <>
                  <span className="material-symbols-outlined mr-2 text-lg">login</span>
                  Iniciar Sesión
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;