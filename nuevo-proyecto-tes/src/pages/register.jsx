import React, { useState, useEffect } from 'react'; 
import { NavLink } from 'react-router-dom';

const Register = () => {
  // Diagnóstico: Mantenemos el log para confirmar que el componente se monta.
  useEffect(() => {
    console.log('✅ Componente Register montado correctamente.');
  }, []);
  
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden.');
      return;
    }
    console.log('Registro de Usuario:', { username, name, password, isVendor });
    // Aquí iría la lógica de registro, como llamar a una API o a Firebase Auth
  };

  return (
    // Contenedor principal centrado
    <div className="w-full h-full flex items-center justify-center py-16">
      
      {/* Contenedor del Título y Formulario - Aumentamos la anchura a max-w-lg */}    
      <div className="w-full max-w-[45rem] p-4">

        {/* Título */}
        <h1 className="text-2xl font-semibold text-center mb-8">
          Registro de Usuario
        </h1>

        {/* Contenedor principal del formulario (el recuadro blanco) */}
        <div className="bg-white p-6 md:p-8 border border-gray-300 shadow-md rounded-lg">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* INICIO DE LA ESTRUCTURA 2x2 GRID */}
            {/* En pantallas medianas (md) y superiores, usa 2 columnas. En móviles, 1 columna. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                
                {/* Campo 1: Usuario/Correo */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Usuario (Correo Electrónico)
                  </label>
                  <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Campo 2: Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    required
                  />
                </div>
                
                {/* Campo 3: Contraseña */}
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
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {/* Icono de visibilidad (Ojo) */}
                      <svg 
                        className="h-5 w-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        {showPassword && (<line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>)}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Campo 4: Confirmar Contraseña */}
                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar Contraseña
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                      aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {/* Icono de visibilidad (Ojo) */}
                      <svg 
                        className="h-5 w-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        {showConfirmPassword && (<line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>)}
                      </svg>
                    </button>
                  </div>
                  {password !== confirmPassword && confirmPassword.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">Las contraseñas deben coincidir.</p>
                  )}
                </div>
                
            </div>
            {/* FIN DE LA ESTRUCTURA 2x2 GRID */}

            {/* Checkbox Vendedor / Proveedor */}
            <div className="flex items-center">
                <input
                    id="isVendor"
                    name="isVendor"
                    type="checkbox"
                    checked={isVendor}
                    onChange={(e) => setIsVendor(e.target.checked)}
                    className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor="isVendor" className="ml-2 block text-sm font-medium text-gray-700">
                    ¿Quieres convertirte en vendedor / proveedor?
                </label>
            </div>


            {/* Botón de Registrarse (gris claro) */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Registrarse
              </button>
            </div>
            
          </form>

          {/* Enlace de Iniciar Sesión (corregido a <Link>) */}
          <div className="mt-4 text-center">
            <NavLink to="/login" activeStyle>
              Iniciar Sesión
            </NavLink>
          </div>
          
        </div>
      </div> 
    </div>
  );
};

export default Register;