import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciar Sesión con:', { email, password });
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      
      <div className="w-full max-w-sm">

        <h1 className="mt-20 text-2xl font-semibold text-center mb-8">
          Inicio de Sesión
        </h1>

        {/* Contenedor principal del formulario */}
        <div className="bg-white p-6 md:p-8 border border-gray-300 shadow-md rounded-lg">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo de Correo */}
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                type="email"
                id="correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                required
              />
            </div>

            {/* Campo de Contraseña */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  required
                />
                {/* Botón de Icono de visibilidad (Ojo) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                    {showPassword && (
                      <line 
                          x1="4" y1="20" x2="20" y2="4" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Enlace de Restablecer Contraseña */}
            <div className="text-sm">
              <a href="#" className="font-medium text-gray-600 hover:text-gray-800">
                Restablecer Contraseña
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Iniciar Sesión
              </button>
            </div>
            
          </form>

          {/* Enlace de Registrarse */}
          <div className="mt-4 text-center">
            <NavLink to="/register" activeStyle>
              Regístrate
            </NavLink>
          </div>
          
        </div>
      </div> 
    </div>  
  );
};

export default Login;